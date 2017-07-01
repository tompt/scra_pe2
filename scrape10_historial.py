#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "tomas"

import requests
from bs4 import BeautifulSoup
import urllib


def HISTORIAL(URL):
    TEXTO = requests.get(URL)
    CONTEUDOWEB = TEXTO.content
    SOPA = BeautifulSoup(CONTEUDOWEB, "html.parser")
    #print (SOPA.prettify())

    for HISTORIA in SOPA.findAll('div', {'class': 'body field'}):  # este pedaco permitiu encontrar o que se pretendia mas vem tudo...
        HISTORIA = str(HISTORIA)
        #print ("História do suspeito:\n%s" % HISTORIA)
        HISTORIA = HISTORIA.split('>', 1)
        HISTORIA = str(HISTORIA[1])

        HISTORIA = HISTORIA.rsplit('.', 1)
        HISTORIA = str(HISTORIA[0])
        #print ("História do suspeito:\n%s" % HISTORIA)
        return HISTORIA

def NACIONALIDADE(URL):
    TEXTO = requests.get(URL)
    CONTEUDOWEB = TEXTO.content
    SOPA = BeautifulSoup(CONTEUDOWEB, "html.parser")
    #print (SOPA.prettify())

    for PAIS in SOPA.findAll('div', {'class': 'field field-name-field-nationality field-type-taxonomy-term-reference field-label-inline clearfix clearfix field-wrapper'}):
        PAIS = str(PAIS)
        #print (PAIS)
        if '<ul class="links inline">'in PAIS:
            print ("Sem mexer:%s" % PAIS)
            PAIS = PAIS.split('>', 1)
            PAIS = str(PAIS[1])
            PAIS = PAIS.split('>', 1)
            PAIS = str(PAIS[1])
            PAIS = PAIS.split('>', 1)
            PAIS = str(PAIS[1])
            PAIS = PAIS.split('>', 1)
            PAIS = str(PAIS[1])
            PAIS = PAIS.split('>', 1)
            PAIS = str(PAIS[1])

            PAIS = PAIS.split('<', 1)
            PAIS = str(PAIS[0])
            print ("História do suspeito:%s" % PAIS)
            return PAIS

        '''
        PAIS = PAIS.rsplit('.', 1)
        PAIS = str(PAIS[0])
        '''


        #print ("Nacionalidade do suspeito:\n%s" % PAIS)
        #return PAIS

#URL="https://eumostwanted.eu/ghita-sebastizzzzz"
#HISTORIAL(URL)
#NACIONALIDADE(URL)

