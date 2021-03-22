<!-- eslint-disable vue/no-unused-vars -->
<template>
<div><app-header/>
  <v-data-table
    :headers="dessertHeaders"
    :items="this.elementos"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="value"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Elementos</v-toolbar-title>
        <v-spacer></v-spacer>
       <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch>
      </v-toolbar>
    </template>
    <template  v-slot:expanded-item="{ headers, item }"  >
      <div v-for="it in item.elementos" :key="it.elemento">
      <td  :colspan="headers.length">
        Elemento {{ it.elemento }}
      </td>
      </div>
    </template>
  </v-data-table>

  <footer >
    <v-container  >
    <v-row >  
      <v-col md="4">
     <router-link to="/"> <h3>Principal</h3> </router-link>
    </v-col>
   <v-col md="4" ref="center">
    <router-link to="/grupos">    <h3>Grupos</h3>    </router-link>
    </v-col>
    
    <v-col md="4">
      <router-link to="/periodos"> <h3>Periodos</h3> </router-link>
    </v-col>
   
    </v-row>
  </v-container >
  </footer>
</div>
</template>

<script>
import axios from "axios";
import Header from './Header'
  
  export default {
     components: {
    'app-header': Header},
    data () {
      return {
        elementos:[],
        expanded: [],
        singleExpand: true,
        dessertHeaders: [
          {
            text: 'Nome',
            align: 'center',
            sortable: false,
            value: 'value',
          },
          { text: 'Número', value: 'numero' },
          { text: '', value: 'data-table-expand' },
        ]
        }
        
  },
    
   
    created() {

      var getLink = "http://localhost:7200/repositories" 
      var prefixes = `
      PREFIX : <http://www.w3.org/2005/sparql-results#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX noInferences: <http://www.ontotext.com/explicit>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX tab: <http://www.daml.org/2003/01/periodictable/PeriodicTable#>
      ` 
      var query = "SELECT * WHERE { ?s rdf:type tab:Element .}"
    var encoded = encodeURIComponent(prefixes + query)
    console.log(query)
    console.log(prefixes)
    console.log(getLink + '/tabela?query=' + encoded)
    axios
      .get(getLink + '/tabela?query=' + encoded)
      .then((repos) => {
        this.elementos = repos.data.results.bindings.map(bind => bind.s);
        console.log("aqui" + JSON.stringify(this.elementos))
      })
      .catch((e) => {
        this.error = e;
      })
      .finally(() => {
        this.loading = false;
      });

      
  }
  }
</script>

<style scoped>


</style>
