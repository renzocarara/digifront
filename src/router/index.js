import Vue from 'vue';
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
            import(/* webpackChunkName: "read" */ '../views/Read.vue')
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
