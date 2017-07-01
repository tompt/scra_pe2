#!/usr/bin/env python
# -*- coding: utf-8 -*-
__author__ = "Tomás"

#----------------------- // Listagem completa de ficheiros em directorio x e hash
#este codigo serve apenas para guardar os resultados
def GUARDAR_FICHEIRO(DIRECTORIO,FICHEIRO_SAIDA,MODO,DADOS):
    #output = NomeFicheiro
    #MODO="a" ou wb
    #DIRECTORIO="jornaisdodia"
    z=1
    try:
        MODO='a'
        FICHEIRO_SAIDA = open(FICHEIRO_SAIDA, MODO, encoding='utf8')  # wb, a para append
        FICHEIRO_SAIDA.write(DADOS)
        FICHEIRO_SAIDA.close()
        print("Ficheiro guardado:%s/%s" % (DIRECTORIO, FICHEIRO_SAIDA))
        #print (DADOS)
    except:
        print("erro na escrita") #de %s" % IMAGEM_LOCAL)
        ''' fim guardar'''

#este codigo vem de tras. eh apenas para hash

def HASH_FICHEIRO(FICHEIRO):
    import hashlib
    BLOCKSIZE = 65536
    hasher = hashlib.md5()
    with open(FICHEIRO, 'rb') as afile:
        buf = afile.read(BLOCKSIZE)
        while len(buf) > 0:
            hasher.update(buf)
            buf = afile.read(BLOCKSIZE)
    return hasher.hexdigest()
    #print("Ficheiros muito grandes usamos esta. Hash da mesma imagem:%s" % hasher.hexdigest())

#aqui comeca a listagem de ficheiros e o hash dos mesmos
def LISTAGEM_E_HASH(DIRECTORIO,FICHEIRO_CSV):
    from os import listdir
    from os.path import isfile, join
    FICHEIROS = [f for f in listdir(DIRECTORIO) if isfile(join(DIRECTORIO, f))]
    #print (FICHEIROS) #lista
    x=1
    for FICHEIRO_TEMP in FICHEIROS:
        NOVO_FICHEIRO = ("%s/%s" % (DIRECTORIO,FICHEIRO_TEMP)) #aqui juntamos tudo para ter o caminho completo
        HASHHH = HASH_FICHEIRO(NOVO_FICHEIRO)
        DADOS = ("%s,%s\n" % (HASHHH,NOVO_FICHEIRO))
        print (DADOS)
        GUARDAR_FICHEIRO(DIRECTORIO,FICHEIRO_CSV,"nao interessa",DADOS)
        x=x+1

#-------------------------main--------------------

'''
DIRECTORIO = "C:/Users/CR1PT0/Documents/GitHub/scrape"
LISTAGEM_E_HASH(DIRECTORIO)
print ("Ficheiro de hash está na pasta '%s' com o nome HASH.txt" % DIRECTORIO)
#FICHEIRO DE SAIDA EH "HASH.TXT" NA PASTA DO DIRECTORIO.
'''
def LER_CSV(FICHEIRO_HASHES):
    import csv
    from collections import defaultdict
    #FICHEIRO_HASHES="C:/Users/CR1PT0/Documents/GitHub/scrape/HASH2.txt"

    columns = defaultdict(list) # each value in each column is appended to a list

    with open(FICHEIRO_HASHES) as f:
        reader = csv.DictReader(f) # read rows into a dictionary format
        for row in reader: # read a row as {column1: value1, column2: value2,...}
            for (k,v) in row.items(): # go over each column name and value
                columns[k].append(v) # append the value into the appropriate list
                                     # based on column name k

    #OBJECTIVO DISTO: ir buscar a ficheiros CSV, os campos site e HASH.
    #depois, designar a duas listas, o valaor do site e do hash para depois comparar com outros ficheiros
    SITES=[]
    HASHES=[]
    x=1
    for i in columns['site']:
        #print("%s - %s" % (x,i))
        SITES.append(i)
        x=x+1
    x=1
    for i in columns['hash']:
        #print("%s" % (i))
        HASHES.append(i)
        x=x+1

    #INICIALIZAR DICIONARIO SEM NADA DENTRO
    DICIONARIO = {}

    for i in range(len(SITES)):
        try:
            print ("%s\t %s\t %s" % (i,HASHES[i],SITES[i]))
            DICIONARIO[HASHES[i]]=SITES[i] #ESTA ORDEM EH IMPORTANTISSIMA
        except:
            pass

    #AQUI USAMOS UM DICIONARIO PARA GUARDAR O NOME DO SITE E O SEU HASH
    #print ("dicionario de sites e hashes:",DICIONARIO)
    x=1
    for HASH1,SITE1 in DICIONARIO.items():
        print ("%s\t %s eh hash de %s" % (x,HASH1,SITE1))
        x=x+1
#------------------ ficheiro existe? so funca a partir do python 3.4 ------------------------------
def FICHEIRO_EXISTE(FICHEIRO):
    from pathlib import Path
    Meu_Ficheiro = Path(FICHEIRO)
    if Meu_Ficheiro.is_file():
        #print ("\nExiste ficheiro %s? --> Sim" % Meu_Ficheiro)
        return "ja existe"
        # file exists
    else:
        #print ("\nExiste ficheiro %s? --> Nao" % Meu_Ficheiro)
        return "nao existe"
    #exemplo de uso:
    #FICHEIRO="C:/Users/CR1PT0/Documents/GitHub/scrape/hash__directorio.py"
    #print ("Ficheiro pretendido %s " % FICHEIRO_EXISTE(FICHEIRO))
#------------------ // ficheiro existe? so funca a partir do python 3.4 ------------------------------

#teste com dicionarios
print ("-------------------------------------------dicionarios---------------------------")
'''     o exemplo disto esta em uso quando se le o ficheiro e se atribui os nomes
from collections import defaultdict
DICIONARIO = {}

for i in range(len(SITES)):
    try:
        print ("%s - %s - %s" % (i,SITES[i],HASHES[i]))
        DICIONARIO[HASHES[i]]=SITES[i]
    except:
        pass

#AQUI USAMOS UM DICIONARIO PARA GUARDAR O NOME DO SITE E O SEU HASH
#print ("dicionario de sites e hashes:",DICIONARIO)
for SITES1, HASHES1 in DICIONARIO.items():
    print ("%s tem hash de %s" % (HASHES1, SITES1))
'''


#----------------------------------zerar conteudo de ficheiro existente
def ApagarConteudoFicheiro(FICHEIRO):
    with open(FICHEIRO, "w"):
        print ("%s apagado." % FICHEIRO)
        pass
    #AQUI JA TEMOS O FICHEIRO A ZERO
    try:
        MODO = 'a'
        FICHEIRO_SAIDA = open(FICHEIRO, "w", encoding='utf8')  # wb, a para append
        FICHEIRO_SAIDA.write("hash,site\n")
        FICHEIRO_SAIDA.close()
        print("Ficheiro guardado:%s" % (FICHEIRO))
        # print (DADOS)
    except:
        print("erro na escrita")
        ''' fim guardar'''
#----------------------------------//zerar conteudo de ficheiro existente



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
    # ----------------------- // hash de ficheiro parcial ate estar completo
# ------------------------------------utilidades --------------------------------------------------------

# --------------- inicio
# FICHEIRO="C:/Users/CR1PT0/Documents/GitHub/scrape/hash__directorio.py"
FICHEIRO_HASHES="C:/Users/cripto/Documents/GitHub/scrape/HASH.csv"
FICHEIRO_CSV = "HASH.csv"
DIRECTORIO = "C:/Users/CR1PT0/Documents/GitHub/scrape" #NAO PODE LEVAR / NO FIM
print ("Ficheiro %s pretendido %s \n" % (FICHEIRO_HASHES,FICHEIRO_EXISTE(FICHEIRO_HASHES)))#"ficheiro x ja existe" ou nao existe
print ("Ficheiro de hashes %s  %s \n" % (FICHEIRO_HASHES,FICHEIRO_EXISTE(FICHEIRO_HASHES))) #"ficheiro x ja existe" ou nao existe

# se existir hashes entao lemos o seu valor
if (FICHEIRO_EXISTE(FICHEIRO_HASHES)=="ja existe"):
    print ("ok executa")
    LER_CSV(FICHEIRO_HASHES) #FICHEIRO QUE CONTEM OS HASHES
else:
    print ("nao existe.. quer criar hashes?")
    # apagar ficheiro
    LISTAGEM_E_HASH(DIRECTORIO, FICHEIRO_CSV)


# EXISTE TB ISTO: possibilidade de retornar apenas o hash de um ficheiro. Trocar a"FICHEIRO_HASHES" pelo nome
HASH_A_FicheirosGRANDES(FICHEIRO_HASHES)