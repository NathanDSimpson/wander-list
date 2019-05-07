
insert into users 
(firstname, lastname, email, hashed_password)
values 
( 
    ${firstname}, 
    ${lastname}, 
    ${email},
    ${hashed_password} 
);
