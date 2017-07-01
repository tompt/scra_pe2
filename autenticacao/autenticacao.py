#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "tomas"

import mechanicalsoup # Don’t forget to import the new module
from bs4 import BeautifulSoup

if __name__ == "__main__":

    URL = "http://iknow.suroot.com/login.php"
    LOGIN = ""
    PASSE = ""
    TWITTER_NAME = "" # without @

    # Create a browser object
    browser = mechanicalsoup.Browser()

    # request Twitter login page
    login_page = browser.get(URL)

    # we grab the login form
    login_form = login_page.soup.find("form", {"name":"frmLogin"})
    #print(login_form)

    # find login and password inputs
    #login_form.find("input", {"name": "session[username_or_email]"})["value"] = LOGIN
    #login_form.find("input", {"name": "session[password]"})["value"] = PASSE

    login_form.find("input", {"name": "fnome"})["value"] = LOGIN
    login_form.find("input", {"name": "fpasse"})["value"] = PASSE

    # submit form
    response = browser.submit(login_form, login_page.url)

    # verify we are now logged in ( get username in webpage )
    #user = response.soup.find("span", { "class" : "u-linkComplex-target" }).string
    user = response.soup.find("a", {"href":"areapessoal.php" }).string
    print (user)

    import requests
    url = "http://iknow.suroot.com/index.php"
    r = requests.get(url)
    data = r.text
    soup = BeautifulSoup(data)

    for link in soup.find_all('a'):
        print(link.get('href'))

    if TWITTER_NAME in user:
        print("conectado no twit como " + TWITTER_NAME)
    else:
        print("nao  conectado no twit")