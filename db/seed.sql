-- drop table if exists users cascade;
-- drop table if exists trips cascade;
-- drop table if exists lists cascade;
-- drop table if exists items cascade;
-- drop table if exists trip_lists cascade;
-- drop table if exists list_items cascade;
-- drop table if exists item_tags cascade;
-- drop table if exists list_tags cascade;
-- drop table if exists trip_tags cascade;

create table users (
    user_id serial primary key not null,
    firstname varchar not null,
    lastname varchar,
    email varchar not null,
    hashed_password text not null
);

create table trips (
    trip_id serial primary key not null,
    user_id integer references users(user_id) not null,
    name varchar not null,
    description text
);

create table lists (
    list_id serial primary key not null,
    user_id integer references users(user_id) not null,
    name varchar,
    description text
);

create table items (
    item_id serial primary key not null,
    user_id integer references users(user_id) not null,
    name varchar not null,
    img_url text,
    weight float,
    volume float,
    description text
);

create table list_items (
    list_item_id serial primary key,
    item_id integer references items(item_id) not null,
    list_id integer references lists(list_id) not null,
    quantity integer
);

create table trip_lists (
    trip_list_id serial primary key,
    trip_id integer references trips(trip_id) not null,
    list_id integer references lists(list_id) not null
);

create table item_tags (
    item_tag_id serial primary key not null,
    item_id integer references items(item_id) not null,
    tag varchar not null
);

create table list_tags (
    list_tag_id serial primary key not null,
    list_id integer references lists(list_id) not null,
    tag varchar not null
);

create table trip_tags (
    trip_tag_id serial primary key not null,
    trip_id integer references trips(trip_id) not null,
    tag varchar not null
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


-- insert into trips (
--     user_id,
--     trip_name,
--     description,
--     type
-- ) values (
--     1,
--     'Grand Teton NP 2018',
--     'Backpack the TCT in GTNP, raft the Snake River, MTB on Teton Pass',
--     'camping'
-- );

-- insert into lists (
--     trip_id,
--     user_id,
--     name,
--     description,
--     type
-- ) values (
--     1,
--     1,
--     'TCT Backpack (65 Liters)',
--     'Everything I will carry with me for the 4-day 35-mile trail.',
--     'camping'
--     );

-- insert into items (
--     user_id,
--     name,
--     description,
--     weight,
--     volume,

-- ) values (
--     1,
--     'Basin and Range sleeping bag',
--     '15 deg, down, regular length',
--     '32',
--     '5',
--     'sleeping',
--     'summer',
--     'camping'
-- ), (
--     1,
--     'REI Tent',
--     '2 person, 3 season',
--     '80',
--     '20',
--     'sleeping',
--     'summer',
--     'camping'
-- ), (
--     1,
--     'Jetboil',
--     '2L boiling capacity',
--     '9',
--     '1.5',
--     'cooking',
--     'all',
--     'camping'
-- ), (
--     1,
--     'bear bin',
--     '15 deg, down, regular length',
--     '64',
--     '8',
--     'cooking',
--     'summer',
--     'camping'
-- );



