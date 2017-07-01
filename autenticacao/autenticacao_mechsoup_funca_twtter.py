#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "tomas"

import mechanicalsoup # Don’t forget to import the new module

if __name__ == "__main__":

    URL = "https://twitter.com/login"
    LOGIN = "yourlogin"
    PASSWORD = "yourpassword"
    TWITTER_NAME = "twittername" # without @

    # Create a browser object
    browser = mechanicalsoup.Browser()

    # request Twitter login page
    login_page = browser.get(URL)

    # we grab the login form
    login_form = login_page.soup.find("form", {"class":"signin"})

    # find login and password inputs
    login_form.find("input", {"name": "session[username_or_email]"})["value"] = LOGIN
    login_form.find("input", {"name": "session[password]"})["value"] = PASSWORD

    # submit form
    response = browser.submit(login_form, login_page.url)

    # verify we are now logged in ( get username in webpage )
    user = response.soup.find("span", { "class" : "u-linkComplex-target" }).string

    if TWITTER_NAME in user:
        print("You’re connected as " + TWITTER_NAME)
    else:
        print("Not connected")