# -*- coding: utf-8 -*-
import json
from flask import Blueprint, request
from sqlalchemy.sql import select
from config.databases import engine_ubicaciones, session_ubicaciones
from .models import Provincia
#from config.middleware import csrf_form
provincia = Blueprint('provincia', __name__)

@provincia.route('/provincia/listar/<departamento_id>', methods=['GET'])
def listar(departamento_id):
  rpta = None
  status = 200
  try:
    conn = engine_ubicaciones.connect()
    stmt = select([Provincia.id, Provincia.nombre]).where(Provincia.departamento_id == departamento_id)
    rpta = [dict(r) for r in conn.execute(stmt)]
  except Exception as e:
    rpta = {
      'tipo_mensaje': 'error',
      'mensaje': [
        'Se ha producido un error en listar las provincias del departamento',
        str(e)
      ],
    }
    status = 500
  return json.dumps(rpta), status
