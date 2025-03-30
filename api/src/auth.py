#!/usr/bin/env python3
import sys
import sqlite3
import os

def main():
    sql = sys.stdin.read()
    conn = sqlite3.connect(sys.argv[1])
    cur = conn.cursor()
    args = (sys.argv[2],)
    rows = cur.execute(sql, args).fetchall()
    print(f"Rows found: {len(rows)}", file=sys.stderr)
    for row in rows:
        print(f"Data row: {row[0]}", file=sys.stderr)
        if row[0] == 1:
            sys.exit(0)
    sys.exit(1)

if __name__ == '__main__':
    main()
