#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "tomas"

import requests
from bs4 import BeautifulSoup
import lxml


def GUARDAR_FICHEIRO(FICHEIRO_SAIDA,MODO,DADOS):
    #MODO='a'
    FICHEIRO_SAIDA = open(FICHEIRO_SAIDA, MODO)  # wb, a para append

    DADOS=str(DADOS).encode("utf-8") #str naao funca??
    #DADOS=DADOS.decode('utf-8')

    #print(DADOS)  #UTIL TER LIGADO

    FICHEIRO_SAIDA.write(DADOS)
    FICHEIRO_SAIDA.close()
    #print (DADOS)

def SCRAP(URL,FICHEIRO_SAIDA):
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    TEXTO = requests.get(URL, headers=headers)

    CONTEUDOWEB = TEXTO.content
    SOPA = BeautifulSoup(CONTEUDOWEB, "html.parser")

    PAGINAHTML=SOPA.prettify()
    #print (PAGINAHTML)
    GUARDAR_FICHEIRO(FICHEIRO_SAIDA,'wb',PAGINAHTML)#Guardar toda a pagina tal como se ve (mas sem css e outros..)

    #DADOS=TEXTO.content
    #print(DADOS)

#URL="https://www.bep.gov.pt/pages/oferta/Oferta_Pesquisa.aspx"
URL='https://report.boonecountymo.org/mrcjava/servlet/SH01_MP.I00290s'
#URL='https://gualdimpais.dtdns.net'
FICHEIRO_SAIDA="SAIDA.htm"

SCRAP(URL,FICHEIRO_SAIDA)




#------------------------------------ 1rst web scraper
"""
import requests
#from BeautifulSoup import BeautifulSoup
URL='https://report.boonecountymo.org/mrcjava/servlet/SH01_MP.I00290s'
response = requests.get(URL)
html = response.content
soup = BeautifulSoup(html)
print(soup.prettify())
"""


#------------------ tabela toda junta mas apenas tabela
"""
#import requests
# from BeautifulSoup import BeautifulSoup
URL='https://report.boonecountymo.org/mrcjava/servlet/SH01_MP.I00290s'
response = requests.get(URL)
html = response.content
soup = BeautifulSoup(html,"lxml")
table = soup.find('tbody', attrs={'class': 'stripe'})

PRETTY=table.prettify()
GUARDAR_FICHEIRO("tabela.htm",'wb',PRETTY)#Guardar toda a pagina tal como se ve (mas sem css e outros..)
"""

#-------------------------- obter linhas - FUNCA FIXE
"""
import requests
#from BeautifulSoup import BeautifulSoup
URL = 'https://report.boonecountymo.org/mrcjava/servlet/SH01_MP.I00290s'
response = requests.get(URL)
html = response.content
soup = BeautifulSoup(html,"lxml")

table = soup.find('tbody', attrs={'class': 'stripe'})
for row in table.findAll('tr'):
    print(row.prettify())
    PRETTY=("%s</br>" % row.prettify())
    GUARDAR_FICHEIRO("tabela.htm","ab",PRETTY) #o ab eh por ser binario... chatices que isto dah..
"""
#----------------------------------- obter celulas?
"""import requests
#from BeautifulSoup import BeautifulSoup
URL = 'https://report.boonecountymo.org/mrcjava/servlet/SH01_MP.I00290s'
response = requests.get(URL)
html = response.content
soup = BeautifulSoup(html,"lxml")

table = soup.find('tbody', attrs={'class': 'stripe'})
for row in table.findAll('tr'):
    list_of_cells = []
    for cell in row.findAll('td'):
        text = "%s" % cell.text.replace('&nbsp;', '')
        list_of_cells.append(text)
        print(text)
        #print ("LISTA:",list_of_cells)

        GUARDAR_FICHEIRO("celulas.htm","ab",list_of_cells) #o ab eh por ser binario... chatices que isto dah..
"""
#----------------------------------- obter linhas - rows? ---funciona muito muito bem

"""import requests
#from BeautifulSoup import BeautifulSoup
URL = 'https://report.boonecountymo.org/mrcjava/servlet/SH01_MP.I00290s'
response = requests.get(URL)
html = response.content
soup = BeautifulSoup(html,"lxml")

table = soup.find('tbody', attrs={'class': 'stripe'})
list_of_rows = []
for row in table.findAll('tr'):
    list_of_cells = []
    for cell in row.findAll('td'):
        text = cell.text.replace('&nbsp;', '')
        list_of_cells.append(text)
    list_of_rows.append(list_of_cells)
print (list_of_rows)

tamanho=len(list_of_rows)
for i in range(tamanho):
    linha="%s</br>" % list_of_rows[i]
    print(linha)
    GUARDAR_FICHEIRO("lista_rows.htm", "ab", linha)  # o ab eh por ser binario... chatices que isto dah..
"""

#----------------------------------- Com as linhas, vamos meter tudo num ficheiro CSV

import requests
import csv

#from BeautifulSoup import BeautifulSoup
URL = 'https://report.boonecountymo.org/mrcjava/servlet/SH01_MP.I00290s'
response = requests.get(URL)
html = response.content
soup = BeautifulSoup(html,"lxml")

table = soup.find('tbody', attrs={'class': 'stripe'})
list_of_rows = []
for row in table.findAll('tr'):
    list_of_cells = []
    for cell in row.findAll('td'):
        text = cell.text.replace('&nbsp;', '')
        text = cell.text.replace('\n\xa0Details\n', '')
        #text = cell.text.replace("''", "")
        #print(text)
        list_of_cells.append(text)
    list_of_rows.append(list_of_cells)
print (list_of_rows)
"""
outfile = open("./SAIDA.csv", "w")
writer = csv.writer(outfile)
writer.writerows(list_of_rows)
"""
tamanho=len(list_of_rows)
for i in range(tamanho):
    #vamos apagar o campo extra
    #linha=list_of_rows[i]
    linha2 = str(list_of_rows[i])
    TEXTO=str("'\n\xa0Details\n', ")
    linha2 = linha2.replace(TEXTO,"")
    #coluna a mais tem de ser removida
    linha2 = linha2.replace("''","")
    linha = linha2.replace(", ","")
    #print(linha)
    linha="%s\n" % linha
    print(linha)
    GUARDAR_FICHEIRO("rows_em_csv.csv", "ab", linha)  # o ab eh por ser binario... chatices que isto dah..

