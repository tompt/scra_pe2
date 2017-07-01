# !/usr/bin/env python
# -*- coding: utf-8 -*-
__author__ = "tomás"

#instalar
'''sudo pip install GeoIP
sudo pip install GeoIP --upgrade
sudo pip install GeoIP2
sudo pip install GeoIP2 --upgrade
'''
#sacar base de dados
#wget http://geolite.maxmind.com/download/geoip/database/GeoLite2-City.mmdb.gz
#descompactar
#gunzip -f GeoLite2-City.mmdb.gz

#codigo para testar pais offline:
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import geoip2.database
reader = geoip2.database.Reader("GeoLite2-City.mmdb")
rez = reader.city("193.47.185.124")   #ceg("85.241.71.94")

print ("Pais: ", rez.country.name)
#Portugal

print ("Cidade: ",rez.city.name)
#Linda a Velha

print ("Latitude:", rez.location.latitude)
#38.7145

print ("Longitude:", rez.location.longitude)
#-9.2422

print ("proxy anonima:", rez.traits.is_anonymous_proxy)
#False

print ("qqr coisa: ", rez.traits.isp)