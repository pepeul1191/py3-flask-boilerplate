# -*- coding: utf-8 -*-
import json
from flask import Blueprint, request
from sqlalchemy.sql import select
from config.databases import engine_ubicaciones, session_ubicaciones
from .models import Distrito, VWDistritoProvinciaDepartamento as VWDPD
#from config.middleware import csrf_form
distrito = Blueprint('distrito', __name__)

@distrito.route('/distrito/listar/<provincia_id>', methods=['GET'])
def listar(provincia_id):
  rpta = None
  status = 200
  try:
    conn = engine_ubicaciones.connect()
    stmt = select([Distrito.id, Distrito.nombre]).where(Distrito.provincia_id == provincia_id)
    rpta = [dict(r) for r in conn.execute(stmt)]
  except Exception as e:
    rpta = {
      'tipo_mensaje': 'error',
      'mensaje': [
        'Se ha producido un error en listar los distritos de la provincia',
        str(e)
      ],
    }
    status = 500
  return json.dumps(rpta), status

@distrito.route('/distrito/buscar', methods=['GET'])
def buscar():
  rpta = None
  status = 200
  try:
    nombre = request.args.get('nombre')
    conn = engine_ubicaciones.connect()
    stmt = select([VWDPD]).where(VWDPD.nombre.like(nombre + '%' )).limit(10)
    rpta = [dict(r) for r in conn.execute(stmt)]
  except Exception as e:
    rpta = {
      'tipo_mensaje': 'error',
      'mensaje': [
        'Se ha producido un error en buscar los distritos',
        str(e)
      ],
    }
    status = 500
  return json.dumps(rpta), status
