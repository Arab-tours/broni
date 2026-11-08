-- Сгенерировано tools/make-seed.js — не править руками.
-- Рестораны и столы. Запускать после schema.sql. Повторный запуск обновляет данные.
begin;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('za-kryshey','«За крышей»',array['Европейская','Авторская']::text[],5000,'Столярный пер., 3, корп. 8, 3-й этаж (завод «Рассвет»)','Пресня',55.7637,37.5605,18,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('olluco','Olluco',array['Перуанская','Авторская']::text[],12000,'Даев пер., 19','Сретенка',55.7702,37.6355,18,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('carniceria-vino','Carniceria Vino',array['Аргентинская','Мясная']::text[],5500,'ул. Солянка, 1/2 (вход через пекарню Masa Madre)','Китай-город',55.7543,37.6365,19,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('savva','SAVVA',array['Русская','Авторская']::text[],5500,'Театральный пр., 2, отель «Метрополь»','Кремль и Большой театр',55.7585,37.6216,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('jun','Jun',array['Японская']::text[],8000,'Большая Никитская ул., 24/1, стр. 6','Никитская',55.757,37.6019,18,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('severyane','«Северяне»',array['Русская','Скандинавская','Авторская']::text[],2800,'Большая Никитская ул., 12','Никитская',55.7563,37.6066,9,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('probka','Probka на Цветном',array['Итальянская']::text[],4000,'Цветной б-р, 2, «Легенда Цветного»','Цветной бульвар',55.768,37.6203,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('bruno','Bruno',array['Стейк-хаус','Мясная']::text[],6500,'ул. Неглинная, 14/1а','Неглинная',55.7642,37.6213,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('onest','Onest',array['Итальянская','Авторская']::text[],7000,'ул. Малая Бронная, 8/1, 2-й этаж','Патриаршие',55.7612,37.5975,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('leo','Leo',array['Средиземноморская']::text[],4500,'ул. Усачёва, 15, ЖК «Садовые кварталы»','Хамовники',55.728,37.571,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('white-rabbit','White Rabbit',array['Русская','Авторская']::text[],8000,'Смоленская пл., 3, 16-й этаж («Смоленский пассаж»)','Арбат и Смоленская',55.7477,37.5822,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('twins-garden','Twins Garden',array['Русская','Авторская']::text[],7500,'Страстной б-р, 8А','Пушкинская',55.7669,37.6085,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('beluga','«Белуга»',array['Русская','Морепродукты']::text[],7000,'ул. Моховая, 15/1, стр. 1, отель «Националь»','Кремль и Большой театр',55.7572,37.6143,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('sakhalin','«Сахалин»',array['Морепродукты','Дальневосточная']::text[],6500,'ул. Смоленская, 8, верхние этажи отеля «Азимут»','Арбат и Смоленская',55.7458,37.5815,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('dr-zhivago','«Dr. Живаго»',array['Русская']::text[],3000,'ул. Моховая, 15/1, отель «Националь»','Кремль и Большой театр',55.7568,37.6139,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('cafe-pushkin','«Кафе Пушкинъ»',array['Русская','Французская']::text[],5000,'Тверской б-р, 26А','Пушкинская',55.7638,37.6038,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('maya','Maya',array['Гриль','Авторская']::text[],5000,'Большая Никитская ул., 24/1, стр. 6','Никитская',55.7572,37.6015,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('grand-cru','Grand Cru',array['Французская','Винная']::text[],6000,'ул. Малая Бронная, 22, стр. 2','Патриаршие',55.763,37.5925,13,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('motto-azabu','Motto Azabu',array['Японская']::text[],9000,'Театральный пр., 2, правое крыло «Метрополя»','Кремль и Большой театр',55.7589,37.6225,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;
insert into public.restaurants (id,name,cuisine,avg_check,address,area,lat,lng,open_hour,close_hour) values ('ruski','Ruski',array['Русская']::text[],3500,'1-й Красногвардейский пр., 21, стр. 2, башня «ОКО», 85-й этаж','Москва-Сити',55.7497,37.5345,12,24) on conflict (id) do update set name=excluded.name,cuisine=excluded.cuisine,avg_check=excluded.avg_check,address=excluded.address,area=excluded.area,lat=excluded.lat,lng=excluded.lng,open_hour=excluded.open_hour,close_hour=excluded.close_hour;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('za-kryshey-0-0','za-kryshey','1','Основной зал',2,'round',38.5,56.0,34.0,34.0),
  ('za-kryshey-0-1','za-kryshey','2','Основной зал',2,'round',121.5,56.0,34.0,34.0),
  ('za-kryshey-0-2','za-kryshey','3','Основной зал',4,'rect',198.5,50.0,46.0,46.0),
  ('za-kryshey-0-3','za-kryshey','4','Основной зал',4,'rect',281.5,50.0,46.0,46.0),
  ('za-kryshey-0-4','za-kryshey','5','Основной зал',2,'round',38.5,122.0,34.0,34.0),
  ('za-kryshey-0-5','za-kryshey','6','Основной зал',4,'rect',115.5,116.0,46.0,46.0),
  ('za-kryshey-0-6','za-kryshey','7','Основной зал',4,'rect',198.5,116.0,46.0,46.0),
  ('za-kryshey-0-7','za-kryshey','8','Основной зал',2,'round',287.5,122.0,34.0,34.0),
  ('za-kryshey-1-8','za-kryshey','9','Терраса',4,'rect',46.3,226.0,46.0,46.0),
  ('za-kryshey-1-9','za-kryshey','10','Терраса',4,'rect',157.0,226.0,46.0,46.0),
  ('za-kryshey-1-10','za-kryshey','11','Терраса',6,'rect',258.7,228.0,64.0,42.0),
  ('za-kryshey-1-11','za-kryshey','12','Терраса',2,'round',52.3,298.0,34.0,34.0),
  ('za-kryshey-1-12','za-kryshey','13','Терраса',2,'round',163.0,298.0,34.0,34.0),
  ('za-kryshey-1-13','za-kryshey','14','Терраса',4,'rect',267.7,292.0,46.0,46.0),
  ('za-kryshey-2-14','za-kryshey','Б1','Бар',1,'stool',39.0,418.0,22.0,22.0),
  ('za-kryshey-2-15','za-kryshey','Б2','Бар',1,'stool',91.0,418.0,22.0,22.0),
  ('za-kryshey-2-16','za-kryshey','Б3','Бар',1,'stool',143.0,418.0,22.0,22.0),
  ('za-kryshey-2-17','za-kryshey','Б4','Бар',1,'stool',195.0,418.0,22.0,22.0),
  ('za-kryshey-2-18','za-kryshey','Б5','Бар',1,'stool',247.0,418.0,22.0,22.0),
  ('za-kryshey-2-19','za-kryshey','Б6','Бар',1,'stool',299.0,418.0,22.0,22.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('olluco-0-0','olluco','1','Основной зал',2,'round',52.3,56.0,34.0,34.0),
  ('olluco-0-1','olluco','2','Основной зал',2,'round',163.0,56.0,34.0,34.0),
  ('olluco-0-2','olluco','3','Основной зал',2,'round',273.7,56.0,34.0,34.0),
  ('olluco-0-3','olluco','4','Основной зал',4,'rect',46.3,116.0,46.0,46.0),
  ('olluco-0-4','olluco','5','Основной зал',4,'rect',157.0,116.0,46.0,46.0),
  ('olluco-0-5','olluco','6','Основной зал',2,'round',273.7,122.0,34.0,34.0),
  ('olluco-0-6','olluco','7','Основной зал',2,'round',52.3,188.0,34.0,34.0),
  ('olluco-0-7','olluco','8','Основной зал',4,'rect',157.0,182.0,46.0,46.0),
  ('olluco-0-8','olluco','9','Основной зал',2,'round',273.7,188.0,34.0,34.0),
  ('olluco-1-9','olluco','Б1','Барная стойка',1,'stool',39.0,308.0,22.0,22.0),
  ('olluco-1-10','olluco','Б2','Барная стойка',1,'stool',91.0,308.0,22.0,22.0),
  ('olluco-1-11','olluco','Б3','Барная стойка',1,'stool',143.0,308.0,22.0,22.0),
  ('olluco-1-12','olluco','Б4','Барная стойка',1,'stool',195.0,308.0,22.0,22.0),
  ('olluco-1-13','olluco','Б5','Барная стойка',1,'stool',247.0,308.0,22.0,22.0),
  ('olluco-1-14','olluco','Б6','Барная стойка',1,'stool',299.0,308.0,22.0,22.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('carniceria-vino-0-0','carniceria-vino','1','Соляной подвал',2,'round',38.5,56.0,34.0,34.0),
  ('carniceria-vino-0-1','carniceria-vino','2','Соляной подвал',4,'rect',115.5,50.0,46.0,46.0),
  ('carniceria-vino-0-2','carniceria-vino','3','Соляной подвал',4,'rect',198.5,50.0,46.0,46.0),
  ('carniceria-vino-0-3','carniceria-vino','4','Соляной подвал',2,'round',287.5,56.0,34.0,34.0),
  ('carniceria-vino-0-4','carniceria-vino','5','Соляной подвал',2,'round',38.5,122.0,34.0,34.0),
  ('carniceria-vino-0-5','carniceria-vino','6','Соляной подвал',4,'rect',115.5,116.0,46.0,46.0),
  ('carniceria-vino-0-6','carniceria-vino','7','Соляной подвал',6,'rect',189.5,118.0,64.0,42.0),
  ('carniceria-vino-0-7','carniceria-vino','8','Соляной подвал',2,'round',287.5,122.0,34.0,34.0),
  ('carniceria-vino-1-8','carniceria-vino','Б1','У асадора',1,'stool',32.5,242.0,22.0,22.0),
  ('carniceria-vino-1-9','carniceria-vino','Б2','У асадора',1,'stool',71.5,242.0,22.0,22.0),
  ('carniceria-vino-1-10','carniceria-vino','Б3','У асадора',1,'stool',110.5,242.0,22.0,22.0),
  ('carniceria-vino-1-11','carniceria-vino','Б4','У асадора',1,'stool',149.5,242.0,22.0,22.0),
  ('carniceria-vino-1-12','carniceria-vino','Б5','У асадора',1,'stool',188.5,242.0,22.0,22.0),
  ('carniceria-vino-1-13','carniceria-vino','Б6','У асадора',1,'stool',227.5,242.0,22.0,22.0),
  ('carniceria-vino-1-14','carniceria-vino','Б7','У асадора',1,'stool',266.5,242.0,22.0,22.0),
  ('carniceria-vino-1-15','carniceria-vino','Б8','У асадора',1,'stool',305.5,242.0,22.0,22.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('savva-0-0','savva','1','Основной зал',4,'rect',32.5,50.0,46.0,46.0),
  ('savva-0-1','savva','2','Основной зал',4,'rect',115.5,50.0,46.0,46.0),
  ('savva-0-2','savva','3','Основной зал',2,'round',204.5,56.0,34.0,34.0),
  ('savva-0-3','savva','4','Основной зал',2,'round',287.5,56.0,34.0,34.0),
  ('savva-0-4','savva','5','Основной зал',4,'rect',32.5,116.0,46.0,46.0),
  ('savva-0-5','savva','6','Основной зал',6,'rect',106.5,118.0,64.0,42.0),
  ('savva-0-6','savva','7','Основной зал',4,'rect',198.5,116.0,46.0,46.0),
  ('savva-0-7','savva','8','Основной зал',2,'round',287.5,122.0,34.0,34.0),
  ('savva-0-8','savva','9','Основной зал',2,'round',38.5,188.0,34.0,34.0),
  ('savva-0-9','savva','10','Основной зал',4,'rect',115.5,182.0,46.0,46.0),
  ('savva-0-10','savva','11','Основной зал',4,'rect',198.5,182.0,46.0,46.0),
  ('savva-0-11','savva','12','Основной зал',2,'round',287.5,188.0,34.0,34.0),
  ('savva-1-12','savva','13','У окон на Театральный',2,'round',38.5,296.0,34.0,34.0),
  ('savva-1-13','savva','14','У окон на Театральный',2,'round',121.5,296.0,34.0,34.0),
  ('savva-1-14','savva','15','У окон на Театральный',2,'round',204.5,296.0,34.0,34.0),
  ('savva-1-15','savva','16','У окон на Театральный',4,'rect',281.5,296.0,46.0,46.0),
  ('savva-2-16','savva','17','Chef’s table',10,'long',55.0,402.0,250.0,40.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('jun-0-0','jun','Б1','Стойка шефа',1,'stool',32.5,66.0,22.0,22.0),
  ('jun-0-1','jun','Б2','Стойка шефа',1,'stool',71.5,66.0,22.0,22.0),
  ('jun-0-2','jun','Б3','Стойка шефа',1,'stool',110.5,66.0,22.0,22.0),
  ('jun-0-3','jun','Б4','Стойка шефа',1,'stool',149.5,66.0,22.0,22.0),
  ('jun-0-4','jun','Б5','Стойка шефа',1,'stool',188.5,66.0,22.0,22.0),
  ('jun-0-5','jun','Б6','Стойка шефа',1,'stool',227.5,66.0,22.0,22.0),
  ('jun-0-6','jun','Б7','Стойка шефа',1,'stool',266.5,66.0,22.0,22.0),
  ('jun-0-7','jun','Б8','Стойка шефа',1,'stool',305.5,66.0,22.0,22.0),
  ('jun-1-8','jun','1','Зал',2,'round',52.3,160.0,34.0,34.0),
  ('jun-1-9','jun','2','Зал',2,'round',163.0,160.0,34.0,34.0),
  ('jun-1-10','jun','3','Зал',4,'rect',267.7,154.0,46.0,46.0),
  ('jun-1-11','jun','4','Зал',2,'round',52.3,226.0,34.0,34.0),
  ('jun-1-12','jun','5','Зал',2,'round',163.0,226.0,34.0,34.0),
  ('jun-1-13','jun','6','Зал',4,'rect',267.7,220.0,46.0,46.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('severyane-0-0','severyane','1','Общий стол',12,'long',34.0,52.0,292.0,40.0),
  ('severyane-1-1','severyane','2','Зал у кухни',2,'round',38.5,164.0,34.0,34.0),
  ('severyane-1-2','severyane','3','Зал у кухни',2,'round',121.5,164.0,34.0,34.0),
  ('severyane-1-3','severyane','4','Зал у кухни',4,'rect',198.5,158.0,46.0,46.0),
  ('severyane-1-4','severyane','5','Зал у кухни',4,'rect',281.5,158.0,46.0,46.0),
  ('severyane-1-5','severyane','6','Зал у кухни',2,'round',38.5,230.0,34.0,34.0),
  ('severyane-1-6','severyane','7','Зал у кухни',2,'round',121.5,230.0,34.0,34.0),
  ('severyane-1-7','severyane','8','Зал у кухни',4,'rect',198.5,224.0,46.0,46.0),
  ('severyane-1-8','severyane','9','Зал у кухни',2,'round',287.5,230.0,34.0,34.0),
  ('severyane-2-9','severyane','Б1','Бар',1,'stool',39.0,350.0,22.0,22.0),
  ('severyane-2-10','severyane','Б2','Бар',1,'stool',91.0,350.0,22.0,22.0),
  ('severyane-2-11','severyane','Б3','Бар',1,'stool',143.0,350.0,22.0,22.0),
  ('severyane-2-12','severyane','Б4','Бар',1,'stool',195.0,350.0,22.0,22.0),
  ('severyane-2-13','severyane','Б5','Бар',1,'stool',247.0,350.0,22.0,22.0),
  ('severyane-2-14','severyane','Б6','Бар',1,'stool',299.0,350.0,22.0,22.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('probka-0-0','probka','1','Основной зал',4,'rect',24.2,50.0,46.0,46.0),
  ('probka-0-1','probka','2','Основной зал',4,'rect',90.6,50.0,46.0,46.0),
  ('probka-0-2','probka','3','Основной зал',4,'rect',157.0,50.0,46.0,46.0),
  ('probka-0-3','probka','4','Основной зал',2,'round',229.4,56.0,34.0,34.0),
  ('probka-0-4','probka','5','Основной зал',2,'round',295.8,56.0,34.0,34.0),
  ('probka-0-5','probka','6','Основной зал',4,'rect',24.2,116.0,46.0,46.0),
  ('probka-0-6','probka','7','Основной зал',6,'rect',81.6,118.0,64.0,42.0),
  ('probka-0-7','probka','8','Основной зал',4,'rect',157.0,116.0,46.0,46.0),
  ('probka-0-8','probka','9','Основной зал',2,'round',229.4,122.0,34.0,34.0),
  ('probka-0-9','probka','10','Основной зал',2,'round',295.8,122.0,34.0,34.0),
  ('probka-0-10','probka','11','Основной зал',4,'rect',24.2,182.0,46.0,46.0),
  ('probka-0-11','probka','12','Основной зал',4,'rect',90.6,182.0,46.0,46.0),
  ('probka-0-12','probka','13','Основной зал',4,'rect',157.0,182.0,46.0,46.0),
  ('probka-0-13','probka','14','Основной зал',2,'round',229.4,188.0,34.0,34.0),
  ('probka-0-14','probka','15','Основной зал',2,'round',295.8,188.0,34.0,34.0),
  ('probka-1-15','probka','16','Диваны',4,'booth',20.0,290.0,71.0,48.0),
  ('probka-1-16','probka','17','Диваны',4,'booth',103.0,290.0,71.0,48.0),
  ('probka-1-17','probka','18','Диваны',6,'booth',186.0,290.0,71.0,48.0),
  ('probka-1-18','probka','19','Диваны',6,'booth',269.0,290.0,71.0,48.0),
  ('probka-2-19','probka','20','Терраса',2,'round',38.5,410.0,34.0,34.0),
  ('probka-2-20','probka','21','Терраса',4,'rect',115.5,404.0,46.0,46.0),
  ('probka-2-21','probka','22','Терраса',4,'rect',198.5,404.0,46.0,46.0),
  ('probka-2-22','probka','23','Терраса',2,'round',287.5,410.0,34.0,34.0),
  ('probka-2-23','probka','24','Терраса',2,'round',38.5,476.0,34.0,34.0),
  ('probka-2-24','probka','25','Терраса',4,'rect',115.5,470.0,46.0,46.0),
  ('probka-2-25','probka','26','Терраса',4,'rect',198.5,470.0,46.0,46.0),
  ('probka-2-26','probka','27','Терраса',2,'round',287.5,476.0,34.0,34.0),
  ('probka-3-27','probka','Б1','Бар',1,'stool',32.5,596.0,22.0,22.0),
  ('probka-3-28','probka','Б2','Бар',1,'stool',71.5,596.0,22.0,22.0),
  ('probka-3-29','probka','Б3','Бар',1,'stool',110.5,596.0,22.0,22.0),
  ('probka-3-30','probka','Б4','Бар',1,'stool',149.5,596.0,22.0,22.0),
  ('probka-3-31','probka','Б5','Бар',1,'stool',188.5,596.0,22.0,22.0),
  ('probka-3-32','probka','Б6','Бар',1,'stool',227.5,596.0,22.0,22.0),
  ('probka-3-33','probka','Б7','Бар',1,'stool',266.5,596.0,22.0,22.0),
  ('probka-3-34','probka','Б8','Бар',1,'stool',305.5,596.0,22.0,22.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('bruno-0-0','bruno','1','Основной зал',2,'round',38.5,56.0,34.0,34.0),
  ('bruno-0-1','bruno','2','Основной зал',4,'rect',115.5,50.0,46.0,46.0),
  ('bruno-0-2','bruno','3','Основной зал',4,'rect',198.5,50.0,46.0,46.0),
  ('bruno-0-3','bruno','4','Основной зал',2,'round',287.5,56.0,34.0,34.0),
  ('bruno-0-4','bruno','5','Основной зал',4,'rect',32.5,116.0,46.0,46.0),
  ('bruno-0-5','bruno','6','Основной зал',6,'rect',106.5,118.0,64.0,42.0),
  ('bruno-0-6','bruno','7','Основной зал',6,'rect',189.5,118.0,64.0,42.0),
  ('bruno-0-7','bruno','8','Основной зал',4,'rect',281.5,116.0,46.0,46.0),
  ('bruno-1-8','bruno','9','Кабинки',4,'booth',21.3,224.0,96.0,48.0),
  ('bruno-1-9','bruno','10','Кабинки',4,'booth',132.0,224.0,96.0,48.0),
  ('bruno-1-10','bruno','11','Кабинки',6,'booth',242.7,224.0,96.0,48.0),
  ('bruno-2-11','bruno','Б1','Бар',1,'stool',39.0,354.0,22.0,22.0),
  ('bruno-2-12','bruno','Б2','Бар',1,'stool',91.0,354.0,22.0,22.0),
  ('bruno-2-13','bruno','Б3','Бар',1,'stool',143.0,354.0,22.0,22.0),
  ('bruno-2-14','bruno','Б4','Бар',1,'stool',195.0,354.0,22.0,22.0),
  ('bruno-2-15','bruno','Б5','Бар',1,'stool',247.0,354.0,22.0,22.0),
  ('bruno-2-16','bruno','Б6','Бар',1,'stool',299.0,354.0,22.0,22.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('onest-0-0','onest','1','Белый зал',2,'round',38.5,56.0,34.0,34.0),
  ('onest-0-1','onest','2','Белый зал',2,'round',121.5,56.0,34.0,34.0),
  ('onest-0-2','onest','3','Белый зал',4,'rect',198.5,50.0,46.0,46.0),
  ('onest-0-3','onest','4','Белый зал',4,'rect',281.5,50.0,46.0,46.0),
  ('onest-0-4','onest','5','Белый зал',2,'round',38.5,122.0,34.0,34.0),
  ('onest-0-5','onest','6','Белый зал',4,'rect',115.5,116.0,46.0,46.0),
  ('onest-0-6','onest','7','Белый зал',6,'rect',189.5,118.0,64.0,42.0),
  ('onest-0-7','onest','8','Белый зал',2,'round',287.5,122.0,34.0,34.0),
  ('onest-0-8','onest','9','Белый зал',2,'round',38.5,188.0,34.0,34.0),
  ('onest-0-9','onest','10','Белый зал',4,'rect',115.5,182.0,46.0,46.0),
  ('onest-0-10','onest','11','Белый зал',4,'rect',198.5,182.0,46.0,46.0),
  ('onest-0-11','onest','12','Белый зал',2,'round',287.5,188.0,34.0,34.0),
  ('onest-1-12','onest','13','У окон',2,'round',30.2,296.0,34.0,34.0),
  ('onest-1-13','onest','14','У окон',2,'round',96.6,296.0,34.0,34.0),
  ('onest-1-14','onest','15','У окон',2,'round',163.0,296.0,34.0,34.0),
  ('onest-1-15','onest','16','У окон',2,'round',229.4,296.0,34.0,34.0),
  ('onest-1-16','onest','17','У окон',4,'rect',289.8,296.0,46.0,46.0),
  ('onest-2-17','onest','18','Приватный стол',10,'long',55.0,402.0,250.0,40.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('leo-0-0','leo','1','Гостиная',2,'round',38.5,56.0,34.0,34.0),
  ('leo-0-1','leo','2','Гостиная',4,'rect',115.5,50.0,46.0,46.0),
  ('leo-0-2','leo','3','Гостиная',4,'rect',198.5,50.0,46.0,46.0),
  ('leo-0-3','leo','4','Гостиная',2,'round',287.5,56.0,34.0,34.0),
  ('leo-0-4','leo','5','Гостиная',2,'round',38.5,122.0,34.0,34.0),
  ('leo-0-5','leo','6','Гостиная',4,'rect',115.5,116.0,46.0,46.0),
  ('leo-0-6','leo','7','Гостиная',4,'rect',198.5,116.0,46.0,46.0),
  ('leo-0-7','leo','8','Гостиная',2,'round',287.5,122.0,34.0,34.0),
  ('leo-1-8','leo','9','Диваны',4,'booth',49.0,224.0,96.0,48.0),
  ('leo-1-9','leo','10','Диваны',6,'booth',215.0,224.0,96.0,48.0),
  ('leo-2-10','leo','11','Веранда',2,'round',52.3,344.0,34.0,34.0),
  ('leo-2-11','leo','12','Веранда',4,'rect',157.0,338.0,46.0,46.0),
  ('leo-2-12','leo','13','Веранда',2,'round',273.7,344.0,34.0,34.0),
  ('leo-2-13','leo','14','Веранда',4,'rect',46.3,404.0,46.0,46.0),
  ('leo-2-14','leo','15','Веранда',4,'rect',157.0,404.0,46.0,46.0),
  ('leo-2-15','leo','16','Веранда',2,'round',273.7,410.0,34.0,34.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('white-rabbit-0-0','white-rabbit','1','У панорамных окон',2,'round',24.7,54.0,34.0,34.0),
  ('white-rabbit-0-1','white-rabbit','2','У панорамных окон',2,'round',80.0,54.0,34.0,34.0),
  ('white-rabbit-0-2','white-rabbit','3','У панорамных окон',2,'round',135.3,54.0,34.0,34.0),
  ('white-rabbit-0-3','white-rabbit','4','У панорамных окон',2,'round',190.7,54.0,34.0,34.0),
  ('white-rabbit-0-4','white-rabbit','5','У панорамных окон',4,'rect',240.0,54.0,46.0,46.0),
  ('white-rabbit-0-5','white-rabbit','6','У панорамных окон',4,'rect',295.3,54.0,46.0,46.0),
  ('white-rabbit-1-6','white-rabbit','7','Под куполом',4,'rect',32.5,158.0,46.0,46.0),
  ('white-rabbit-1-7','white-rabbit','8','Под куполом',4,'rect',115.5,158.0,46.0,46.0),
  ('white-rabbit-1-8','white-rabbit','9','Под куполом',2,'round',204.5,164.0,34.0,34.0),
  ('white-rabbit-1-9','white-rabbit','10','Под куполом',2,'round',287.5,164.0,34.0,34.0),
  ('white-rabbit-1-10','white-rabbit','11','Под куполом',4,'rect',32.5,224.0,46.0,46.0),
  ('white-rabbit-1-11','white-rabbit','12','Под куполом',6,'rect',106.5,226.0,64.0,42.0),
  ('white-rabbit-1-12','white-rabbit','13','Под куполом',6,'rect',189.5,226.0,64.0,42.0),
  ('white-rabbit-1-13','white-rabbit','14','Под куполом',4,'rect',281.5,224.0,46.0,46.0),
  ('white-rabbit-1-14','white-rabbit','15','Под куполом',2,'round',38.5,296.0,34.0,34.0),
  ('white-rabbit-1-15','white-rabbit','16','Под куполом',2,'round',121.5,296.0,34.0,34.0),
  ('white-rabbit-1-16','white-rabbit','17','Под куполом',4,'rect',198.5,290.0,46.0,46.0),
  ('white-rabbit-1-17','white-rabbit','18','Под куполом',2,'round',287.5,296.0,34.0,34.0),
  ('white-rabbit-2-18','white-rabbit','Б1','Бар',1,'stool',32.5,416.0,22.0,22.0),
  ('white-rabbit-2-19','white-rabbit','Б2','Бар',1,'stool',71.5,416.0,22.0,22.0),
  ('white-rabbit-2-20','white-rabbit','Б3','Бар',1,'stool',110.5,416.0,22.0,22.0),
  ('white-rabbit-2-21','white-rabbit','Б4','Бар',1,'stool',149.5,416.0,22.0,22.0),
  ('white-rabbit-2-22','white-rabbit','Б5','Бар',1,'stool',188.5,416.0,22.0,22.0),
  ('white-rabbit-2-23','white-rabbit','Б6','Бар',1,'stool',227.5,416.0,22.0,22.0),
  ('white-rabbit-2-24','white-rabbit','Б7','Бар',1,'stool',266.5,416.0,22.0,22.0),
  ('white-rabbit-2-25','white-rabbit','Б8','Бар',1,'stool',305.5,416.0,22.0,22.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('twins-garden-0-0','twins-garden','1','Первый уровень',2,'round',38.5,56.0,34.0,34.0),
  ('twins-garden-0-1','twins-garden','2','Первый уровень',2,'round',121.5,56.0,34.0,34.0),
  ('twins-garden-0-2','twins-garden','3','Первый уровень',4,'rect',198.5,50.0,46.0,46.0),
  ('twins-garden-0-3','twins-garden','4','Первый уровень',4,'rect',281.5,50.0,46.0,46.0),
  ('twins-garden-0-4','twins-garden','5','Первый уровень',2,'round',38.5,122.0,34.0,34.0),
  ('twins-garden-0-5','twins-garden','6','Первый уровень',4,'rect',115.5,116.0,46.0,46.0),
  ('twins-garden-0-6','twins-garden','7','Первый уровень',4,'rect',198.5,116.0,46.0,46.0),
  ('twins-garden-0-7','twins-garden','8','Первый уровень',2,'round',287.5,122.0,34.0,34.0),
  ('twins-garden-1-8','twins-garden','9','Второй уровень',2,'round',38.5,232.0,34.0,34.0),
  ('twins-garden-1-9','twins-garden','10','Второй уровень',4,'rect',115.5,226.0,46.0,46.0),
  ('twins-garden-1-10','twins-garden','11','Второй уровень',4,'rect',198.5,226.0,46.0,46.0),
  ('twins-garden-1-11','twins-garden','12','Второй уровень',2,'round',287.5,232.0,34.0,34.0),
  ('twins-garden-1-12','twins-garden','13','Второй уровень',6,'rect',23.5,294.0,64.0,42.0),
  ('twins-garden-1-13','twins-garden','14','Второй уровень',4,'rect',115.5,292.0,46.0,46.0),
  ('twins-garden-1-14','twins-garden','15','Второй уровень',2,'round',204.5,298.0,34.0,34.0),
  ('twins-garden-1-15','twins-garden','16','Второй уровень',2,'round',287.5,298.0,34.0,34.0),
  ('twins-garden-2-16','twins-garden','17','Chef’s table',8,'long',77.0,404.0,206.0,40.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('beluga-0-0','beluga','1','У окон на Кремль',2,'round',30.2,54.0,34.0,34.0),
  ('beluga-0-1','beluga','2','У окон на Кремль',2,'round',96.6,54.0,34.0,34.0),
  ('beluga-0-2','beluga','3','У окон на Кремль',2,'round',163.0,54.0,34.0,34.0),
  ('beluga-0-3','beluga','4','У окон на Кремль',4,'rect',223.4,54.0,46.0,46.0),
  ('beluga-0-4','beluga','5','У окон на Кремль',4,'rect',289.8,54.0,46.0,46.0),
  ('beluga-1-5','beluga','6','Зал',2,'round',38.5,164.0,34.0,34.0),
  ('beluga-1-6','beluga','7','Зал',4,'rect',115.5,158.0,46.0,46.0),
  ('beluga-1-7','beluga','8','Зал',4,'rect',198.5,158.0,46.0,46.0),
  ('beluga-1-8','beluga','9','Зал',2,'round',287.5,164.0,34.0,34.0),
  ('beluga-1-9','beluga','10','Зал',2,'round',38.5,230.0,34.0,34.0),
  ('beluga-1-10','beluga','11','Зал',4,'rect',115.5,224.0,46.0,46.0),
  ('beluga-1-11','beluga','12','Зал',6,'rect',189.5,226.0,64.0,42.0),
  ('beluga-1-12','beluga','13','Зал',2,'round',287.5,230.0,34.0,34.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('sakhalin-0-0','sakhalin','1','Второй этаж, панорама',2,'round',24.7,54.0,34.0,34.0),
  ('sakhalin-0-1','sakhalin','2','Второй этаж, панорама',2,'round',80.0,54.0,34.0,34.0),
  ('sakhalin-0-2','sakhalin','3','Второй этаж, панорама',2,'round',135.3,54.0,34.0,34.0),
  ('sakhalin-0-3','sakhalin','4','Второй этаж, панорама',4,'rect',184.7,54.0,46.0,46.0),
  ('sakhalin-0-4','sakhalin','5','Второй этаж, панорама',4,'rect',240.0,54.0,46.0,46.0),
  ('sakhalin-0-5','sakhalin','6','Второй этаж, панорама',2,'round',301.3,54.0,34.0,34.0),
  ('sakhalin-1-6','sakhalin','7','Зал у raw bar',2,'round',38.5,164.0,34.0,34.0),
  ('sakhalin-1-7','sakhalin','8','Зал у raw bar',4,'rect',115.5,158.0,46.0,46.0),
  ('sakhalin-1-8','sakhalin','9','Зал у raw bar',4,'rect',198.5,158.0,46.0,46.0),
  ('sakhalin-1-9','sakhalin','10','Зал у raw bar',2,'round',287.5,164.0,34.0,34.0),
  ('sakhalin-1-10','sakhalin','11','Зал у raw bar',4,'rect',32.5,224.0,46.0,46.0),
  ('sakhalin-1-11','sakhalin','12','Зал у raw bar',6,'rect',106.5,226.0,64.0,42.0),
  ('sakhalin-1-12','sakhalin','13','Зал у raw bar',2,'round',204.5,230.0,34.0,34.0),
  ('sakhalin-1-13','sakhalin','14','Зал у raw bar',2,'round',287.5,230.0,34.0,34.0),
  ('sakhalin-2-14','sakhalin','15','Терраса',2,'round',52.3,340.0,34.0,34.0),
  ('sakhalin-2-15','sakhalin','16','Терраса',2,'round',163.0,340.0,34.0,34.0),
  ('sakhalin-2-16','sakhalin','17','Терраса',4,'rect',267.7,334.0,46.0,46.0),
  ('sakhalin-2-17','sakhalin','18','Терраса',4,'rect',46.3,400.0,46.0,46.0),
  ('sakhalin-2-18','sakhalin','19','Терраса',2,'round',163.0,406.0,34.0,34.0),
  ('sakhalin-2-19','sakhalin','20','Терраса',2,'round',273.7,406.0,34.0,34.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('dr-zhivago-0-0','dr-zhivago','1','У окон на Манежную',2,'round',24.7,54.0,34.0,34.0),
  ('dr-zhivago-0-1','dr-zhivago','2','У окон на Манежную',2,'round',80.0,54.0,34.0,34.0),
  ('dr-zhivago-0-2','dr-zhivago','3','У окон на Манежную',4,'rect',129.3,54.0,46.0,46.0),
  ('dr-zhivago-0-3','dr-zhivago','4','У окон на Манежную',4,'rect',184.7,54.0,46.0,46.0),
  ('dr-zhivago-0-4','dr-zhivago','5','У окон на Манежную',2,'round',246.0,54.0,34.0,34.0),
  ('dr-zhivago-0-5','dr-zhivago','6','У окон на Манежную',2,'round',301.3,54.0,34.0,34.0),
  ('dr-zhivago-1-6','dr-zhivago','7','Белый зал',2,'round',30.2,164.0,34.0,34.0),
  ('dr-zhivago-1-7','dr-zhivago','8','Белый зал',4,'rect',90.6,158.0,46.0,46.0),
  ('dr-zhivago-1-8','dr-zhivago','9','Белый зал',4,'rect',157.0,158.0,46.0,46.0),
  ('dr-zhivago-1-9','dr-zhivago','10','Белый зал',2,'round',229.4,164.0,34.0,34.0),
  ('dr-zhivago-1-10','dr-zhivago','11','Белый зал',2,'round',295.8,164.0,34.0,34.0),
  ('dr-zhivago-1-11','dr-zhivago','12','Белый зал',4,'rect',24.2,224.0,46.0,46.0),
  ('dr-zhivago-1-12','dr-zhivago','13','Белый зал',4,'rect',90.6,224.0,46.0,46.0),
  ('dr-zhivago-1-13','dr-zhivago','14','Белый зал',6,'rect',148.0,226.0,64.0,42.0),
  ('dr-zhivago-1-14','dr-zhivago','15','Белый зал',4,'rect',223.4,224.0,46.0,46.0),
  ('dr-zhivago-1-15','dr-zhivago','16','Белый зал',2,'round',295.8,230.0,34.0,34.0),
  ('dr-zhivago-2-16','dr-zhivago','17','Диваны',4,'booth',21.3,332.0,96.0,48.0),
  ('dr-zhivago-2-17','dr-zhivago','18','Диваны',4,'booth',132.0,332.0,96.0,48.0),
  ('dr-zhivago-2-18','dr-zhivago','19','Диваны',6,'booth',242.7,332.0,96.0,48.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('cafe-pushkin-0-0','cafe-pushkin','1','Аптека',2,'round',38.5,56.0,34.0,34.0),
  ('cafe-pushkin-0-1','cafe-pushkin','2','Аптека',4,'rect',115.5,50.0,46.0,46.0),
  ('cafe-pushkin-0-2','cafe-pushkin','3','Аптека',4,'rect',198.5,50.0,46.0,46.0),
  ('cafe-pushkin-0-3','cafe-pushkin','4','Аптека',2,'round',287.5,56.0,34.0,34.0),
  ('cafe-pushkin-0-4','cafe-pushkin','5','Аптека',2,'round',38.5,122.0,34.0,34.0),
  ('cafe-pushkin-0-5','cafe-pushkin','6','Аптека',4,'rect',115.5,116.0,46.0,46.0),
  ('cafe-pushkin-0-6','cafe-pushkin','7','Аптека',4,'rect',198.5,116.0,46.0,46.0),
  ('cafe-pushkin-0-7','cafe-pushkin','8','Аптека',2,'round',287.5,122.0,34.0,34.0),
  ('cafe-pushkin-1-8','cafe-pushkin','9','Библиотека',2,'round',52.3,232.0,34.0,34.0),
  ('cafe-pushkin-1-9','cafe-pushkin','10','Библиотека',4,'rect',157.0,226.0,46.0,46.0),
  ('cafe-pushkin-1-10','cafe-pushkin','11','Библиотека',6,'rect',258.7,228.0,64.0,42.0),
  ('cafe-pushkin-1-11','cafe-pushkin','12','Библиотека',4,'rect',46.3,292.0,46.0,46.0),
  ('cafe-pushkin-1-12','cafe-pushkin','13','Библиотека',2,'round',163.0,298.0,34.0,34.0),
  ('cafe-pushkin-1-13','cafe-pushkin','14','Библиотека',4,'rect',267.7,292.0,46.0,46.0),
  ('cafe-pushkin-2-14','cafe-pushkin','15','Антресоль',2,'round',38.5,406.0,34.0,34.0),
  ('cafe-pushkin-2-15','cafe-pushkin','16','Антресоль',2,'round',121.5,406.0,34.0,34.0),
  ('cafe-pushkin-2-16','cafe-pushkin','17','Антресоль',4,'rect',198.5,406.0,46.0,46.0),
  ('cafe-pushkin-2-17','cafe-pushkin','18','Антресоль',4,'rect',281.5,406.0,46.0,46.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('maya-0-0','maya','1','Зал у огня',2,'round',38.5,56.0,34.0,34.0),
  ('maya-0-1','maya','2','Зал у огня',4,'rect',115.5,50.0,46.0,46.0),
  ('maya-0-2','maya','3','Зал у огня',4,'rect',198.5,50.0,46.0,46.0),
  ('maya-0-3','maya','4','Зал у огня',2,'round',287.5,56.0,34.0,34.0),
  ('maya-0-4','maya','5','Зал у огня',2,'round',38.5,122.0,34.0,34.0),
  ('maya-0-5','maya','6','Зал у огня',4,'rect',115.5,116.0,46.0,46.0),
  ('maya-0-6','maya','7','Зал у огня',4,'rect',198.5,116.0,46.0,46.0),
  ('maya-0-7','maya','8','Зал у огня',2,'round',287.5,122.0,34.0,34.0),
  ('maya-1-8','maya','9','Maya bar room',4,'booth',21.3,224.0,96.0,48.0),
  ('maya-1-9','maya','10','Maya bar room',4,'booth',132.0,224.0,96.0,48.0),
  ('maya-1-10','maya','11','Maya bar room',6,'booth',242.7,224.0,96.0,48.0),
  ('maya-2-11','maya','Б1','Бар',1,'stool',39.0,354.0,22.0,22.0),
  ('maya-2-12','maya','Б2','Бар',1,'stool',91.0,354.0,22.0,22.0),
  ('maya-2-13','maya','Б3','Бар',1,'stool',143.0,354.0,22.0,22.0),
  ('maya-2-14','maya','Б4','Бар',1,'stool',195.0,354.0,22.0,22.0),
  ('maya-2-15','maya','Б5','Бар',1,'stool',247.0,354.0,22.0,22.0),
  ('maya-2-16','maya','Б6','Бар',1,'stool',299.0,354.0,22.0,22.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('grand-cru-0-0','grand-cru','1','Зал',2,'round',38.5,56.0,34.0,34.0),
  ('grand-cru-0-1','grand-cru','2','Зал',2,'round',121.5,56.0,34.0,34.0),
  ('grand-cru-0-2','grand-cru','3','Зал',4,'rect',198.5,50.0,46.0,46.0),
  ('grand-cru-0-3','grand-cru','4','Зал',2,'round',287.5,56.0,34.0,34.0),
  ('grand-cru-0-4','grand-cru','5','Зал',4,'rect',32.5,116.0,46.0,46.0),
  ('grand-cru-0-5','grand-cru','6','Зал',4,'rect',115.5,116.0,46.0,46.0),
  ('grand-cru-0-6','grand-cru','7','Зал',2,'round',204.5,122.0,34.0,34.0),
  ('grand-cru-0-7','grand-cru','8','Зал',2,'round',287.5,122.0,34.0,34.0),
  ('grand-cru-1-8','grand-cru','Б1','Стойка',1,'stool',39.0,242.0,22.0,22.0),
  ('grand-cru-1-9','grand-cru','Б2','Стойка',1,'stool',91.0,242.0,22.0,22.0),
  ('grand-cru-1-10','grand-cru','Б3','Стойка',1,'stool',143.0,242.0,22.0,22.0),
  ('grand-cru-1-11','grand-cru','Б4','Стойка',1,'stool',195.0,242.0,22.0,22.0),
  ('grand-cru-1-12','grand-cru','Б5','Стойка',1,'stool',247.0,242.0,22.0,22.0),
  ('grand-cru-1-13','grand-cru','Б6','Стойка',1,'stool',299.0,242.0,22.0,22.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('motto-azabu-0-0','motto-azabu','1','Верхний зал',2,'round',38.5,56.0,34.0,34.0),
  ('motto-azabu-0-1','motto-azabu','2','Верхний зал',2,'round',121.5,56.0,34.0,34.0),
  ('motto-azabu-0-2','motto-azabu','3','Верхний зал',4,'rect',198.5,50.0,46.0,46.0),
  ('motto-azabu-0-3','motto-azabu','4','Верхний зал',4,'rect',281.5,50.0,46.0,46.0),
  ('motto-azabu-0-4','motto-azabu','5','Верхний зал',2,'round',38.5,122.0,34.0,34.0),
  ('motto-azabu-0-5','motto-azabu','6','Верхний зал',4,'rect',115.5,116.0,46.0,46.0),
  ('motto-azabu-0-6','motto-azabu','7','Верхний зал',4,'rect',198.5,116.0,46.0,46.0),
  ('motto-azabu-0-7','motto-azabu','8','Верхний зал',2,'round',287.5,122.0,34.0,34.0),
  ('motto-azabu-1-8','motto-azabu','9','Нижний зал «Ночной Токио»',4,'booth',20.0,224.0,71.0,48.0),
  ('motto-azabu-1-9','motto-azabu','10','Нижний зал «Ночной Токио»',4,'booth',103.0,224.0,71.0,48.0),
  ('motto-azabu-1-10','motto-azabu','11','Нижний зал «Ночной Токио»',6,'booth',186.0,224.0,71.0,48.0),
  ('motto-azabu-1-11','motto-azabu','12','Нижний зал «Ночной Токио»',6,'booth',269.0,224.0,71.0,48.0),
  ('motto-azabu-2-12','motto-azabu','Б1','Саке-бар',1,'stool',32.5,354.0,22.0,22.0),
  ('motto-azabu-2-13','motto-azabu','Б2','Саке-бар',1,'stool',71.5,354.0,22.0,22.0),
  ('motto-azabu-2-14','motto-azabu','Б3','Саке-бар',1,'stool',110.5,354.0,22.0,22.0),
  ('motto-azabu-2-15','motto-azabu','Б4','Саке-бар',1,'stool',149.5,354.0,22.0,22.0),
  ('motto-azabu-2-16','motto-azabu','Б5','Саке-бар',1,'stool',188.5,354.0,22.0,22.0),
  ('motto-azabu-2-17','motto-azabu','Б6','Саке-бар',1,'stool',227.5,354.0,22.0,22.0),
  ('motto-azabu-2-18','motto-azabu','Б7','Саке-бар',1,'stool',266.5,354.0,22.0,22.0),
  ('motto-azabu-2-19','motto-azabu','Б8','Саке-бар',1,'stool',305.5,354.0,22.0,22.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

insert into public.tables (id,restaurant_id,label,zone,seats,shape,x,y,w,h) values
  ('ruski-0-0','ruski','1','У окон (с предоплатой)',2,'round',17.8,54.0,34.0,34.0),
  ('ruski-0-1','ruski','2','У окон (с предоплатой)',2,'round',59.3,54.0,34.0,34.0),
  ('ruski-0-2','ruski','3','У окон (с предоплатой)',2,'round',100.8,54.0,34.0,34.0),
  ('ruski-0-3','ruski','4','У окон (с предоплатой)',4,'rect',141.5,54.0,35.5,46.0),
  ('ruski-0-4','ruski','5','У окон (с предоплатой)',4,'rect',183.0,54.0,35.5,46.0),
  ('ruski-0-5','ruski','6','У окон (с предоплатой)',4,'rect',224.5,54.0,35.5,46.0),
  ('ruski-0-6','ruski','7','У окон (с предоплатой)',2,'round',266.8,54.0,34.0,34.0),
  ('ruski-0-7','ruski','8','У окон (с предоплатой)',2,'round',308.3,54.0,34.0,34.0),
  ('ruski-1-8','ruski','9','Центральный зал',4,'rect',24.2,158.0,46.0,46.0),
  ('ruski-1-9','ruski','10','Центральный зал',4,'rect',90.6,158.0,46.0,46.0),
  ('ruski-1-10','ruski','11','Центральный зал',6,'rect',148.0,160.0,64.0,42.0),
  ('ruski-1-11','ruski','12','Центральный зал',4,'rect',223.4,158.0,46.0,46.0),
  ('ruski-1-12','ruski','13','Центральный зал',4,'rect',289.8,158.0,46.0,46.0),
  ('ruski-1-13','ruski','14','Центральный зал',2,'round',30.2,230.0,34.0,34.0),
  ('ruski-1-14','ruski','15','Центральный зал',4,'rect',90.6,224.0,46.0,46.0),
  ('ruski-1-15','ruski','16','Центральный зал',8,'rect',139.0,225.0,82.0,44.0),
  ('ruski-1-16','ruski','17','Центральный зал',4,'rect',223.4,224.0,46.0,46.0),
  ('ruski-1-17','ruski','18','Центральный зал',2,'round',295.8,230.0,34.0,34.0),
  ('ruski-1-18','ruski','19','Центральный зал',4,'rect',24.2,290.0,46.0,46.0),
  ('ruski-1-19','ruski','20','Центральный зал',4,'rect',90.6,290.0,46.0,46.0),
  ('ruski-1-20','ruski','21','Центральный зал',6,'rect',148.0,292.0,64.0,42.0),
  ('ruski-1-21','ruski','22','Центральный зал',4,'rect',223.4,290.0,46.0,46.0),
  ('ruski-1-22','ruski','23','Центральный зал',4,'rect',289.8,290.0,46.0,46.0),
  ('ruski-2-23','ruski','24','Кабинки',6,'booth',21.3,398.0,96.0,48.0),
  ('ruski-2-24','ruski','25','Кабинки',6,'booth',132.0,398.0,96.0,48.0),
  ('ruski-2-25','ruski','26','Кабинки',8,'booth',242.7,398.0,96.0,48.0)
on conflict (id) do update set label=excluded.label,zone=excluded.zone,seats=excluded.seats,shape=excluded.shape,x=excluded.x,y=excluded.y,w=excluded.w,h=excluded.h;

commit;
