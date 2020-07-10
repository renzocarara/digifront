import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
Vue.prototype.$http = axios; //rendo richiamabile axios globalmente attraverso l'uso dell'alias $http

// import '@/sass/app.scss';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
