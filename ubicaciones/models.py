# -*- coding: utf-8 -*-
from sqlalchemy import Table, Column, Integer, String, ForeignKey, Float
from config.databases import Base
# http://docs.sqlalchemy.org/en/latest/orm/basic_relationships.html
class Departamento(Base):
  __tablename__ = 'departamentos'
  id = Column(Integer, primary_key=True)
  nombre = Column(String)

class Provincia(Base):
  __tablename__ = 'provincias'
  id = Column(Integer, primary_key=True)
  nombre = Column(String)
  departamento_id = Column(Integer, ForeignKey('departamentos.id'))

class Distrito(Base):
  __tablename__ = 'distritos'
  id = Column(Integer, primary_key=True)
  nombre = Column(String)
  provincia_id = Column(Integer, ForeignKey('provincias.id'))

class VWDistritoProvinciaDepartamento(Base):
  __tablename__ = 'vw_distrito_provincia_departamentos'
  id = Column(Integer, primary_key=True)
  nombre = Column(String)
