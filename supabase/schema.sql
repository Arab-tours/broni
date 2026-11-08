-- =====================================================================
-- Столик — схема базы данных для Supabase (PostgreSQL)
-- Запуск: Supabase → SQL Editor → New query → вставить ВЕСЬ файл → Run.
-- Потом так же выполнить supabase/seed.sql (рестораны и столы).
-- Скрипт можно запускать повторно: он ничего не ломает.
-- =====================================================================

create extension if not exists btree_gist;

-- ---------- Рестораны ----------
create table if not exists public.restaurants (
  id          text primary key,
  name        text not null,
  cuisine     text[] not null default '{}',
  avg_check   integer not null,
  address     text not null,
  area        text,
  lat         double precision,
  lng         double precision,
  open_hour   smallint not null default 12,
  close_hour  smallint not null default 24,
  created_at  timestamptz not null default now()
);

-- ---------- Столы (схема зала) ----------
create table if not exists public.tables (
  id            text primary key,
  restaurant_id text not null references public.restaurants(id) on delete cascade,
  label         text not null,
  zone          text not null,
  seats         smallint not null check (seats between 1 and 20),
  shape         text not null,
  x real not null, y real not null, w real not null, h real not null
);
create index if not exists tables_restaurant_idx on public.tables(restaurant_id);

-- ---------- Брони ----------
create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  restaurant_id text not null references public.restaurants(id) on delete cascade,
  table_id      text not null references public.tables(id) on delete cascade,
  guest_name    text not null check (char_length(guest_name) between 2 and 80),
  phone         text not null check (phone ~ '^\+?[0-9 ()\-]{10,20}$'),
  guests        smallint not null check (guests between 1 and 20),
  comment       text check (char_length(comment) <= 300),
  starts_at     timestamptz not null,
  ends_at       timestamptz not null,
  status        text not null default 'active' check (status in ('active', 'cancelled')),
  secret        uuid not null default gen_random_uuid(),  -- «ключ» гостя для отмены
  created_at    timestamptz not null default now(),
  check (ends_at > starts_at),
  -- Главная защита: один стол нельзя забронировать дважды на пересекающееся время.
  constraint no_double_booking exclude using gist (
    table_id with =,
    tstzrange(starts_at, ends_at) with &&
  ) where (status = 'active')
);
create index if not exists bookings_restaurant_time_idx on public.bookings(restaurant_id, starts_at);

-- ---------- Права доступа (RLS) ----------
-- Справочники открыты на чтение всем. Таблица броней закрыта целиком:
-- личные данные гостей (имя, телефон) наружу не отдаются.
alter table public.restaurants enable row level security;
alter table public.tables      enable row level security;
alter table public.bookings    enable row level security;

drop policy if exists "restaurants read" on public.restaurants;
create policy "restaurants read" on public.restaurants for select using (true);
drop policy if exists "tables read" on public.tables;
create policy "tables read" on public.tables for select using (true);
-- для bookings политик нет → прямой доступ запрещён, только через функции ниже
grant select on public.restaurants, public.tables to anon, authenticated;
revoke all on public.bookings from anon, authenticated;

-- ---------- Занятость столов (без личных данных) ----------
create or replace function public.busy_slots(p_from timestamptz, p_to timestamptz, p_restaurant text default null)
returns table (restaurant_id text, table_id text, starts_at timestamptz, ends_at timestamptz)
language sql stable security definer set search_path = public as $$
  select b.restaurant_id, b.table_id, b.starts_at, b.ends_at
  from bookings b
  where b.status = 'active'
    and b.starts_at < p_to and b.ends_at > p_from
    and (p_restaurant is null or b.restaurant_id = p_restaurant);
$$;

-- ---------- Создать бронь ----------
create or replace function public.book_table(
  p_table_id text, p_starts_at timestamptz, p_guests int,
  p_name text, p_phone text, p_comment text default null, p_minutes int default 120
) returns table (id uuid, secret uuid)
language plpgsql security definer set search_path = public as $$
declare
  t   tables%rowtype;
  r   restaurants%rowtype;
  loc timestamp;
  h   numeric;
begin
  select * into t from tables where tables.id = p_table_id;
  if not found then raise exception 'TABLE_NOT_FOUND'; end if;
  select * into r from restaurants where restaurants.id = t.restaurant_id;

  if p_guests > t.seats then raise exception 'TOO_MANY_GUESTS'; end if;
  if p_starts_at < now() - interval '5 minutes' then raise exception 'IN_PAST'; end if;
  if p_starts_at > now() + interval '60 days' then raise exception 'TOO_FAR'; end if;
  if p_minutes not between 30 and 240 then raise exception 'BAD_DURATION'; end if;

  -- часы работы проверяем по московскому времени
  loc := p_starts_at at time zone 'Europe/Moscow';
  h := extract(hour from loc) + extract(minute from loc) / 60.0;
  if h < r.open_hour or h + p_minutes / 60.0 > r.close_hour + 0.01 then
    raise exception 'CLOSED';
  end if;

  -- антиспам: не больше 5 активных будущих броней на один телефон
  if (select count(*) from bookings b where b.phone = p_phone and b.status = 'active' and b.ends_at > now()) >= 5 then
    raise exception 'TOO_MANY_BOOKINGS';
  end if;

  begin
    return query
      insert into bookings (restaurant_id, table_id, guest_name, phone, guests, comment, starts_at, ends_at)
      values (t.restaurant_id, t.id, trim(p_name), trim(p_phone), p_guests, nullif(trim(p_comment), ''),
              p_starts_at, p_starts_at + make_interval(mins => p_minutes))
      returning bookings.id, bookings.secret;
  exception when exclusion_violation then
    raise exception 'TABLE_TAKEN';
  end;
end;
$$;

-- ---------- Мои брони (по ключам, которые хранит браузер гостя) ----------
create or replace function public.my_bookings(p_secrets uuid[])
returns table (id uuid, restaurant_id text, table_id text, guests smallint, guest_name text,
               starts_at timestamptz, ends_at timestamptz, status text, secret uuid)
language sql stable security definer set search_path = public as $$
  select b.id, b.restaurant_id, b.table_id, b.guests, b.guest_name, b.starts_at, b.ends_at, b.status, b.secret
  from bookings b where b.secret = any(p_secrets)
  order by b.starts_at;
$$;

-- ---------- Отменить бронь ----------
create or replace function public.cancel_booking(p_id uuid, p_secret uuid)
returns boolean
language plpgsql security definer set search_path = public as $$
begin
  update bookings set status = 'cancelled'
  where bookings.id = p_id and bookings.secret = p_secret and bookings.status = 'active';
  return found;
end;
$$;

-- Функции доступны анонимному ключу сайта
grant execute on function public.busy_slots(timestamptz, timestamptz, text) to anon, authenticated;
grant execute on function public.book_table(text, timestamptz, int, text, text, text, int) to anon, authenticated;
grant execute on function public.my_bookings(uuid[]) to anon, authenticated;
grant execute on function public.cancel_booking(uuid, uuid) to anon, authenticated;
