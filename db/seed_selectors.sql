
select * from users;
select * from trips;
select * from lists;
select * from items;
select * from trip_lists;
select * from list_items;
select * from trip_tags;
select * from list_tags;
select * from item_tags;





-- ALL ITMES FOR A USER
select * from items
where user_id = 5;

-- ALL LISTS FOR A USER
select * from lists
where user_id = 5;

-- ALL TIRPS FOR  A USER
select * from trips
where user_id = 5;

-- DISPLAY THE ITEMS IN A LIST
select i.item_id, i.name, li.quantity, i.img_url, i.weight, i.volume, i.description from list_items as li
join items as i on i.item_id = li.item_id
where li.list_id = 1;

select * from list_items
join items on items.item_id = list_items.item_id
where list_items.list_id = 2;

-- DISPLAY THE LISTS IN A TRIP
select * from trip_lists
join trips on trips.trip_id = trip_lists.trip_id
where trip_lists.trip_id = 1;

select l.list_id, l.name, l.description from trip_lists as tl
join lists as l on l.list_id = tl.list_id
where tl.trip_id = 1;





