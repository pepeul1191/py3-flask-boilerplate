# -*- coding: utf-8 -*-
import json
from flask import Blueprint, request, render_template, redirect, session
from config.constants import constants
#from config.middleware import csrf_form

login = Blueprint('login', __name__)

@login.route('/login', methods=['GET'])
def index():
  menu = [
    {'url' : 'accesos/', 'nombre' : 'Accesos'},
    {'url' : 'maestros/', 'nombre' : 'Maestros'},
    {'url' : 'agricultores/', 'nombre' : 'Agricultores'},
    {'url' : 'estaciones/', 'nombre' : 'Estaciones'},
  ]
  items = [
    {"subtitulo":"Opciones", "items":
      [
        {"item":"Gestión de Sistemas","url":"accesos/#/sistema"},
        {"item":"Gestión de Usuarios","url":"accesos/#/usuario"}
      ]
    },
    ]
  data = {'titulo_pagina' : 'Gestión Accesos', 'modulo' : 'Accesos'}
  #return render_template('accesos/index.html', constants = constants, data = json.dumps(data), menu = json.dumps(menu), items = json.dumps(items))
  return 'login'
