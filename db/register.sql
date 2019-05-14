
insert into users 
(firstname, lastname, email, hashed_password)
values 
( 
    ${firstname}, 
    ${lastname}, 
    ${email},
    ${hashed_password} 
);

select user_id from users
where email = ${email};
