#!/usr/bin/env python
#-*- coding: utf-8 -*-
__author__ = "tomas"

import os

#cada site que se crawla eh um projecto e directorio separado
def CRIAR_DIRECTORIO_PROJECTO(DIRECTORIO):
    if not os.path.exists(DIRECTORIO):
        print ("criando projecto e directorio %s" % DIRECTORIO)
        os.makedirs(DIRECTORIO)

#criar lista e ficheiros crawlados - se nao existirem
def CRIAR_FICHEIROS(NOME_PROJECTO, URL_BASE):
    CRIAR_DIRECTORIO_PROJECTO(NOME_PROJECTO)
    QUEUE = NOME_PROJECTO + '/queue.txt'
    CRAWLADO = NOME_PROJECTO + '/crawlado.txt'

    if not os.path.isfile(QUEUE):
        ESCREVER_FICHEIRO(QUEUE, URL_BASE)

    if not os.path.isfile(CRAWLADO):
        ESCREVER_FICHEIRO(CRAWLADO,'')

#ler ficheiro e converter cada link para items SET
def FICHEIRO_PARA_SET(FICHEIRO):
    RESULTADOS = set()
    #ler ficheiro linha a linha
    with open(FICHEIRO,'rt') as f: #rt linha d cada vez
        for LINHA in f:
            RESULTADOS.add(LINHA.replace('\n',''))
    return RESULTADOS

#iterar sobre o set. Cada item terah uma nova linha
def SET_PARA_FICHEIRO(LINKS, FICHEIRO):
    #apagar tudo porque nao queremos juntar nada. Mas sim criar de novo
    APAGAR_CONTEUDO_FICHEIRO(FICHEIRO)
    for LINK in sorted(LINKS): #sorted ordena as coisas
        ADICIONAR_A_FICHEIRO(FICHEIRO, LINK)






#------------------------------------------------- OPERACOES COM FICHEIROS --------------------------------

#criar um novo ficheiro
def ESCREVER_FICHEIRO(CAMINHO,DADOS):
    f = open(CAMINHO,'a') #teve de ser a porque w dah erro...
    f.write(DADOS)
    f.close()

#ADICIONAR dados a um ficheiro existente
def ADICIONAR_A_FICHEIRO(CAMINHO, DADOS):
    with open(CAMINHO,'a') as FICHEIRO:
        FICHEIRO.write(DADOS,'\n')

def APAGAR_CONTEUDO_FICHEIRO(CAMINHO):
    with open(CAMINHO,'w'):
        pass
#------------------------------------------------fim OPERACOES COM FICHEIROS --------------------------------


URL='https://thenewboston.com'
CRIAR_FICHEIROS('THENEWBOSTON',URL)


'''
Criar ficheiros:
    CRIAR directoria com o nome do projecto, caso nao exista
    Criar ficheiros:
        - 1 para a lista a fazer
        - 1 para a lista dos crawlados

Usar um set em vez de uma lista. O set apenas permite items unicos
    Converter os links em sets


'''





