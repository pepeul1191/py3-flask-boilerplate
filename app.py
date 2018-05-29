#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask
# importaciones de blueprints
from login.views import login
from ubicaciones.departamento import departamento as ubicaciones_departamento

app = Flask(__name__, static_url_path='/static', template_folder='templates')
#cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# blueprints
app.register_blueprint(login)
app.register_blueprint(ubicaciones_departamento)

@app.route('/test/conexion')
def test_conexion():
  return 'Ok'

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
