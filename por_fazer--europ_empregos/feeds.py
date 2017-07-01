#!/usr/bin/env python
# -*- coding: utf-8 -*-
__author__ = "tomás"

#codificacao:
texto = "uma linha de texto"
#print("Encoded String bas64: " , texto.encode('base64','strict'))
print("Encoded String utf  : " , texto.encode('utf-8','strict'))


import feedparser
import time
from subprocess import check_output
import sys

feed_name="Jornal de Negócios"
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
import feedparser

url2 = 'http://www.blog.pythonlibrary.org/feed/'
feed = feedparser.parse(url)
for key in feed["entries"]:
    print ("%s\nData:%s\nResumo:%s\nLink:%s\n" % (key["title"],key["published"],key["summary"],key["link"]))
#print(feed)

feed = feedparser.parse(url1)
for key in feed["entries"]:
    print ("%s\nData:%s\nResumo:%s\nLink:%s\nImagem:\n" % (key["title"],key["published"],key["summary"],key["link"]))

import pprint
pp = pprint.PrettyPrinter(indent=4)
#pp.pprint(feed)
"""