#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import pymysql
#VARIAVEIS:
HOST="localhost"
NOME="root"
PASSE=""
BD="teste1"


def CRIAR_TABELA(TABELA):
    db = pymysql.connect(HOST, NOME, PASSE, BD)

    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    try:
        SQL = "DROP TABLE IF EXISTS %s" % TABELA
        # Drop table if it already exist using execute() method.
        cursor.execute(SQL)
        print("apagando tabela %s se existir.." % TABELA)
        db.commit()
    except:
        print("erro ao apagar tabela?")
        db.rollback()

    # Create table as per requirement
    sql = """CREATE TABLE %s (
       FIRST_NAME  CHAR(20) NOT NULL,
       LAST_NAME  CHAR(20),
       AGE INT,
       SEX CHAR(1),
       INCOME FLOAT )""" % TABELA

    try:
        cursor.execute(sql)
        print("tabela %s criada com sucesso" % TABELA)
    except:
        print("erro ao criar tabela")
    db.close()

def CRIAR_BD(BD):
    db = pymysql.connect(HOST, NOME, PASSE, '')
    cursor = db.cursor()
    try:
      SQL='CREATE DATABASE %s;' % BD
      cursor.execute('%s' % SQL)
      # commit aos dados na bd
      db.commit()
      print("BD %s criada com sucesso" % BD)

    except:
        print ("Erro: BD ja existe ou erro..")

    # desligar. feito
    db.close()


def INSERIR_REGISTO(TABELA,NOME1,NOME2,IDADE):
    db = pymysql.connect(HOST, NOME, PASSE, BD)
    cursor = db.cursor()

    # Prepare SQL query to INSERT a record into the database.
    sql = "INSERT INTO %s (FIRST_NAME, \
	   LAST_NAME, AGE, SEX, INCOME) \
	   VALUES ('%s', '%s', '%s', '%c', '%d' )" % \
          (TABELA,NOME1, NOME2, IDADE, 'M', 2000)

    try:
        # Execute the SQL command
        cursor.execute(sql)
        # Commit your changes in the database
        db.commit()
        print("Sucesso ao inserir %s %s %s em %s." % (NOME1,NOME2,IDADE,TABELA))
    except:
        print("erro. nada feito")
        # Rollback in case there is any error
        db.rollback()

    # disconnect from server
    db.close()


####################################### aqui começa tudo ##############
CRIAR_BD("teste1") #teste1
CRIAR_TABELA("EMPLOYEE") #EMPLOYEE
INSERIR_REGISTO("EMPLOYEE","Jonas","CENAS",23)
