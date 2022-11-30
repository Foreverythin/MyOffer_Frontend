import {createRouter, createWebHashHistory} from 'vue-router'
import LoginSignup from '@/components/LoginSignup.vue'
import TestTest from "@/components/TestTest.vue";
import Home from "@/components/Home.vue";

const routes = [
    {
        path: '/',
        name: 'login-signup',
        component: LoginSignup
    },
    {
        path: '/testTest',
        name: 'TestTest',
        component: TestTest
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router