import base64

s="asdpfsdopunogujnsd sdogh osdghosduhg sdo uhsdogu osduhg "

def stringToBase64(s):
    return base64.b64encode(s.encode('utf-8'))

def base64ToString(b):
    return base64.b64decode(b).decode('utf-8')

x=stringToBase64(s)
print(x)
z=(b"%s".decode("utf-8")% x )
print(z)

y=base64ToString(x)
print(y)