import {createRouter, createWebHashHistory} from 'vue-router'
import LoginSignup from '@/components/LoginSignup.vue'
import TestTest from "@/components/TestTest.vue";
import EmployeeIndex from "@/components/EmployeeIndex.vue";
import EmployerIndex from "@/components/EmployerIndex.vue";

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
        path: '/employee',
        name: 'EmployeeIndex',
        component: EmployeeIndex
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

export default router