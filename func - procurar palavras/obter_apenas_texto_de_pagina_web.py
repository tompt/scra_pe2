import re
import urllib.request
import requests
from bs4 import BeautifulSoup

user_agent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64)'
header = {'User-Agent': user_agent}

html = requests.get('https://securelist.com/introducing-whitebear/81638/', headers=header)

soup = BeautifulSoup(html.text, "html.parser")
data = soup.findAll(text=True)


def visible(element):
    if element.parent.name in ['style', 'script', 'head', 'title', 'meta', '[document]']:
        return False
    elif re.match('<!--.*-->', str(element.encode('utf-8'))):
        return False
    return True


result = filter(visible, data)

print(list(result))





print("\n\n\n")

import urllib
from bs4 import BeautifulSoup

url = "https://www.yahoo.com"
#html = urllib.urlopen(url).read()
#html = requests.get('https://securelist.com/introducing-whitebear/81638/', headers=header)
html = requests.get('https://securelist.com/introducing-whitebear/81638/', headers=header)
"""html=<html>
  <title>  Title here</title>

  <body>

    lots of text here <p> <br>
    <h1> even headings </h1>

    <style type="text/css"> 
        <div > this will not be visible </div> 
    </style>


  </body>

</html>"""

#soup = BeautifulSoup(html)
soup = BeautifulSoup(html.text, "html.parser")

# kill all script and style elements
for script in soup(["script", "style"]):
    script.extract()    # rip it out

# get text
text = soup.get_text()

# break into lines and remove leading and trailing space on each
lines = (line.strip() for line in text.splitlines())
# break multi-headlines into a line each
chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
# drop blank lines
text = '\n'.join(chunk for chunk in chunks if chunk)

print(text.encode('utf-8'))

