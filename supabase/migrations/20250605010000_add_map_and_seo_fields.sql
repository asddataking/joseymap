alter table dispensaries add column if not exists lat double precision, add column if not exists lng double precision;

alter table events add column if not exists description text, add column if not exists meta_description text, add column if not exists map_center_lat double precision, add column if not exists map_center_lng double precision, add column if not exists map_zoom int default 13;

update dispensaries set lat = 42.2699, lng = -83.6987 where name = 'Green Genie';
update dispensaries set lat = 42.2831, lng = -83.7436 where name = 'Exclusive Cannabis';
update dispensaries set lat = 42.2472, lng = -83.7356 where name = 'Skymint';
update dispensaries set lat = 42.4482, lng = -83.0998 where name = 'House of Dank';
update dispensaries set lat = 42.3314, lng = -83.0420 where name = 'Lume Cannabis';

update events set
  description = 'Join the ultimate Ann Arbor cannabis treasure hunt during Hash Bash weekend. Visit participating dispensaries, check in with JoseyMap, and unlock exclusive deals on your physical treasure map adventure.',
  meta_description = 'Hash Bash 2026 treasure map — explore Ann Arbor dispensary stops, check in, and redeem exclusive cannabis offers with JoseyMap.',
  map_center_lat = 42.2808,
  map_center_lng = -83.7430,
  map_zoom = 13
where slug = 'hash-bash-2026';

update events set
  description = 'A spooky cannabis treasure hunt across Detroit dispensaries. Collect stops on your Halloween Hunt map, check in at each location, and claim limited-time bundle deals.',
  meta_description = 'Halloween Hunt 2026 — Detroit dispensary treasure map with exclusive offers. Check in and redeem deals with JoseyMap.',
  map_center_lat = 42.3314,
  map_center_lng = -83.0458,
  map_zoom = 12
where slug = 'halloween-hunt-2026';
