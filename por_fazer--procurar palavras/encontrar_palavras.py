# -*- coding: utf-8 -*-

stopwords = ['a', 'about', 'above', 'across', 'after', 'afterwards']
stopwords += ['again', 'against', 'all', 'almost', 'alone', 'along']
stopwords += ['already', 'also', 'although', 'always', 'am', 'among']
stopwords += ['amongst', 'amoungst', 'amount', 'an', 'and', 'another']
stopwords += ['any', 'anyhow', 'anyone', 'anything', 'anyway', 'anywhere']
stopwords += ['are', 'around', 'as', 'at', 'back', 'be', 'became']
stopwords += ['because', 'become', 'becomes', 'becoming', 'been']
stopwords += ['before', 'beforehand', 'behind', 'being', 'below']
stopwords += ['beside', 'besides', 'between', 'beyond', 'bill', 'both']
stopwords += ['bottom', 'but', 'by', 'call', 'can', 'cannot', 'cant']
stopwords += ['co', 'computer', 'con', 'could', 'couldnt', 'cry', 'de']
stopwords += ['describe', 'detail', 'did', 'do', 'done', 'down', 'due']
stopwords += ['during', 'each', 'eg', 'eight', 'either', 'eleven', 'else']
stopwords += ['elsewhere', 'empty', 'enough', 'etc', 'even', 'ever']
stopwords += ['every', 'everyone', 'everything', 'everywhere', 'except']
stopwords += ['few', 'fifteen', 'fifty', 'fill', 'find', 'fire', 'first']
stopwords += ['five', 'for', 'former', 'formerly', 'forty', 'found']
stopwords += ['four', 'from', 'front', 'full', 'further', 'get', 'give']
stopwords += ['go', 'had', 'has', 'hasnt', 'have', 'he', 'hence', 'her']
stopwords += ['here', 'hereafter', 'hereby', 'herein', 'hereupon', 'hers']
stopwords += ['herself', 'him', 'himself', 'his', 'how', 'however']
stopwords += ['hundred', 'i', 'ie', 'if', 'in', 'inc', 'indeed']
stopwords += ['interest', 'into', 'is', 'it', 'its', 'itself', 'keep']
stopwords += ['last', 'latter', 'latterly', 'least', 'less', 'ltd', 'made']
stopwords += ['many', 'may', 'me', 'meanwhile', 'might', 'mill', 'mine']
stopwords += ['more', 'moreover', 'most', 'mostly', 'move', 'much']
stopwords += ['must', 'my', 'myself', 'name', 'namely', 'neither', 'never']
stopwords += ['nevertheless', 'next', 'nine', 'no', 'nobody', 'none']
stopwords += ['noone', 'nor', 'not', 'nothing', 'now', 'nowhere', 'of']
stopwords += ['off', 'often', 'on','once', 'one', 'only', 'onto', 'or']
stopwords += ['other', 'others', 'otherwise', 'our', 'ours', 'ourselves']
stopwords += ['out', 'over', 'own', 'part', 'per', 'perhaps', 'please']
stopwords += ['put', 'rather', 're', 's', 'same', 'see', 'seem', 'seemed']
stopwords += ['seeming', 'seems', 'serious', 'several', 'she', 'should']
stopwords += ['show', 'side', 'since', 'sincere', 'six', 'sixty', 'so']
stopwords += ['some', 'somehow', 'someone', 'something', 'sometime']
stopwords += ['sometimes', 'somewhere', 'still', 'such', 'system', 'take']
stopwords += ['ten', 'than', 'that', 'the', 'their', 'them', 'themselves']
stopwords += ['then', 'thence', 'there', 'thereafter', 'thereby']
stopwords += ['therefore', 'therein', 'thereupon', 'these', 'they']
stopwords += ['thick', 'thin', 'third', 'this', 'those', 'though', 'three']
stopwords += ['three', 'through', 'throughout', 'thru', 'thus', 'to']
stopwords += ['together', 'too', 'top', 'toward', 'towards', 'twelve']
stopwords += ['twenty', 'two', 'un', 'under', 'until', 'up', 'upon']
stopwords += ['us', 'very', 'via', 'was', 'we', 'well', 'were', 'what']
stopwords += ['whatever', 'when', 'whence', 'whenever', 'where']
stopwords += ['whereafter', 'whereas', 'whereby', 'wherein', 'whereupon']
stopwords += ['wherever', 'whether', 'which', 'while', 'whither', 'who']
stopwords += ['whoever', 'whole', 'whom', 'whose', 'why', 'will', 'with']
stopwords += ['within', 'without', 'would', 'yet', 'you', 'your']
stopwords += ['yours', 'yourself', 'yourselves']
#EM PORTUGUES
stopwords += ['e', 'a', 'as', 'de','que','da','o','os','das','um']

"""FUNCIONAL
wordlist = ['mississippi','miss','lake','que','teabaoista']

letters = set('aqk')

for word in wordlist:
    if letters & set(word):
        print (word)

print ("-"*50)
"""
"""----------------------FUNCIONAL--------------------------------"""
"""FUNCIONAL
s = "This be a string"
if s.find("is") == -1:
    print ("Não Encontrado!")
else:
    print ("Existe")
"""
"""---------------------FUNCIONAL---------------------------------
TEXTO = "As regras da aviação são claras e bem rígidas no que toca à utilização de equipamentos eletrónicos durante os voos. Estas regras pretendem apenas garantir a segurança em todos os momentos. A investigação ao acidente que levou à queda do voo 804 da EgyptAir está a começar a ter as primeiras conclusões, que revelam que terá sido um iPhone ou um iPad o causador do acidente. Foi em maio de 2016 que o voo 804 da EgyptAir sofreu um acidente que levou à sua queda e à morte de 66 passageiros. As primeiras conclusões apontavam a explosão de um engenho explosivo como a causa do acidente, mas surgem agora mais detalhes. iPhone ou iPad causaram o acidente do voo 804 Novas informações surgiram agora e apontam para outras causas. De acordo com um relatório recente, o problema terá tido origem num iPhone ou num iPad Mini 4 que pertencia ao primeiro oficial do voo. Estes equipamentos estariam ligados a uma tomada com problemas, tendo aquecido em demasia e provocado um fogo. Em consequência deste fogo, terá havido problemas maiores que depois levaram à queda do voo 804 da EgyptAir no mediterrâneo. A reação da Apple a esta suspeita Apesar de não estar ainda envolvida nas investigações sobre a queda deste avião, a Apple já reagiu, revelando que não foi contactada pelos investigadores e que aguarda todas as questões que estes possam ter. We haven’t been contacted by [Air Transport Gendarmerie] or any authority investigating this tragic event. We have not seen any report, but we understand there is no evidence to link this event to Apple products. If investigators have questions for us, we would, of course, assist in any way we can. We rigorously test our products to ensure they meet or exceed international safety standards. As investigações vão continuar, procurando entender as causas da queda do voo 804 da EgyptAir. A Apple não tem registo de problemas com os seus equipamentos, mas não é de descartar que um dos seus equipamentos tenha culpa neste acidente."
LISTA_PALAVRAS = ['mississippi','miss','lake','acidente','teabaoista','voo ']

TEXTO=TEXTO.lower()

for PALAVRA in LISTA_PALAVRAS:
    if TEXTO.find(PALAVRA) == -1:
        print("%s Não Encontrado!" % PALAVRA)
    else:
        print("Existe %s" % PALAVRA)
"""
"""--------------------- POUCO FUNCIONAL---------------------------------"""
"""wordstring = "As regras da aviação são claras e bem rígidas no que toca à utilização de equipamentos eletrónicos durante os voos. Estas regras pretendem apenas garantir a segurança em todos os momentos. A investigação ao acidente que levou à queda do voo 804 da EgyptAir está a começar a ter as primeiras conclusões, que revelam que terá sido um iPhone ou um iPad o causador do acidente. Foi em maio de 2016 que o voo 804 da EgyptAir sofreu um acidente que levou à sua queda e à morte de 66 passageiros. As primeiras conclusões apontavam a explosão de um engenho explosivo como a causa do acidente, mas surgem agora mais detalhes. iPhone ou iPad causaram o acidente do voo 804 Novas informações surgiram agora e apontam para outras causas. De acordo com um relatório recente, o problema terá tido origem num iPhone ou num iPad Mini 4 que pertencia ao primeiro oficial do voo. Estes equipamentos estariam ligados a uma tomada com problemas, tendo aquecido em demasia e provocado um fogo. Em consequência deste fogo, terá havido problemas maiores que depois levaram à queda do voo 804 da EgyptAir no mediterrâneo. A reação da Apple a esta suspeita Apesar de não estar ainda envolvida nas investigações sobre a queda deste avião, a Apple já reagiu, revelando que não foi contactada pelos investigadores e que aguarda todas as questões que estes possam ter. We haven’t been contacted by [Air Transport Gendarmerie] or any authority investigating this tragic event. We have not seen any report, but we understand there is no evidence to link this event to Apple products. If investigators have questions for us, we would, of course, assist in any way we can. We rigorously test our products to ensure they meet or exceed international safety standards. As investigações vão continuar, procurando entender as causas da queda do voo 804 da EgyptAir. A Apple não tem registo de problemas com os seus equipamentos, mas não é de descartar que um dos seus equipamentos tenha culpa neste acidente."
wordlist = wordstring.split()

wordfreq = []
for w in wordlist:
    wordfreq.append(wordlist.count(w))

print("String\n" + wordstring +"\n")
print("List\n" + str(wordlist) + "\n")
print("Frequencies\n" + str(wordfreq) + "\n")
print("Pairs\n" + str(zip(wordlist, wordfreq)))
"""
"""--------------------FUNCIONAL----------------------------------"""
"""TEXTO = "As regras da aviação são claras e bem rígidas no que toca à utilização de equipamentos eletrónicos durante os voos. Estas regras pretendem apenas garantir a segurança em todos os momentos. A investigação ao acidente que levou à queda do voo 804 da EgyptAir está a começar a ter as primeiras conclusões, que revelam que terá sido um iPhone ou um iPad o causador do acidente. Foi em maio de 2016 que o voo 804 da EgyptAir sofreu um acidente que levou à sua queda e à morte de 66 passageiros. As primeiras conclusões apontavam a explosão de um engenho explosivo como a causa do acidente, mas surgem agora mais detalhes. iPhone ou iPad causaram o acidente do voo 804 Novas informações surgiram agora e apontam para outras causas. De acordo com um relatório recente, o problema terá tido origem num iPhone ou num iPad Mini 4 que pertencia ao primeiro oficial do voo. Estes equipamentos estariam ligados a uma tomada com problemas, tendo aquecido em demasia e provocado um fogo. Em consequência deste fogo, terá havido problemas maiores que depois levaram à queda do voo 804 da EgyptAir no mediterrâneo. A reação da Apple a esta suspeita Apesar de não estar ainda envolvida nas investigações sobre a queda deste avião, a Apple já reagiu, revelando que não foi contactada pelos investigadores e que aguarda todas as questões que estes possam ter. We haven’t been contacted by [Air Transport Gendarmerie] or any authority investigating this tragic event. We have not seen any report, but we understand there is no evidence to link this event to Apple products. If investigators have questions for us, we would, of course, assist in any way we can. We rigorously test our products to ensure they meet or exceed international safety standards. As investigações vão continuar, procurando entender as causas da queda do voo 804 da EgyptAir. A Apple não tem registo de problemas com os seus equipamentos, mas não é de descartar que um dos seus equipamentos tenha culpa neste acidente."
LISTA_PALAVRAS = ['mississippi','miss','lake','acidente','teabaoista','voo ']

TEXTO=TEXTO.lower()
LISTA_PALAVRAS= TEXTO.split()
FREQUENCIA_PALAVRAS = []

for PALAVRA in LISTA_PALAVRAS:
    FREQUENCIA_PALAVRAS.append(LISTA_PALAVRAS.count(PALAVRA))

print("Texto/Frase\n" + TEXTO +"\n")
print("Lista\n" + str(LISTA_PALAVRAS) + "\n")
print("Frequencias\n" + str(FREQUENCIA_PALAVRAS) + "\n")
print("Pares\n" + str(zip(LISTA_PALAVRAS, FREQUENCIA_PALAVRAS)))
print(zip(LISTA_PALAVRAS, FREQUENCIA_PALAVRAS)) #NAO FUNCA
"""
"""------------------------------------------------------"""
#dicionarios
# Given a list of words, remove any that are
# in a list of stop words.

def removeStopwords(wordlist, stopwords):
    return [w for w in wordlist if w not in stopwords]

# Given a list of words, return a dictionary of word-frequency pairs.
def stripTags(pageContents):
    startLoc = pageContents.find("<p>")
    endLoc = pageContents.rfind("<br/>")

    pageContents = pageContents[startLoc:endLoc]

    inside = 0
    text = ''

    for char in pageContents:
        if char == '<':
            inside = 1
        elif (inside == 1 and char == '>'):
            inside = 0
        elif inside == 1:
            continue
        else:
            text += char

    return text

# Given a text string, remove all non-alphanumeric
# characters (using Unicode definition of alphanumeric).

def stripNonAlphaNum(text):
    import re
    return re.compile(r'\W+', re.UNICODE).split(text)

def wordListToFreqDict(wordlist):
    wordfreq = [wordlist.count(p) for p in wordlist]
    return dict(zip(wordlist,wordfreq))

# Sort a dictionary of word-frequency pairs in
# order of descending frequency.

def sortFreqDict(freqdict):
    aux = [(freqdict[key], key) for key in freqdict]
    aux.sort()
    aux.reverse()
    return aux

html = "As regras da aviação são claras e bem rígidas no que toca à utilização de equipamentos eletrónicos durante os voos. Estas regras pretendem apenas garantir a segurança em todos os momentos. A investigação ao acidente que levou à queda do voo 804 da EgyptAir está a começar a ter as primeiras conclusões, que revelam que terá sido um iPhone ou um iPad o causador do acidente. Foi em maio de 2016 que o voo 804 da EgyptAir sofreu um acidente que levou à sua queda e à morte de 66 passageiros. As primeiras conclusões apontavam a explosão de um engenho explosivo como a causa do acidente, mas surgem agora mais detalhes. iPhone ou iPad causaram o acidente do voo 804 Novas informações surgiram agora e apontam para outras causas. De acordo com um relatório recente, o problema terá tido origem num iPhone ou num iPad Mini 4 que pertencia ao primeiro oficial do voo. Estes equipamentos estariam ligados a uma tomada com problemas, tendo aquecido em demasia e provocado um fogo. Em consequência deste fogo, terá havido problemas maiores que depois levaram à queda do voo 804 da EgyptAir no mediterrâneo. A reação da Apple a esta suspeita Apesar de não estar ainda envolvida nas investigações sobre a queda deste avião, a Apple já reagiu, revelando que não foi contactada pelos investigadores e que aguarda todas as questões que estes possam ter. We haven’t been contacted by [Air Transport Gendarmerie] or any authority investigating this tragic event. We have not seen any report, but we understand there is no evidence to link this event to Apple products. If investigators have questions for us, we would, of course, assist in any way we can. We rigorously test our products to ensure they meet or exceed international safety standards. As investigações vão continuar, procurando entender as causas da queda do voo 804 da EgyptAir. A Apple não tem registo de problemas com os seus equipamentos, mas não é de descartar que um dos seus equipamentos tenha culpa neste acidente."

text = html.lower()
wordlist = stripNonAlphaNum(text)
fullwordlist = stripNonAlphaNum(text)

wordlist = removeStopwords(fullwordlist, stopwords)
dictionary = wordListToFreqDict(wordlist)

sorteddict = sortFreqDict(dictionary)

for s in sorteddict:
    print(str(s))