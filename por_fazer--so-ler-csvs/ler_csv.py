import csv

#["['DORE''ROBERT''LEE''M''W''29''COLUMBIA''MO']"]
with open("rows_em_csv.csv", "r") as f:
    reader = csv.reader(f)
    for row in reader:
        print (row)

print("-----------------------------------------------------------")

import csv
#['ALEXANDER''BENJAMIN''FRANKLIN''M''B''22''COLUMBIA''MO']: ['ALEXANDER''BENJAMIN''FRANKLIN''M''B''22''COLUMBIA''MO']
ifile = open("rows_em_csv.csv", "r")
reader = csv.reader(ifile)

rownum = colnum = 0

for row in reader:
    # Save header row.
    if rownum ==0:
        header = row
    else:
        colnum = 0

    for col in row:
        print ("%s: %s: %s" % (colnum, header[colnum], col))
        colnum += 1
        rownum += 1

ifile.close()
