import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import AppContext from '../pages/context/AppContext'; 
import axios from 'axios';
import "assets/plugins/nucleo/css/nucleo.css";
import "assets/scss/nextjs-argon-dashboard.scss";
import app from "next/app";
import { fstat } from "fs";


Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {

  state = {
    classe :[],
    individuos : [],
    repositorios: [],
    propriedades: [],
    repo: '',
    ind : '',
  }
  
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount = async () => {
    
    const res = await axios.get(`http://localhost:7200/rest/repositories`)
    
    this.setState({
      repositorios: res.data,
    });
   
  };

  repClasse = async (r) => {
    this.setState({
      repo: r
    })
    
    var getLink = "http://localhost:7200/repositories" 
    var prefixes = `
      PREFIX : <http://www.w3.org/2005/sparql-results#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX noInferences: <http://www.ontotext.com/explicit>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      
    ` 
    var query = "SELECT * WHERE { ?s a owl:Class .}"
    var encoded = encodeURIComponent(prefixes + query)
    
    axios.get(getLink + '/' +r+ '?query=' + encoded)
        .then(dados => {
         // res.jsonp(dados.data.results.bindings)
          this.setState({
            classe: dados.data.results.bindings.map(bind => bind.s.value) ,
           
          })
        })
        .catch(erro => {
          console.log(erro )
        })
    Router.push('/admin/classe');
  }

  repIndividuos = async (ind,nome, url) => {
    this.setState({
      ind: ind
    })
    
    var getLink = "http://localhost:7200/repositories" 
    var prefixes = `
      PREFIX : <http://www.w3.org/2005/sparql-results#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX noInferences: <http://www.ontotext.com/explicit>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX musi: <`+ url +`#>
    ` 

    var query = "SELECT * WHERE { ?s a musi:"+ind+" .}"
    var encoded = encodeURIComponent(prefixes + query)
    
    
    axios.get(getLink + '/' +nome+ '?query=' + encoded)
        .then(dados => {
         // res.jsonp(dados.data.results.bindings)
          this.setState({
            individuos: dados.data.results.bindings.map(bind => bind.s.value) ,
          })
        })
        .catch(erro => {
          console.log(erro )
        }) 
    Router.push('/admin/individuos');
  }

  repProp = async (ind,nome, url) => {
    
    this.setState({
      i: ind
    })
    
    var getLink = "http://localhost:7200/repositories" 
    var prefixes = `
      PREFIX : <http://www.w3.org/2005/sparql-results#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX noInferences: <http://www.ontotext.com/explicit>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX musi: <`+ url +`#>
    ` 
    
    var query = "SELECT * WHERE { musi:"+ind+" ?p  ?o .}"
    var encoded = encodeURIComponent(prefixes + query)
    
    axios.get(getLink + '/'+nome+ '?query=' + encoded)
        .then(dados => {
          this.setState({
            propriedades: dados.data.results.bindings.map(bind =>  [bind.p.value, bind.o.value] ),
          })
        })
        .catch(erro => {
          console.log(erro )
        }) 
 
    Router.push('/admin/propriedades');
  }


  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment >
        <Head >
          <meta
            name="viewport"
            content="width=device-width,heigth=device-heigth, initial-scale=1, shrink-to-fit=no"
          />
          <title>GraphDB</title>
        </Head>
        <Layout >
          <AppContext.Provider value={{state: this.state, repClasse: this.repClasse, repIndividuos: this.repIndividuos, repProp : this.repProp}}>
            <Component  {...pageProps} />
          </AppContext.Provider>
        </Layout>
      </React.Fragment>
    );
  }
}


