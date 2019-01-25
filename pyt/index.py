from http.server import BaseHTTPRequestHandler
import requests

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        url = "https://static-feed.tomorrowland.com/settings-production.json"
        response = requests.get("https://gebeto.github.com/info").json()
        shops = response.get("shops", [])
        concatted = "\n".join(["{} - {}".format(s['id'], s['shopUrl']) for s in shops])
        self.wfile.write(str(concatted).encode())
        return