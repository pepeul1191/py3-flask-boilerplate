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
    stmt = select([Departamento.id, Departamento.nombre])
    rs = conn.execute(stmt)
    rpta = []
    for r in rs:
      tmp = {'id': int(r['id']), 'nombre': r['nombre']}
      rpta.append(tmp)
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

@departamento.route('/ubicaciones/departamento/guardar', methods=['POST'])
def guardar():
  status = 200
  data = json.loads(request.form['data'])
  nuevos = data['nuevos']
  editados = data['editados']
  eliminados = data['eliminados']
  #campo_id = data['extra']['campo_id']
  array_nuevos = []
  rpta = None
  session = session_ubicaciones()
  try:
    if len(nuevos) != 0:
      for nuevo in nuevos:
        temp_id = nuevo['id']
        nombre = nuevo['nombre']
        s = Departamento(nombre = nombre,)
        session.add(s)
        session.flush()
        temp = {'temporal' : temp_id, 'nuevo_id' : s.id}
        array_nuevos.append(temp)
    if len(editados) != 0:
      for editado in editados:
        session.query(Departamento).filter_by(id = editado['id']).update(editado)
    if len(eliminados) != 0:
      for id in eliminados:
        session.query(Departamento).filter_by(id = id).delete()
    session.commit()
    rpta = {
      'tipo_mensaje' : 'success',
      'mensaje' : [
        'Se ha registrado los cambios en los departamentos',
        array_nuevos
      ]
    }
  except Exception as e:
    status = 500
    session.rollback()
    rpta = {
      'tipo_mensaje' : 'error',
      'mensaje' : [
        'Se ha producido un error en guardar los departamentos',
        str(e)
      ]
    }
  return json.dumps(rpta), status
