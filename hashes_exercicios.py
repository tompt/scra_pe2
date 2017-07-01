#!/usr/bin/env python3
# -*- coding: utf-8 -*-
__author__ = "Tomás"


import hashlib
import urllib.request

#import urllib.request
#with urllib.request.urlopen('http://python.org/') as response:
#   html = response.read()
#print (html)

import hashlib
m = hashlib.md5()
texto="Nobody inspects"
texto=texto.encode('utf-8')
m.update(texto)   #"Nobody inspects")

#print (m.digest()) #b'>\xf7)\xcc\xf0\xccV\x07\x9c\xa5F\xd5\x80\x83\xdc\x12'
#print (m.digest_size) #16
#print (m.block_size) #64
print ("default md5:\t%s" % m.hexdigest())

#recomenda-se fazer o encoding antes de ir para o hashlib embora nao se perceba o porque do erro
textolas = hashlib.sha512(texto).hexdigest()
print ("sha512:\t\t %s" % textolas)
textolas = hashlib.sha1(texto).hexdigest()
print ("sha1:\t\t %s" % textolas)
textolas = hashlib.md5(texto).hexdigest()
print ("md5:\t\t %s" % textolas)
textolas = hashlib.sha256(texto).hexdigest()
print ("sha256:\t\t %s" % textolas)

import hashlib, binascii
dk = hashlib.pbkdf2_hmac('sha256', b'Nobody inspects', b'salt', 100000)
print ("SHA256, com salt 'salt' e passe 'Nobody Inspects':\n %s"% binascii.hexlify(dk))
#b'0394a2ede332c9a13eb82e9b24631604c31df978b4e2f0fbd2c549944f9d79a5'



#--------------------------------PALAVRAS PASSE E HASHING
#APLICACAO COMPLETA. PEDIR PASSE E CONFIRMAR VALOR DE HASH
'''
import uuid
import hashlib

def hash_password(password):
   # uuid is used to generate a random number
   salt = uuid.uuid4().hex
   return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt

def check_password(hashed_password, user_password):
   password, salt = hashed_password.split(':')
   return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()

new_pass = input('Please enter a password: ')
hashed_password = hash_password(new_pass)
print('The string to store in the db is: ' + hashed_password)

old_pass = input('Now please enter the password again to check: ')
if check_password(hashed_password, old_pass):
   print('You entered the right password')
else:
   print('I am sorry but the password does not match')
'''
#-------------------------FIM PALAVRAS PASSE E HASHING

#-------------------- download de imagem -----------------
print ("--------------------------------download de imagens--------------------")
import requests
import shutil
ORIGEM = 'https://c1.staticflickr.com/3/2427/3660308049_6b22f4305c.jpg'
IMAGEM = ORIGEM.rsplit("/",1)
print (IMAGEM[1])
IMAGEM = str(IMAGEM[1])
#print (IMAGEM) #td ok

url=ORIGEM
response = requests.get(url, stream=True)
try:
    with open(IMAGEM, 'wb') as out_file:
        shutil.copyfileobj(response.raw, out_file) #era out_file
        print ("Imagem '%s' de '%s' gravada com sucesso." % (IMAGEM,ORIGEM))
        #vamos mudar o nome da imagem
    del response
    shutil.move('3660308049_6b22f4305c.jpg', 'gualdimpais.jpg')
except:
    print ("erro ao baixar a imagem do site? confirmar se existe ficheiro gualdimpais.jpg. Foi mudado de 366----.jpg")

#2a versao----------------------------------------------------------
'''guardar agora as imagens com esse nome'''
try:
    DIRECTORIO="jornaisdodia"
    import urllib.request
    urllib.request.urlretrieve(ORIGEM, "%s/%s" % (DIRECTORIO, IMAGEM))
    print("Ficheiro %s guardado com sucesso na pasta %s" % (IMAGEM,DIRECTORIO))
except:
    # NAO FUNCIONA. CHARS ESQUISITOS.. print ("Erro ao gravar localmente a imagem %s" % IMAGEM_LOCAL)
    print("erro ao gravar localmente a imagem")
    pass
#-------------------- // download de imagem

#------------------------hash de ficheiros
print ("--------------------------------hash de ficheiros --------------------")
#Fonte: http://joelverhagen.com/blog/2011/02/md5-hash-of-file-in-python/
import hashlib
IMAGEM = "gualdimpais.jpg"
hasher = hashlib.md5()
with open(IMAGEM, 'rb') as afile:
    buf = afile.read()
    hasher.update(buf)
print("Hash MD5 da imagem '%s': %s" % (IMAGEM,hasher.hexdigest()))
#------------------------/hash de ficheiros

#----------------------- hash de ficheiro parcial ate estar completo
def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

print ("hash MD5 de imagem '%s': %s - aqui usamos uma funcao que usa abertura parcial até totalizar" % (IMAGEM,md5(IMAGEM)))

#------------------------------------utilidades -----------------------------------------------------
def HASH_A_FicheirosGRANDES(FICHEIROmtGRANDE):
    print("--------------------------- hash a ficheiros muito grandes--------------")
    #fonte: http://pythoncentral.io/hashing-files-with-python/
    import hashlib
    BLOCKSIZE = 65536
    hasher = hashlib.md5()
    with open(FICHEIROmtGRANDE, 'rb') as afile:
        buf = afile.read(BLOCKSIZE)
        while len(buf) > 0:
            hasher.update(buf)
            buf = afile.read(BLOCKSIZE)
    print("Ficheiros muito grandes usamos funcao 'HASH_A_FicheirosGRANDES':\n\tficheiro:%s\n\tHash md5:%s" % (FICHEIROmtGRANDE,hasher.hexdigest()))

HASH_A_FicheirosGRANDES(IMAGEM)    #----------------------- // hash de ficheiro parcial ate estar completo
#EXISTE TB ISTO: possibilidade de retornar apenas o hash de um ficheiro. Trocar a"FICHEIRO_HASHES" pelo nome


