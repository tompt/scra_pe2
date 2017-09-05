#!/usr/bin/python3
# -*- coding: UTF-8 -*-
import pymysql

def OBTER_SITES():
   # Open database connection
   db = pymysql.connect("localhost","root","","testdb" )

   # prepare a cursor object using cursor() method
   cursor = db.cursor()

   LISTA_SITES=[];DONO=[];ID=[]

   # Prepare SQL query to INSERT a record into the database.
   sql = "SELECT * FROM lista_sites WHERE estado LIKE '%s' Limit 1" % ('aguarda')
   try:
      # Execute the SQL command
      cursor.execute(sql)
      # Fetch all the rows in a list of lists.
      results = cursor.fetchall()
      x=1
      for row in results:
         id = row[0]
         url = row[1]
         estado = row[2]
         visto = row[3]
         conteudo = row[4]
         hash = row[5]
         dono = row[6]
         data = row[7]
         maquina=row[8]

         LISTA_SITES.append(url)
         DONO.append(dono)
         ID.append(id)

         print ("Informacao:\tid %s, url: %s, estado:%s, visto: %s, conteudo: %s, hash: %s, dono: %s, maquina: %s" % (id, url, estado, visto, conteudo, hash, dono, maquina ))

         x = x + 1
   except:
      print ("Erro: nao foi possivel obter os dados da bd")

   # disconnect from server
   db.close()
   #print(LISTA_SITES)
   return LISTA_SITES,ID,DONO




def OBTER_RESULTADOS_PROXIMO():
   ERRO = ""
   # Open database connection
   db = pymysql.connect("localhost","root","","testdb" )

   # prepare a cursor object using cursor() method
   cursor = db.cursor()

   LISTA_RESULTADOS=[];ID=[]

   # Prepare SQL query to INSERT a record into the database.
   sql = "SELECT * FROM resultados WHERE estado LIKE '%s' Limit 1" % ('aguarda')
   try:
      # Execute the SQL command
      cursor.execute(sql)
      # Fetch all the rows in a list of lists.
      results = cursor.fetchall()
      x=1

      """teste"""
      if not cursor.rowcount:
          print("No results found")
      else:
          for row in cursor:
              print("row: %s" % row[1])

      for row in results:

          id = row[0]
          url = row[1]
          estado = row[2]
          interesse = row[3]
          termos = row[4]
          data_alteracao = row[5]
          operacao_origem = row[6]
          maquina=row[7]
    
          LISTA_RESULTADOS.append(url)

          """ATENCAO QUE ISTO TEM DE SER ASSIM OU O ID VAI SER O DO LINK ANTERIOR E NAO O DA OPERACAO"""
          ID.append(operacao_origem)

          #print ("Informacao:\tid %s, url: %s, estado:%s, interesse: %s, termos: %s, data_alteracao: %s, operacao_origem: %s, maquina: %s" % (id, url, estado, interesse, termos, data_alteracao, operacao_origem, maquina ))
          #print("id:%s ID:%s " % (id,ID[0]))
          x = x + 1

          return LISTA_RESULTADOS[0], id, ID[0]

   except:
       ERRO = "Erro: nao foi possivel obter os dados da bd"
       print (ERRO)

   db.close()
   print(LISTA_RESULTADOS)


def ACTUALIZAR(SQL):
    db = pymysql.connect("localhost", "root", "", "testdb")

    cursor = db.cursor()

    try:
        # Execute the SQL command
        cursor.execute(SQL)
        # Commit your changes in the database
        db.commit()
        print("BD - Sucesso na actualização.")
    except:
        # Rollback in case there is any error
        db.rollback()
        print("erro")

    db.close()

    """Exemplos"""
    # ACTUALIZAR("UPDATE EMPLOYEE SET AGE = AGE + 1 WHERE SEX = '%c'" % ('M'))
    # ACTUALIZAR("UPDATE EMPLOYEE SET FIRST_NAME = '%s' WHERE id = '%s'" % ('Tomás','2'))


def INSERIR(SQL):
    db = pymysql.connect("localhost", "root", "", "testdb")

    cursor = db.cursor()

    #sql = "INSERT INTO resultados (url, estado, interesse) VALUES ('%s', '%s', '%s');" % ("http://24.sapo.pt/opiniao/artigos/terrorismo-nas-redes-sociais ","aguarda","sim")

    try:
        # Execute the SQL command
        cursor.execute(SQL)
        # Commit your changes in the database
        db.commit()
        #print("BD - Sucesso na insercao."),

    except:
       # Rollback in case there is any error
       db.rollback()

    # disconnect from server
    db.close()

""" ----------------------------------- inicio ---------------------"""
#ACTUALIZAR("UPDATE lista_sites SET estado = '%s' WHERE id='%s';" % ('em execucao' ,'1'))
#OBTER_SITES()
#INSERIR("INSERT INTO resultados (url, estado, interesse,termos,operacao_origem) \
#    VALUES ('%s', '%s', '%s','%s');" % ("http://24.sapo.pt/opiniao/artigos/terrorismo-nas-redes-sociais ","aguarda","sim","termoA termoB", "1"))
#OBTER_RESULTADOS_PROXIMO()