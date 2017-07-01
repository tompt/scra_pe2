import encontrar_palavras_com_dicionario
import baixar_e_sopar


html = "As regras da aviação são claras e bem rígidas no que toca à utilização de equipamentos eletrónicos durante os voos. Estas regras pretendem apenas garantir a segurança em todos os momentos. A investigação ao acidente que levou à queda do voo 804 da EgyptAir está a começar a ter as primeiras conclusões, que revelam que terá sido um iPhone ou um iPad o causador do acidente. Foi em maio de 2016 que o voo 804 da EgyptAir sofreu um acidente que levou à sua queda e à morte de 66 passageiros. As primeiras conclusões apontavam a explosão de um engenho explosivo como a causa do acidente, mas surgem agora mais detalhes. iPhone ou iPad causaram o acidente do voo 804 Novas informações surgiram agora e apontam para outras causas. De acordo com um relatório recente, o problema terá tido origem num iPhone ou num iPad Mini 4 que pertencia ao primeiro oficial do voo. Estes equipamentos estariam ligados a uma tomada com problemas, tendo aquecido em demasia e provocado um fogo. Em consequência deste fogo, terá havido problemas maiores que depois levaram à queda do voo 804 da EgyptAir no mediterrâneo. A reação da Apple a esta suspeita Apesar de não estar ainda envolvida nas investigações sobre a queda deste avião, a Apple já reagiu, revelando que não foi contactada pelos investigadores e que aguarda todas as questões que estes possam ter. We haven’t been contacted by [Air Transport Gendarmerie] or any authority investigating this tragic event. We have not seen any report, but we understand there is no evidence to link this event to Apple products. If investigators have questions for us, we would, of course, assist in any way we can. We rigorously test our products to ensure they meet or exceed international safety standards. As investigações vão continuar, procurando entender as causas da queda do voo 804 da EgyptAir. A Apple não tem registo de problemas com os seus equipamentos, mas não é de descartar que um dos seus equipamentos tenha culpa neste acidente."
URL = "http://www.openbsd.org/index.html"
URL = "https://ocultismopel.wordpress.com/category/ordens-iniciaticas/page/25/"

HTML = baixar_e_sopar.OBTER_HTML(URL)
#print (HTML)


LISTA_FREQUENCIAS = encontrar_palavras_com_dicionario.LISTA_FREQUENCIAS(HTML)
for s in LISTA_FREQUENCIAS:
    print(str(s))




#procurar palavras
#TEXTO = "As regras da aviação são claras e bem rígidas no que toca à utilização de equipamentos eletrónicos durante os voos. Estas regras pretendem apenas garantir a segurança em todos os momentos. A investigação ao acidente que levou à queda do voo 804 da EgyptAir está a começar a ter as primeiras conclusões, que revelam que terá sido um iPhone ou um iPad o causador do acidente. Foi em maio de 2016 que o voo 804 da EgyptAir sofreu um acidente que levou à sua queda e à morte de 66 passageiros. As primeiras conclusões apontavam a explosão de um engenho explosivo como a causa do acidente, mas surgem agora mais detalhes. iPhone ou iPad causaram o acidente do voo 804 Novas informações surgiram agora e apontam para outras causas. De acordo com um relatório recente, o problema terá tido origem num iPhone ou num iPad Mini 4 que pertencia ao primeiro oficial do voo. Estes equipamentos estariam ligados a uma tomada com problemas, tendo aquecido em demasia e provocado um fogo. Em consequência deste fogo, terá havido problemas maiores que depois levaram à queda do voo 804 da EgyptAir no mediterrâneo. A reação da Apple a esta suspeita Apesar de não estar ainda envolvida nas investigações sobre a queda deste avião, a Apple já reagiu, revelando que não foi contactada pelos investigadores e que aguarda todas as questões que estes possam ter. We haven’t been contacted by [Air Transport Gendarmerie] or any authority investigating this tragic event. We have not seen any report, but we understand there is no evidence to link this event to Apple products. If investigators have questions for us, we would, of course, assist in any way we can. We rigorously test our products to ensure they meet or exceed international safety standards. As investigações vão continuar, procurando entender as causas da queda do voo 804 da EgyptAir. A Apple não tem registo de problemas com os seus equipamentos, mas não é de descartar que um dos seus equipamentos tenha culpa neste acidente."
TEXTO= HTML
LISTA_PALAVRAS = ['mississippi','miss','lake','acidente','teabaoista','voo','maçonaria']

TEXTO=TEXTO.lower()

for PALAVRA in LISTA_PALAVRAS:
    if TEXTO.find(PALAVRA) == -1:
        #print("%s Não Encontrado!" % PALAVRA)
        pass
    else:
        print("Existe %s" % PALAVRA)
        for PALAVRA in LISTA_FREQUENCIAS:
            print("Palavra: %s" % str(PALAVRA))