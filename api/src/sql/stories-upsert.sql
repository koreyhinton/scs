with resolved_user as (
    select id as userid
    from users
    where invitation_key = :invitation_key
)
insert into stories (
    id,
    global_storyid,
    title,
    authorid,
    password_hash,
    is_private,
    created_date
)
select
    :id,
    :global_storyid,
    :title,
    r.userid,
    :password_hash,
    :is_private,
    current_timestamp
from resolved_user r
on conflict(id) do update set
    title = excluded.title,
    password_hash = excluded.password_hash,
    is_private = excluded.is_private,
    modified_date = current_timestamp
where stories.authorid = r.userid
    and stories.password_hash = :password_hash
;
