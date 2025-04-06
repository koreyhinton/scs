
with current_user_cte as
(
    select id from users where invitation_key = ?
)
select
    s.global_storyid,
    s.title,
    (select count(id) from user_bookmarks where storyid = s.id and userid = current_user_cte.id) progress,
    (select count(id) from tags where storyid = s.id) progress_max
from stories s
join story_shares ss on s.id = ss.storyid
join users u on s.authorid = u.id
join current_user_cte on 1=1
where ? in (u.name, u.admin_name) and ss.userid = current_user_cte.id;
