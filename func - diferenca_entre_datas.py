#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
from datetime import date

hj = date.today()
#print (hj.toordinal())
#734694

hj = date.today()
print ("Presente: ", hj) #print hj.day print hj.month print hj.year

futuro = date.fromordinal(hj.toordinal()+45) # hoje + 45 dias
print ("Futuro: Daqui a 45 dias será ",futuro)
#2012-08-24

#diferença de datas
hj = date.today()
futuro = date.fromordinal(hj.toordinal()+45) # hoje + 45 dias</pre>
diferenca = futuro - hj
print ("\ndiferenca = futuro - hj = %s" % diferenca.days)

#dias da semana
hj = date.today()
dias = ('Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo')
print ("Hoje é", dias[hj.weekday()])