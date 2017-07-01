#!/usr/bin/env python3
# encoding: utf-8

import os,sys
import smtplib
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def MANDAREMAIL(assunto, sender,gmail_password,recipients,ficheiros,mensagem):

    COMMASPACE = ', '
    #ASSUNTO=teste de envio
    #DE = '0@gmail.com'
    #PARA = ['0@gmail.com']
    #PASSE = 'dfsdfsdf.sdf!'
    #recipients = ['@gmail.com']
    #sender = "@gmail.com"
    #gmail_password = ""


    # Create the enclosing (outer) message
    outer = MIMEMultipart()
    outer['Subject'] = assunto
    outer['To'] = COMMASPACE.join(recipients)
    outer['From'] = sender
    outer.preamble = 'You will not see this in a MIME-aware mail reader.\n'
    outer.attach(MIMEText(mensagem, 'plain'))  # or 'html'

    # List of attachments
    #attachments = ['./teste1.py']
    attachments = ficheiros
    #['FULL PATH TO ATTACHMENTS HERE']

    # Add the attachments to the message
    for file in attachments:
        try:
            with open(file, 'rb') as fp:
                msg = MIMEBase('application', "octet-stream")
                msg.set_payload(fp.read())
                encoders.encode_base64(msg)
                msg.add_header('Content-Disposition', 'attachment', filename=os.path.basename(file))
                outer.attach(msg)
        except:
            print("Não foi possivel abrir um dos anexos, portanto mail nao foi enviado. Possiveis causas: existe? \nErro: ", sys.exc_info()[0])
            sys.exit()


    composed = outer.as_string()

    # Send the email
    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as s:
            s.ehlo()
            s.starttls()
            s.ehlo()
            s.login(sender, gmail_password)
            s.sendmail(sender, recipients, composed)
            s.close()
        print("Email Enviado!!")
    except:
        print("Não foi possível enviar o email. Erro: ", sys.exc_info()[0])
        raise


if __name__ == '__main__':
    assunto="ASSUNTO - Envio de um pdf 56"
    recipients = ['0@gmail.com','@gmail.com']
    sender = "0@gmail.com"
    gmail_password =""
    ficheiros=['./teste1.pdf'] #se estiver vazio da erro...
    mensagem="este é o texto do email\n oh yah\n oh yeah \n 3a linha"

    MANDAREMAIL(assunto,sender, gmail_password, recipients,ficheiros,mensagem)
