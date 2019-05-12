drop table if exists users cascade;
drop table if exists trips cascade;
drop table if exists lists cascade;
drop table if exists items cascade;
drop table if exists list_items cascade;
drop table if exists item_tags cascade;
drop table if exists list_tags cascade;
drop table if exists trip_tags cascade;


create table users (
    id serial primary key not null,
    firstname varchar not null,
    lastname varchar not null,
    email varchar not null,
    hashed_password text not null
);

create table trips (
    id serial primary key not null,
    user_id integer references users(id) not null,
    trip_name varchar not null,
    description text,
    category varchar
);

create table lists (
    id serial primary key not null,
    trip_id integer references trips(id) not null,
    user_id integer references users(id) not null,
    name varchar,
    description text,
    category varchar
);

create table items (
    id serial primary key not null,
    user_id integer references users(id) not null,
    name varchar not null,
    serial_number varchar,
    img_url text,
    description text,
    weight float,
    volume float,
    category varchar,
    season varchar,
    activity varchar
);


create table list_items (
    id serial primary key not null,
    list_id integer references lists(id) not null,
    item_id integer references items(id) not null,
    quantity integer not null

);

create table item_tags (
    id serial primary key not null,
    user_id integer references users(id) not null,
    item_id integer references items(id) not null,
    tag varchar not null
);

create table list_tags (
    id serial primary key not null,
    user_id integer references users(id) not null,
    list_id integer references lists(id) not null,
    tag varchar not null
);

create table trip_tags (
    id serial primary key not null,
    user_id integer references users(id) not null,
    trip_id integer references trips(id) not null,
    tag varchar not null
);






-- INSERT VALUES
insert into users (
    firstname,
    lastname,
    email,
    hashed_password
) values (
    'nate',
    'simpson',
    'ndsimpson01@gmail.com',
    'password'
);


insert into trips (
    user_id,
    trip_name,
    description,
    type
) values (
    1,
    'Grand Teton NP 2018',
    'Backpack the TCT in GTNP, raft the Snake River, MTB on Teton Pass',
    'camping'
);

insert into lists (
    trip_id,
    user_id,
    name,
    description,
    type
) values (
    1,
    1,
    'TCT Backpack (65 Liters)',
    'Everything I will carry with me for the 4-day 35-mile trail.',
    'camping'
    );
insert into items (
    user_id,
    name,
    description,
    weight,
    volume,
    type,
    season,
    activity
) values (
    1,
    'Basin and Range sleeping bag',
    '15 deg, down, regular length',
    '32',
    '5',
    'sleeping',
    'summer',
    'camping'
), (
    1,
    'REI Tent',
    '2 person, 3 season',
    '80',
    '20',
    'sleeping',
    'summer',
    'camping'
), (
    1,
    'Jetboil',
    '2L boiling capacity',
    '9',
    '1.5',
    'cooking',
    'all',
    'camping'
), (
    1,
    'bear bin',
    '15 deg, down, regular length',
    '64',
    '8',
    'cooking',
    'summer',
    'camping'
);

select * from users;
select * from lists;
select * from hashtags;
select * from list_items;
select * from items;



