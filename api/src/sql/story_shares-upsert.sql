with resolved_caller as (
    select id as caller_userid
    from users
    where invitation_key = :invitation_key
),
story_owner as (
    select s.authorid
    from stories s
    join resolved_caller c on s.authorid = c.caller_userid
    where s.id = :storyid
)
insert into story_shares (
    id,
    storyid,
    userid,
    is_illustrator,
    is_composer,
    default_illustrator_userid,
    default_composer_userid
)
select
    :id,
    :storyid,
    :userid,
    :is_illustrator,
    :is_composer,
    :default_illustrator_userid,
    :default_composer_userid
from resolved_caller
on conflict(userid,storyid) do update set
    is_illustrator = excluded.is_illustrator,
    is_composer = excluded.is_composer
where exists (
    select 1 from story_owner
) -- only author can update is_illustrator, is_composer permissions
;
