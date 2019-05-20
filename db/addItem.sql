insert into items (
    user_id,
    name,
    img_url,
    weight,
    volume,
    description,
    tags
) values (
    ${user_id},
    ${name},
    ${img_url},
    ${weight},
    ${volume},
    ${description},
    ${tags}
);

-- select * from items
-- where user_id = ${user_id};
