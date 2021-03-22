<template>
<div>
  <v-container  >
    <v-row >  
      <v-col md="4">
     <h1 >{{msg}}</h1> 
    </v-col>
   
   
    </v-row>
  </v-container>
</div>
</template>

<script>

export default {
  name: 'Elementos',
  data() {
 return{
    msg: 'Tabela Periódica'

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
width:auto;
height:auto;
background: #42b983;;

  
}

h1 {
  
    color: #222;
    text-align: center;
}
</style>
