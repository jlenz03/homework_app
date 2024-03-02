import { createRouter, createWebHistory } from 'vue-router';
import Classes from "@/components/Classes.vue";
import Home from "@/components/Home.vue";
import Assignments from "@/components/Assignments.vue";
import SignIn from "@/components/SignIn.vue";
import { auth } from "@/firebase";

const routes = [
    { name: 'home', path: '/', component: Home , meta: { requiresAuth: true } },
    { name: 'assignments', path: '/assignments', component: Assignments, meta: { requiresAuth: true } }, // Protected route
    { name: 'classes', path: '/classes', component: Classes, meta: { requiresAuth: true } }, // Protected route
    { name: 'sign-in', path: '/sign-in', component: SignIn },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const currentUser = auth.currentUser;

    if (requiresAuth && !currentUser) {
        next({ path: '/sign-in' });
    } else {
        next();
    }
});

export default router;