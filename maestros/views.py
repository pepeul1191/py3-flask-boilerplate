# -*- coding: utf-8 -*-
import json
from flask import Blueprint, request, render_template, redirect, session
from config.constants import constants
from config.helpers import load_css, load_js
from .helpers import index_css, index_js
#from config.middleware import csrf_form

maestros = Blueprint('maestros', __name__)

@maestros.route('/maestros/', methods=['GET'])
def index():
  locals = {
    'constants': constants,
    'css': load_css(index_css()),
    'js': load_js(index_js()),
    'title': 'Gestión de Datos Maestros',
    'data': json.dumps({
      'modulo' : 'Maestros',
    }),
    'menu': json.dumps([
      {'url' : 'accesos/', 'nombre' : 'Accesos'},
      {'url' : 'maestros/', 'nombre' : 'Maestros'},
    ]),
    'items': json.dumps([
      {"subtitulo":"Maestros", "items":
        [
          {"item":"Gestión de Ubicaciones","url":"maestros/#/ubicacion"},
        ],
      },
    ]),
  }
  return render_template('maestros/index.html', locals = locals)
