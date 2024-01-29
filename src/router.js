import Classes from "@/components/Classes.vue";
import Home from "@/components/Home.vue";
import Assignments from "@/components/Assignments.vue";

const router = new VueRouter({
    routes: [
        { name: 'Home', path: '/', component: Home }, // default page
        { name: 'assignments',path: '/assignments', component: Assignments }, // default page
        { name: 'classes', path: '/classes', component: Classes },


    ],
});
