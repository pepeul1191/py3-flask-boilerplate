#!/usr/bin/env python
# -*- coding: utf-8 -*-
# app.py
from flask import Flask
app = Flask(__name__, static_url_path='/static')

@app.route("/")
def hello():
  return "Hello World!"

@app.after_request
def apply_caching(response):
  response.headers['Server'] = 'Ubuntu; Werkzeug/0.14.1 Python/3.5.2'
  return response

if __name__ == '__main__':
  app.config['SESSION_TYPE'] = 'filesystem'
  app.run(debug=True, host='0.0.0.0', port=3000)
