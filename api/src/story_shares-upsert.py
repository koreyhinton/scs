#!/usr/bin/env python3
import sys
import sqlite3
import json

def main():
    sql = sys.stdin.read()
    conn = sqlite3.connect(sys.argv[1])
    sys.stderr.write(sys.argv[1]+"\n")  # path to database
    cur = conn.cursor()
    invitation_key = sys.argv[2]
    post_data_str = sys.argv[3]
    try:
        post_data = json.loads(post_data_str)
    except json.JSONDecodeError:
        sys.stderr.write("Invalid JSON\n")
        sys.exit(1)
    required_fields = ['id', 'storyid', 'is_illustrator', 'is_composer', 'default_illustrator_userid', 'default_composer_userid']
    params = {key: post_data[key] for key in required_fields if key in post_data}
    params['invitation_key'] = invitation_key
    try:
        cur.execute(sql, params)
        conn.commit()
    except Exception as e:
        sys.stderr.write(f"Database error: {e}\n")
        sys.exit(1)
    finally:
        conn.close()
    sys.exit(0)

if __name__ == '__main__':
    main()
