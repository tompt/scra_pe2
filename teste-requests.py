#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "tomas"

import requests
from bs4 import BeautifulSoup
import lxml #para usar como  parser html
import urllib


def GUARDAR_FICHEIRO(FICHEIRO_SAIDA,MODO,DADOS):
    #MODO='a'
    FICHEIRO_SAIDA = open(FICHEIRO_SAIDA, MODO)  # wb, a para append

    DADOS=str(DADOS).encode("utf-8")
    print(DADOS)

    FICHEIRO_SAIDA.write(DADOS)
    FICHEIRO_SAIDA.close()
    print (DADOS)

def SCRAP(URL,FICHEIRO_SAIDA):
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    TEXTO = requests.get(URL, headers=headers)
    print(TEXTO.content)

    CONTEUDOWEB = TEXTO.content
    SOPA = BeautifulSoup(CONTEUDOWEB, "html.parser")
    #print (SOPA.prettify())

    DADOS=TEXTO.content
    GUARDAR_FICHEIRO(FICHEIRO_SAIDA,'a',DADOS)

URL="https://www.bep.gov.pt/pages/oferta/Oferta_Pesquisa.aspx"
URL="https://sigef.ina.pt/"
FICHEIRO_SAIDA="SAIDA.htm"
#SCRAP(URL,FICHEIRO_SAIDA)



req = requests.get(URL)
file = open(FICHEIRO_SAIDA, 'wb')
for chunk in req.iter_content(100000):
    file.write(chunk)
file.close()