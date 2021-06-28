import json

with open('movies.json',"r", encoding='utf8') as f:
    data = json.load(f)

    for i in data:
        for g in i["genres"]:
            print(f'###  http://www.di.uminho.pt/prc2021/cinema#{g.replace(" ","_")}')
            print(f'<http://www.di.uminho.pt/prc2021/cinema#{g.replace(" ","_")}> rdf:type owl:NamedIndividual ,')
            print(f'        <http://www.di.uminho.pt/prc2021/cinema#Genero> .')

        for c in i["cast"]:
            print(f'###  http://www.di.uminho.pt/prc2021/cinema#{c.replace(" ","_")}')
            print(f'<http://www.di.uminho.pt/prc2021/cinema#{c.replace(" ","_")}> rdf:type owl:NamedIndividual ,')
            print(f'            <http://www.di.uminho.pt/prc2021/cinema#Ator> ;')
            print(f'        <http://www.di.uminho.pt/prc2021/cinema#name> "{c}" .')



        print(f'###  http://www.di.uminho.pt/prc2021/cinema#{i["title"].replace(" ","_")}')
        print(f'<http://www.di.uminho.pt/prc2021/cinema#{i["title"].replace(" ","_")}> rdf:type owl:NamedIndividual ,')
        print(f'            <http://www.di.uminho.pt/prc2021/cinema#Filme> ;')
        for c in i["cast"]:
            print(f'        <http://www.di.uminho.pt/prc2021/cinema#temAtor> <http://www.di.uminho.pt/prc2021/cinema#{c.replace(" ","_")}> ;')
        for g in i["genres"]:
            print(f'        <http://www.di.uminho.pt/prc2021/cinema#temGenero> <http://www.di.uminho.pt/prc2021/cinema#{g.replace(" ","_")}> ;')
        print(f'        <http://www.di.uminho.pt/prc2021/cinema#title> "{i["title"]}" ;')
        print(f'        <http://www.di.uminho.pt/prc2021/cinema#year> {i["year"]} .\n')
     
       

f.close()
