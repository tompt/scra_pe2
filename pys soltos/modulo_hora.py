#import time
"""#localtime = time.asctime( time.localtime(time.time()) )
print ("Local current time :", localtime)
"""

import datetime

def DATA_EXEMPLO():
    today = datetime.date.today()
    print(today)
    tt = today.timetuple()
    print('ano  =', tt.tm_year)
    print('mes   =', tt.tm_mon)
    print('dia  =', tt.tm_mday)
    print('dia da semana  =', tt.tm_wday)
    print('dia do ano =', tt.tm_yday)
    print('Year   :', today.year)
    print('Mon    :', today.month)
    print('Day    :', today.day)

    print('Now    :', datetime.datetime.now())

    #fonte: https://pymotw.com/3/datetime/
    today = datetime.datetime.today()
    print('Tudo:', today)
    print('\n    : {:%a %b %d %H:%M:%S %Y}'.format(today))
    print('MES : {:%A %B}'.format(today))
    print('Hora: {:%H:%M:%S}'.format(today))
    print('Data: {:%d %m %Y}'.format(today))

def DATA():
    today = datetime.date.today()
    print(today)
    tt = today.timetuple()
    """
    print('ano  =', tt.tm_year)
    print('mes   =', tt.tm_mon)
    print('dia  =', tt.tm_mday)
    print('dia da semana  =', tt.tm_wday)
    print('dia do ano =', tt.tm_yday)
    print('Year   :', today.year)
    print('Mon    :', today.month)
    print('Day    :', today.day)

    print('Now    :', datetime.datetime.now())
    """

    #fonte: https://pymotw.com/3/datetime/
    today = datetime.datetime.today()
    """
    print('Tudo:', today)
    print('\n    : {:%a %b %d %H:%M:%S %Y}'.format(today))
    print('MES : {:%A %B}'.format(today))
    print('Hora: {:%H:%M:%S}'.format(today))
    print('Data: {:%d %m %Y}'.format(today))
    """
    DATA='{:%d %m %Y}'.format(today)
    HORA='{:%H:%M:%S}'.format(today)
    return DATA, HORA
#DATA()
