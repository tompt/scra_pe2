#!/usr/bin/python
#  -*- coding: utf-8 -*-


"""esta lista pode vir de ficheiro ou bd..."""
LISTA_DO_QUE_PROCURAMOS = ["whitebear", "securelist", "twitter_account", "merda", "terrorismo", "terror", "ameaça"]
# URL = "https://securelist.com/introducing-whitebear/81638/"
# TOP_DE_FREQUENCIAS_QUE_QUEREMOS=10
SOPA = PROCURAR_PALAVRAS_E_LISTAR_CONTEUDOS_EM_PAGINAS_WEB(LISTA_DO_QUE_PROCURAMOS, URL,
                                                           TOP_DE_FREQUENCIAS_QUE_QUEREMOS=10,
                                                           MOSTRAR_TODOS_TERMOS=False)  # sopa eh o codigo web da pagina
