#!/usr/bin/env python
# -*- coding: utf-8 -*-
__author__ = "Tomás"

#teste: funcao com pedido web com headers
def PEDIDO_WEB(URL):
    print("-------------------------------- Envio de HEADERS de browser------------------------")
    import urllib.parse
    import urllib.request

    url = 'http://gualdimpais.dtdns.net/login.php'
    user_agent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64)'
    values = {'name': 'Michael Foord',
              'location': 'Northampton',
              'language': 'Python' }
    headers = {'User-Agent': user_agent}

    data = urllib.parse.urlencode(values)
    data = data.encode('utf-8') #('ascii')
    req = urllib.request.Request(url, data, headers)
    with urllib.request.urlopen(req) as response:
       the_page = response.read()
       print ("página:\n%s\n" % the_page)


#--------------------------------- HEADERS ------------------------
print("-------------------------------- Envio de HEADERS de browser------------------------")
import urllib.parse
import urllib.request

url = 'http://gualdimpais.dtdns.net/login.php'
user_agent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64)'
values = {'name': 'jony',
          'location': 'nowhere',
          'language': 'whoknows'}
headers = {'User-Agent': user_agent}

data = urllib.parse.urlencode(values)
data = data.encode('utf-8') #('ascii')
req = urllib.request.Request(url, data, headers)
with urllib.request.urlopen(req) as response:
   the_page = response.read()
   print ("página:\n%s\n" % the_page)
#--------------------------------- fim HEADERS ------------------------

#--------------------------------- url error ------------------------
PAGINA='http://www.pretend_server.org'
req = urllib.request.Request(PAGINA)
try:
   urllib.request.urlopen(req)
except urllib.error.URLError as e:
   print("erro na obtencao da pagina %s. Razao:%s" % (PAGINA,e.reason))
   #(4, 'getaddrinfo failed')

PAGINA='http://gualdimpais.dtdns.net/login.php'
req = urllib.request.Request(PAGINA)
try:
   urllib.request.urlopen(req)
   print("Foi alcancada a pagina %s" % PAGINA)
except urllib.error.URLError as e:
   print(e.reason)
#--------------------------------- url error ------------------------
