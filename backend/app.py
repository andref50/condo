from flask import Flask, request, jsonify
from flask_cors import CORS

from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
CORS(app)

apes = []
ids = 0

@app.route('/', methods=['GET'])
def root():
    return apes

@app.route('/getimgs', methods=['POST'])
def get():
    url = request.form['url']

    headers = requests.utils.default_headers()
    headers.update({'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
                    'cookie': "CONSENT=YES+cb.20230531-04-p0.en+FX+908"})

    html = requests.get(url, headers=headers).content
    soup = BeautifulSoup(html, 'html.parser')
    condominio = soup.find_all('img', {"src":True})
    
    imgs = []
    for c in condominio:
        if c['src'].endswith('.jpg'):
            if 'quintoandar' in url:
                c['src'] = 'http://www.quintoandar.com.br' + c['src']
            imgs.append(c['src'])
    return imgs

@app.route('/add', methods=['POST'])
def add():
    ape = request.json
    apes.append(ape)
    return jsonify('Oieee')

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    for i in apes:
        if i['id'] == id:
            apes.remove(i)
    return jsonify('DELETED')

if __name__ == '__main__':
    app.run(debug=True)