#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import pymysql

# Open database connection
db = pymysql.connect("localhost","root","","testdb" )

# prepare a cursor object using cursor() method
cursor = db.cursor()

# Prepare SQL query to INSERT a record into the database.
sql = "SELECT * FROM EMPLOYEE \
       WHERE INCOME > '%d'" % (1000)
try:
   # Execute the SQL command
   cursor.execute(sql)
   # Fetch all the rows in a list of lists.
   results = cursor.fetchall()
   x=1
   for row in results:
      id = row[0]
      fname = row[1]
      lname = row[2]
      age = row[3]
      sex = row[4]
      income = row[5]

      # Now print fetched result
      print ("%s - fname = %s,lname = %s,age = %d,sex = %s,income = %d" % \
             (x, fname, lname, age, sex, income ))
      x = x + 1
except:
   print ("Erro: unable to fetch data")

# disconnect from server
db.close()