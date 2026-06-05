create table events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city text,
  theme text,
  starts_at timestamp,
  ends_at timestamp,
  is_active boolean default true,
  created_at timestamp default now()
);

create table dispensaries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  city text,
  state text default 'MI',
  google_review_url text,
  created_at timestamp default now()
);

create table event_stops (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  dispensary_id uuid references dispensaries(id) on delete cascade,
  offer_title text,
  offer_description text,
  stop_order int,
  created_at timestamp default now()
);

create table checkins (
  id uuid primary key default gen_random_uuid(),
  event_stop_id uuid references event_stops(id) on delete cascade,
  visitor_code text,
  created_at timestamp default now()
);

create table redemptions (
  id uuid primary key default gen_random_uuid(),
  event_stop_id uuid references event_stops(id) on delete cascade,
  visitor_code text,
  created_at timestamp default now()
);

create table review_clicks (
  id uuid primary key default gen_random_uuid(),
  event_stop_id uuid references event_stops(id) on delete cascade,
  visitor_code text,
  created_at timestamp default now()
);

create index event_stops_event_id_idx on event_stops(event_id);
create index event_stops_stop_order_idx on event_stops(event_id, stop_order);
create index checkins_event_stop_id_idx on checkins(event_stop_id);
create index redemptions_event_stop_id_idx on redemptions(event_stop_id);
create index review_clicks_event_stop_id_idx on review_clicks(event_stop_id);

alter table events enable row level security;
alter table dispensaries enable row level security;
alter table event_stops enable row level security;
alter table checkins enable row level security;
alter table redemptions enable row level security;
alter table review_clicks enable row level security;

create policy "events_select" on events for select using (true);
create policy "dispensaries_select" on dispensaries for select using (true);
create policy "event_stops_select" on event_stops for select using (true);
create policy "checkins_insert" on checkins for insert with check (true);
create policy "redemptions_insert" on redemptions for insert with check (true);
create policy "review_clicks_insert" on review_clicks for insert with check (true);
create policy "checkins_select" on checkins for select using (true);
create policy "redemptions_select" on redemptions for select using (true);
create policy "review_clicks_select" on review_clicks for select using (true);

insert into events (slug, name, city, theme, starts_at, ends_at, is_active) values
  ('hash-bash-2026', 'Hash Bash 2026', 'Ann Arbor', 'Hash Bash', '2026-04-04 10:00:00', '2026-04-04 22:00:00', true),
  ('halloween-hunt-2026', 'Halloween Hunt 2026', 'Detroit', 'Halloween', '2026-10-31 12:00:00', '2026-10-31 23:00:00', true);

insert into dispensaries (name, address, city, state, google_review_url) values
  ('Green Genie', '2460 E Stadium Blvd', 'Ann Arbor', 'MI', 'https://g.page/green-genie-ann-arbor/review'),
  ('Exclusive Cannabis', '3820 Varsity Dr', 'Ann Arbor', 'MI', 'https://g.page/exclusive-cannabis/review'),
  ('Skymint', '1958 S Industrial Hwy', 'Ann Arbor', 'MI', 'https://g.page/skymint-ann-arbor/review'),
  ('House of Dank', '4568 E 8 Mile Rd', 'Detroit', 'MI', 'https://g.page/house-of-dank/review'),
  ('Lume Cannabis', '200 E Jefferson Ave', 'Detroit', 'MI', 'https://g.page/lume-cannabis/review');

insert into event_stops (event_id, dispensary_id, offer_title, offer_description, stop_order)
select e.id, d.id, offer_title, offer_description, stop_order
from (values
  ('hash-bash-2026', 'Green Genie', '20% Off Edibles', 'Show your treasure map at checkout for 20% off all edibles. Valid during Hash Bash weekend.', 1),
  ('hash-bash-2026', 'Exclusive Cannabis', 'Free Pre-Roll', 'Check in at the counter and receive a free pre-roll with any purchase over $25.', 2),
  ('hash-bash-2026', 'Skymint', 'BOGO Concentrates', 'Buy one concentrate, get one 50% off. Limited to one per visitor.', 3),
  ('halloween-hunt-2026', 'House of Dank', 'Spooky Bundle Deal', 'Halloween bundle: 1/8 + edible for $35. While supplies last.', 1),
  ('halloween-hunt-2026', 'Lume Cannabis', 'Trick-or-Treat Discount', '15% off your entire order when you show your Halloween Hunt map.', 2)
) as v(event_slug, dispensary_name, offer_title, offer_description, stop_order)
join events e on e.slug = v.event_slug
join dispensaries d on d.name = v.dispensary_name;
