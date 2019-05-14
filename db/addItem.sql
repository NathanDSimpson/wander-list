insert into items (
    user_id,
    name,
    img_url,
    weight,
    volume,
    description
) values (
    ${user_id},
    ${name},
    ${img_url},
    ${weight},
    ${volume},
    ${description}
);

select * from items
where user_id = ${user_id};
