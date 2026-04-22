#!/usr/bin/env python3
import http.server, os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_HEAD(self):
        if self.path == '/':
            self.path = '/ediv-a.html'
        super().do_HEAD()

    def do_GET(self):
        if self.path == '/':
            self.path = '/ediv-a.html'
        super().do_GET()

    def log_message(self, format, *args):
        pass

port = int(os.environ.get('PORT', 3000))
http.server.HTTPServer(('', port), Handler).serve_forever()
