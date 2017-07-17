#!/usr/bin/env python
# -*- coding: UTF-8 -*-
__author__ = "tomás"

#codificacao:
texto = "uma linha de texto"
#print("Encoded String bas64: " , texto.encode('base64','strict'))
print("Encoded String utf  : " , texto.encode('utf-8','strict'))


import feedparser
import time
from subprocess import check_output
import sys

feed_name="Distribuições Linux/BSD/..."
url='http://www.jornaldenegocios.pt/funcionalidades/Rss.aspx'
url1="http://www.sti.nasa.gov/scan/rss99-01.xml"
url='http://distrowatch.com/news/dwd.xml'
#feed_name = sys.argv[1]
#url = sys.argv[2]

#db = '/var/www/radio/data/feeds.db'
db= "./feeds_distrowatch.db"
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
                print("Inform. já existe na BD. Saltando..")
                #ts_as_string = line.split('|', 3)[1]
                #ts = int(ts_as_string)
                #if current_timestamp - ts > limit:
                #    return True
    return False

def principal(url,feed_name,db):
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
        #teste--DATA=post["published"]
        RESUMO=post["summary"]
        LINK=post["link"]

        if post_is_in_db_with_old_timestamp(title):
            posts_to_skip.append(title)
            #LISTA_DATA.append(DATA)
            LISTA_RESUMO.append(RESUMO)
            LISTA_LINK.append(LINK)
        else:
            #posts_to_print.append(title)
            posts_to_print.append(title)
            #--testeLISTA_DATA.append(DATA)
            LISTA_RESUMO.append(RESUMO)
            LISTA_LINK.append(LINK)

    #
    # add all the posts we're going to print to the database with the current timestamp
    # (but only if they're not already in there)
    #
    #data=
    f = open(db, 'a')
    x=0
    for title in posts_to_print:
        try:
            if not post_is_in_db(title):
                f.write(title + "|" + LISTA_RESUMO[x]  +"|"+ str(current_timestamp) + "\n")
            x = x + 1
        except:
            pass
            x = x + 1
    f.close

    #
    # output all of the new posts
    #
    count = 1
    blockcount = 1
    for title in posts_to_print:
        if count % 10 == 1:
            print("\n" + time.strftime("%a, %b %d %I:%M %p") + '  ((( ' + feed_name + ' - ' + str(blockcount) + ' )))')
            print("-----------------------------------------")
            blockcount += 1
        print(title)
        count += 1
"""
################################################################# teste
#DISTRO WATCH
import feedparser
"""
url2 = 'http://distrowatch.com/news/dwd.xml' #distr linux/bsd

#----------------------------------------------- distr linux/bsd -------------------
print("Ultimas distros:")
feed = feedparser.parse(url2)
for key in feed["entries"]:
    #print ("Nome:%s\nLink:%s" % (key["title"],key["link"]))
    print("\t2017/%s" % (key["title"]))
#print(feed)

""" tentar mostrar ultimos e bd"""
db="./feeds_distrowatch.db"
principal('http://distrowatch.com/news/dwd.xml',"Distribuições Linux/BSD/...",db)
db="./feeds_pacotes_e_apps.db"
principal('http://distrowatch.com/news/dwp.xml',"Pacotes e aplicações",db)


#///////---------------------------------------- /distr linux/bsd -------------------
#----------------------------------------------- pacotes linux/bsd -------------------
#print ("#----------------------------------------------- pacotes linux/bsd -------------------")
url3 = 'https://distrowatch.com/news/dwp.xml'
feed = feedparser.parse(url3)
for key in feed["entries"]:
    print ("Nome:%s\nLink:%s\nDescrição:%s\n" % (key["title"],key["link"],key["description"]))
print ("#----------------------------------------------- pacotes linux/bsd -------------------")
#print(feed)

"""
#///////--------------------------------------- /pacotes linux/bsd -------------------

url1 = 'http://www.blog.pythonlibrary.org/feed/'
feed = feedparser.parse(url1)
for key in feed["entries"]:
    print ("%s\nData:%s\nResumo:%s\nLink:%s\nImagem:\n" % (key["title"],key["published"],key["summary"],key["link"]))
"""
"""
import pprint
pp = pprint.PrettyPrinter(indent=4)
#pp.pprint(feed)
"""