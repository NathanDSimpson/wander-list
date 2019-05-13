insert into items (
    user_id,
    name,
    serial_number,
    img_url,
    description,
    weight,
    volume,
    category,
    season,
    activity
) values (
    ${user_id},
    ${name},
    ${serial_number},
    ${img_url},
    ${description},
    ${weight},
    ${volume},
    ${category},
    ${season},
    ${activity}
);

select * from items
where user_id = ${user_id};
