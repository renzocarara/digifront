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
                        <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                        >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <router-link class="my-link" :to="item.route">{{ item.title }}</router-link>
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
                { title: 'Home', icon: 'mdi-view-dashboard', route: '/' },
                { title: 'Insert', icon: 'mdi-import', route: '/insert' },
                { title: 'Result', icon: 'mdi-export', route: '/result' },
                { title: 'Read', icon: 'mdi-text-box-outline', route: '/read' },
                { title: 'About', icon: 'mdi-help-box', route: '/about' }
            ],
            right: null
        };
    }
};
</script>

<style lang="scss">
//
</style>