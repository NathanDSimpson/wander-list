update items
   set 
        name = ${name},
        img_url = ${img_url},
        description = ${description},
        tags = ${tags}
 where item_id = $(item_id);

-- select * from items
-- where user_id = ${user_id};