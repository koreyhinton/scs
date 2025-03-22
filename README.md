
# Plan

```
./api/src/* (file format transform scripts, ie: .story.wik to .story)
./api/src/serve.py (dual serve script for bash/cgi and html files)
~./api/src/lib~ # (no lib folder, 
                # just use package manager and ns-clone: sqlite3, sv)
./data/userfiles/${guid} (contents:csv,story,story.wik)
./data/sql (ddl/dml and cte queries)
./data/db (sqlite)
./ui/src (html/js/css/svg files)
./ui/src/lib/storyparser
```

# Starting the server

```sh
python3 serve.py
```

# Dependencies

- python3
- bash
- storyparser
