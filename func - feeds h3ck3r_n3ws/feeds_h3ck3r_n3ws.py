#!/usr/bin/env python
# -*- coding: utf-8 -*-
__author__ = "tomás"

feed_name="H3ck3r N3ws"

"""
#codificacao:
texto = "uma linha de texto"
#print("Encoded String bas64: " , texto.encode('base64','strict'))
print("Encoded String utf  : " , texto.encode('utf-8','strict'))


import feedparser
import time
from subprocess import check_output
import sys

feed_name="Jornal de Negocios"
url='http://www.jornaldenegocios.pt/funcionalidades/Rss.aspx'
url1="http://www.sti.nasa.gov/scan/rss99-01.xml"

#feed_name = sys.argv[1]
#url = sys.argv[2]

#db = '/var/www/radio/data/feeds.db'
db= "./feeds.db"
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

for post in feed.entries:
    # if post is already in the database, skip it
    # TODO check the time
    title = post.title
    #print("%s\nData:%s\nResumo:%s\nLink:%s\n" % (post["title"], post["published"], post["summary"], post["link"]))
    #TITULO=post["title"]
    DATA=post["published"]
    RESUMO=post["summary"]
    LINK=post["link"]

    if post_is_in_db_with_old_timestamp(title):
        posts_to_skip.append(title)
        LISTA_DATA.append(DATA)
        LISTA_RESUMO.append(RESUMO)
        LISTA_LINK.append(LINK)
    else:
        #posts_to_print.append(title)
        posts_to_print.append(title)
        LISTA_DATA.append(DATA)
        LISTA_RESUMO.append(RESUMO)
        LISTA_LINK.append(LINK)

#
# add all the posts we're going to print to the database with the current timestamp
# (but only if they're not already in there)
#
f = open(db, 'a')
for title in posts_to_print:
    if not post_is_in_db(title):
        f.write(title + "|" + DATA  + "|" +  RESUMO  +"|"+ str(current_timestamp) + "\n")
f.close

#
# output all of the new posts
#
count = 1
blockcount = 1
for title in posts_to_print:
    if count % 5 == 1:
        print("\n" + time.strftime("%a, %b %d %I:%M %p") + '  ((( ' + feed_name + ' - ' + str(blockcount) + ' )))')
        print("-----------------------------------------\n")
        blockcount += 1
    print(title + "\n")
    count += 1
"""

################################################################# teste
#"H3ck3r N3ws"

import feedparser

url2 = 'http://distrowatch.com/news/dwd.xml' #distr linux/bsd
url2 = 'http://feeds.feedburner.com/TheHackersNews'

#----------------------------------------------- H3ck3r N3ws -------------------
feed = feedparser.parse(url2)

#abrir ficheiro
file = open("h3ck3rn3ws.htm","w")
#file.write("hello World")

#ler informacoes, mostrar e guardar no ficheiro.
for key in feed["entries"]:
    print ("------------------------------------------------------------\n")
    DESCRICAO=key["description"]
    #REMOVEM-se os ultimos 297 caracteres pois sao apenas uma imagem de lixo com respectivo link
    DESCRICAO=DESCRICAO[:-298]

    #por alguma razao aparece muita vez a string abaixo e tem de ser removida.
    #<div class ="feedflare">
    xx='<div class ="feedflare">'
    DESCRICAO=DESCRICAO.replace('feedflare', ''); DESCRICAO=DESCRICAO.replace('<div class=', '');DESCRICAO=DESCRICAO.replace('""', '');

    print ("Nome:%s\nData:%s\nLink:%s\nDescrição:%s...\n" % (key["title"],key["published"],key["link"],DESCRICAO))
    file.write("------------------------------------------------------------<br>")
    #mais facil de ler mas igual:
    # file.write("Nome:%s<br>Data:%s<br>Link:<a href=\"%s\">%s</a><br>Descrição:%s<br>" % (key["title"], key["published"], key["link"], key["link"], key["description"]))
    file.write("%s<br>%s<br><a href=\"%s\">%s</a><br>%s...<br>" % (key["title"], key["published"], key["link"], key["link"], DESCRICAO))
#print(feed)
print ("#----------------------------------------------- h3ck3r n3ws- -------------------")
feed = feedparser.parse(url2)
for key in feed["entries"]:
    DESCRICAO=key["description"]
    DESCRICAO=DESCRICAO[:-298]
    print ("Nome:%s\nLink:%s\nDescrição:%s...\n" % (key["title"],key["link"],DESCRICAO))
    #file.write("2 ------------------------------------------------------------<br/>")
    #file.write("2 Nome:%s\nData:%s\nLink:%s\nDescrição:%s\n" % (key["title"], key["published"], key["link"], key["description"]))
    #file.write("%s<br/>Data:%s<br><a href=\"%s\">%s</a><br/>Descrição:%s...<br/>" % (key["title"], key["published"], key["link"], key["link"],DESCRICAO))
print ("#----------------------------------------------- fim h3ck3r n3ws- -------------------")

file.close()
#/fechar ficheiro
#print(feed)


#///////--------------------------------------- /pacotes linux/bsd -------------------

"""
feed = feedparser.parse(url1)
for key in feed["entries"]:
    print ("%s\nData:%s\nResumo:%s\nLink:%s\nImagem:\n" % (key["title"],key["published"],key["summary"],key["link"]))
"""
'''
import pprint
pp = pprint.PrettyPrinter(indent=4)
#pp.pprint(feed)
'''