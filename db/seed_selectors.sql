-- ALL ITMES FOR A USER
select * from items
where user_id = ${user_id};

-- ALL LISTS FOR A USER
select * from lists
where user_id = ${user_id};

-- ALL TIRPS FOR  A USER
select * from trips
where user_id = ${user_id};

-- -- DISPLAY THE ITEMS IN A LIST
-- select * from list_items
-- join items on items.item_id = list_items.item_id
-- where list_items.list_id = ${list_id};

-- -- DISPLAY THE LISTS IN A TRIP
-- select * from trip_lists
-- join trips on trips.trip_id = trip_lists.trip_id
-- where trip_lists.trip_id = ${trip_id};