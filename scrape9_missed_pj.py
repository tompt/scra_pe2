# !/usr/bin/env python
# -*- coding: utf-8 -*-
__author__ = "tomás"

import requests
from bs4 import BeautifulSoup
import string
import re
import lxml #para usar como  parser html
import urllib

NOMES=[]
IDADES=[]
NASCIMENTOS=[]
DESAPARECIMENTOS=[]
LINKS=[]
IMAGENS=[]

def GUARDAR_FICHEIRO(NomeFicheiro,MODO,DADOS):
    NomeFicheiro=""
    MODO="a"
    try:
        output = "C:/Users/CR1PT0/Downloads/PJ9.htm"
        output = open(output, MODO)  # wb, a para append
        #output.write('NOME:%s</br>\nIDADE:%s</br>\nDESAPARECIMENTO:%s</br>\nLINK:%s</br>\nIMAGEM:%s</br>\n' % (NOME, IDADE, DESAPARECIMENTO, LINK, IMAGEM))
        output.write(DADOS)
        output.close()
    except:
        print("erro")


def scrap1(URL):
    #PARA FICHEIROS:
    #FICHEIRO = "C:/Users/CR1PT0/Downloads/Lista de Pessoas Desaparecidas.htm"
    #htmlfile = open(FICHEIRO, 'rb')
    #html = htmlfile.read()
    #SOPA = BeautifulSoup(html, "html.parser")
    #print (SOPA)

    #PARA URLS:
    TEXTO = requests.get(URL)
    CONTEUDOWEB = TEXTO.content
    SOPA = BeautifulSoup(CONTEUDOWEB, "html.parser")

    print (SOPA)

    # RESETAR VALORES
    NOME = IDADE = DESAPARECIMENTO = LINK = IMAGEMFINAL = IMAGEM = ""
    x=1

    for PESSOA in SOPA.findAll('td', {'class': 'textCinza8'}): #este pedaco permitiu encontrar o que se pretendia mas vem tudo...
        #PESSOA2 = SOPA.findAll("td", {"class": "textCinza8"})
        # PESSOA TEM MUITO LIXO NO NOME. VAMOS REMOVER O QUE ESTA A MAIS
        REMOVER = '<td class="textCinza8" style="height:12px; padding-left:6px;">'
        PESSOA = str(PESSOA)
        #print ("%s Pessoa:" %  PESSOA)
        if "NOME" in PESSOA:
            print ("%s-------------------- NOME --------------------" % x)
            NOME = PESSOA
            print ("\tNOME 1a fase: %s" % NOME)
            #truque: remover os 3 principais ">" identificadores das tags
            NOME = NOME.split('>', 1)
            NOME = str(NOME[1])
            NOME = NOME.split('>', 1)
            NOME = str(NOME[1])
            NOME = NOME.split('>', 1)
            NOME = str(NOME[1])
            print ("\tNOME 2a fase: %s" % NOME)
            #remover agora os ultimos "<"
            NOME = NOME.split('<', -1)
            NOME = str(NOME[0])
            print ("\tNOME 3a fase: %s" % NOME)
            NOMES.append(NOME)
            x=x+1
            print ("-------------------- /NOME --------------------")

        if "IDADE ACTUAL" in PESSOA:
            print ("-------------------- IDADE ACTUAL --------------------")
            IDADE = PESSOA
            print ("\tIDADE 1a fase: %s" % IDADE)

            IDADE = IDADE.split('>', 1)
            IDADE = str(IDADE[1])
            print ("\tIDADE 2a fase: %s" % IDADE)

            IDADE = IDADE.split('>', 1)
            IDADE = str(IDADE[1])
            print ("\tIDADE 3a fase: %s" % IDADE)

            #remover agora os ultimos "<"
            IDADE = IDADE.split('<', -1)
            IDADE = str(IDADE[0])
            print ("\tIDADE 3a fase: %s" % IDADE)
            IDADES.append(IDADE)
            print("-------------------- /IDADE ACTUAL --------------------")

        if "DATA DO DESAPARECIMENTO" in PESSOA:
            print("-------------------- DATA DO DESAPARECIMENTO --------------------")
            DESAPARECIMENTO = PESSOA
            print("\tDESAPARECIMENTO 1a fase: %s" % DESAPARECIMENTO)

            DESAPARECIMENTO = DESAPARECIMENTO.split('>', 1)
            DESAPARECIMENTO = str(DESAPARECIMENTO[1])
            print("\tDESAPARECIMENTO 2a fase: %s" % DESAPARECIMENTO)

            DESAPARECIMENTO = DESAPARECIMENTO.split('>', 1)
            DESAPARECIMENTO = str(DESAPARECIMENTO[1])
            print("\tDESAPARECIMENTO 3a fase: %s" % DESAPARECIMENTO)

            # remover agora os ultimos "<"
            DESAPARECIMENTO = DESAPARECIMENTO.split('<', -1)
            DESAPARECIMENTO = str(DESAPARECIMENTO[0])
            print("\tDESAPARECIMENTO 3a fase: %s" % DESAPARECIMENTO)
            DESAPARECIMENTOS.append(DESAPARECIMENTO)
            print("-------------------- /DATA DO DESAPARECIMENTO --------------------")

        if '<a href="http://www.policiajudiciaria.pt/PortalWeb/page/' in PESSOA:
            print("-------------------- LINK --------------------")
            LINK = PESSOA
            print("\tLINK 1a fase: %s" % LINK)
            # truque: remover os 3 principais ">" identificadores das tags
            LINK = LINK.split('>', 1)
            LINK = str(LINK[1])

            LINK = LINK.split('"', 1)
            LINK = str(LINK[1])
            print("\tLINK 2a fase: %s" % LINK)
            # remover agora os ultimos "<"
            LINK = LINK.split('"', 1)
            LINK = str(LINK[0])
            print("\tLINK 3a fase: %s" % LINK)
            LINK = '<a href="%s">Link</a>' % LINK
            LINKS.append(LINK)
            print("-------------------- /LINK --------------------")

        for IMAGEM in SOPA.findAll('img', {
            'width': '51px'}):  # este pedaco permitiu encontrar o que se pretendia mas vem tudo...
            IMAGEM1 = ""
            print("-------------------- IMAGEM --------------------")
            # print ("imagem 51:%s" % IMAGEM)
            IMAGEM1 = str(IMAGEM)
            IMAGEM1 = IMAGEM1.split('"', 1)
            IMAGEM1 = str(IMAGEM1[1])
            print("IMAGEM-passo 1:%s" % IMAGEM1)

            IMAGEM1 = IMAGEM1.split('"', 1)
            IMAGEM1 = str(IMAGEM1[1])
            IMAGEM1 = IMAGEM1.split('"', 1)
            IMAGEM1 = str(IMAGEM1[1])
            IMAGEM1 = IMAGEM1.split('"', 1)
            IMAGEM1 = str(IMAGEM1[1])
            IMAGEM1 = IMAGEM1.split('"', 1)
            IMAGEM1 = str(IMAGEM1[1])
            print('IMAGEM-passo 2:%s' % IMAGEM1)
            IMAGEM1 = IMAGEM1.split('"', 1)
            IMAGEM = str(IMAGEM1[0])
            print("IMAGEM:%s" % IMAGEM)
            IMAGENS.append(IMAGEM)
            print("-------------------- /IMAGEM --------------------")

    y=1;total=x-1
    for y in range(1, total):
        try:
            NOME=NOMES[y]
            IDADE=IDADES[y]
            DESAPARECIMENTO=DESAPARECIMENTOS[y]
            LINK=LINKS[y]
            IMAGEM = '<img src="http://www.policiajudiciaria.pt/%s"/>' % IMAGENS[y]

            #GUARDAR OS DADOS: funcao GUARDAR_FICHEIRO("NomeFicheiro,modo,dados")
            NomeFicheiro ="C:/Users/CR1PT0/Downloads/PJ9.htm"

            DADOS = '%s - NOME:%s</br>\nIDADE:%s</br>\nDESAPARECIMENTO:%s</br>\nLINK:%s</br>\nIMAGEM:\n%s</br>\n<hr>' % (y, NOME,IDADE,DESAPARECIMENTO,LINK,IMAGEM)
            GUARDAR_FICHEIRO(NomeFicheiro,"a",str(DADOS))
            print (DADOS)
        except:
            print ("erro:%s" % y)
    y=y+1
    print ('%s - NOME:%s</br>\nIDADE:%s</br>\nDESAPARECIMENTO:%s</br>\nLINK:%s</br>\nIMAGEM:%s</br>\n' % (y, NOME,IDADE,DESAPARECIMENTO,LINK,IMAGEM))
    print ("total de pessoas:%s" % y)

    #NOME=IDADE=DESAPARECIMENTO=LINK=IMAGEM=""
    #print (SOPA.prettify())


FICHEIRO = "C:/Users/CR1PT0/Downloads/Lista de Pessoas Desaparecidas.htm"
URL="http://www.policiajudiciaria.pt/PortalWeb/page/%7BAA001182-B622-459A-BF72-FD6EDD83C76F%7D"
URL2="http://www.policiajudiciaria.pt/PortalWeb/page/%7BAA001182-B622-459A-BF72-FD6EDD83C76F%7D/?portletLabel=T2608720801203616720906&actionSubmitted=navegacaoPessoasDesaparecidas&portletParameter=pessoasDesaparecidas&portletNav=2"
#scrap1(FICHEIRO)
LISTA_URLS=["http://www.policiajudiciaria.pt/PortalWeb/page/%7BAA001182-B622-459A-BF72-FD6EDD83C76F%7D", "http://www.policiajudiciaria.pt/PortalWeb/page/%7BAA001182-B622-459A-BF72-FD6EDD83C76F%7D/?portletLabel=T2608720801203616720906&actionSubmitted=navegacaoPessoasDesaparecidas&portletParameter=pessoasDesaparecidas&portletNav=2", "http://www.policiajudiciaria.pt/PortalWeb/page/%7BAA001182-B622-459A-BF72-FD6EDD83C76F%7D/?portletLabel=T2608720801203616720906&actionSubmitted=navegacaoPessoasDesaparecidas&portletParameter=pessoasDesaparecidas&portletNav=3", "http://www.policiajudiciaria.pt/PortalWeb/page/%7BAA001182-B622-459A-BF72-FD6EDD83C76F%7D/?portletLabel=T2608720801203616720906&actionSubmitted=navegacaoPessoasDesaparecidas&portletParameter=pessoasDesaparecidas&portletNav=4"]

total= len(LISTA_URLS)
for z in range(0,total):
    print ("Processsando: %s" % LISTA_URLS[z])
    scrap1(LISTA_URLS[z])