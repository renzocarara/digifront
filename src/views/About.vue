<template>
  <div>
    <v-container>
      <h1 class="view-title">About</h1>
      <p>Questa applicazione permette di effettuare delle richieste HTTP.</p>
      <ul>
      <li><strong>Insert</strong>: l'utente inserisce un URL, un metodo (GET, PUT,...) degli eventuali parametri e degli eventuali headers</li>
      <li><strong>Result</strong>: l'esito della richiesta HTTP viene visualizzato e contestualmente la risposta viene salvata, assieme alla richiesta, in un DB</li>
      <li><strong>Read</strong>: è possibile accedere alle informazioni salvate nel DB</li>
      </ul>
      <br>
      <p>Le operazioni sul DB vengono effettuate tramite chiamate API, che permettono di leggere e scrivere su un DB PostgreSQL. Il DB e le API esposte, fanno parte di un'applicazione BACKEND (DigiBack), deployata su HEROKU (https://digiback.herokuapp.com/). <br>
         L'applicazione BACKEND è scritta in Laravel + Bootstrap. <br>
         L'applicazione FRONTEND è scritta in Vue ed utilizza Vue-router, Vuex e Vuetify<br>
      </p>


    </v-container>
  </div>
</template>

<script>
export default {
    name: 'About'
};
</script>

<style lang="scss" scoped>
</style>
