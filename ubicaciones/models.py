# -*- coding: utf-8 -*-
from sqlalchemy import Table, Column, Integer, String, ForeignKey, Float
from config.databases import Base
# http://docs.sqlalchemy.org/en/latest/orm/basic_relationships.html
class Departamento(Base):
  __tablename__ = 'departamentos'
  id = Column(Integer, primary_key=True)
  nombre = Column(String)
