#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# coding: utf8
__author__ = "Tomás"

import feedparser
import time
from subprocess import check_output
import sys


feed_name="Jornal de Negócios"
url='http://www.jornaldenegocios.pt/funcionalidades/Rss.aspx'

#db = '/var/www/radio/data/feeds.db'
db= "./feeds_jornal_negocios.db"
PAGINA_WEB="./feeds_jornal_negocios.htm"
limit = 12 * 3600 * 1000

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

    #NEM SEMPRE HA IMAGENS
    try:
        IMAGEM = feed['entries'][x].links[1].href
        #TB FUNCIONA
        #print(IMAGEM)
    except:
        IMAGEM="sem_imagem.png"
    x=x+1
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

#
# add all the posts we're going to print to the database with the current timestamp
# (but only if they're not already in there)
#
f = open(db, 'a')
HTML = open(PAGINA_WEB, 'a')

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
f.close
HTML.close
#
# output all of the new posts
#
count = 1
blockcount = 1
for TITULO in posts_to_print:
    if count % 5 == 1:
        print("\n" + time.strftime("%a, %b %d %I:%M %p") + '  ((( ' + feed_name + ' - ' + str(blockcount) + ' )))')
        print("-----------------------------------------\n")
        blockcount += 1
    #print(title + "\n")
    print("%s--%s--%s\n" % (TITULO,DATA,LINK))
    count += 1

feed = feedparser.parse(url)
print ("%s %s" % (feed['entries'][0]['title'],feed['entries'][0]['description']))
'''
#TOTALMENTE FUNCIONAL - vai buscar todos os dados e mostra
x=0
for key in feed["entries"]:
    print("\nnoticia %s" % x)
    title = feed['entries'][x].title
    description = feed['entries'][x].summary,
    url = feed['entries'][x].link,
    data=feed['entries'][x].published
    try:
        IMAGEM = feed['entries'][x].links[1].href,
    except:
        IMAGEM=""

    print("Titulo:%s" % title)
    print("Publicado:%s" % data)
    print("Descrição:%s" % description)
    print("Imagem:%s" % IMAGEM)
    print("Link:%s" % url)
    x=x+1
'''

"""
#totalmente funcional - vai buscar a noticia 19. pode ser alterado para ser 0 (primeira) ou outra qualquer
print("noticia 19")
title = feed['entries'][19].title
description = feed['entries'][19].summary,
url = feed['entries'][19].link,
IMAGEM=feed['entries'][19].links[1].href,

print(feed["entries"][19])
print("title:%s" % title)
print("description:%s" % description)
print("IMAGEM:%s" % IMAGEM)
print("url:%s" % url)
"""


"""
import pprint
pp = pprint.PrettyPrinter(indent=4)
#pp.pprint(feed)
"""