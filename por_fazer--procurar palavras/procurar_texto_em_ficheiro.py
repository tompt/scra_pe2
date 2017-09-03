

words = ['isotope', 'proton', 'electron', 'neutron', 'ficheiro']


def check():
    with open('LER_ME.txt', 'r') as datafile:
        for word in words:
            print("%s" % word)
            for line in datafile:
                if word in line:
                    found = True
                    print("\texiste %s" % word)
                    #break
                    #return found

if check():
    print ("true")
else:
    print ("false")