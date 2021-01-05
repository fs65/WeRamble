use weramble;
select *
from weramble.users as users
where (users.username = ${username} or users.email = ${email})
  and users.password = ${password};