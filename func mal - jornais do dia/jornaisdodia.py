#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "Tomás"

import requests
from bs4 import BeautifulSoup
import os #para directorios e operacoes com ficheiros

import urllib

#------------------------------- COMUM A OUTROS PROJECTOS -------------------------------
def DATA_HORA():
    import datetime
    now = datetime.datetime.now()

    print ("HORA E DATA correntes:")
    IDENTIFICADOR=now.strftime("%Y-%m-%d--%H-%M.htm")
    return IDENTIFICADOR

def GUARDAR_FICHEIRO(DIRECTORIO,FICHEIRO_SAIDA,MODO,IMAGEM):
    #output = NomeFicheiro
    #MODO="a" ou wb
    FICHEIRO_SAIDA = "%s/s" % (DIRECTORIO, FICHEIRO_SAIDA)
    print ("ficheiro de saida - guardar ficheiro:%s" % (FICHEIRO_SAIDA))
    # criar directorio se nao existir. Serve para guardar as imagens
    # import os
    if not os.path.exists(DIRECTORIO):
        os.makedirs(DIRECTORIO)
    z=1
    try:
        MODO='a'

        FICHEIRO_SAIDA = open(FICHEIRO_SAIDA, MODO)  # wb, a para append
        DADOS=('Imagem</br><img src="%s"/></br>' % ("Imagem",IMAGEM))
        print("dados:",DADOS)
        #output.write('NOME:%s</br>\nIDADE:%s</br>\nDESAPARECIMENTO:%s</br>\nLINK:%s</br>\nIMAGEM:%s</br>\n' % (NOME, IDADE, DESAPARECIMENTO, LINK, IMAGEM))
        FICHEIRO_SAIDA.write(DADOS)
        FICHEIRO_SAIDA.close()
        #print (DADOS)
    except:
        print("erro na escrita") #de %s" % IMAGEM_LOCAL)
        ''' fim guardar'''


def REMOVER_FICHEIRO(FICHEIRO_SAIDA,IDENTIFICADOR):
    import os

    ## apagar apenas se existir ##
    if os.path.exists(FICHEIRO_SAIDA):
        os.rename(FICHEIRO_SAIDA, "%s-%s" %(FICHEIRO_SAIDA,IDENTIFICADOR))
        #os.remove(FICHEIRO_SAIDA)
        FICHEIRO_SAIDA = open(FICHEIRO_SAIDA, "a")
        FICHEIRO_SAIDA.write("<h2> %s </h2>" % IDENTIFICADOR)
        FICHEIRO_SAIDA.close()
    else:
        print("Ficheiro %s não existe." % FICHEIRO_SAIDA)
        FICHEIRO_SAIDA = open(FICHEIRO_SAIDA, "a")
        FICHEIRO_SAIDA.write("<h2> %s </h2>" % IDENTIFICADOR)
        FICHEIRO_SAIDA.close()


#------------------------------- COMUM A OUTROS PROJECTOS -------------------------------


def SCRAP(URL):
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    TEXTO = requests.get(URL, headers=headers)
    #print(TEXTO.content)

    CONTEUDOWEB = TEXTO.content
    #SOPA = BeautifulSoup(CONTEUDOWEB, "html.parser")
    return CONTEUDOWEB



def IMAGENS(DIRECTORIO,CONTEUDOWEB):
    SOPA = BeautifulSoup(CONTEUDOWEB, "html.parser")
    #print (SOPA.prettify())

    '''
    #obter artigos - <div style="padding-bottom: 10px;">
    for ARTIGO3 in SOPA.findAll('div', {'style': 'padding-bottom: 10px;'}):
        ARTIGO3 = str(ARTIGO3)
        #print (ARTIGO3)
        if '<a class="linkRSScapa" href=' in ARTIGO3:
            print (ARTIGO3)
    '''

    #OBTER IMAGENS
    #<img src="/imgjornais/20170206_CorreioManha_t.jpg" class="imagemjornal">
    for IMAGEM in SOPA.findAll('img', {'class': 'imagemjornal'}):
        #print ("IMAGEM1:%s" % IMAGEM1)
        IMAGEM=str(IMAGEM) #OBRIGATORIO PARA TRANSFORMAR LISTA EM STRING
        #print ("ANTES:%s" % IMAGEM)
        IMAGEM = IMAGEM.split('/', 1)
        IMAGEM = str(IMAGEM[1])
        #print ("Meio: %s" % IMAGEM)

        NOME_IMAGEM_GRAVAR = IMAGEM.split('/', 1)
        NOME_IMAGEM_GRAVAR = str(NOME_IMAGEM_GRAVAR[1])
        NOME_IMAGEM_GRAVAR = NOME_IMAGEM_GRAVAR.rsplit('"', 1)
        NOME_IMAGEM_GRAVAR = str(NOME_IMAGEM_GRAVAR[0])
        print("NOME_IMAGEM_GRAVAR: %s.jpg" % str(NOME_IMAGEM_GRAVAR))


        IMAGEM = IMAGEM.rsplit('"', 1)
        IMAGEM = "http://jornaisdodia.tk/%s" % str(IMAGEM[0])
        #print ("Link de imagem:%s" % IMAGEM)
        print("Link de imagem:%s/%s" % (DIRECTORIO,NOME_IMAGEM_GRAVAR))

        """guardar imagem apenas"""
        import urllib.request
        try:
            NOME_IMAGEM_GRAVAR="jornaisdodia/%s" % NOME_IMAGEM_GRAVAR
            urllib.request.urlretrieve(IMAGEM, NOME_IMAGEM_GRAVAR)
            GUARDAR_FICHEIRO(DIRECTORIO, FICHEIRO_SAIDA, "wb", NOME_IMAGEM_GRAVAR)
        except:
            print("erro ao gravar imagem")
        """fim guardar imagem"""

        #agora que ja temos todas as imagens numa lista, vamos gravar num ficheiro
        #GUARDAR_FICHEIRO(DIRECTORIO, FICHEIRO_SAIDA, "wb",IMAGEM)


#---------------------------------------
#queremos data e hora. unicos para nao apagar ficheiros anteriores
FICHEIRO_SAIDA="jornaisdodia.htm"
IDENTIFICADOR = DATA_HORA()
#----------------------------------------
URL="http://jornaisdodia.tk"
DIRECTORIO="jornaisdodia"
CONTEUDOWEB = SCRAP(URL) #aqui fazemos apenas o pedido de texto, mas com um navegador
IMAGENS(DIRECTORIO,CONTEUDOWEB)
