# -*- coding: utf-8 -*-
import json
from flask import Blueprint, request, render_template, redirect, session
from config.constants import constants
#from config.middleware import csrf_form

login = Blueprint('login', __name__)

@login.route('/login', methods=['GET'])
def index():
  items = [
    {"subtitulo":"Opciones", "items":
      [
        {"item":"Gestión de Sistemas","url":"accesos/#/sistema"},
        {"item":"Gestión de Usuarios","url":"accesos/#/usuario"}
      ]
    },
  ]
  locals = {
    'constants': constants,

  }
  return render_template('login/index.html', locals = locals)
