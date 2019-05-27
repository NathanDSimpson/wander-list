insert into items (
    user_id,
    name,
    description,
    img_url,
    tags
) values (
    5,
    'Bananas',
    '',
    'data:image/jpeg;base64,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',
    '#groceries'
)
,(
    5,
    'Apples',
    '',
    'https://static.agcanada.com/wp-content/uploads/sites/5/2018/11/apple_GettyImages186843005_cmyk.jpg',
    '#groceries'
)
,(
    5,
    'Chicken',
    '',
    'https://www.thespruceeats.com/thmb/fEnNuV4nu_Y_wYEDjQhBH-XuXKc=/4800x3000/filters:fill(auto,1)/grilled-chicken-172900971-592236bb3df78cf5fae41243.jpg',
    '#groceries'
)
,(
    5,
    'Carrots',
    '',
    'https://media.mercola.com/assets/images/foodfacts/carrot-nutrition-facts.jpg',
    '#groceries'
)
,(
    5,
    'Bread',
    '',
    'https://www.thespruceeats.com/thmb/9n3YM4RVKSWyUWQ0JCl7BwHrl1U=/4288x2848/filters:fill(auto,1)/loaf-of-bread-182835505-58a7008c5f9b58a3c91c9a14.jpg',
    '#groceries'
)
,(
    5,
    'Milk',
    '',
    'https://target.scene7.com/is/image/Target/GUEST_e034cb4b-c97e-4ad2-85c8-48064c3b0c48?wid=488&hei=488&fmt=pjpeg',
    '#groceries'
)
,(
    5,
    'Eggs',
    '',
    'https://a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2019/03/15/931/524/694940094001_6014490250001_6014489408001-vs.jpg?ve=1&tl=1',
    '#groceries'
)
,(
    5,
    'Cheese',
    '',
    'https://static1.squarespace.com/static/5a1592ff0abd04e470d48744/t/5a27bbeeec212d905273a14c/1512996237223/Kaas.jpeg?format=1500w',
    '#groceries'
)
,(
    5,
    'Tortillas',
    '',
    'https://upload.wikimedia.org/wikipedia/commons/5/56/NCI_flour_tortillas.jpg',
    '#groceries'
)
,(
    5,
    'Juice',
    '',
    'http://www.tropicana.com/images/default-source/us-site/52oz/product-heroes/tpp/pdp_hero_00_tpp_original.jpg?Status=Master&sfvrsn=2',
    '#groceries'
)
,(
    5,
    'Nails',
    '',
    'https://image.dhgate.com/0x0/f2/albu/g4/M00/A0/7B/rBVaEVnA5a-AMQxgAADZqtdiIkg731.jpg',
    '#hardware #projects #construction'
)
,(
    5,
    'Plywood',
    '',
    'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjgp7PSg6_iAhVkylQKHeiuBVwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.lowes.com%2Fpl%2FPlywood-Lumber-composites-Building-supplies%2F4294402501&psig=AOvVaw02X7useIn-jskybVQTbNnS&ust=1558610747400570',
    '#hardware #projects #construction'
)
,(
    5,
    'Screws',
    '',
    'https://images-na.ssl-images-amazon.com/images/I/51n4z7MNvTL._SY450_.jpg',
    '#hardware #projects #construction'
)
,(
    5,
    '2x4s',
    '',
    'https://i2.wp.com/www.oklahomalumber.com/wp-content/uploads/2017/09/2x4-inch-western-red-cedar-board.jpeg?fit=1000%2C1000&ssl=1',
    '#hardware #projects #construction'
)
,(
    5,
    'hammer',
    '',
    'https://images-na.ssl-images-amazon.com/images/I/61fnMMgkGIL._SX425_.jpg',
    '#hardware #projects #construction'
)
,(
    5,
    'Screwdriver',
    'phillips-head',
    'https://images.homedepot-static.com/productImages/eb72aa0c-d781-46c9-a89f-62f0fea525a9/svn/husky-screwdriver-sets-h6pcmdtssd-64_1000.jpg',
    '#hardware #projects #construction'
)
,(
    5,
    'Pliers',
    'needle-nose',
    'https://images.homedepot-static.com/productImages/cc4fb7a5-762f-4a4b-a63e-eecfd7967fe5/svn/ideal-electrician-s-needle-nose-pliers-35-3038-64_1000.jpg',
    '#hardware #projects #construction'
)
,(
    5,
    'Level',
    '',
    'https://wickes.scene7.com/is/image/travisperkins/largeNormal/Spirit-Levels-Wickes-General-Use-Spirit-Level-600mm~T3274_167337_00?defaultImage=travisperkins/2018-Wickes-Missing-Product-650x650',
    '#hardware #projects #construction'
)
,(
    5,
    'Saw',
    '',
    'https://st.hzcdn.com/simgs/8dd1f695064a66eb_4-3555/home-design.jpg',
    '#hardware #projects #construction'
);


-- -- drop table if exists users cascade;
drop table if exists trips cascade;
drop table if exists lists cascade;
drop table if exists items cascade;
drop table if exists trip_lists cascade;
drop table if exists list_items cascade;
drop table if exists item_tags cascade;
drop table if exists list_tags cascade;
drop table if exists trip_tags cascade;
-- -
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
    description text,
    tags
);

create table lists (
    list_id serial primary key not null,
    user_id integer not null,
    name varchar,
    description text,
    tags
);

create table items (
    item_id serial primary key not null,
    user_id integer not null,
    name varchar not null,
    img_url text,
    weight float,
    volume float,
    description text,
    tags text
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
    weight,
    volume,
    description
) values (
    5,
    'REI Tent',
    4.5,
    16,
    '2 person / 3 season backpacking tent'
),(
    5,
    'Sleeping Bag',
    4.3,
    27.4,
    'Basin & Range 15deg down sleeping bag'
),(
    5,
    'JetBoil',
    0.8,
    1.6,
    'Jetboil flash 1L'
),(
    5,
    'Fuel - JetBoil',
    0.9,
    0.6,
    'fuel'
),(
    5,
    'Spare Tube',
    null,
    null,
    '27.5 presta valve'
),(
    5,
    'Floor Pump',
    null,
    null,
    'presta or schrader valve'
),(
    5,
    'Hand Pump',
    null,
    null,
    'small tire pump w/o guage'
),(
    5,
    'Multi-tool',
    null,
    null,
    'includes chain tool'
),(
    5,
    'Patch Kit',
    null,
    null,
    'for patching a punctured tube'
),(
    5,
    'Gloves',
    null,
    null,
    ''
),(
    5,
    'Helmet',
    null,
    null,
    ''
),(
    5,
    'Sunglasses',
    null,
    null,
    'Julbos'
),(
    5,
    'Knee Pads',
    null,
    null,
    'POC vpd air'
),(
    5,
    'Bike Shoes',
    null,
    null,
    '510s'
),(
    5,
    'Jersey',
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

select * from users;
select * from trips;
select * from lists;
select * from items;
select * from trip_lists;
select * from list_items;


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



insert into items (
    user_id,
    name,
    description,
    img_url,
    tags
) values (
    5,
    'Bananas',
    '',
    'data:image/jpeg;base64,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',
    '#groceries'
)
,(
    5,
    'Apples',
    '',
    'https://static.agcanada.com/wp-content/uploads/sites/5/2018/11/apple_GettyImages186843005_cmyk.jpg',
    '#groceries'
)
,(
    5,
    'Chicken',
    '',
    'https://www.thespruceeats.com/thmb/fEnNuV4nu_Y_wYEDjQhBH-XuXKc=/4800x3000/filters:fill(auto,1)/grilled-chicken-172900971-592236bb3df78cf5fae41243.jpg',
    '#groceries'
)
,(
    5,
    'Carrots',
    '',
    'https://media.mercola.com/assets/images/foodfacts/carrot-nutrition-facts.jpg',
    '#groceries'
)
,(
    5,
    'Bread',
    '',
    'https://www.thespruceeats.com/thmb/9n3YM4RVKSWyUWQ0JCl7BwHrl1U=/4288x2848/filters:fill(auto,1)/loaf-of-bread-182835505-58a7008c5f9b58a3c91c9a14.jpg',
    '#groceries'
)
,(
    5,
    'Milk',
    '',
    'https://target.scene7.com/is/image/Target/GUEST_e034cb4b-c97e-4ad2-85c8-48064c3b0c48?wid=488&hei=488&fmt=pjpeg',
    '#groceries'
)
,(
    5,
    'Eggs',
    '',
    'https://a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2019/03/15/931/524/694940094001_6014490250001_6014489408001-vs.jpg?ve=1&tl=1',
    '#groceries'
)
,(
    5,
    'Cheese',
    '',
    'https://static1.squarespace.com/static/5a1592ff0abd04e470d48744/t/5a27bbeeec212d905273a14c/1512996237223/Kaas.jpeg?format=1500w',
    '#groceries'
)
,(
    5,
    'Tortillas',
    '',
    'https://upload.wikimedia.org/wikipedia/commons/5/56/NCI_flour_tortillas.jpg',
    '#groceries'
)
,(
    5,
    'Juice',
    '',
    'http://www.tropicana.com/images/default-source/us-site/52oz/product-heroes/tpp/pdp_hero_00_tpp_original.jpg?Status=Master&sfvrsn=2',
    '#groceries'
)
,(
    5,
    'Nails',
    '',
    'https://image.dhgate.com/0x0/f2/albu/g4/M00/A0/7B/rBVaEVnA5a-AMQxgAADZqtdiIkg731.jpg',
    '#hardware #projects #construction'
)
,(
    5,
    'Plywood',
    '',
    'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjgp7PSg6_iAhVkylQKHeiuBVwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.lowes.com%2Fpl%2FPlywood-Lumber-composites-Building-supplies%2F4294402501&psig=AOvVaw02X7useIn-jskybVQTbNnS&ust=1558610747400570',
    '#hardware #projects #construction'
)
,(
    5,
    'Screws',
    '',
    'https://images-na.ssl-images-amazon.com/images/I/51n4z7MNvTL._SY450_.jpg',
    '#hardware #projects #construction'
)
,(
    5,
    '2x4s',
    '',
    'https://i2.wp.com/www.oklahomalumber.com/wp-content/uploads/2017/09/2x4-inch-western-red-cedar-board.jpeg?fit=1000%2C1000&ssl=1',
    '#hardware #projects #construction'
)
,(
    5,
    'hammer',
    '',
    'https://images-na.ssl-images-amazon.com/images/I/61fnMMgkGIL._SX425_.jpg',
    '#hardware #projects #construction'
)
,(
    5,
    'Screwdriver',
    'phillips-head',
    'https://images.homedepot-static.com/productImages/eb72aa0c-d781-46c9-a89f-62f0fea525a9/svn/husky-screwdriver-sets-h6pcmdtssd-64_1000.jpg',
    '#hardware #projects #construction'
)
,(
    5,
    'Pliers',
    'needle-nose',
    'https://images.homedepot-static.com/productImages/cc4fb7a5-762f-4a4b-a63e-eecfd7967fe5/svn/ideal-electrician-s-needle-nose-pliers-35-3038-64_1000.jpg',
    '#hardware #projects #construction'
)
,(
    5,
    'Level',
    '',
    'https://wickes.scene7.com/is/image/travisperkins/largeNormal/Spirit-Levels-Wickes-General-Use-Spirit-Level-600mm~T3274_167337_00?defaultImage=travisperkins/2018-Wickes-Missing-Product-650x650',
    '#hardware #projects #construction'
)
,(
    5,
    'Saw',
    '',
    'https://st.hzcdn.com/simgs/8dd1f695064a66eb_4-3555/home-design.jpg',
    '#hardware #projects #construction'
);


