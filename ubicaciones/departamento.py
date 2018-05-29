# -*- coding: utf-8 -*-
import json
from flask import Blueprint, request
from sqlalchemy.sql import select
from config.databases import engine_ubicaciones, session_ubicaciones
from .models import Departamento
#from config.middleware import csrf_form
departamento = Blueprint('departamento', __name__)

@departamento.route('/departamento/listar', methods=['GET'])
def listar():
  conn = engine_ubicaciones.connect()
  stmt = select([Departamento])
  return json.dumps([dict(r) for r in conn.execute(stmt)])
