create table if not exists users (
    id integer primary key autoincrement,
    invitation_key text not null,
    name text not null
);

create table if not exists stories (
    id integer primary key autoincrement,
    global_storyid text unique not null,
    title text not null,
    authorid integer not null,
    password_hash text default null,
    is_private boolean default 0,
    created_date timestamp default current_timestamp,
    modified_date timestamp default null,
    foreign key (authorid) references users(id) on delete set null -- allow for re-establishing story connection when user is added back
);

create table if not exists story_shares (
    id integer primary key autoincrement,
    storyid integer not null,
    userid integer not null,
    foreign key (storyid) references stories(id) on delete cascade,
    foreign key (userid) references users(id) on delete cascade -- do not re-establish story shares when user is added back
);

create table if not exists tags (
    id integer primary key autoincrement,
    storyid integer not null,
    name text not null,
    parent_tagid integer null,
    tag_authorid integer not null,
    foreign key (storyid) references stories(id) on delete cascade,
    foreign key (parent_tagid) references tags(id) on delete set null, -- should have a process in place to search for orphaned pages
    foreign key (tag_authorid) references users(id) on delete set null
);

create table if not exists pages (
    id integer primary key autoincrement,
    storyid integer not null,
    header text not null,
    content text null,
    tagid integer null, -- null means root page of the story
    is_end boolean default 0,
    end_text text null,
    page_authorid integer not null,
    foreign key (storyid) references stories(id) on delete cascade,
    foreign key (tagid) references tags(id) on delete set null, -- should have a process in place to search for multiple null-tag pages (only should have 1 root)
    foreign key (page_authorid) references users(id) on delete set null -- should have a way to re-connect user back to their part of the story once they re-join
);

create unique index if not exists idx_tags_storyid_name on tags(storyid, name);

-- Choices are treated as a display-related construct (within a page context),
-- and do not suggest user movement/navigation throughout the story (which is
-- actually the purpose of the tag counterpart)
create table if not exists choices (
    id integer primary key autoincrement,
    pageid integer not null,
    tagid integer not null,
    description text not null,
    display_order integer default 0,
    -- foreign key considerations:
    --  choices are removed, however the corresponding and now orphaned tag
    --  can be re-linked up at a later point when a new page structure is added
    foreign key (pageid) references pages(id) on delete cascade,
    foreign key (tagid) references tags(id) on delete set null
);

-- for interactive fiction purposes, a bookmark is really a tag stack
create table if not exists user_bookmarks (
    id integer primary key autoincrement,
    storyid integer not null,
    tagid integer not null,
    previous_markid integer null,
    story_parse_position integer default 0, -- todo: see if this is really still needed by the story parser maybe it works without it
    foreign key (previous_markid) references user_bookmarks(id) on delete cascade,
    foreign key (tagid) references tags(id) on delete cascade,
    foreign key (storyid) references stories(id) on delete cascade
);

create view exportable_story as
select
    s.global_storyid,
    s.title,
    u.name as author_name
from stories s
join users u on u.id = s.authorid;

create view exportable_page as
select
    s.global_storyid,
    p.header,
    p.content,
    t.name as tag_name,
    end_text,
    (select name from users where id=p.page_authorid) page_author_name
from pages p
join stories s on s.id = p.storyid
left join tags t on t.id = p.tagid;

create view exportable_tag as
select
    (select global_storyid from stories where id = t.storyid) global_storyid,
    name,
    (select name from tags where id = t.parent_tagid) parent_tag_name,
    (select name from users where id=t.tag_authorid) tag_author_name
from tags t;

create view exportable_choice as
select
    t.name tag_name,
    c.description,
    (select header from pages where id = c.pageid) as choice_page_header
from choices c
join tags t on t.id = c.tagid
order by c.display_order;
