import Vue from 'vue' //librairie "vue" dans node_modules
import VueRouter from 'vue-router'
//import Vuex from 'vuex'

import app from './app.vue'
import movielist from './components/movielist.vue'
import movieitem from './components/movieitem.vue'
import edit from './components/edit_movie.vue'
import mark from './components/mark_movie.vue'
import poster from './components/poster_movie.vue'
import add from './components/add_movie.vue'
import details from './components/details_movie.vue'

import store from './store.js'

Vue.use(VueRouter);
//Vue.use(Vuex);
Vue.component('movie-item', movieitem);

const routes = [
    {path: '/', component: movielist},
    {path: '/movie/:id', component: details},
    {path: '/movie/:id/edit', component: edit},
    {path: '/movie/:id/mark', component: mark},
    {path: '/movie/:id/poster', component: poster},
    {path: '/movies/add/', component: add}
];
const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    store,
    router
});
