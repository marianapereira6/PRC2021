<template>
    <di>
        <app-header>  </app-header>
        <router-link to="/elementos"> <h1>Elementos</h1> </router-link>
		<router-link to="/grupos">    <h1>Grupos</h1>    </router-link>
		<router-link to="/periodos">   <h1>Periodos</h1>  </router-link>

    </di>
</template>

<script>
import Header from './Header'

export default {
  name: 'Principal',
  components: {
    'app-header': Header
  },
  data() {
    return{
    msg: 'Tabela Periódica'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
    color: #222;
    
    text-align:center;
}
</style>
