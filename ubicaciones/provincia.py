# -*- coding: utf-8 -*-
import json
from flask import Blueprint, request
from sqlalchemy.sql import select
from config.databases import engine_ubicaciones, session_ubicaciones
from .models import Provincia
#from config.middleware import csrf_form
provincia = Blueprint('provincia', __name__)

@provincia.route('/ubicaciones/provincia/listar/<departamento_id>', methods=['GET'])
def listar(departamento_id):
  rpta = None
  status = 200
  try:
    conn = engine_ubicaciones.connect()
    stmt = select([Provincia.id, Provincia.nombre]).where(Provincia.departamento_id == departamento_id)
    rs = conn.execute(stmt)
    rpta = []
    for r in rs:
      tmp = {'id': int(r['id']), 'nombre': r['nombre']}
      rpta.append(tmp)
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

@provincia.route('/ubicaciones/provincia/guardar', methods=['POST'])
def guardar():
  status = 200
  data = json.loads(request.form['data'])
  nuevos = data['nuevos']
  editados = data['editados']
  eliminados = data['eliminados']
  departamento_id = data['extra']['departamento_id']
  array_nuevos = []
  rpta = None
  session = session_ubicaciones()
  try:
    if len(nuevos) != 0:
      for nuevo in nuevos:
        temp_id = nuevo['id']
        nombre = nuevo['nombre']
        s = Provincia(nombre = nombre, departamento_id = departamento_id)
        session.add(s)
        session.flush()
        temp = {'temporal' : temp_id, 'nuevo_id' : s.id}
        array_nuevos.append(temp)
    if len(editados) != 0:
      for editado in editados:
        editado['departamento_id'] = departamento_id
        session.query(Provincia).filter_by(id = editado['id']).update(editado)
    if len(eliminados) != 0:
      for id in eliminados:
        session.query(Provincia).filter_by(id = id).delete()
    session.commit()
    rpta = {
      'tipo_mensaje' : 'success',
      'mensaje' : [
        'Se ha registrado los cambios en las provincias',
        array_nuevos
      ]
    }
  except Exception as e:
    status = 500
    session.rollback()
    rpta = {
      'tipo_mensaje' : 'error',
      'mensaje' : [
        'Se ha producido un error en guardar las provincias',
        str(e)
      ]
    }
  return json.dumps(rpta), status
