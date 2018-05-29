# -*- coding: utf-8 -*-
import json
from flask import Blueprint, request, render_template, redirect, session
from config.constants import constants
from config.helpers import load_css, load_js
from .helpers import index_css, index_js
#from config.middleware import csrf_form

login = Blueprint('login', __name__)

@login.route('/login', methods=['GET'])
def index():
  locals = {
    'constants': constants,
    'css': load_css(index_css()),
    'js': load_js(index_js()),
  }
  return render_template('login/index.html', locals = locals)
