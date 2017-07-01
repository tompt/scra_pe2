#!/usr/bin/python3
# -*- coding: utf-8 -*-

#import PyMySQL
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

CRIAR_TABELA("EMPLOYEE")
