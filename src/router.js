import Classes from "@/components/Classes.vue";
import Home from "@/components/Home.vue";
import Assignments from "@/components/Assignments.vue";
import Register from "@/components/Register.vue";
import SignIn from "@/components/SignIn.vue";

const router = new VueRouter({
    routes: [
        { name: 'Home', path: '/', component: Home }, // default page
        { name: 'assignments',path: '/assignments', component: Assignments }, // default page
        { name: 'classes', path: '/classes', component: Classes },
        // { name: 'register', path: '/register', component: Register },
        // { name: 'sign-in', path: '/sign-in', component: SignIn },


    ],
});
