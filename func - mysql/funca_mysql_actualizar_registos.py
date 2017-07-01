#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import pymysql

# Open database connection
db = pymysql.connect("localhost","root","","testdb" )

# prepare a cursor object using cursor() method
cursor = db.cursor()

def ACTUALIZAR(SQL):
   # Prepare SQL query to UPDATE required records
   #SQL = "UPDATE EMPLOYEE SET AGE = AGE + 1 WHERE SEX = '%c'" % ('M')
   try:
      # Execute the SQL command
      cursor.execute(SQL)
      # Commit your changes in the database
      db.commit()
      print("sucesso na actualização")
   except:
      # Rollback in case there is any error
      db.rollback()
      print("erro")

   # disconnect from server
   db.close()

#ACTUALIZAR("UPDATE EMPLOYEE SET AGE = AGE + 1 WHERE SEX = '%c'" % ('M'))
ACTUALIZAR("UPDATE EMPLOYEE SET FIRST_NAME = '%s' WHERE id = '%s'" % ('Tomás','2'))
