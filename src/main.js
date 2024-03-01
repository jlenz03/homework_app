//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap'; //js
import '@/scss/app.scss';
// import 'fontawesome';
// import 'vue-chartjs';




// import '@/css/app.css'

import { createApp } from 'vue';
import App from './App.vue';
import Home from '@/components/Home.vue';
import Classes from '@/components/Classes.vue';
import Assignments from '@/components/Assignments.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Register from "@/components/Register.vue";
import SignIn from "@/components/SignIn.vue";

const routes = [
    { path: '/', component: Home },
    { name: 'classes', path: '/classes', component: Classes },
    { name: 'assignments', path: '/assignments', component: Assignments },
    { name: 'register', path: '/register', component: Register },
    { name: 'sign-in', path: '/sign-in', component: SignIn },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
    .use(router)
    .mount('#app');

