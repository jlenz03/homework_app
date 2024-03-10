import { createRouter, createWebHistory } from 'vue-router';
import Classes from '@/pages/Classes.vue';
import Home from '@/pages/Home.vue';
import Assignments from '@/pages/Assignments.vue';
import SignIn from '@/pages/SignIn.vue';
import { auth } from '@/firebase';

const routes = [
    { name: 'home', path: '/', component: Home, meta: { requiresAuth: true } },
    { name: 'assignments', path: '/assignments', component: Assignments, meta: { requiresAuth: true } },
    { name: 'classes', path: '/classes', component: Classes, meta: { requiresAuth: true } },
    { name: 'sign-in', path: '/sign-in', component: SignIn },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    // This function will handle the authentication state
    const handleAuthState = () => {
        const currentUser = auth.currentUser;
        if (requiresAuth && !currentUser) {
            next({ name: 'sign-in' });
        } else {
            next(); // Call next only once
        }
    };

    if (requiresAuth) {
        if (!auth.currentUser) {
            try {
                await auth.signInAnonymously(); // Sign in anonymously
                handleAuthState(); // Handle the authentication state
            } catch (error) {
                console.error('Error signing in:', error);
                next({ name: 'sign-in' }); // Redirect to sign-in page on error
            }
        } else {
            handleAuthState(); // Handle the authentication state
        }
    } else {
        next(); // Call next only once
    }
});

export default router;

