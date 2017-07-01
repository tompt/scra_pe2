#!/usr/bin/python
#!/usr/bin/env python3
"""@package docstring"""
# -*- coding: utf-8 -*-

import os
print "Gerando ficheiro pdf com os resultados..."
try:
	os.system("wkhtmltopdf relatorio.htm relatorio_osint.pdf")
	print "Ficheiro \"relatorio_osint.pdf\" gerado com sucesso"
except:
	print "Ocorreu um erro. Verifique se o ficheiro relatorio.htm existe"