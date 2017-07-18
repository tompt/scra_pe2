#!/usr/bin/python3
#origem: http://www.opentechguides.com/how-to/article/python/65/python-web-crawler.html

from lxml import html
import requests
import sys
from requests.compat import urljoin, quote_plus
#---------------------------------------------------------------------------------

# Base url from where the crawl begins
#base = sys.argv[1]
base = "http://www.example.com"
headers = {'user-agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)'}

#------------------------------FUNCOES---------------------------------------------------
def GETLINKS(url,z):
    response = requests.get(url,headers=headers)
    if (response.status_code == 200):
        status = '[OK]'
    else:
        status = '[BROKEN]'

    print(" %s %s" % (status, url))
    pagehtml = html.fromstring(response.content)
    page_links = pagehtml.xpath("//a[not(@rel='nofollow') and not(contains(@href,'#'))]/@href")
    return page_links

def REMOVER_REPETIDOS(lista):
    z=0
    LISTA_LINKS_NAO_REPETIDOS=[]
    LISTA_LINKS_NAO_REPETIDOS=set(page_links)
    #for link in LISTA_LINKS_NAO_REPETIDOS:
        #z=z+1
        #print("%s - %s" % (z,link))
        ##em baixo une-se o url parcial com a base do nosso url inicial. Se der asneira, descomentar o de cima...
        #print("%s - %s" % (z,urljoin(base,link)))
    #print ("total de links: %s" % x)
    return LISTA_LINKS_NAO_REPETIDOS

#------------------------------INICIO---------------------------------------------------
site_links = [base]

# Repeat for each link discovered
for item in site_links:
    # absolute link
    if item.startswith('http://') or item.startswith('https://'):
        url = item
    # root-relative link
    elif item.startswith('/'):
        url = base + item
    else:
        url = base + "/" + item

    z=1
    page_links = GETLINKS(url,z)
    #print(page_links)

    print ("Existem %s links ao todo" % len(page_links))
    LISTA_LINKS_NAO_REPETIDOS  = REMOVER_REPETIDOS(page_links)
    print ("Existem agora %s links não repetidos" % len(LISTA_LINKS_NAO_REPETIDOS))

    z=0
    for link in LISTA_LINKS_NAO_REPETIDOS:
        z=z+1
        #PODE SER UTIL USAR ISTO PARA BAIXAR SO AS IMAGENS CONSTANTES DE UMA PAGINA
        #print("%s - %s" % (z,link))
        #em baixo une-se o url parcial com a base do nosso url inicial. Se der asneira, descomentar o de cima...
        link=urljoin(base,link)
        print(z,link)

    x=1
    for link in LISTA_LINKS_NAO_REPETIDOS:
        LINK2 = urljoin(base, link)
        if LINK2 not in LISTA_LINKS_NAO_REPETIDOS:
            #ORIGINAL:site_links.append(link)
            LISTA_LINKS_NAO_REPETIDOS.append(LINK2)
            print("%s - %s adicionado" % (x,LINK2))
            x=x+1


    """exemplo de urljoin
    url = "http://some-address.com/api/"
    term = 'This is a test'
    print (urljoin(url, quote_plus(term)))
    #'http://some-address.com/api/This+is+a+test'
    """

    """exemplo de remover repetidos
    t = [1, 2, 3, 1, 2, 5, 6, 7, 8]
    print("1a passagem: %s - todos os valores" % t)
    ##[1, 2, 3, 1, 2, 5, 6, 7, 8]
    print("2a passagem: %s - so valores unicos" % (list(set(t))))
    ##[1, 2, 3, 5, 6, 7, 8]
    s = [1, 2, 3]
    print("3a passagem: %s - retirar os valores que estavam no set anterior" % list(set(t) - set(s)))
    ##[8, 5, 6, 7]
    """