# -*- coding: utf-8 -*-
import json
from flask import Blueprint, request
from sqlalchemy.sql import select
from config.databases import engine_ubicaciones, session_ubicaciones
from .models import Distrito, VWDistritoProvinciaDepartamento as VWDPD
#from config.middleware import csrf_form
distrito = Blueprint('distrito', __name__)

@distrito.route('/ubicaciones/distrito/listar/<provincia_id>', methods=['GET'])
def listar(provincia_id):
  rpta = None
  status = 200
  try:
    conn = engine_ubicaciones.connect()
    stmt = select([Distrito.id, Distrito.nombre]).where(Distrito.provincia_id == provincia_id)
    rs = conn.execute(stmt)
    rpta = []
    for r in rs:
      tmp = {'id': int(r['id']), 'nombre': r['nombre']}
      rpta.append(tmp)
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
@distrito.route('/ubicaciones/distrito/guardar', methods=['POST'])
def guardar():
    status = 200
    data = json.loads(request.form['data'])
    nuevos = data['nuevos']
    editados = data['editados']
    eliminados = data['eliminados']
    provincia_id = data['extra']['provincia_id']
    array_nuevos = []
    rpta = None
    session = session_ubicaciones()
    try:
     if len(nuevos) != 0:
       for nuevo in nuevos:
         temp_id = nuevo['id']
         nombre = nuevo['nombre']
         s = Distrito(nombre = nombre, provincia_id = provincia_id)
         session.add(s)
         session.flush()
         temp = {'temporal' : temp_id, 'nuevo_id' : s.id}
         array_nuevos.append(temp)
     if len(editados) != 0:
       for editado in editados:
         editado['provincia_id'] = provincia_id
         session.query(Distrito).filter_by(id = editado['id']).update(editado)
     if len(eliminados) != 0:
       for id in eliminados:
         session.query(Distrito).filter_by(id = id).delete()
     session.commit()
     rpta = {
       'tipo_mensaje' : 'success',
       'mensaje' : [
         'Se ha registrado los cambios en los distritos',
         array_nuevos
       ]
     }
    except Exception as e:
     status = 500
     session.rollback()
     rpta = {
       'tipo_mensaje' : 'error',
       'mensaje' : [
         'Se ha producido un error en guardar los distritos',
         str(e)
       ]
     }
    return json.dumps(rpta), status
