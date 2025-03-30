
# Plan

```
./api/src/* (file format transform scripts, ie: .story.wik to .story)
./api/src/serve.py (dual serve script for bash/cgi and html files)
~./api/src/lib~ # (no lib folder, 
                # just use package manager and ns-clone: sqlite3, sv)
./api/src/sql(ddl/dml and cte queries)
~/scs_story.db (sqlite)
~/scs_stories/${global_storyid}.story.wik
./ui/src (html/js/css/svg files)
./ui/src/lib/storyparser
```

# Creating the database

```sh

# to not lose any data, ONLY RUN the sqlite3 command ONCE!

if [[ ! -f ~/scs_story.db ]]; then
    sqlite3 ~/scs_story.db < ./api/src/sql/ddl.sql
fi

```

Use uuidgen command's output for the invitation_key (when creating a user).

```sh
# retrieve user
curl "http://localhost:8000/cgi-bin/users?invitation_key=${GUID}"
```

# Starting the server

```sh
python3 serve.py
```

# Dependencies

- python3
- bash
- storyparser
