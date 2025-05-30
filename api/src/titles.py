#!/usr/bin/env python3
import sys
import sqlite3
import os
import csv

def main():
    sql = sys.stdin.read()
    conn = sqlite3.connect(sys.argv[1])
    sys.stderr.write(sys.argv[1]+"\n")  # path to database
    cur = conn.cursor()
    args = (sys.argv[2],sys.argv[3])  # invitation_key, userName
    rows = cur.execute(sql, args).fetchall()
    print(f"Rows found: {len(rows)}", file=sys.stderr)
    # column_names = [description[0] for description in cur.description]
    csv_writer = csv.writer(sys.stdout, delimiter='+')
    # csv_writer.writerow(column_names)
    csv_writer.writerows(rows)
    sys.exit(0)

if __name__ == '__main__':
    main()
