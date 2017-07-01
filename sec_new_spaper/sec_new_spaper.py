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
        if not os.path.exists("secnews"):
            os.makedirs("secnews")

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
            DIRECTORIO="secnews"
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

    xDescricao=[]
    xCategoria=[]
    xTitulo=[]
    xImagem=[]
    xData=[]
    xLink=[]
    xAutor=[]

    i = 1
    total=0
    for article in SOPA.findAll('article'):  # este pedaco permitiu encontrar o que se pretendia mas vem tudo...
        #print("\n\n-----------------------ARTIGO:%s" %  article)

        for article2 in article.findAll('div', {'class': 'post-content image-caption-format-1'}):
            Descricao=str(article2)
            #print("---------------------encontrado:\n%s" % articulo)
            Descricao = Descricao.split('>', 1)
            Descricao = str(Descricao[1])
            Descricao = Descricao.split('<', 1)
            Descricao = str(Descricao[0])
            #print("---------------------encontrado:\n%s" % articulo)
            Descricao = Descricao.strip()
            print("\nDescricao: %s" % Descricao)
            xDescricao.append(Descricao)

        for cat in article.find('div', {'class': 'featured-cat'}):
            cat=str(cat)
            print(i,"Categoria:%s" % cat)
            xCategoria.append(cat)

        for titlex in article.find('a', {'rel': 'bookmark'}):
            titlex=str(titlex)
            print(i,"Titulo: %s" % titlex)
            xTitulo.append(titlex)

        for imagem in article.find('div', {'class': 'featured-thumbnail'}):
            imagem = str(imagem)
            imagem = imagem.split('"', 1)
            imagem = str(imagem[1])
            imagem = imagem.split('"', 1)
            imagem = str(imagem[1])
            imagem = imagem.split('"', 1)
            imagem = str(imagem[1])
            imagem = imagem.split('"', 1)
            imagem = str(imagem[1])
            imagem = imagem.split('"', 1)
            imagem = str(imagem[1])
            imagem = imagem.split('"', 1)
            imagem = str(imagem[1])
            imagem = imagem.split('"', 1)
            imagem = str(imagem[1])

            imagem = imagem.split('"', -1)
            imagem = str(imagem[0])
            print(i,"Imagem: %s" % imagem)
            xImagem.append(imagem)

        for autor in article.find('span', {'class': 'theauthor'}):
            autor=str(autor)
            autor = autor.split('"', -1)
            autor = str(autor[1])
            print(i,"Autor: %s" % autor)
            xAutor.append(autor)

        for data in article.find('span', {'class': 'thetime'}):
            data=str(data)
            #data = autor.split('"', 1)
            #data = str(data[1])
            print(i,"Data: %s" % data)
            xData.append(data)

        for link in article.find('span', {'class': 'readMore'}):
            link=str(link)
            #print("---------------------encontrado%s" % link)

            #link = link.split('<', -1)
            #link = str(link[1])
            link = link.split('"', 1)
            link = str(link[1])

            link = link.split('"', 1)
            link = str(link[0])
            link = link.strip()
            print("Link:%s" % link)
            xLink.append(link)
        i=i+1
        total = total + 1
        print("--------------------------------------")

    for i in range(1, total):
        #print("%s - %s - %s" % (i,NOMES[i], IDADES[i]),IMAGENS[i])
        #
        #USAMOS DADOS NO GUARDAR FICHEIRO. SERVE AQUI APENAS DE EXEMPLO
        # DADOS=("%s</br>Nome:%s</br>Crime:%s</br> Idade:%s</br>LINK:%s</br>Imagem:</br>%s </br><hr>" % (i,NOMES[i],CRIMES[i], IDADES[i],LINKS[i],IMAGENS[i]))
        #try:
        #GUARDAR_FICHEIRO(FICHEIRO_SAIDA,"wb", str(xDescricao[i]), str(xCategoria[i]), str(xTitulo[i]), str(xImagem[i]), str(xData[i]), str(xLink[i]), str(xCategoria[i]))
        print(str(xDescricao[i]), str(xCategoria[i]),"|", str(xTitulo[i]),"|", str(xImagem[i]),"|",str(xData[i]),"|", str(xLink[i]),"|", str(xCategoria[i]))
        #except:
        #pass
        CODIGO = ("<br/>Descricao:%s<br/>Categoria:%s <br/>Titulo: %s <br/>Imagem:<br/><img src='%s'><br/>Data: %s <br/>Link: <a href='%s'>%s</a> <br/>Categoria: %s<br>---------------" % (str(xDescricao[i]), str(xCategoria[i]), str(xTitulo[i]), str(xImagem[i]), str(xData[i]),str(xLink[i]), str(xLink[i]),str(xCategoria[i])))
        #CODIGO = ("%s | %s | %s | %s | %s | %s | %s<br>" % (str(xDescricao[i]), str(xCategoria[i]), str(xTitulo[i]), str(xImagem[i]), str(xData[i]), str(xLink[i]),str(xCategoria[i])))
        HTML.write(CODIGO)

    HTML.close

FICHEIRO = "newspaper.htm"
URL="http://www.securitynewspaper.com/"

#apagar ficheiro
#
#
def DATA_HORA():
    import datetime
    now = datetime.datetime.now()

    IDENTIFICADOR=now.strftime("%Y-%m-%d--%H-%M.htm")
    print("HORA E DATA correntes: %s" % IDENTIFICADOR)
    return IDENTIFICADOR


############### comeca aqui
IDENTIFICADOR = DATA_HORA()
#queremos data e hora. unicos para nao apagar ficheiros anteriores
FICHEIRO_SAIDA="./osint_secnewspaper.htm"
#REMOVER_FICHEIRO(FICHEIRO_SAIDA,IDENTIFICADOR)

#GUARDAR_FICHEIRO(FICHEIRO_SAIDA,"a",IDENTIFICADOR,"<br/>","","","")

PAGINA_WEB = "./osint_secnewspaper.htm"
HTML = open(PAGINA_WEB, 'w')
scrap(URL, FICHEIRO_SAIDA)

