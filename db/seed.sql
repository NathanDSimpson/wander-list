-- -- drop table if exists users cascade;
drop table if exists trips cascade;
drop table if exists lists cascade;
drop table if exists items cascade;
drop table if exists trip_lists cascade;
drop table if exists list_items cascade;
drop table if exists item_tags cascade;
drop table if exists list_tags cascade;
drop table if exists trip_tags cascade;

-- -- create table users (
-- --     user_id serial primary key not null,
-- --     firstname varchar not null,
-- --     lastname varchar,
-- --     email varchar not null,
-- --     hashed_password text not null
-- -- );

create table trips (
    trip_id serial primary key not null,
    user_id integer not null,
    name varchar not null,
    description text
);

create table lists (
    list_id serial primary key not null,
    user_id integer not null,
    name varchar,
    description text
);

create table items (
    item_id serial primary key not null,
    user_id integer not null,
    name varchar not null,
    img_url text,
    weight float,
    volume float,
    description text
);

create table list_items (
    list_item_id serial primary key,
    item_id integer not null,
    list_id integer not null,
    quantity integer
);

create table trip_lists (
    trip_list_id serial primary key,
    trip_id integer not null,
    list_id integer not null
);

create table item_tags (
    item_tag_id serial primary key not null,
    item_id integer not null,
    tag varchar not null
);

create table list_tags (
    list_tag_id serial primary key not null,
    list_id integer not null,
    tag varchar not null
);

create table trip_tags (
    trip_tag_id serial primary key not null,
    trip_id integer not null,
    tag varchar not null
);


--
--
--
--
--
--
--
--
--
--
-- CREATING ITEMS

insert into items (
    user_id,
    name,
    img_url,
    weight,
    volume,
    description
) values (
    5,
    'REI Tent',
    '${img_url}',
    4.5,
    16,
    '2 person / 3 season backpacking tent'
),(
    5,
    'Sleeping Bag',
    '${img_url}',
    4.3,
    27.4,
    'Basin & Range 15deg down sleeping bag'
),(
    5,
    'JetBoil',
    '${img_url}',
    0.8,
    1.6,
    'Jetboil flash 1L'
),(
    5,
    'Fuel - JetBoil',
    '${img_url}',
    0.9,
    0.6,
    'fuel'
),(
    5,
    'Spare Tube',
    '${img_url}',
    null,
    null,
    '27.5 presta valve'
),(
    5,
    'Floor Pump',
    '${img_url}',
    null,
    null,
    'presta or schrader valve'
),(
    5,
    'Hand Pump',
    '${img_url}',
    null,
    null,
    'small tire pump w/o guage'
),(
    5,
    'Multi-tool',
    '${img_url}',
    null,
    null,
    'includes chain tool'
),(
    5,
    'Patch Kit',
    '${img_url}',
    null,
    null,
    'for patching a punctured tube'
),(
    5,
    'Gloves',
    '${img_url}',
    null,
    null,
    ''
),(
    5,
    'Helmet',
    '${img_url}',
    null,
    null,
    ''
),(
    5,
    'Sunglasses',
    '${img_url}',
    null,
    null,
    'Julbos'
),(
    5,
    'Knee Pads',
    '${img_url}',
    null,
    null,
    'POC vpd air'
),(
    5,
    'Bike Shoes',
    '${img_url}',
    null,
    null,
    '510s'
),(
    5,
    'Jersey',
    '${img_url}',
    null,
    null,
    ''
);

--
--
--
--
--
--
--
--
--
--
-- CREATING LISTS

insert into lists (
    user_id,
    name,
    description
) values (
    5,
    'Weekend Backpacking',
    'Essential for a 2-3 day backpacking trip.'
);

insert into lists (
    user_id,
    name,
    description
) values (
    5,
    'MTB Ride',
    'Essential for a day ride.'
);

--
--
--
--
--
--
--
--
--
--
-- CREATE A TRIP

insert into trips (
    user_id,
    name,
    description
) values (
    5,
    'Road Trip',
    'Utah Backpacking and Mountain Biking.'
);



--
--
--
--
--
--
--
--
--
-- LINK THE LISTS TO A TRIP

insert into trip_lists (
    trip_id,
    list_id
) values (
    1,
    1
),(
    1,
    2
);

--
--
--
--
--
-- LINK THE ITEMS TO A LIST


insert into list_items (
    item_id,
    list_id,
    quantity
) values (
    5,
    2,
    null
),(
    6,
    2,
    null
),(
    7,
    2,
    null
),(
    8,
    2,
    null
),(
    9,
    2,
    null
),(
    10,
    2,
    null
),(
    11,
    2,
    null
),(
    12,
    2,
    null
),(
    13,
    2,
    null
),(
    14,
    2,
    null
),(
    1,
    1,
    null
),(
    2,
    1,
    null
),(
    3,
    1,
    null
),(
    4,
    1,
    null
);
--
--
--
--
--
-- ADD TAGS FOR THE TRIPS
insert into trip_tags (
    trip_id,
    tag
) values (
    1,
    'utah'
) , (
    1,
    'camping'
), (
    1,
    'backpacking'
), (
    1,
    'mtb'
), (
    1,
    'roadtrip'
), (
    1,
    'desert'
);


--
--
--
--
-- ADD TAGS FOR THE LISTS
insert into list_tags (
    list_id,
    tag
) values (
    1,
    'backpacking'
) , (
    1,
    'camping'
), (
    1,
    'lnt'
), (
    1,
    'wilderness'
), (
    2,
    'mtb'
), (
    2,
    'bike'
);

--
--
--
--
-- ADD TAGS FOR THE ITEMS
insert into item_tags (
    item_id,
    tag
) values (
    1,
    'camp'
) , (
    2,
    'sleep'
), (
    3,
    'cook'
), (
    4,
    'cook'
), (
    5,
    'mtb'
), (
    6,
    'mtb'
), (
    7,
    'mtb'
), (
    8,
    'mtb'
), (
    9,
    'mtb'
), (
    10,
    'mtb'
), (
    11,
    'mtb'
), (
    12,
    'essential'
), (
    13,
    'mtb'
), (
    14,
    'mtb'
);
select * from users;
select * from trips;
select * from lists;
select * from items;
select * from trip_lists;
select * from list_items;
select * from trip_tags;
select * from list_tags;
select * from item_tags;


-- -- ALL ITMES FOR A USER
-- select * from items
-- where user_id = 5;
-- -- ALL LISTS FOR A USER
-- select * from lists
-- where user_id = 5;
-- -- ALL TIRPS FOR  A USER
-- select * from trips
-- where user_id = 5;
-- --
-- --
-- -- DISPLAY THE ITEMS IN A LIST
-- select * from list_items
-- join items on items.item_id = list_items.item_id
-- where list_items.list_id = 1;

-- select * from list_items
-- join items on items.item_id = list_items.item_id
-- where list_items.list_id = 2;

-- --
-- --
-- -- DISPLAY THE LISTS IN A TRIP
-- select * from trip_lists
-- join trips on trips.trip_id = trip_lists.trip_id
-- where trip_lists.trip_list_id = 1;





