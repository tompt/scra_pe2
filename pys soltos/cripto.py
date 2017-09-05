def enc64(mensagem):
   enc = mensagem.encode('base64')
   print "*"*100
   print "base64:\n",enc
   print "*"*100
   dec = enc.decode('base64')
   print "dec base 64:\n",dec
   print "*"*100
   print "FALTA GUARDAR E LER DE FICHEIRO!!!!"

def encrypt_RSA(public_key_loc, message):
   '''
   param: public_key_loc Path to public key
   param: message String to be encrypted
   return base64 encoded encrypted string
   '''
   from Crypto.PublicKey import RSA
   from Crypto.Cipher import PKCS1_OAEP
   key = open(public_key_loc, "r").read()
   message=open(message,"r").read()

   rsakey = RSA.importKey(key)
   rsakey = PKCS1_OAEP.new(rsakey)
   encrypted = rsakey.encrypt(message)
   #print encrypted.encode('base64')
   return encrypted.encode('base64') 

def decrypt_RSA2(private_key_loc, package):
    '''
    param: public_key_loc Path to your private key
    param: package String to be decrypted
    return decrypted string
    '''
    from Crypto.PublicKey import RSA 
    from Crypto.Cipher import PKCS1_OAEP 
    from base64 import b64decode 
    key = open(private_key_loc, "r").read() 
    package=open(package,"r").read()

    rsakey = RSA.importKey(key) 
    rsakey = PKCS1_OAEP.new(rsakey) 
    decrypted = rsakey.decrypt(b64decode(package)) 
    return decrypted

def sign_data(private_key_loc, data):
    '''
    param: private_key_loc Path to your private key
    param: package Data to be signed
    #print 'Vamos colocar:\nbase64 encoded signature:'
    #print '\n', base64 encoded signature
    return: base64 encoded signature
    '''
    from Crypto.PublicKey import RSA 
    from Crypto.Signature import PKCS1_v1_5 
    from Crypto.Hash import SHA256 
    from base64 import b64encode, b64decode 
    key = open(private_key_loc, "r").read() 
    rsakey = RSA.importKey(key) 
    signer = PKCS1_v1_5.new(rsakey) 
    digest = SHA256.new() 
    # It's being assumed the data is base64 encoded, so it's decoded before updating the digest 
    #digest.update(b64decode(data)) 
    #sign = signer.sign(digest)
    data = open(data,"r").read()
    digest.update(data)
    #print "dados:\n",data 
    sign = signer.sign(digest)

    print b64encode(sign)
    return b64encode(sign)
    
def verify_sign(public_key_loc, signature, data):
    '''
    Verifies with a public key from whom the data came that it was indeed 
    signed by their private key
    param: public_key_loc Path to public key
    param: signature String signature to be verified
    return: Boolean. True if the signature is valid; False otherwise. 
    '''
    from Crypto.PublicKey import RSA 
    from Crypto.Signature import PKCS1_v1_5 
    from Crypto.Hash import SHA256 
    from base64 import b64decode 
    pub_key = open(public_key_loc, "r").read() 
    #meu
    data = open(data,"r").read() 
    signature = open(signature,"r").read()

    rsakey = RSA.importKey(pub_key) 
    signer = PKCS1_v1_5.new(rsakey) 
    digest = SHA256.new() 
    # Assumes the data is base64 encoded to begin with
    #digest.update(b64decode(data)) 
    digest.update(data)
    if signer.verify(digest, b64decode(signature)):
    #if signer.verify(digest,signature):
      print "*"*50,"\n\tAssinatura VALIDA!\n","*"*50 
      return True
    print "*"*50,"\n\tAssinatura INVALIDA!!!\n","*"*50
    return False

#def generate_RSA(bits=2048,nome):
def generate_RSA(bits,nome): #falta aplicar o nome ao ficheiro
    '''
    Generate an RSA keypair with an exponent of 65537 in PEM format
    param: bits The key length in bits
    Return private key and public key
    '''
    from Crypto.PublicKey import RSA 
    new_key = RSA.generate(bits, e=65537) 
    public_key = new_key.publickey().exportKey("PEM") 
    private_key = new_key.exportKey("PEM") 

    print "Chave privada de ",nome,"\n",private_key
    print "Chave publica de ",nome,"\n",public_key

    return private_key, public_key



print "*"*100
print "Escolha a opcao:"
print "*" * 50
print "\t1 - Gerar chaves publicas e privadas"
print "\t2 - Assinar documento digitalmente"
print "\t3 - Verificar assinatura digital\n"
print "\t4 - Cifrar texto/mensagem RSA"
print "\t5 - Decifrar texto/mensagem RSA"
print "\t6 - Codificar e descodificar com Base64"
print "*"* 20
print "Outra tecla... sair"
print "*"*100

opcao=int(raw_input("Opcao:"))

if opcao==4:
        print "Cifrar mensagem com chave publica:"
	print "Vai cifrar mensagem para terceiros. Seleccione a chave publica dessa pessoa."
	chavePublica= 'publica.aes' #raw_input("Nome do ficheiro da chave publica: ")
	mensagem = 'texto.txt' #raw_input("Escreva mensagem a ser codificada: ")
	print "*"*90,"\n\tMensagem cifrada:\n","*"*90
	print encrypt_RSA(chavePublica,mensagem)
	print "*"*90

if opcao==5:
	print "Decifrar mensagem de chave publica, com a sua chave privada"
	print "Introduza o ficheiro com a sua chave privada"
	chavePrivada = "privada.aes" #raw_input("Ficheiro da Chave PRIVADA: ")
	mensagem = "texto2.txt" #raw_input("Ficheiro da mensagem codificada: ")
	print "*"*90,"\n\tConteudo decifrado do ficheiro:",mensagem,":\n","*"*90
	print decrypt_RSA2(chavePrivada,mensagem)
	print "*"*90

if opcao==6:
	print "Codificar com base 64"
	mensagem=raw_input("Mensagem: ")
	enc64(mensagem)	

#generate_RSA()
#sign_data('privada.aes','texto_normal.txt')
#verify_sign('publica.aes','assinatura.txt','texto_normal.txt')

if opcao==1:
	print "Geracao de chaves"
	print "*"*30
	print "Indique o nome que pretende para as chaves\n"
	print "Ficara nome-privado.key e nome-publico.key\n"
	nome=raw_input("Insira o nome pretendido: ")
	generate_RSA(2048,nome)
if opcao==2:
	print "Assinatura Digital"
	print "*"*30
	print "Indique o ficheiro da chave PRIVADA"
	print "Exemplo: nome-privado.key"
	chavePrivada=raw_input("Chave Privada: ")
	print "Introduza o nome do ficheiro que pretende assinar:"
	print "Exemplo: ficheiro_de_dados.txt"
	ficheiroAssinar=raw_input("Ficheiro a ser assinado:")
	sign_data(chavePrivada,ficheiroAssinar)
if opcao==3:
        print "Verificar Assinatura Digital"
        print "*"*30
        print "Indique o ficheiro da chave PUBLICA"
        print "Exemplo: nome-publica.key"
        chavePublica=raw_input("Chave Publica: ")
	print "Introduza o nome do ficheiro da assinatura"
	print "Exemplo: assinatura.txt"
	assinatura=raw_input("Ficheiro da assinatura: ")
	print "Introduza o nome do ficheiro que deseja verificar"
	print "Exemplo: ficheiro_assinado.txt"
	ficheiroAssinado=raw_input("Ficheiro a ser verificado: ")
	verify_sign(chavePublica,assinatura,ficheiroAssinado)


