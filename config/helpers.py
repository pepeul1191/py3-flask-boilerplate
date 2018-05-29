# -*- coding: utf-8 -*-
from .constants import constants

def load_css(csss):
  rpta = ''
  if csss != None:
    for n in csss:
      temp = '<link href="' + constants['STATICS_URL'] + n + '.css" rel="stylesheet"/>'
      rpta = rpta + temp
  return rpta

def load_js(jss):
  rpta = ''
  if jss != None:
    for n in jss:
      temp = '<script src="' + constants['STATICS_URL'] + n + '.js" type="text/javascript"></script>'
      rpta = rpta + temp
  return rpta
