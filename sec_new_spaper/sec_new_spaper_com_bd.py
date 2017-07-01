#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "Tomás"

#este ficheiro depende do scrape19_historial para funcionar
import requests
from bs4 import BeautifulSoup
import string
import re
import lxml #para usar como  parser html
import urllib

#
# function to get the current time
#
current_time_millis = lambda: int(round(time.time() * 1000))
current_timestamp = current_time_millis()

def post_is_in_db(title):
    with open(db, 'r') as database:
        for line in database:
            if title in line:
                return True
    return False

# return true if the title is in the database with a timestamp > limit
def post_is_in_db_with_old_timestamp(title):
    with open(db, 'r') as database:
        for line in database:
            #line=line.encode('UTF-8')
            #print(line)
            #line=line.decode('UTF-8')
            #print("-----------",line)
            if title in line:
                print("Noticia já existe na BD. Saltando..")
                #ts_as_string = line.split('|', 3)[1]
                #ts = int(ts_as_string)
                #if current_timestamp - ts > limit:
                #    return True
    return False

#
# get the feed data from the url
#
feed = feedparser.parse(url)

#
# figure out which posts to print
#
posts_to_print = []
posts_to_skip = []
LISTA_DATA = []
LISTA_RESUMO = []
LISTA_LINK = []
LISTA_IMAGENS=[]

x=0
for post in feed.entries:
    # if post is already in the database, skip it
    # TODO check the time
    TITULO = post.title
    #print("%s\nData:%s\nResumo:%s\nLink:%s\n" % (post["title"], post["published"], post["summary"], post["link"]))
    #TITULO=post["title"]
    DATA=post["published"]
    RESUMO=post["summary"]
    LINK=post["link"]
    #FUNCIONA TUDO
    # print(post)
    #print(feed['entries'][x].link,) #isto eh o mesmo que o LINK

    if post_is_in_db_with_old_timestamp(TITULO):
        posts_to_skip.append(TITULO)
        LISTA_DATA.append(DATA)
        LISTA_RESUMO.append(RESUMO)
        LISTA_LINK.append(LINK)
        LISTA_IMAGENS.append(IMAGEM)
    else:
        #posts_to_print.append(TITULO)
        posts_to_print.append(TITULO)
        LISTA_DATA.append(DATA)
        LISTA_RESUMO.append(RESUMO)
        LISTA_LINK.append(LINK)
        LISTA_IMAGENS.append(IMAGEM)

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

        for Descricao in article.findAll('div', {'class': 'post-content image-caption-format-1'}):
            Descricao=str(Descricao)
            #print("---------------------encontrado:\n%s" % articulo)
            Descricao = Descricao.split('>', 1)
            Descricao = str(Descricao[1])
            Descricao = Descricao.split('<', 1)
            Descricao = str(Descricao[0])
            #print("---------------------encontrado:\n%s" % articulo)
            Descricao = Descricao.strip()
            print("\nDescricao: %s" % Descricao)
            xDescricao.append(Descricao)

        for Categoria in article.find('div', {'class': 'featured-cat'}):
            Categoria=str(cat)
            print(i,"Categoria:%s" % Categoria)
            xCategoria.append(Categoria)

        for TITULO in article.find('a', {'rel': 'bookmark'}):
            TITULO=str(TITULO)
            print(i,"Titulo: %s" % TITULO)
            xTitulo.append(TITULO)

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



f.close
HTML.close
#-------------------
PAGINA_WEB = "./osint_secnewspaper.htm"
HTML = open(PAGINA_WEB, 'w')
scrap(URL, FICHEIRO_SAIDA)

db= "./osint_feeds_sec_new_spaper.db"
f = open(db, 'a')
x=0
for i in posts_to_print:
    print(x,i,LISTA_DATA[x],LISTA_RESUMO[x],LISTA_LINK[x],LISTA_IMAGENS[x])
    x=x+1

x=0
for TITULO in posts_to_print:
    if not post_is_in_db(TITULO):
        #original e funcional
        ## f.write(title + "|" + DATA + "|" + RESUMO + "|" + str(current_timestamp) + "\n")
        #funcional meu f.write(TITULO + "|" + DATA + "|" + RESUMO + "|" + LINK + "|" + IMAGEM + "|" + str(current_timestamp) + "\n")
        f.write(TITULO + "|" + LISTA_DATA[x] + "|" + LISTA_RESUMO[x] + "|" + LISTA_LINK[x] + "|" + LISTA_IMAGENS[x] + "|" + str(current_timestamp) + "\n")

        #teste com a PAGINA_WEB
        CODIGO=('<h3>%s</h3> Data:%s %s<br/>Resumo:%s <br/>Link:<a href="%s">%s</a> <br>Imagem:<br/><img src="%s"/><br><hr>' % (TITULO,LISTA_DATA[x],str(current_timestamp),LISTA_RESUMO[x],LISTA_LINK[x],LISTA_LINK[x],LISTA_IMAGENS[x]))
        HTML.write(CODIGO)
        x=x+1