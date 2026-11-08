// Генерирует supabase/seed.sql из js/data.js.
// Запуск из корня репозитория: node tools/make-seed.js
const fs = require('fs');
const path = require('path');
const { RESTAURANTS } = require('../js/data.js');

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const arr = (a) => `array[${a.map(q).join(',')}]::text[]`;

let sql = `-- Сгенерировано tools/make-seed.js — не править руками.
-- Рестораны и столы. Запускать после schema.sql. Повторный запуск обновляет данные.
begin;
`;

for (const r of RESTAURANTS) {
  sql += `insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values (` +
    [q(r.id), q(r.name), arr(r.cuisine), r.check, q(r.address), q(r.area), r.lat, r.lng, r.open, r.close].join(',') +
    `) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,` +
    `address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;\n`;
}
sql += '\n';
for (const r of RESTAURANTS) {
  const rows = r.plan.tables.map((t) =>
    '(' + [q(t.id), q(r.id), q(t.label), q(t.zone), t.seats, q(t.shape),
      t.x.toFixed(1), t.y.toFixed(1), t.w.toFixed(1), t.h.toFixed(1)].join(',') + ')');
  sql += `insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values\n  ${rows.join(',\n  ')}\n` +
    `on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,` +
    `x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;\n\n`;
}
sql += 'commit;\n';

const out = path.join(__dirname, '..', 'supabase', 'seed.sql');
fs.writeFileSync(out, sql);
const tables = RESTAURANTS.reduce((a, r) => a + r.tableCount, 0);
console.log(`seed.sql: ${RESTAURANTS.length} ресторанов, ${tables} столов`);
