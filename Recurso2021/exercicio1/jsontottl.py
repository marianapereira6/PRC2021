import json

with open('movies.json',"r", encoding='utf8') as f:
    data = json.load(f)

    d = { " ": "_", "'": " ", "&":"", "(":"", ")":"", ".":"", "\"" : "" }
    d1 = { "\"": ""," ": "_"}
    def replace_all(text, dic):
        for i, j in dic.items():
            text = text.replace(i, j)
        return text


    for i in data:
        for g in i["genres"]:
            print(f'###  http://www.di.uminho.pt/prc2021/cinema#{replace_all(g,d)}')
            print(f'<http://www.di.uminho.pt/prc2021/cinema#{replace_all(g,d)}> rdf:type owl:NamedIndividual ,')
            print(f'        <http://www.di.uminho.pt/prc2021/cinema#Genero> .')

        for c in i["cast"]:
            print(f'###  http://www.di.uminho.pt/prc2021/cinema#{replace_all(c,d1)}')
            print(f'<http://www.di.uminho.pt/prc2021/cinema#{replace_all(c,d1)}> rdf:type owl:NamedIndividual ,')
            print(f'            <http://www.di.uminho.pt/prc2021/cinema#Ator> ;')
            print(f'        <http://www.di.uminho.pt/prc2021/cinema#name> "{replace_all(c,d1)}" .')



        print(f'###  http://www.di.uminho.pt/prc2021/cinema#{replace_all(i["title"],d1)}')
        print(f'<http://www.di.uminho.pt/prc2021/cinema#{replace_all(i["title"],d1)}> rdf:type owl:NamedIndividual ,')
        print(f'            <http://www.di.uminho.pt/prc2021/cinema#Filme> ;')
        for c in i["cast"]:
            print(f'        <http://www.di.uminho.pt/prc2021/cinema#temAtor> <http://www.di.uminho.pt/prc2021/cinema#{replace_all(c,d1)}> ;')
        for g in i["genres"]:
            print(f'        <http://www.di.uminho.pt/prc2021/cinema#temGenero> <http://www.di.uminho.pt/prc2021/cinema#{replace_all(g,d)}> ;')
        print(f'        <http://www.di.uminho.pt/prc2021/cinema#title> "{replace_all(i["title"],d1)}" ;')
        print(f'        <http://www.di.uminho.pt/prc2021/cinema#year> {i["year"]} .\n')
     
    
f.close()
