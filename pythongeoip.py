#!/usr/bin/env python
# -*- coding: utf-8 -*-

#instalar
#sudo pip install GeoIP
#sudo pip install GeoIP --upgrade
#sudo pip install GeoIP2
#sudo pip install GeoIP2 --upgrade

#sacar base de dados
#wget http://geolite.maxmind.com/download/geoip/database/GeoLite2-City.mmdb.gz
#descompactar
#gunzip -f GeoLite2-City.mmdb.gz

#codigo para testar pais offline:
 #!/usr/bin/env python
 # -*- coding: utf-8 -*-

import geoip2.database
reader = geoip2.database.Reader("GeoLite2-City.mmdb")
rez = reader.city("208.82.16.68")#ceg("85.241.71.94")

print ("Pais: ", rez.country.name)
#Lithuania

print ("Cidade: ",rez.city.name)
#Marija

print ("Latitude:", rez.location.latitude)
#54.5667

print ("Longitude:", rez.location.longitude)
#23.35

print ("proxy anonima:", rez.traits.is_anonymous_proxy)
#False

print ("qqr coisa: ", rez.traits.isp)