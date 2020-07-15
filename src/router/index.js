import Vue from 'vue';
import store from '../store/index.js';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/insert',
        name: 'insert',
        component: () =>
            import(/* webpackChunkName: "insert" */ '../views/Insert.vue')
    },
    {
        path: '/result',
        name: 'result',
        component: () =>
            import(/* webpackChunkName: "result" */ '../views/Result.vue')
    },
    {
        path: '/:id',
        name: 'read',
        component: () =>
            import(/* webpackChunkName: "read" */ '../views/Read.vue'),
        // con questa "guard" blocco eventuali tentativi dell'utente di modificare l'URL nella barra indirizzi,
        // inserendo un indirizzo interpretabile per la rotta "read", se succede l'utente viene rediretto alla "home"
        beforeEnter(to, from, next) {
            // console.log('prima di beforeEnter progNav è:', store.state.progNav);
            if (store.state.progNav) {
                // il flag indica che il cambio di rotta è consentito, vado sulla rotta richiesta
                next();
            } else {
                // cambio di rotta non è consentito, ridirigo sulla "home"
                next('/');
            }
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    // NOTA: la riga qui sotto è importante quando si fa il deploy dell'applicazione, per settare il path di root corretto
    // BASE_URL - corresponds to the publicPath option in vue.config.js and is the base path your app is deployed at.
    base: process.env.BASE_URL,
    routes
});

export default router;
