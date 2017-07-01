#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "tomas"

import exifread

# based on https://gist.github.com/erans/983821

def _get_if_exist(data, key):
    if key in data:
        return data[key]

    return None


def _convert_to_degress(value):
    """
    Helper function to convert the GPS coordinates stored in the EXIF to degress in float format

    :param value:
    :type value: exifread.utils.Ratio
    :rtype: float
    """
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

def OBTER_GPS_DIRECTORIO(DIRECTORIO):
    import os
    for FICHEIRO in os.listdir("./"):
        if FICHEIRO.endswith(".jpg"):
            #print(FICHEIRO)
            X = OBTER_GPS(FICHEIRO)
            LAT = str(X[0])
            LON = str(X[1])

            #vamos ver quem tem e quem nao tem coordenadas. Apenas se tiver eh adicionado
            if LAT == "None":
                LAT = "--"
                LON = "--"
                print("%s não tem coordenadas." % (FICHEIRO))
            else:
                print("%s\tLat:%s\tLon:%s" % (FICHEIRO, LAT, LON))
                LISTA_IMAGENS.append(FICHEIRO)

        if FICHEIRO.endswith(".jpeg"):
            #print(FICHEIRO)
            LISTA_IMAGENS.append(FICHEIRO)
    '''
    for IMAGEM in LISTA_IMAGENS:
        X = OBTER_GPS(IMAGEM)
        LAT = str(X[0])
        LON = str(X[1])
        if LAT == "None":
            LAT="--"
            LON="--"
            print("%s\tLat:%s\tLon:%s" % (IMAGEM, LAT, LON))
        print("%s\tLat:%s\tLon:%s" % (IMAGEM, LAT, LON))
    '''
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