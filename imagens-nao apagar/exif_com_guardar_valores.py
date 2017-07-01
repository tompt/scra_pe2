#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "tomas"

import exifread

def _get_if_exist(data, key):
    if key in data:
        return data[key]
    return None


def _convert_to_degress(value):

    d = float(value.values[0].num) / float(value.values[0].den)
    m = float(value.values[1].num) / float(value.values[1].den)
    s = float(value.values[2].num) / float(value.values[2].den)

    return d + (m / 60.0) + (s / 3600.0)

def get_exif_location(exif_data):
    """
    Returns the latitude and longitude, if available, from the provided exif_data (obtained through get_exif_data above)
    """
    lat = None
    lon = None

    gps_latitude = _get_if_exist(exif_data, 'GPS GPSLatitude')
    gps_latitude_ref = _get_if_exist(exif_data, 'GPS GPSLatitudeRef')
    gps_longitude = _get_if_exist(exif_data, 'GPS GPSLongitude')
    gps_longitude_ref = _get_if_exist(exif_data, 'GPS GPSLongitudeRef')

    if gps_latitude and gps_latitude_ref and gps_longitude and gps_longitude_ref:
        lat = _convert_to_degress(gps_latitude)
        if gps_latitude_ref.values[0] != 'N':
            lat = 0 - lat

        lon = _convert_to_degress(gps_longitude)
        if gps_longitude_ref.values[0] != 'E':
            lon = 0 - lon

    return lat, lon


def OBTER_GPS(IMAGEM):
    #IMAGEM = "./coelho.jpg"
    f = open(IMAGEM, 'rb')

    # obter tags
    tags = exifread.process_file(f)
    #print(get_exif_location(tags))

    return get_exif_location(tags)

# ----------------------------------- listar todas as imagens no directorio pretendido
LISTA_IMAGENS=[]
LISTA_LAT=[]
LISTA_LON=[]
def OBTER_GPS_DIRECTORIO(DIRECTORIO):
    import os
    for FICHEIRO in os.listdir("./"):
        if FICHEIRO.endswith(".jpg") or FICHEIRO.endswith(".jpeg"):
            X = OBTER_GPS(FICHEIRO)
            LAT = str(X[0]) #1a variavel recebida
            LON = str(X[1]) #2a variavel recebida

            # vamos ver quem tem e quem nao tem coordenadas. Apenas se tiver coords eh adicionado
            if LAT == "None":
                LAT = "--"
                LON = "--"
                print("%s\tnão tem coordenadas" % (FICHEIRO))
            else:
                print("%s\tLat:%s\tLon:%s" % (FICHEIRO, LAT, LON))
                LISTA_IMAGENS.append(FICHEIRO)
                LISTA_LAT.append(LAT)
                LISTA_LON.append(LON)

''' --------------------------operacoes com ficheiros.... sempre o mesmo...'''
def ApagarConteudoFicheiro(FICHEIRO_CSV):
    with open(FICHEIRO_CSV, "w"):
        #print ("%s apagado." % FICHEIRO_CSV)
        pass
    #AQUI JA TEMOS O FICHEIRO A ZERO
    try:
        FICHEIRO_SAIDA = open(FICHEIRO_CSV, "w", encoding='utf8')  # wb, a para append
        FICHEIRO_SAIDA.write("imagem,lat,lon\n")
        FICHEIRO_SAIDA.close()
        print("Limpeza de ficheiro. Criado novo ficheiro e inicializado. Vamos esperar pelas escritas..")
        # print (DADOS)
    except:
        print("erro na escrita")
        ''' fim guardar'''
#---------------------------
#aqui comeca a listagem de ficheiros e o hash dos mesmos
def GUARDAR(DIRECTORIO,FICHEIRO_CSV):
    #primeiro vamos apagar algum ficheiro que exista com esse nome:
    ApagarConteudoFicheiro(FICHEIRO_CSV)

    NOVO_FICHEIRO = ("%s/%s" % (DIRECTORIO,FICHEIRO_CSV)) #aqui juntamos tudo para ter o caminho completo
    import os
    print("\nTotal de imagens com GPS:%s" % len(LISTA_IMAGENS))

    for i in range(len(LISTA_IMAGENS)):
        print ("\tNome:%s\tLat:%s\tLon:%s" % (LISTA_IMAGENS[i], LISTA_LAT[i],LISTA_LON[i]))
        #print ("%s,%s,%s" % (LISTA_IMAGENS[i], LISTA_LAT[i],LISTA_LON[i])) #serve para confirmar os dados
        DADOS ="%s,%s,%s" % (LISTA_IMAGENS[i], LISTA_LAT[i],LISTA_LON[i])

    #UTIL SE for para guardar o caminho completo:
    # #print ("%s%s" % (DIRECTORIO,IMAGEM))
    # #print(os.path.dirname(os.path.abspath(__file__))) # obtem o caminho completo onde corre o script

    try:
        MODO='a'
        FICHEIRO_CSV = open(FICHEIRO_CSV, MODO, encoding='utf8')  # wb, a para append

        for i in range(len(LISTA_IMAGENS)):
            #print("\tNome:%s\tLat:%s\tLon:%s" % (LISTA_IMAGENS[i], LISTA_LAT[i], LISTA_LON[i]))
            # print ("%s,%s,%s" % (LISTA_IMAGENS[i], LISTA_LAT[i],LISTA_LON[i])) #serve para confirmar os dados
            DADOS = "%s,%s,%s\n" % (LISTA_IMAGENS[i], LISTA_LAT[i], LISTA_LON[i])
            FICHEIRO_CSV.write(DADOS)

        FICHEIRO_CSV.close()
        print("Ficheiro guardado:%s/%s" % (DIRECTORIO, FICHEIRO_CSV))
        #print (DADOS)
    except:
        print("erro na escrita") #de %s" % IMAGEM_LOCAL)
        ''' fim guardar'''
'''---------------------------------fim das operacoes com ficheiros'''


############################### COMECA AQUI ####################################################
''' unica variavel que precisamos: nome da imagem pretendida '''
#IMAGEM = "./coelho.jpg"

'''----OPCOES: PODEMOS PEDIR IMAGEM INDIVIDUAL OU LISTAR DIRECTORIO INTEIRO.'''
# OBTER_GPS_DIRECTORIO(DIRECTORIO_PRETENDIDO)
#ou (descomentar as linhas abaixo)
'''
X=OBTER_GPS(NOME_E_CAMINHO_DA_IMAGEM)
LAT=X[0]
LON=X[1]
print ("imagem:%s\tLat:%s\tLon:%s" % (IMAGEM,LAT,LON))
'''
# ex:
OBTER_GPS_DIRECTORIO("./")
#Ficheiro para onde guardar: directorio e nome do ficheiro.csv
GUARDAR("./","gps.csv")