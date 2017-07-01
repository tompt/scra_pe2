import requests
from bs4 import BeautifulSoup

#URL = ""

def OBTER_HTML(URL):
	headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    DADOS = requests.get(URL, headers)

	
    DADOS = DADOS.text
    HTML = BeautifulSoup(DADOS,"lxml")
    return HTML.text

def OBTER_LINKS(SOPA):
    LINKS=[]
    for link in SOPA.find_all('a'):
        print(link.get('href'))
        LINKS.append((link))
    return LINKS