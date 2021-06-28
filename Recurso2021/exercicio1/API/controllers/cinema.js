var Cinema = module.exports
const axios = require('axios')

function myNormalize(r) {
    return r.results.bindings.map(o =>{
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
        }
        return novo;
    })
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX f: <http://www.di.uminho.pt/prc2021/cinema#>
`

var getLink = "http://localhost:7200/repositories/Cinema" + "?query=" 


Cinema.getLista = async function(){
    
    var query = `SELECT ?id ?titulo ?ano (count(distinct ?ator) as ?numAtores) WHERE { 
        ?id a f:Filme .
        ?id f:title ?titulo .
        ?id f:year ?ano .
        ?id f:temAtor ?ator .
    }
    group by ?id ?titulo ?ano
     ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}


Cinema.getFilmesAno = async function(ano){
    var query = `SELECT ?titulo  WHERE { 
        ?filme a f:Filme .
        ?filme f:year ${ano} .
        ?filme f:title ?titulo .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Cinema.getFilme = async function(id){
    
    var query = `SELECT ?titulo ?ano (group_concat(?ator;separator=" , ") as ?atores) (group_concat(?genero;separator=" , ") as ?generos) WHERE { 
        ${id} a f:Filme .
        ${id} f:title ?titulo .
        ${id} f:year ?ano .
        ${id} f:temAtor ?ator .
        ${id} f:temGenero ?genero .
    }
    group by ?titulo ?ano` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Cinema.getAtores = async function(){
    
    var query = `SELECT distinct ?ator  WHERE { 
        ?a a f:Ator .
        ?a f:name ?ator .
    }
    order by ?ator` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}



Cinema.getAtor = async function(nomeAtor){
    
    var query = `SELECT ?titulo ?ano WHERE { 
        ?filme a f:Filme .
        ?filme f:title ?titulo .
        ?filme f:year ?ano .
        ?filme f:temAtor ?ator .
        ?ator f:name ${nomeAtor} .
    }
    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}



Cinema.getGeneros = async function(){
    
    var query = `SELECT distinct ?genero  WHERE { 
        ?genero a f:Genero .
    }
    order by ?genero
    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Cinema.getGenero = async function(genero){
    
    var query = `SELECT ?titulo WHERE { 
        ?filme a f:Filme .
        ?filme f:temGenero c:${genero} .
        ?filme f:title ?titulo .
    }
    order by ?titulo` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}