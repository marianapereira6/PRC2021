import json

with open('alunos.json') as json_file:
    data = json.load(json_file)
    output = open("alunos.ttl","w")
    for p in data['alunos']:
       alcunha = p['name'].split()[0][0].lower()+ p['name'].split()[1]
       output.write('###  http://www.di.uminho.pt/prc2021/uc#'+alcunha +'\n'
       +'<http://www.di.uminho.pt/prc2021/uc#'+alcunha+'> rdf:type owl:NamedIndividual ,\n'
       +'\t\t\t\t\t\t\t<http://www.di.uminho.pt/prc2021/uc#Aluno> ;\n'
       +'\t\t\t\t\t\t<http://www.di.uminho.pt/prc2021/uc#frequenta> <http://www.di.uminho.pt/prc2021/uc#PRC2021> ,\n'
       +'\t\t\t\t\t\t\t\t\t\t\t\t<http://www.di.uminho.pt/prc2021/uc#SPLN2021>, \n'
       +'\t\t\t\t\t\t\t\t\t\t\t\t<http://www.di.uminho.pt/prc2021/uc#DC2021>,\n'
       +'\t\t\t\t\t\t\t\t\t\t\t\t<http://www.di.uminho.pt/prc2021/uc#IS2021> ;\n'
       +'\t\t\t\t\t\t<http://www.di.uminho.pt/prc2021/uc#éAlunoDe> <http://www.di.uminho.pt/prc2021/uc#jcr> ,\n'
       +'\t\t\t\t\t\t\t\t\t\t\t\t<http://www.di.uminho.pt/prc2021/uc#jj>, \n'
       +'\t\t\t\t\t\t\t\t\t\t\t\t<http://www.di.uminho.pt/prc2021/uc#abelha>,\n'
       +'\t\t\t\t\t\t\t\t\t\t\t\t<http://www.di.uminho.pt/prc2021/uc#jmac> ;\n'
       +'\t\t\t\t\t\t<http://www.di.uminho.pt/prc2021/uc#nome> "'+p['name']+'" .\n\n\n')







