# !/usr/bin/env python3
# -*- coding: utf-8 -*-
#nome original py3_localizar.py

import re ficheiro= "ficheiro_com_palavras.txt"
lista=[ "rui", "tomás", "rogério", "Rui", "hélder", "helder", "Hélder", "Tomás", "zz<zzzz", "RUI", "zeRo"]
print (lista)

word_list1=[ ]
count=0 x=1 def \


check():
    x=0
    found = False  # this isn't really necessary

    for line in open(ficheiro, encoding="utf-8"):
        for nome in lista:
            if nome in line:
                # found = True #not necessary
                x=x+1
                print ("%s %s" % (x,line ))


    x=0
    found = False  # this isn't really necessary
    for line in open(ficheiro, encoding="utf-8"):
        word_list1 = re.split('\s+', line.lower())
        # print (word_list1)
        for nome in lista:
            if nome in word_list1:
                # found = True #not necessary
                x=x+1
                # print ("%s %s %s" % (x,line,nome))

                if nome in line:
                    # found = True #not necessary
                    x=x+1
                    print ("%s %s" % (x, line))

                    print (sum(1 for _ in re.finditer(r'\b%s\b' % re.escape(nome), line)))


check()

"""
for line in open(ficheiro, encoding="utf-8"):
    word_list1 = re.split('\s+', line.lower())
    word_list2 = re.split('\s+', line.upper())
    word_list3 = re.split('\s+', line)
    #print("%s %s %s " % (word_list1, word_list2, word_list3))
    for palavra in word_list1:
        x = x + 1

        if (word_list1.count("rui")):
            print ("%s encontrado: %s" % (x,"rui"))
        else:
            print("%s - %s" % (x, palavra))
"""

word = "dog"
str = "the dogs barked a lot fru iasd dog w wetwe eywe yweywe wywe wey we weytwe ywey rui wr wetwet 34t4t34t ruizao"
print ("total de dog:%s" % (len(re.findall(word, str))))

import string


def censor(text, word):
    newString = text.replace(word, "+" * len("rui"), str.count("rui"))
    print (newString)


print(censor("hey hey hey", "hey"))
"""
total_palavras_ficheiro1 = len(word_list1)
total_palavras_ficheiro2 = len(word_list2)
total_palavras_ficheiro3 = len(word_list3)

print ("Total de palavras1: %s" % (total_palavras_ficheiro1))
print ("Total de palavras2: %s" % (total_palavras_ficheiro2))
print ("Total de palavras3: %s" % (total_palavras_ficheiro3))
"""
