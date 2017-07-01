#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "tomas"

import requests
from bs4 import BeautifulSoup
import string
import re
import lxml #para usar como  parser html
import urllib

def REMOVER_FICHEIRO(DIRECTORIO,FICHEIRO_SAIDA,IDENTIFICADOR):
    import os

    ## apagar apenas se existir ##
    FICHEIROTE=("%s/%s" % (DIRECTORIO,FICHEIRO_SAIDA))
    print(FICHEIROTE)

    if os.path.exists(FICHEIROTE):
        try:
            os.rename(FICHEIROTE, "%s-%s" %(FICHEIROTE,IDENTIFICADOR))
            #os.remove(FICHEIRO_SAIDA)
            FICHEIRO_SAIDA = open(FICHEIROTE, "w")
            FICHEIRO_SAIDA.write("<h2> %s </h2>" % IDENTIFICADOR)
            FICHEIRO_SAIDA.close()
        except:
            FICHEIRO_SAIDA = open(FICHEIROTE, "w")
            FICHEIRO_SAIDA.write("<h2> %s </h2>" % IDENTIFICADOR)
            FICHEIRO_SAIDA.close()
            print("Surgiu erro ao tentar renomear ficheiro. Existe?")
    else:
        print("Ficheiro %s não existe." % FICHEIROTE)
        FICHEIRO_SAIDA = open(FICHEIROTE, "w")
        FICHEIRO_SAIDA.write("<h2> %s </h2>" % IDENTIFICADOR)
        FICHEIRO_SAIDA.close()

def GUARDAR_FICHEIRO(DIRECTORIO,FICHEIRO_SAIDA,MODO,DADOS):
    try:
        #criar directorio se nao existir. Serve para guardar as imagens
        import os
        if not os.path.exists(DIRECTORIO):
            os.makedirs(DIRECTORIO)
    except:
        print("Guarda será em %s" % DIRECTORIO)

    FICHEIROTE=("%s/%s" % (DIRECTORIO,FICHEIRO_SAIDA))
    #print(FICHEIROTE)

    try:
        FICHEIRO_SAIDA = open(FICHEIROTE, MODO)  # wb, a para append
        FICHEIRO_SAIDA.write(DADOS)
        FICHEIRO_SAIDA.close()
    except:
        print("erro ao tentar gravar dados")

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

    #teste - queremos apanhar isto:
    #'<a title="Go to page 2" href="/careers-procurement/vacancies?page=1">2</a>'
    """
    <div class="item-list">
        <ul class="pagination pager">
            <li class="current first"><a href="">1</a></li>
            <li><a title="Go to page 2" href="/careers-procurement/vacancies?page=1">2</a></li>
            <li class="arrow"><a title="Go to next page" href="/careers-procurement/vacancies?page=1">next ›</a></li>
            <li class="arrow last"><a title="Go to last page" href="/careers-procurement/vacancies?page=1">last »</a></li>
        </ul>
    </div>

    #tentar arranjar as caixas das ofertas
      <div class="group-link-wrapper field-group-link">
      <div class="views-field views-field-deadline">    <span class="views-label views-label-deadline">Deadline: </span>    <span class="field-content">21 Mar 2017</span>  </div>
      <div class="views-field views-field-contract-type">        <span class="field-content">Non-Restricted Temporary Agent</span>  </div>
      <div class="views-field views-field-title">        <h2 class="field-content"><a href="/careers-procurement/vacancies/vacancy/108">Specialist in the Strategic and External Affairs Group in the Corporate Services Business Area at Europol – AD6</a></h2>  </div>
      <div class="views-field views-field-department">        <span class="field-content">Governance Department</span>  </div>
      <div class="views-field views-field-reference-number">        <span class="field-content">Europol/2017/TA/AD6/285</span>  </div>
      <div class="views-field views-field-application-url">        <span class="field-content"><a href="https://emea3.recruitmentplatform.com/syndicated/private/syd_apply.cfm?ID=QJ4FK026203F3VBQB8NV4LOD7&amp;nPostingTargetID=108" class="link-button" target="_blank">Apply</a></span>  </div>              </div>
    """
    CAIXAS=1;Z=1;REFERENCIA=""
    #LDATA=[];LTIPOdeContrato=[];LDepartamento=[];LREFERENCIA=[];LLIGACAO1=[];LLIGACAO2=[]
    for CAIXA in SOPA.findAll('div', {'class': 'group-link-wrapper field-group-link'}):  # este pedaco permitiu encontrar o que se pretendia mas vem tudo...
        #esta solucao foi inteligente na altura.. numerar porque todos os dados de interesse vêm seguidos
        print("----------------------------\nOferta:%s" % CAIXAS)
        zz=1
        for CAIXA2 in CAIXA.findAll('span', {'class': 'field-content'}):  # este pedaco permitiu encontrar o que se pretendia mas vem tudo...
            DADOS = str(CAIXA2)
            print (DADOS)
            if zz==1:
                DATA = DADOS.split('>', 1)
                DATA = str(DATA[1])
                #2a volta
                DATA = DATA.split('<', 1)
                DATA = str(DATA[0])
                print("\tData Limite para concorrer: %s" % (DATA))
                LDATA.append(DATA)

            if zz==2:
                TIPOdeContrato = DADOS.split('>', 1)
                TIPOdeContrato = str(TIPOdeContrato[1])
                #2a volta
                TIPOdeContrato = TIPOdeContrato.split('<', 1)
                TIPOdeContrato = str(TIPOdeContrato[0])
                print("\tTipo de Contrato: %s" % (TIPOdeContrato))
                LCARGO.append(TIPOdeContrato)

            if zz==3:
                Departamento = DADOS.split('>', 1)
                Departamento = str(Departamento[1])
                #2a volta
                Departamento = Departamento.split('<', 1)
                Departamento = str(Departamento[0])

                if Departamento=="Restricted":
                    print("\tzz3 Restrito - Candidatura não possível")
                    REFERENCIA="Restrito"
                else:
                    print("\tDepartamento/Funções: %s" % (Departamento))
                LDepartamento.append(Departamento)

            if zz==4:
                if REFERENCIA=="Restrito": #VEM DO PONTO ANTERIOR... SENAO NAO BATE CERTO..
                    print("\tzz4 Referência: %s" % ("Não é possível a candidatura a externos"))
                    LREFERENCIA.append("Restrito")
                else:
                    REFERENCIA=""
                    REFERENCIA = DADOS.split('>', 1)
                    REFERENCIA = str(REFERENCIA[1])
                    #2a volta
                    REFERENCIA = REFERENCIA.split('<', 1)
                    REFERENCIA = str(REFERENCIA[0])
                    print("\tzz4 Referência: %s" % (REFERENCIA))
                    LREFERENCIA.append(REFERENCIA)
                REFERENCIA = ""

            if zz==5:
                LIGACAO1 = CAIXA2

                for link in LIGACAO1.findAll('a'):
                    LIGACAO1=("%s"% link.get('href'))
                    print("Ligação 5: %s" % (LIGACAO1))
                    LLIGACAO1.append(LIGACAO1)
                    LLIGACAO2.append("")

            #ESTE 6 É UMA TRETA... NEM SEMPRE TÊM 5...
            if zz==6:
                LIGACAO2 = CAIXA2

                for link in LIGACAO2.findAll('a'):
                    LIGACAO2=("%s"% link.get('href'))
                    LLIGACAO1.append("Restrito")

                print("Ligação 6: %s" % (LIGACAO2))
                LLIGACAO2.append(LIGACAO2)

            zz=zz+1

        CAIXAS=CAIXAS+1
    return LDATA,LCARGO,LDepartamento,LREFERENCIA,LLIGACAO1,LLIGACAO2


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

def DATA_HORA():
    import datetime
    now = datetime.datetime.now()
    IDENTIFICADOR=now.strftime("%Y-%m-%d--%H-%M.htm")
    print ("HORA E DATA correntes: %s" % IDENTIFICADOR )
    return IDENTIFICADOR

#FICHEIRO = "C:/Users/CR1PT0/Downloads/Lista de Pessoas Desaparecidas.htm"

'''aqui so temos a 1a pagina, temos de ver quantas tem'''
URL1="https://www.europol.europa.eu/careers-procurement/vacancies"
#apagar ficheiro
LDATA=[];LCARGO=[];LDepartamento=[];LREFERENCIA=[];LLIGACAO1=[];LLIGACAO2=[]
############### comeca aqui
IDENTIFICADOR = DATA_HORA()
#queremos data e hora. unicos para nao apagar ficheiros anteriores
FICHEIRO_SAIDA="euroVacancies.htm"
DIRECTORIO="./euroVacancies"
REMOVER_FICHEIRO(DIRECTORIO,FICHEIRO_SAIDA,IDENTIFICADOR)
#GUARDAR_FICHEIRO(DIRECTORIA,FICHEIRO_SAIDA,"a",IDENTIFICADOR,"<br/>","","","")

scrap(URL1, FICHEIRO_SAIDA)

#isto veio do scrap...var globais - eh para guardar. aqui o print eh so para mostrar
#print(LDATA, LCARGO, LDepartamento, LREFERENCIA, LLIGACAO1, LLIGACAO2)

TOTAL=len(LDATA)
print("total:%s " % TOTAL)

X=1
print("Guardando dados em %s/%s" % (DIRECTORIO,FICHEIRO_SAIDA))
for i in range(len(LLIGACAO2)):
    print("%s Data:%s Cargo:%s Departamento:%s Referência:%s Ligação:%s" % (X,LDATA[i],LCARGO[i],LDepartamento[i],LREFERENCIA[1],LLIGACAO1[i]))

    #GUARDAR_FICHEIRO(DIRECTORIA,FICHEIRO_SAIDA,"a",IDENTIFICADOR,"<br/>","","","")
    DADOS= ('%s;%s;%s;%s;<br/><a href="%s">%s;</a><br/><br/>' % (LDATA[i],LCARGO[i],LDepartamento[i],LREFERENCIA[1],LLIGACAO1[i],LLIGACAO1[i]))

    GUARDAR_FICHEIRO(DIRECTORIO,FICHEIRO_SAIDA,"a",DADOS)
    X=X+1

