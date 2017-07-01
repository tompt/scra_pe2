from flask import Flask
from flask import request
import requests

app = Flask(__name__)


@app.route("/")
def hello():
    url = request.args['http://gualdimpais.dtdns.net/login.php']  # user provides url in query string
    r = requests.get(url)

    # write to a file in the app's instance folder
    # come up with a better file name
    with app.open_instance_resource('downloaded_file', 'wb') as f:
        f.write(r.content)

    return "Hello World!"

if __name__ == "__main__":
    app.run()
    hello()
