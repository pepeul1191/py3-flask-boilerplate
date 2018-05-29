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
  conn = engine_ubicaciones.connect()
  stmt = select([Provincia.id, Provincia.nombre]).where(Provincia.departamento_id == departamento_id)
  return json.dumps([dict(r) for r in conn.execute(stmt)])
