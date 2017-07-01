#!/usr/bin/env python
# -*- coding: utf-8 -*-


def DIA_SEGUINTE(DIA):
    import datetime
    #DIA = '2016-02-28'
    DIA = datetime.date(*map(int, DIA.split('-')))
    #print ("DIA: %s" % DIA)
    DIASEGUINTE= (DIA + datetime.timedelta(1))
    return ("Funcao dia seguinte(dia): %s" % DIASEGUINTE.strftime('%Y-%m-%d'))

def DIA_ANTERIOR(DIA):
    import datetime
    #DIA = '2016-02-28'
    DIA = datetime.date(*map(int, DIA.split('-')))
    #print ("DIA: %s" % DIA)
    DIAANTERIOR= (DIA - datetime.timedelta(1))
    return ("Funcao dia anterior(dia): %s" % DIAANTERIOR.strftime('%Y-%m-%d'))

def IDADE(DIA):
    import datetime
    from datetime import date
    today = date.today()
    DIA=datetime.date(*map(int, DIA.split('-')))
    age = today.year - DIA.year
    full_year_passed = (today.month, today.day) < (DIA.month, DIA.day)
    if not full_year_passed:
        age -= 1
    return ("Funcao IDADE(DIA): tem %s anos" % age)

    """
    from datetime import date
    #import datetime
    today = date.today()
    return ("Funcao IDADE(DIA): %s anos" % (today.year - born.year - ((today.month, today.day) < (born.month, born.day))))
    """
def HOJE():
    #import datetime
    from time import gmtime, strftime
    return ("Funcao HOJE: %s" % (strftime("%Y-%m-%d", gmtime())))

def ANIVERSARIO(DIA):
    from time import gmtime, strftime
    import datetime

    HOJE=strftime("%Y-%m-%d", gmtime())
    HOJE = datetime.date(*map(int, HOJE.split('-')))
    print ("HOJE: %s" % HOJE)

    DIA = datetime.date(*map(int, DIA.split('-')))
    from datetime import date

    delta = DIA - HOJE
    return ("Funcao ANIVERSARIO(DIA): \n\tHoje:\t%s\n\tData:\t%s\n\tFaltam:\t%s dias" % (HOJE,DIA,delta.days))

def calculate_age(DIA):
    from time import gmtime, strftime
    import datetime

    '''
        Converts a date of birth (dob) datetime object to years, always rounding down.
        When the age is 80 years or more, just report that the age is 80 years or more.
        When the age is less than 12 years, rounds down to the nearest half year.
        When the age is less than 2 years, reports age in months, rounded down.
        When the age is less than 6 months, reports the age in weeks, rounded down.
        When the age is less than 2 weeks, reports the age in days.
    '''
    born=datetime.date(*map(int, DIA.split('-')))
    today = datetime.date.today()
    age_in_years = today.year - born.year - ((today.month, today.day) < (born.month, born.day))
    months = (today.month - born.month - (today.day < born.day)) %12
    age = today - born
    age_in_days = age.days
    if age_in_years >= 80:
        return 80, 'anos ou mais'
    if age_in_years >= 12:
        return age_in_years, 'anos'
    elif age_in_years >= 2:
        half = 'and a half ' if months > 6 else ''
        return age_in_years, '%sanos'%half
    elif months >= 6:
        return months, 'meses'
    elif age_in_days >= 14:
        return age_in_days/7, 'semanas'
    else:
        return age_in_days, 'dias'

def FUNCOES_COM_TEMPO():
    ano = 2017;
    mes = 2

    print ("\n-----------------------\nFuncoes com tempo\n-----------------------")
    import datetime
    from time import gmtime, strftime
    s = '2017_05_1'
    DIA = datetime.date(*map(int, s.split('_')))
    DIAANTERIOR = DIA - datetime.timedelta(days=1)
    DIAANTERIOR = DIAANTERIOR.strftime('%Y_%m_%d')

    DIASEGUINTE = DIA + datetime.timedelta(days=1)
    DIASEGUINTE = DIASEGUINTE.strftime('%Y_%m_%d')

    print ("Dia Anterior a %s foi %s" % (s,DIAANTERIOR))
    print ("Dia Seguinte a %s vai ser %s" % (s,DIASEGUINTE))
    '2017_04_30'

    from calendar import monthrange
    print ("Quantos dias tem o mes %s do ano %s? %s" % (mes,ano,monthrange(ano, mes)[1]))#(1, 28) ou 28
    import calendar
    print ("Fevereiro de %s: %s dias" % (2017,calendar.monthrange(2017, 2)[1])) #28
    print ("Fevereiro de %s: %s dias" % (2016,calendar.monthrange(2016, 2)[1])) #29
    print ("Fevereiro de %s: %s dias" % (2015,calendar.monthrange(2015, 2)[1])) #28


    AGORA=strftime("%Y-%m-%d %H:%M:%S", gmtime())
    HOJE =strftime("%Y-%m-%d", gmtime())
    ONTEM= (datetime.date.today() - datetime.timedelta(1))
    AMANHA=((datetime.date.today() + datetime.timedelta(1)))

    print ("Ontem:\t %s" % ONTEM)
    print ("Hoje:\t %s" % HOJE)
    print ("Amanha:\t %s" % AMANHA)
    print ("Agora:\t %s" % AGORA) #2009-01-05 22:14:39

#UTILIZAÇÃO PRATICA
print ("---"*50)
#!/usr/bin/env python
# -*- coding: utf-8 -*-

print (DIA_ANTERIOR("2017-05-28"))
print (DIA_SEGUINTE("2017-05-28"))
print (HOJE())
FUNCOES_COM_TEMPO()
print (ANIVERSARIO("2017-11-19"))
print (IDADE("1982-11-19"))
print ("Funcao Calculate_Age(DIA): %sanos" % calculate_age("1982-11-19")[0])