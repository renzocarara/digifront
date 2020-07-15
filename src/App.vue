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
import MyFooter from '@/components/MyFooter.vue';

export default {
    name: 'App',
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
            // leggo il valore id dallo store e lo ritorno in formato stringa
            // uso poi questa computed property, nel mio 'template'
            return this.$store.state.id.toString();
        }
    },
    methods: {
        moveTo(routePath) {
            // per la rotta "read" anzichè usare la <router-link> uso questo metodo invocato al click sul link,
            // in modo da poter effettuare dei controlli/settaggi prima del cambio rotta.
            // In particolare setto una variabile booleana dello store, che viene poi testata
            // (dalla beforeEnter() nel router) per capire se devo cambiare rotta o meno
            // Distinguo 2 situazioni: devo passare alla rotta "read" se l'utente ha premuto su un link dell'applicazione
            // per cambiare rotta, non devo passare alla rotta "read" se l'utente ha modificato a mano l'URL
            // nella barra degli indirizzi, in questo ultimo caso lo ridirigo sulla "home"

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