import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/app.scss';
import 'bootstrap';
// import 'fontawesome';
// import 'vue-chartjs';




// import '@/css/app.css'

import { createApp } from 'vue';
import App from './App.vue';
import Home from '@/components/Home.vue';
import Classes from '@/components/Classes.vue';
import Assignments from '@/components/Assignments.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: Home },
    { name: 'classes', path: '/classes', component: Classes },
    { name: 'assignments', path: '/assignments', component: Assignments },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
    .use(router)
    .mount('#app');

