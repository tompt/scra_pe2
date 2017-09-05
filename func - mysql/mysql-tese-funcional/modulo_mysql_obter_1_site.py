#!/usr/bin/python3
# -*- coding: UTF-8 -*-
import pymysql

def OBTER_SITES():
   # Open database connection
   db = pymysql.connect("localhost","root","","testdb" )

   # prepare a cursor object using cursor() method
   cursor = db.cursor()

   LISTA_SITES=[]
   DONO=[]

   # Prepare SQL query to INSERT a record into the database.
   sql = "SELECT * FROM lista_sites WHERE visto LIKE '%s' Limit 1" % ('0')
   try:
      # Execute the SQL command
      cursor.execute(sql)
      # Fetch all the rows in a list of lists.
      results = cursor.fetchall()
      x=1
      for row in results:
         id = row[0]
         url = row[1]
         visto = row[2]
         conteudo = row[3]
         hash = row[4]
         dono = row[5]

         LISTA_SITES.append(url)
         DONO.append(dono)

         # Now print fetched result
         #print ("id %s, url: %s, visto: %s, conteudo: %s, hash: %s, dono: %s" % (id, url, visto, conteudo, hash, dono ))

         x = x + 1
   except:
      print ("Erro: unable to fetch data")

   # disconnect from server
   db.close()
   #print(LISTA_SITES)
   return LISTA_SITES,DONO