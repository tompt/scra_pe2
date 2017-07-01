#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import pymysql

def CRIAR_BD(SQL):
   # usar as credenciais acima para ligar
   db = pymysql.connect("localhost", "root", "", "")

   # obrigatorio usar o metodo cursor()
   cursor = db.cursor()

   print("SQL:  '%s'" % str(SQL))
   try:
      # Executar o sql que enviamos na fun??o
      cursor.execute('%s' % SQL)
      # commit aos dados na bd
      db.commit()

   except:
      print ("Erro: BD já existe ou erro..")

   # desligar. feito
   db.close()

CRIAR_BD('CREATE DATABASE teste1;')

