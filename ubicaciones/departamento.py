# -*- coding: utf-8 -*-
import json
from flask import Blueprint, request
from sqlalchemy.sql import select
from config.databases import engine_ubicaciones, session_ubicaciones
from .models import Departamento
#from config.middleware import csrf_form
departamento = Blueprint('departamento', __name__)

@departamento.route('/ubicaciones/departamento/listar', methods=['GET'])
def listar():
  rpta = None
  status = 200
  try:
    conn = engine_ubicaciones.connect()
    stmt = select([Departamento])
    rpta = [dict(r) for r in conn.execute(stmt)]
  except Exception as e:
    rpta = {
      'tipo_mensaje': 'error',
      'mensaje': [
        'Se ha producido un error en listar los departamento',
        str(e)
      ],
    }
    status = 500
  return json.dumps(rpta), status
