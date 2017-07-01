import mechanize
from BeautifulSoup import BeautifulSoup
##from bs4 import BeautifulSoup
import urllib2
import cookielib

cj = cookielib.CookieJar()
br = mechanize.Browser()
br.set_cookiejar(cj)
br.open("http://www.abc.com")

br.select_form(nr=0)
br.form['usuarioLogin'] = "xxxxxxxxxxxxxxx"
br.form['usuarioSenha'] = "yyyyyyyyyyyyyyyyy"
br.submit()

pagina =  br.response().read()

soup = BeautifulSoup(pagina)

imagens = soup.findAll("img")

for registros in imagens:
	for registro in registros:
		print registro