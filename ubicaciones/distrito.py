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
  conn = engine_ubicaciones.connect()
  stmt = select([Distrito.id, Distrito.nombre]).where(Distrito.provincia_id == provincia_id)
  return json.dumps([dict(r) for r in conn.execute(stmt)])

@distrito.route('/distrito/buscar', methods=['GET'])
def buscar():
  nombre = request.args.get('nombre')
  conn = engine_ubicaciones.connect()
  stmt = select([VWDPD]).where(VWDPD.nombre.like(nombre + '%' )).limit(10)
  return json.dumps([dict(r) for r in conn.execute(stmt)])
