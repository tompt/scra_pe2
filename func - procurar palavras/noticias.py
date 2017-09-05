import newspaper

cnn_paper = newspaper.build('http://cnn.com')

for article in cnn_paper.articles:
    print(article.url)
#http://www.cnn.com/2013/11/27/justice/tucson-arizona-captive-girls/
#http://www.cnn.com/2013/12/11/us/texas-teen-dwi-wreck/index.html