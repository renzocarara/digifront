<template>
    <v-app> <!-- NOTA: il tag "v-app" è OBBLIGATORIO e deve racchiudere tutti gli altri componenti di Vuetify -->

        <v-app-bar 
            app
            color="#fb4b3d"  
            dark
            dense
            >
            
            <router-link to="/">
                <v-img
                alt="digi logo"
                class="shrink mr-4"
                contain
                src="@/assets/digi_logo.png"
                transition="scale-transition"
                width="50"
                height="40"
                />
            </router-link>

            <router-link class="text-decoration-none" to="/">
                <v-toolbar-title class="white--text">DigiFront</v-toolbar-title>
            </router-link>

            <v-spacer></v-spacer>

            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer
                app
                v-model="drawer"
                temporary
                right
                >
                    <v-list
                    dense
                    nav
                    >
                        <v-list-item v-for="item in items" :key="item.title" link>
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                               <router-link class="" :to="item.name">{{ item.title }}</router-link>
                            </v-list-item-content>
                        </v-list-item>

                         <!-- gestisco separatamente la rotta "Read" perchè è dinamica (cioè ha un parametro) -->
                         <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-text-box-outline</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <a @click="moveTo('/'+ id)" class="my-link">Read</a>
                            </v-list-item-content>
                        </v-list-item>

                    </v-list>
        </v-navigation-drawer>

        <v-main>
            <!-- <transition name="fade" mode="out-in" appear> -->
                <router-view></router-view>
            <!-- </transition> -->
        </v-main>
        
         <MyFooter/>

    </v-app>
</template>

<script>
import axios from 'axios';

import MyFooter from '@/components/MyFooter.vue';

export default {
    name: 'App',
    mounted() {
        // leggo tutti i record del DB
        // console.log('APICallReadAllRecords() called...');
        this.APICallReadAllRecords();
    },
    components: {
        MyFooter
    },
    data() {
        return {
            drawer: false,
            items: [
                {
                    title: 'Home',
                    icon: 'mdi-view-dashboard',
                    name: '/' // NOTA: devo mettere il path, perchè se metto "home" lui cerca una rotta "/home"
                    // che non esiste e lo interpreta come rotta "read" (cioè "/parametro")
                },
                { title: 'About', icon: 'mdi-help-box', name: 'about' },
                { title: 'Insert', icon: 'mdi-import', name: 'insert' },
                { title: 'Result', icon: 'mdi-export', name: 'result' }
            ],
            right: null
        };
    },
    computed: {
        id() {
            // leggo il valore dbId dallo store e lo ritorno in formato stringa
            // uso poi questa computed property, nel mio 'template'
            // return this.$store.state.id.toString();
            return this.$store.state.dbId.toString();
        }
    },
    methods: {
        APICallReadAllRecords() {
            // leggo il DB per ricavare tutti gli "id" dei record presenti
            axios({
                method: 'GET',
                url: 'https://digiback.herokuapp.com/api/HTTP/GET',
                // url: 'http://localhost:8000/api/HTTP/GET', // testing in locale
                headers: {
                    'content-type': 'application/json'
                },
                params: {
                    // public key
                    api_token:
                        '8He1fq8r5krxoEahHiA2MqaIDV173FRPztF16dtkxkc5yxrBjMzPkbvOwC7yAhuCbozU1DGPpHLaIUtP'
                }
            })
                .then(response => {
                    this.handleSuccess(response);
                })
                .catch(error => {
                    this.handleError(error);
                });
        },

        handleSuccess(response) {
            // console.log('READ DB SUCCESS');
            // console.log('response.data', response.data);
            let ids = [];
            for (let index = 0; index < response.data.length; index++) {
                // creo un array contenente tutti gi id dei records presenti su DB
                ids.push(response.data[index].id);
            }
            // console.log('ids:', ids);
            // setto il dato globale dello store con l'array di id appena creato
            this.$store.commit('SET_IDS_LIST', ids);

            // setto l'ultimo record (se esiste) di quelli letti dal DB, come quello da visualizzare sulla view "read"
            if (response.data.length) {
                let lastIndex = response.data.length - 1; // indice dell'ultimo record nell'array

                let lastId = ids[lastIndex];
                this.$store.commit('SET_DB_ID', lastId);

                this.$store.commit(
                    'SET_DB_VERB',
                    response.data[lastIndex].request.method
                );
                this.$store.commit(
                    'SET_DB_URL',
                    response.data[lastIndex].request.url
                );

                let urlInfos = {
                    domain: response.data[lastIndex].request.domain,
                    scheme: response.data[lastIndex].request.scheme,
                    path: response.data[lastIndex].request.path
                };
                this.$store.commit('SET_DB_URL_INFOS', urlInfos);

                let responses = {
                    statusline: response.data[lastIndex].response.statusline, // http version + status + statusText
                    date: response.data[lastIndex].response.date,
                    server: response.data[lastIndex].response.server
                };
                this.$store.commit('SET_DB_RESPONSES', responses);
            }
        },
        handleError(error) {
            // console.log('READ DB FAILED');
            alert('DB Read failed!');
            console.log('error', error);
        },

        moveTo(routePath) {
            // per la rotta "read" anzichè usare la <router-link> uso questo metodo invocato al click sul link,
            // in modo da poter effettuare dei controlli/settaggi prima del cambio rotta.
            // In particolare setto una variabile booleana dello store, che viene poi testata
            // (dalla beforeEnter() nel router) per capire se devo cambiare rotta o meno
            // Distinguo 2 situazioni:
            // DEVO passare alla rotta "read" se l'utente ha premuto su un link dell'applicazione per cambiare rotta,
            // NON DEVO passare alla rotta "read" se l'utente ha modificato a mano l'URL nella barra degli indirizzi,
            // in questo ultimo caso lo ridirigo sulla "home"

            // verifico di non essere già sulla rotta dove voglio andare
            if (this.$route.path != routePath) {
                // setto
                this.$store.commit('SET_PROG_NAV', true);
                // console.log('App: progNav->', this.$store.state.progNav);
                // console.log('this.id:', this.id);
                // console.log('routePath', routePath);
                // vado sulla rotta richiesta
                this.$router.push({ path: routePath });
            }
        }
    }
};
</script>

<style lang="scss">
//
.my-link {
    text-align: left;
    text-decoration: underline;
}
</style>