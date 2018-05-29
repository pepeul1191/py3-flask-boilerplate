# -*- coding: utf-8 -*-
from config.constants import constants

def index_css():
  rpta = []
  if constants['ambiente'] == 'desarrollo':
    rpta = [
      'bower_components/bootstrap/dist/css/bootstrap.min',
      'bower_components/font-awesome/css/font-awesome.min',
      'bower_components/swp-backbone/assets/css/constants',
      'bower_components/swp-backbone/assets/css/login',
      'assets/css/login',
    ]
  else:
    rpta = [
      'dist/login'
    ]
  return rpta

def index_js():
  rpta = []
  if constants['ambiente'] == 'desarrollo':
    rpta = [
      'bower_components/jquery/dist/jquery.min',
      'bower_components/bootstrap/dist/js/bootstrap.min',
      'assets/js/login',
    ]
  else:
    rpta = [
      'dist/login'
    ]
  return rpta
