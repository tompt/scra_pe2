#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "tomas"
#este ficheiro depende do scrape19_historial para funcionar
import requests
from bs4 import BeautifulSoup
import string
import re
import lxml #para usar como  parser html
import urllib
import scrape10_historial

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

def GUARDAR_FICHEIRO(FICHEIRO_SAIDA,MODO,NOME,CRIME,IDADE,LINK,IMAGEM):
    #output = NomeFicheiro
    #MODO="a" ou wb
    try:
        ''' tentar gravar a imagem localmente'''
        #criar directorio se nao existir. Serve para guardar as imagens
        import os
        if not os.path.exists("InterMostWtd"):
            os.makedirs("InterMostWtd")

        #se tentarmos gravar nome e imagem temos problemas com acentuação
        #print ("nome:%s - Imagem:%s" % (NOME,IMAGEM))
        #TRUQUE: ir buscar o link da pessoa, e remover apenas o nome (parte mais à direita)
        #print ("LINK:",LINK)
        IMAGEM_LOCAL = LINK.rsplit('/', 1)
        IMAGEM_LOCAL = ("%s.jpg" % str(IMAGEM_LOCAL[1]))
        #print ("IMAGEM_LOCAL:%s" % (IMAGEM_LOCAL))
        '''guardar agora as imagens com esse nome'''
        try:
            import urllib.request
            DIRECTORIO="InterMostWtd"
            urllib.request.urlretrieve(IMAGEM, "%s/%s" % (DIRECTORIO,IMAGEM_LOCAL))
            print ("Ficheiro %s guardado com sucesso" % IMAGEM_LOCAL)
        except:
            #NAO FUNCIONA. CHARS ESQUISITOS.. print ("Erro ao gravar localmente a imagem %s" % IMAGEM_LOCAL)
            print ("erro ao gravar localmente a imagem")
            pass

        MODO='a'
        FICHEIRO_SAIDA = open(FICHEIRO_SAIDA, MODO, encoding='utf8')  # wb, a para append
        HISTORIAL = scrape10_historial.HISTORIAL(LINK)
        NACIONALIDADE = scrape10_historial.NACIONALIDADE(LINK)
        DADOS=('Nome:%s</br>Nacionalidade:%s</br>Crime:%s</br> Idade:%s</br>LINK: <a href="%s">%s</a></br>Imagem:%s/%s\
        </br><img src="%s/%s"/></br>Historial:<br>%s<hr>' % (NOME,NACIONALIDADE,CRIME,IDADE,LINK,LINK,DIRECTORIO,IMAGEM_LOCAL,DIRECTORIO,IMAGEM_LOCAL,HISTORIAL))
        #output.write('NOME:%s</br>\nIDADE:%s</br>\nDESAPARECIMENTO:%s</br>\nLINK:%s</br>\nIMAGEM:%s</br>\n' % (NOME, IDADE, DESAPARECIMENTO, LINK, IMAGEM))
        FICHEIRO_SAIDA.write(DADOS)
        FICHEIRO_SAIDA.close()
        #print (DADOS)
    except:
        print("erro na escrita") #de %s" % IMAGEM_LOCAL)
        ''' fim guardar'''

def scrap(URL,FICHEIRO_SAIDA):
    #PARA FICHEIROS:
    #FICHEIRO = "C:/Users/CR1PT0/ficheiro.htm"
    #htmlfile = open(FICHEIRO, 'rb')
    #html = htmlfile.read()
    #SOPA = BeautifulSoup(html, "html.parser")
    #print (SOPA)

    #PARA URLS:
    #REQUESTS SIMPLES:
    # TEXTO = requests.get(URL)
    #REQUESTS COM USER-AGENT
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    TEXTO = requests.get(URL, headers=headers)
    #print(TEXTO.content)

    CONTEUDOWEB = TEXTO.content
    SOPA = BeautifulSoup(CONTEUDOWEB, "html.parser")
    #print (SOPA.prettify())


    NOMES=[]
    IDADES=[]
    IMAGENS=[]
    CRIMES=[]
    LINKS=[]
    y = 1
    for NOME in SOPA.findAll('div', {'class': 'views-field views-field-title-1'}):  # este pedaco permitiu encontrar o que se pretendia mas vem tudo...
        NOME = str(NOME)
        if '<div class="views-field views-field-title-1"><span class="field-content">'in NOME:
            #print ("sem mexer:%s" % NOME)
            NOME = NOME.split('>', 1)
            NOME = str(NOME[1])
            NOME = NOME.split('>', 1)
            NOME = str(NOME[1])

            NOME = NOME.split('<', 1)
            NOME = str(NOME[0])
            print ("%s - NOME:%s" % (y,NOME))
            NOMES.append(NOME)
            y=y+1
        #for PESSOA in SOPA.findAll('div', {'class': 'wanted_teaser_quick_info views-fieldset'}):  # este pedaco permitiu encontrar o que se pretendia mas vem tudo...
        x=1
    for IMAGEM2 in SOPA.findAll('img', {'alt': '"NOMES[x]"'}):  # este pedaco permitiu encontrar o que se pretendia mas vem tudo...
        IMAGEM2 = str(IMAGEM2)
        print ("IMAGEM STR:%s - " %  IMAGEM2)

    for IDADE in SOPA.findAll('span', {'class': 'date-display-interval'}):  # este pedaco permitiu encontrar o que se pretendia mas vem tudo...
        IDADE = str(IDADE)
        #print(IDADE)
        if '<span class="date-display-interval">'in IDADE:
            #print("sem mexer:%s" % IDADE)
            IDADE = IDADE.split('>', 1)
            IDADE = str(IDADE[1])
            #print ("mexendo:%s" % IDADE)
            IDADE = IDADE.split('y', 1)
            IDADE = str(IDADE[0])
            print ("%s - IDADE:%s" % (x,IDADE))
            IDADES.append(IDADE)
            x=x+1


    z=1
    for IMAGEM1 in SOPA.findAll('img', {'typeof': 'foaf:Image'}):
        #print ("IMAGEM1:%s" % IMAGEM1)
        IMAGEM1=str(IMAGEM1) #OBRIGATORIO PARA TRANSFORMAR LISTA EM STRING
        if 'logo' in IMAGEM1:
            exit
        elif 'logo logoEpol' in IMAGEM1:
            pass
        else:
            IMAGEM1 = IMAGEM1.split('"', 1)
            IMAGEM1 = str(IMAGEM1[1])
            #print("IMAGEM2:%s" % (IMAGEM1))
            IMAGEM1 = IMAGEM1.split('"', 1)
            IMAGEM1 = str(IMAGEM1[1])
            #print("IMAGEM3:%s" % (IMAGEM1))
            IMAGEM1 = IMAGEM1.split('"', 1)
            IMAGEM1 = str(IMAGEM1[1])
            #print("IMAGEM4:%s" % (IMAGEM1))
            #-------------aqui ja temos inicio da imagem
            IMAGEM1 = IMAGEM1.split('"', 1)
            IMAGEM1 = str(IMAGEM1[0])

            #-------------remover o itok do final
            IMAGEM1 = IMAGEM1.split('?', 1)
            IMAGEM = str(IMAGEM1[0])

            #IMAGEM = '<img src="%s"/>' % (IMAGEM)
            #print(IMAGEM)
            IMAGENS.append(IMAGEM)
            z=z+1

    #--------------cri me-----
    #<div class="field-content">Arson, Murder, grievous bodily injury</div>
    z=1
    #<div class ="views-field views-field-field-crime"> <div class ="field-content">
    for CRIME in SOPA.findAll('div', {'class': 'views-field views-field-field-crime'}):  # este pedaco permitiu encontrar o que se pretendia mas vem tudo...
        CRIME=str(CRIME) #OBRIGATORIO PARA TRANSFORMAR LISTA EM STRING
        #print("%s - crime2:%s" % (z, CRIME))
        CRIME = CRIME.split('>', 1)
        CRIME = str(CRIME[1])
        #print("-----crime2:%s" % (CRIME))
        CRIME = CRIME.split('>', 1)
        CRIME = str(CRIME[1])
        #print("-----crime3:%s" % (CRIME))
        ####agora o fim
        CRIME = CRIME.split('<', -1)
        CRIME = str(CRIME[0])
        print("%s - CRIME:%s" % (z,CRIME))
        CRIMES.append(CRIME)
        z=z+1
    #--------------cri me-----
    #link <a href="https://eumostwanted.eu/barqasho-bobel-nahir



    #--------------LINK-----
    #<div class="field-content">Arson, Murder, grievous bodily injury</div>
    z=1
    #<div class ="views-field views-field-field-crime"> <div class ="field-content">
    for LINK in SOPA.findAll('span', {'class':'field-content'}):  # este pedaco permitiu encontrar o que se pretendia mas vem tudo...
        LINK=str(LINK) #OBRIGATORIO PARA TRANSFORMAR LISTA EM STRING
        if '<a href="' in LINK:
            #print (LINK)
            LINK = LINK.split('>', 1)
            LINK = str(LINK[1])
            #print(LINK)

            LINK = LINK.split('="', 1)
            LINK = str(LINK[1])
            #print(LINK)

            LINK = LINK.split('">', 1)
            LINK = str(LINK[0])
            print(('%s - LINK:<a href="%s"> %s </a>') % (z,LINK,LINK))
            #LINK = '<a href="%s">%s</a>'% (LINK,LINK)
            LINKS.append(LINK)

            z=z+1

    #-------------/LINK-----

    total = len(NOMES)-1
    for i in range(1, total):
        #print("%s - %s - %s" % (i,NOMES[i], IDADES[i]),IMAGENS[i])
        #
        #USAMOS DADOS NO GUARDAR FICHEIRO. SERVE AQUI APENAS DE EXEMPLO
        # DADOS=("%s</br>Nome:%s</br>Crime:%s</br> Idade:%s</br>LINK:%s</br>Imagem:</br>%s </br><hr>" % (i,NOMES[i],CRIMES[i], IDADES[i],LINKS[i],IMAGENS[i]))
        #try:
        GUARDAR_FICHEIRO(FICHEIRO_SAIDA,"wb", str(NOMES[i]), str(CRIMES[i]), str(IDADES[i]), str(LINKS[i]), str(IMAGENS[i]))
        #except:
        #pass
    '''
            < img
            typeof = "foaf:Image"
            src = "https://eumostwanted.eu/sites/default/files/styles/wanted_medium/public/wanted_pictures/ferguson.jpg?itok=_-Mv2z-r"
            alt = "FERGUSON, Derek"
            title = "FERGUSON, Derek"
            height = "500"
            width = "400" >
    '''

    '''
    IMAGENS = []
    for img in SOPA.findAll('img'):
        IMAGENS.append(img.get('src'))
        print (img)
        GUARDAR_FICHEIRO("NomeFicheiro", "a", img)
    '''

FICHEIRO = "C:/Users/CR1PT0/Downloads/Lista de Pessoas Desaparecidas.htm"
URL="https://eumostwanted.eu/"

#apagar ficheiro
#
#
def DATA_HORA():
    import datetime
    now = datetime.datetime.now()

    print ("HORA E DATA correntes:")
    IDENTIFICADOR=now.strftime("%Y-%m-%d--%H-%M.htm")
    return IDENTIFICADOR


############### comeca aqui
IDENTIFICADOR = DATA_HORA()
#queremos data e hora. unicos para nao apagar ficheiros anteriores
FICHEIRO_SAIDA="euroMostWanted.htm"
REMOVER_FICHEIRO(FICHEIRO_SAIDA,IDENTIFICADOR)

GUARDAR_FICHEIRO(FICHEIRO_SAIDA,"a",IDENTIFICADOR,"<br/>","","","")

scrap(URL, FICHEIRO_SAIDA)

