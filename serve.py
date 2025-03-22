import http.server
import os
import signal
import sys

class DualServeHTTPRequestHandler(http.server.CGIHTTPRequestHandler):
    def translate_path(self, path):
        cgi_root_len = len("/cgi-bin/")
        if path.startswith("/cgi-bin/"):
            # print(os.path.join(os.getcwd(), "api", "src", path[cgi_root_len:]))
            # return os.path.join(os.getcwd(), "api", "src", path[cgi_root_len:])
            print(os.path.join("api", "src", "cgi-bin", path[cgi_root_len:]))
            return os.path.join("api", "src", "cgi-bin", path[cgi_root_len:])
        return os.path.join(os.getcwd(), "ui", "src", path.lstrip('/'))

def forced_shutdown(signal, frame):
    # todo: shutdown db connections, etc
    print("\ncanceling server process...", end="")
    sys.exit(0)

if __name__ == '__main__':
    signal.signal(signal.SIGINT, forced_shutdown)
    server_address = ('', 8000)
    httpd = http.server.HTTPServer(server_address, DualServeHTTPRequestHandler)
    print("dual http serve.py started")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        print("server process canceled")
