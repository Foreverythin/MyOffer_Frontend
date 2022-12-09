import {createRouter, createWebHashHistory} from 'vue-router'
import LoginSignup from '@/components/LoginSignup.vue'
import TestTest from "@/components/TestTest.vue";
import EmployeeIndex from "@/components/EmployeeIndex.vue";
import EmployerIndex from "@/components/EmployerIndex.vue";
import HotPosts from "@/components/HotPosts.vue";
import LatestPosts from "@/components/LatestPosts.vue";

const routes = [
    {
        path: '/login-signup',
        name: 'login-signup',
        component: LoginSignup
    },
    {
        path: '/testTest',
        name: 'TestTest',
        component: TestTest
    },
    {
        path: '/employee',
        name: 'EmployeeIndex',
        component: EmployeeIndex,
        children: [
            {
                path: 'hot-posts',
                name: 'HotPosts',
                component: HotPosts
            },
            {
                path: 'latest-posts',
                name: 'LatestPosts',
                component: LatestPosts
            }
        ]
    },
    {
        path: '/employer',
        name: 'EmployerIndex',
        component: EmployerIndex
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// redirect to login-signup if not logged in and trying to access a restricted page
router.beforeEach((to, from, next) => {
    if (to.path === '/login-signup') {
        next();
    } else {
        let token = localStorage.getItem('token');
        if (token === null || token === '') {
            next('/login-signup');
        } else {
            if (to.path === '/') {
                next('/' + token.slice(0, 8));
            } else if (token.slice(0, 8) === to.path.slice(1, 9)) {
                next();
            } else {
                next('/login-signup');
            }
        }
    }
});

export default router