#!/usr/bin/env python
# -*- coding: utf-8 -*-
__author__ = "Tomás"

import hashlib

IMAGEM = "imagem1.jpg"

hasher = hashlib.md5()
with open(IMAGEM, 'rb') as afile:
    buf = afile.read()
    hasher.update(buf)
    RESULTADO = hasher.hexdigest()

print("Resultado:\n\tImagem:%s\n\tHash:%s" % (IMAGEM,RESULTADO))