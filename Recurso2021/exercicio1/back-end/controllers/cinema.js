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
    PREFIX c: <http://www.di.uminho.pt/prc2021/cinema#>
`

var getLink = "http://localhost:7200/repositories/Cinema" + "?query=" 


Cinema.getLista = async function(){
    
    var query = `select ?ano ?organizador ?vencedor ?musicaVencedora ?link where { 
        ?ed rdf:type c:Edição .
        ?ed c:anoEdição ?ano .
        ?ed c:organizadaPor ?pais .
        ?pais c:nome ?organizador. 
        ?ed c:temPaísVencedor ?Pvencedor .
        ?Pvencedor c:nome ?vencedor.
        ?Pvencedor c:temMúsica ?musica .
        ?musica c:título ?musicaVencedora.
        ?musica c:anoEdição ?ano.
        ?musica c:link ?link.
     
        
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}
