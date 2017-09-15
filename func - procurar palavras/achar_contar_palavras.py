#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re, os
str='''
<html>
Doze perguntas e respostas sobre os portugueses na Jihad
<br>
Quem são, quantos são, de onde vieram, como chegaram à Síria, onde lutam... O perfil possível dos portugueses que integram as fileiras do Estado Islâmico.
<br><br>
Raquel Moleiro e Hugo Franco |<br>
<img src="http://expresso.sapo.pt/users/0/3/hr-a5b6.jpg">R.
<img src="http://expresso.sapo.pt/users/2407/240714/danieloliveira-fffe.jpg"> R.
<img src="http://expresso.sapo.pt/users/2407/240714/henriquemonteiromini-17cf.jpg">
 <br><br>
14:18 Segunda feira, 15 de setembro de 2014<br><br><br>
Fábio, um dos 10 a 15 portugueses referenciados, aqui numa foto publicada no Facebook e tirada na Síria<br><br>

1. Quantos portugueses lutam atualmente na Síria e no Iraque?<br>
Estão referenciados pelos serviços de informações entre 10 a 15 cidadãos nacionais, a combater na Síria e no Iraque.  <br>
<br><br>
 

2. Quem são estes jihadistas?<br>
Têm entre 19 e 28 anos, instruídos, muitos com frequência universitária. Há licenciados em Gestão, futebolistas, engenheiros de sistemas, estudantes de desporto... A maioria nasceu e cresceu em Portugal e emigrou há poucos anos para outros países da Europa. Em abril, o Sistema de Informações da República Portuguesa (SIRP) confirmava que alguns "detinham um estatuto de residência temporária noutros países europeus, embora apresentem conexões sociais e familiares ao território nacional". Há também vários casos de lusodescendentes, em França e na Holanda.
<br><br>
 

3. São todos muçulmanos?<br>
Sim, mas convertidos na adolescência ou já adultos. A maioria nasceu e cresceu no seio de famílias cristãs, muitos serão até batizados.
<br><br>
 

4. Combatem todos nas fileiras do Estado Islâmico (EI)?<br>
Todos os casos identificados pelo Expresso lutam pelo EI. A única mulher,  Ângela ou Umm , não participa na luta armada - faz a sua Jihad na Internet e é casada com  Fábio , do EI.
<br><br>
 

5. De que locais são originários?<br>
Há grupos distintos e casos isolados. Dois irmãos (um dos quais se chama Celso), de 26 e 30 anos, e Fábio (Abdu), de 22, cresceram em duas localidades diferentes da Linha de Sintra, nos arredores de Lisboa. Conheceram-se em Londres, em Leyton, para onde emigraram com uma década de distância. Ao 'grupo londrino' juntou-se ainda um cidadão algarvio, de 28 anos. Terão ido todos juntos para a Síria. Ângela, filha de pais alentejanos, cresceu na Holanda, nos arredores de Utrecht, e daí fugiu em agosto para casar com Fábio. Micael, lusodescendente de pais transmontanos, trocou os subúrbios de Paris pela Síria - com ele foi também Santos, outro filho de emigrantes portugueses em França.

 <br><br>

6. Onde se radicalizaram?<br>Rogério lopes
Tornaram-se muçulmanos e radicalizaram-se fora de Portugal: em Inglaterra, Holanda e França. Há também indivíduos referenciados no Luxemburgo, pelo apoio público e promoção continuada à luta do Estado Islâmico. Na maioria dos casos, os processos de conversão ao Islão e posterior apoio à Jihad foram muitos rápidos - entre um a três anos. Pelo menos quatro dos portugueses que lutam atualmente na Síria foram aliciados para a guerra santa no bairro de Leyton, nos arredores de Londres, onde existe uma mesquita referenciada como radical pelas autoridades britânicas. 
<br><br>
 

7. Tinham experiência militar?<br>Rogério
Não. Alguns eram praticantes (ou mesmo atletas federados) de artes marciais, como o judo, Muay Thai ou Jiu Jitsu, mas sem passado militar. A maioria nunca tinha pegado numa arma. Pelos relatos feitos ao Expresso, depois de chegarem à Síria todos passaram alguns meses em campos de treino terrorista antes de irem para a frente de combate.
<br><br>
 

8. Estão todos na Síria ou também no Iraque?<br>R.
A maioria vive em Raqqa, a 'capital' informal do Estado Islâmico, ou na província de Aleppo, zonas do norte da Síria, controladas pelos radicais. Na semana passada, pelo menos um dos portugueses esteve a combater no Iraque, em Mossul, tendo entretanto regressado à Síria.
<br><br>
 

9. Como chegaram à Síria?<br>Rogério
Apanharam um voo até à Turquia. E daí, com apoio de redes organizadas ao serviço do Estado Islâmico, foram de carro até à Síria, a maioria até Alepo ou Raqqa.
<br><br>
 


10. Quantos portugueses já morreram?<br> Tomás
Está confirmada a morte de um lusodescendente, filho de um casal de portugueses que emigrara há longos anos de Tondela para Toulouse. Abu Osama Al-Faransi - o nome árabe que adotou após a conversão - morreu no Iraque, num ataque suicida a 22 de maio deste ano. Levou um carro armadilhado até às imediações de um complexo militar do exército iraquiano, em Umm Al-Amad, nos arredores de Bagdade, e aí acionou o dispositivo: morreu ele e dezenas de civis e militares. Há alguns meses, outro jihadista português, algarvio, ficou ferido com gravidade nas pernas - continua na Síria mas não regressou aos combates.
<br><br>
 

11. Podem ser presos caso decidam regressar a Portugal ou à Europa?<br>
Um dos maiores receios dos países ocidentais é o do regresso a casa de muitos dos seus jovens cidadãos que estão a combater nas fileiras do Estado Islâmico, na Síria e no Iraque. Mas, ao contrário de outros países - onde a polícia pode apreender passaportes ou simplesmente proibir de viajar cidadãos suspeitos, no âmbito da legislação antiterrorista -, em Portugal isso não é legal. O Expresso sabe que em 2013 um destes jihadistas esteve em Portugal, antes de regressar novamente ao Médio Oriente. O mesmo já se terá passado este ano com um outro combatente. As autoridades nacionais seguem com atenção o rasto destes jovens radicais, mas não têm argumento legal para os deter, para proibir o regresso a Portugal ou impedir que viajem de novo para a Síria ou para o Iraque. Ou seja, quando as autoridades portuguesas identificam algum potencial jihadista, a única coisa que podem fazer é abordá-lo e tentar dissuadi-lo de viajar para os campos de batalha, explicando os riscos que correm, bem como os problemas que podem vir a ter no futuro. O Expresso sabe que isso tem acontecido nos últimos meses.
<br><br>
 

12. Estão referenciados outros portugueses, a viver na Europa mas que apoiam e promovem a Jihad?<br>
Sim. No Luxemburgo, por exemplo, vive um lusodescendente de 28 anos, convertido numa mesquita de argelina. Surge no Facebook de barba longa e traje muçulmano a apelar ao coração dos jovens islâmicos para as batalhas que se travam na Síria. Ângela, a 'noiva portuguesa da jihad', também estava apenas referenciada por promoção da guerra santa e acabou por viajar da Holanda para a Síria. Várias fontes ouvidas pelo Expresso adiantam que há cada vez mais portugueses interessados nos vídeos difundidos pelo Estado Islâmico e que tem havido um aumento significativo na consulta a sites e blogues de propaganda e recrutamento. As autoridades portuguesas estão a acompanhar esta tendência "na medida dos meios disponíveis".
<<br><br>Tondela
</html>
'''

#exemplo funcional
print ("exemplo:")
sub = "Rogério";
palavra=sub
inicio=0
total=len(str)
print ("str.count(palavra:",palavra," inicio:",inicio,",total de caracteres:", total,") : ", str.count(palavra, inicio, len(str)))
sub = "jihad";
print ("str.count(palavra:",sub,") : ", str.count(sub))
print ("\n\n")

"""----------------------------teste python3-------------------------"""
x=0
lista=["rogéroio","tomás","Tondela","rui","rogério","rogerio"]
str2=str.lower()
for nome in lista:
	sub=nome.lower()
	inicio = 0
	total = len(str)
	print("str.count(palavra:", nome, " inicio:", inicio, ",total de caracteres:", total, ") : ", str2.count(nome, inicio, len(str2)))
"""------------------------------ fim teste python3 ----------------------"""

for line in str.lower():
	if re.match("(.*)(rogério|lopes)(.*)", line):
		print (line,)

"""
while True:
	#py2palavra=raw_input("Insira o nome a procurar (escreva \"sair\" para sair):") #raw_input ou input em 3.x
	palavra="helder"
	str2=str.lower()
	print ("str.count(palavra conforme inserida:",palavra,") : ", str.count(palavra))
	print ("str.count(palavra indif. a maiusculas/minusculas:",palavra.lower(),") : ", str2.count(palavra.lower()),"\n" )

	palavra=palavra.lower()
	if palavra == "sair":
		break
"""



