delete from items
where user_id = ${user_id}
and item_id = ${item_id};

select * from items
where user_id = ${user_id};