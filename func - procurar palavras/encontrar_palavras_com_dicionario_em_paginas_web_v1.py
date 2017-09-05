# -*- coding: utf-8 -*-
import modulo_mysql
import time #para usar sleep

"""a fazer
1 - usar o py para remover dupes na bd em que:
    1- url e dono sejam iguais
    2- ainda nao tenha sido feito
"""

LISTA_DO_QUE_PROCURAMOS = ["whitebear", "securelist", "twitter_account", "merda", "terrorismo", "terror", "ameaça","sporting","bomba","governo","antónio","costa"]

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
stopwords += ['e', 'a', 'as', 'de','que','da','o','os','das','um', 'com', 'em','à','é','','ccedil','p','eacute','atilde','na''um','uma','para','nesta','m','ul','tr','aacute','na','dos']
stopwords += ['ter','és','actualidade','atualidade','sapo','ainda','madremedia','já']

def EXEMPLO_CORTAR_TEXTO():
    message9 = "Hello World"
    message9a = message9[1:8]
    print(message9a)
    #-> ello Wo


def SUBSTITUIR(TEXTO,PALAVRA_A_ENCONTRAR,PALAVRA_NOVA):
    #exemplo:
    #SUBSTITUIR("MAS CA GRANDA caca!!!", "caca", "espectaculo")

    TEXTO = TEXTO.replace(PALAVRA_A_ENCONTRAR, PALAVRA_NOVA)
    #print(TEXTO)
    return TEXTO


#dicionarios
# Given a list of words, remove any that are in a list of stop words.
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


# Given a text string, remove all non-alphanumeric characters (using Unicode definition of alphanumeric).
def stripNonAlphaNum(text):
    import re
    #return text - lixo
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


def LISTA_FREQUENCIAS(TEXTO):
    wordlist = stripNonAlphaNum(TEXTO)
    fullwordlist = stripNonAlphaNum(TEXTO)

    wordlist = removeStopwords(fullwordlist, stopwords)
    dictionary = wordListToFreqDict(wordlist)

    sorteddict = sortFreqDict(dictionary)
    #exemplo:
    #for s in sorteddict:
    #    print(str(s))
    return sorteddict


"""-----------------------------------------------------------------------------------"""

"""exemplo:"""
html = '''
As regras da aviação são claras e bem rígidas no que toca à utilização de equipamentos eletrónicos durante os voos. Estas regras pretendem apenas garantir a segurança em 
todos os momentos. A investigação ao acidente que levou à queda do voo 804 da EgyptAir está a começar a ter as primeiras conclusões, que revelam que terá sido um iPhone ou
 um iPad o causador do acidente. Foi em maio de 2016 que o voo 804 da EgyptAir sofreu um acidente que levou à sua queda e à morte de 66 passageiros. As primeiras conclusões 
 apontavam a explosão de um engenho explosivo como a causa do acidente, mas surgem agora mais detalhes. iPhone ou iPad causaram o acidente do voo 804 Novas informações surgiram
  agora e apontam para outras causas. De acordo com um relatório recente, o problema terá tido origem num iPhone ou num iPad Mini 4 que pertencia ao primeiro oficial do voo.
   Estes equipamentos estariam ligados a uma tomada com problemas, tendo aquecido em demasia e provocado um fogo. Em consequência deste fogo, terá havido problemas maiores 
   que depois levaram à queda do voo 804 da EgyptAir no mediterrâneo. A reação da Apple a esta suspeita Apesar de não estar ainda envolvida nas investigações sobre a queda 
   deste avião, a Apple já reagiu, revelando que não foi contactada pelos investigadores e que aguarda todas as questões que estes possam ter. We haven’t been contacted by 
   [Air Transport Gendarmerie] or any authority investigating this tragic event. We have not seen any report, but we understand there is no evidence to link this event to 
   Apple products. If investigators have questions for us, we would, of course, assist in any way we can. We rigorously test our products to ensure they meet or exceed 
   international safety standards. As investigações vão continuar, procurando entender as causas da queda do voo 804 da EgyptAir. A Apple não tem registo de problemas com os 
   seus equipamentos, mas não é de descartar que um dos seus equipamentos tenha culpa neste acidente.'''

html2 = '''
div class="large-8  column corpo">
<p>O primeiro-ministro convocou o chefe do Estado Maior das For&ccedil;as Armadas e os chefes dos tr&ecirc;s ramos militares, Ex&eacute;rcito, Marinha e For&ccedil;a A&eacute;rea 
para uma reuni&atilde;o nesta ter&ccedil;a-feira.</p> <p>O encontro ter&aacute; lugar na resid&ecirc;ncia oficial do primeiro-ministro, em S&atilde;o Bento, &agrave;s 17h e 
contar&aacute; tamb&eacute;m com a presen&ccedil;a do ministro da Defesa, Azeredo Lopes.</p> <p>Reuni&atilde;o com o Estado-Maior General das For&ccedil;as Armadas, general Artur 
Pina Monteiro, o chefe do Estado Maior do Ex&eacute;rcito, general Rovisco Duarte, o chefe de Estado-Maior da For&ccedil;a A&eacute;rea, general Manuel Teixeira Rolo, e o chefe de 
Estado-Maior da Armada, almirante Silva Ribeiro. Em cima da mesa est&aacute; a seguran&ccedil;a em instala&ccedil;&otilde;es militares.</p><ul class="temas horizontal show-for-small">
'''

"""
#FUNCIONA
text = html.lower()
wordlist = stripNonAlphaNum(text)
fullwordlist = stripNonAlphaNum(text)

wordlist = removeStopwords(fullwordlist, stopwords)
dictionary = wordListToFreqDict(wordlist)
"""

""" funca lista de frequencias
sorteddict = sortFreqDict(dictionary)
for s in sorteddict:
    print(str(s))
"""

#funca bem
#print("Frequencias:")
#frequencia = LISTA_FREQUENCIAS(text)
#for s in frequencia:
#    print(str(s))



""" teste com html2 """
"""
text = html2.lower()
wordlist = stripNonAlphaNum(text)
fullwordlist = stripNonAlphaNum(text)
wordlist = removeStopwords(fullwordlist, stopwords)
dictionary = wordListToFreqDict(wordlist)
print("texto sem html:\n%s" % stripTags(text))
print("Frequencia de palavras - TOP 10:")
frequencia = LISTA_FREQUENCIAS(text)

for s in range(10):
    s=s+1
    print("%s %s" % (s,frequencia[s]))
"""
""" // teste com html2 """



def PROCURAR_PALAVRAS_E_LISTAR_CONTEUDOS_EM_PAGINAS_WEB(LISTA_DO_QUE_PROCURAMOS, URL, ID, MAQUINA, TOP_DE_FREQUENCIAS_QUE_QUEREMOS,MOSTRAR_TODOS_TERMOS):
    import requests
    from bs4 import BeautifulSoup
    import lxml

    #usamos um user-agent para nao sermos barrados pelo browser
    user_agent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64)'
    header = {'User-Agent': user_agent}

    req = requests.get(URL, headers=header)
    print("Codigo obtido (se for 200 eh sucesso):%s" % req.status_code)
    print("Browser usado: %s" % user_agent)

    soup = BeautifulSoup(req.text, "html.parser")
    #print(soup)
    text=soup.text.lower()

    wordlist = stripNonAlphaNum(text)
    print("wordlist:%s" % wordlist)

    fullwordlist = stripNonAlphaNum(text)
    #print("fullwordlist:%s" % fullwordlist)

    wordlist = removeStopwords(fullwordlist, stopwords)
    #print("wordlist:%s" % wordlist)

    dictionary = wordListToFreqDict(wordlist)
    #print("dictionary:%s" % dictionary)

    print("\nTop %s de Frequencias:" % TOP_DE_FREQUENCIAS_QUE_QUEREMOS)
    frequencia = LISTA_FREQUENCIAS(text)
    for s in range(TOP_DE_FREQUENCIAS_QUE_QUEREMOS):
        s = s + 1
        #print("%sº- %s - %s" % (s, frequencia[s][0],frequencia[s][1]))
        print("\t%s - %s" % (frequencia[s][0],frequencia[s][1]))


    #encontrar coisas no dicionario. Habilitar abaixo para funcionar como exemplo
    #LISTA_DO_QUE_PROCURAMOS=["whitebear","securelist","twitter_account","merda"]

    print("\nPalavras encontradas:")
    for PALAVRA in LISTA_DO_QUE_PROCURAMOS:
        vezes = [value for key, value in dictionary.items() if PALAVRA in key.lower()]
        if vezes:
            TERMO_ENCONTRADO=("%s_%s" % (PALAVRA,vezes[0]))
            print("\t%s" % TERMO_ENCONTRADO)
            modulo_mysql.INSERIR("INSERT INTO resultados (url, estado, interesse,termos,operacao_origem,MAQUINA) VALUES ('%s', '%s', '%s','%s', '%s', '%s');" % (URL,"feito","sim",TERMO_ENCONTRADO,ID,MAQUINA))
        else:
            pass
            #print ("Nao foram encontradas nenhumas das palavras pretendidas")

    if MOSTRAR_TODOS_TERMOS==True: #so mostramos isto se a opcao tiver sido false. pode dar muito lixo..
        print("\nTermos nunca encontrados na URL:")
        for PALAVRA in LISTA_DO_QUE_PROCURAMOS:
            vezes = [value for key, value in dictionary.items() if PALAVRA in key.lower()]
            if vezes:
                pass
            else:
                print ("\t%s: nunca apareceu" % PALAVRA)

    return soup #para poder ser util noutras situacoes e sem fazer novos pedidos

def REMOVER_LINKS_DUPLICADOS(LISTA_LINKS,ID):
    NOVA_LISTA_LINKS=[]
    REPETIDOS = set()
    for LINK in LISTA_LINKS:
        # If value has not been encountered yet,
        # ... add it to both list and set.
        if LINK not in REPETIDOS:
            NOVA_LISTA_LINKS.append(LINK)
            REPETIDOS.add(LINK)

            #inserir o encontrado(todos os links na bd)
            print("adicionando %s" % LINK),\
            modulo_mysql.INSERIR("INSERT INTO resultados (url, estado, interesse,termos,operacao_origem,MAQUINA) VALUES ('%s', '%s', '%s','%s', '%s', '%s');" % (LINK, "aguarda", "", "", ID, MAQUINA))

    #print(LISTA_LINKS)
    return NOVA_LISTA_LINKS

def OBTER_LINKS(SOPA,URL,ID):
    TOTAL=1
    LISTA_LINKS=[]
    from urllib.parse import urljoin
    #print(SOPA)
    for link in SOPA.find_all('a'):
        #print("1-%s" % link.get('href'))
        #print("2-%s\n" % (SOPA.find('a')['href']))

        #from urllib.parse import urljoin
        base = URL
        href = (link.get('href'))
        urljoin(base, href)
        LINK="%s" % (urljoin(base,href))
        #print("%s - %s" % (TOTAL,LINK))
        'http://example.com/folder/big/a.jpg'
        LISTA_LINKS.append(LINK)
        TOTAL=TOTAL+1

    """REMOVER DUPLICADOS"""
    print("Total de links: %s" % TOTAL)
    LISTA_LINKS = REMOVER_LINKS_DUPLICADOS(LISTA_LINKS,ID)
    print("Total de links nao repetidos: %s" % len(LISTA_LINKS))
    return LISTA_LINKS


""" ----------------------------------------- COMECA AQUI a execucao da aplicacao----------------------------------- """
#FUNCIONAL
# LISTA_DO_QUE_PROCURAMOS=["whitebear","securelist","twitter_account","merda"]
#URL = "https://securelist.com/introducing-whitebear/81638/"
#TOP_DE_FREQUENCIAS_QUE_QUEREMOS=10
#PROCURAR_PALAVRAS_E_LISTAR_CONTEUDOS_EM_PAGINAS_WEB(LISTA_DO_QUE_PROCURAMOS, URL,TOP_DE_FREQUENCIAS_QUE_QUEREMOS)
""" acaba aqui"""


import modulo_hora
DATA= modulo_hora.DATA()
MAQUINA="LZ"
"""IDEIAS: 
    1- obter listagem de 1 site ainda nao visto
    2- obter listagem de termos a procurar
    
    3- alterar na bd o site para "em execucao"
    4- procurar no site os termos
    5- mostrar o top de frequencia de termos/palavras
    6- mostrar resultados e inseri-los na bd
"""
#import modulo_mysql
#vamos confirmar que existe algo para crawlar
LISTA_SITES = modulo_mysql.OBTER_SITES()
#so para debug: print(LISTA_SITES)
if not LISTA_SITES[0]:
    """ZONA SO PARA O CASO DE NAO EXISTIREM SITES PRINCIPAIS E PARA DEPOIS PASSARMOS AOS SUB-LINKS"""
    print("\n\nNao existem sites para pesquisar...")

    #procurar por todos os sites que estiverem nos resultados.
    print("Vamos dar um delay e comecar a pesquisar cada site que existir na lista de resultados..")
    #time.sleep(5)
    LISTA_RESULTADOS = modulo_mysql.OBTER_RESULTADOS_PROXIMO()
    print("LISTA_RESULTADOS: %s %s %s" % (LISTA_RESULTADOS[0],LISTA_RESULTADOS[1],LISTA_RESULTADOS[2]))
    if not LISTA_RESULTADOS[0]:
        print("Nao existem resultados nao pesquisados. Tudo feito.")
    else:
        URL=LISTA_RESULTADOS[0]
        id_original=LISTA_RESULTADOS[1]
        ID=LISTA_RESULTADOS[2]
        print("URL:%s id_original:%s id_de_origem:%s" % (URL, id_original, ID))

    """esta lista pode vir de ficheiro ou bd..."""
    #LISTA_DO_QUE_PROCURAMOS = ["whitebear", "securelist", "twitter_account", "merda", "terrorismo", "terror", "ameaça","sporting"]
    # URL = "https://securelist.com/introducing-whitebear/81638/"
    # TOP_DE_FREQUENCIAS_QUE_QUEREMOS=10

    """o interesse nao eh porque ja existia antes de ser avaliado"""
    modulo_mysql.ACTUALIZAR("UPDATE resultados SET estado = '%s',maquina='%s',interesse='%s' WHERE id='%s';" % ('feito', MAQUINA, "nao", id_original))

    SOPA = PROCURAR_PALAVRAS_E_LISTAR_CONTEUDOS_EM_PAGINAS_WEB(LISTA_DO_QUE_PROCURAMOS, URL, ID,MAQUINA,
                                                           TOP_DE_FREQUENCIAS_QUE_QUEREMOS=10,
                                                           MOSTRAR_TODOS_TERMOS="False")  # sopa eh o codigo web da pagina
    """ //// ZONA SO PARA O CASO DE NAO EXISTIREM SITES PRINCIPAIS E PARA DEPOIS PASSARMOS AOS SUB-LINKS"""
else:
    print("\n\nLista de sites ainda nao crawlados nem verificados por texto que pretendemos:")

    #ter a certeza que correu bem a obtencao dos sites: print(LISTA_SITES)
    #o ID abaixo serve para usar mais tarde nas actualizacoes e insercoes de dados
    for site in LISTA_SITES[1]:
        ID = site
        print("ID:%s" % ID)

    for site in LISTA_SITES[0]:
        # actualizar estado da BD encontrada
        modulo_mysql.ACTUALIZAR("UPDATE lista_sites SET estado = '%s',maquina='%s' WHERE id='%s';" % ('em execucao', MAQUINA, ID))

        print("URL a pesquisar: %s" % (site))
        URL = site

        """esta lista pode vir de ficheiro ou bd..."""
        #LISTA_DO_QUE_PROCURAMOS=["whitebear","securelist","twitter_account","merda","terrorismo","terror","ameaça"]
        #URL = "https://securelist.com/introducing-whitebear/81638/"
        #TOP_DE_FREQUENCIAS_QUE_QUEREMOS=10
        SOPA=PROCURAR_PALAVRAS_E_LISTAR_CONTEUDOS_EM_PAGINAS_WEB(LISTA_DO_QUE_PROCURAMOS, URL, ID, MAQUINA, TOP_DE_FREQUENCIAS_QUE_QUEREMOS=10,MOSTRAR_TODOS_TERMOS="False") #sopa eh o codigo web da pagina

        #1 - obter links do site em causa
        #2 - enviar estes links para a bd se nao existir
        total=1
        LISTA_LINKS=OBTER_LINKS(SOPA,URL,ID)
        #print("\nLinks obtidos:")
        for SITE in LISTA_LINKS:
        #    print("%s - %s " % (total,SITE))
            total=total+1

        #funca mas nao interessa agora:
        #for dono in LISTA_SITES[1]:
        #    print("dono: %s" % (dono))

        #Colocar a BD como estando feita
        modulo_mysql.ACTUALIZAR("UPDATE lista_sites SET estado = '%s',maquina='%s' WHERE id='%s';" % ('feito', MAQUINA, ID))
        """FIM de ideia 1"""


"""IDEIAS 2: HASH DE TEXTO DE SITE"""
import hashlib
texto='asfsans oafhao pihapsif apisfj piajfpsiaj pfiasjpsaij paisjf apisjfpaisjpasjf aspfji apsif aspij aspi ipas aspf'.encode("utf-8")
#ou texto=texto.encode("utf-8")
print("\nsha 256 de texto x: %s" % (hashlib.sha256(texto).hexdigest()))

