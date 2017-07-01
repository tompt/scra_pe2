#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "Tomás"

from bs4 import BeautifulSoup
import requests
from urllib.parse import urljoin


def SCRAP(URL,FICHEIRO_SAIDA):
    ''''
    PARA FICHEIROS:
    FICHEIRO = "C:/Users/CR1PT0/ficheiro.htm"
    htmlfile = open(FICHEIRO, 'rb')
    html = htmlfile.read()
    SOPA = BeautifulSoup(html, "html.parser")
    print (SOPA)
    '''

    #REQUESTS COM USER-AGENT
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    TEXTO = requests.get(URL, headers=headers)
    #print(TEXTO.content)

    CONTEUDOWEB = TEXTO.content
    SOPA = BeautifulSoup(CONTEUDOWEB, "html.parser")
    #print (SOPA.prettify())
    return SOPA

def OBTER_LINKS(URL,FICHEIRO_SAIDA):
    SOPA= SCRAP(URL,FICHEIRO_SAIDA)
    print(SOPA)
    for link in SOPA.find_all('a'):
        #print("1-%s" % link.get('href'))
        #print("2-%s\n" % (SOPA.find('a')['href']))

        #from urllib.parse import urljoin
        base = URL
        href = (link.get('href'))
        urljoin(base, href)
        print("%s" % (urljoin(base,href)))
        'http://example.com/folder/big/a.jpg'



URL1="http://www.openbsd.org/"
URL3="http://www.iknow.suroot.com"
URL="http://www.sapo.pt"
URL2="http://www.ceger.gov.pt"

URL5=""
URL6="https://www.google.pt/search?q=google&ie=utf-8&oe=utf-8&client=firefox-b#q=sara+sampaio"
URL7="https://www.google.pt/search?q=SARA+sampaio"

#SCRAP(URL1,"./openbsd.htm")
OBTER_LINKS(URL7,"./openbsd.htm")