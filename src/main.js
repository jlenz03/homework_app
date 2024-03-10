import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap'; //js
import '@/scss/app.scss';
// import 'fontawesome';
// import 'vue-chartjs';
// import '@/css/app.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";

createApp(App)
    .use(router)
    .mount('#app');


