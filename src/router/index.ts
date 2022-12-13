import {createRouter, createWebHashHistory} from 'vue-router'
import LoginSignup from '@/components/LoginSignup.vue'
import TestTest from "@/components/TestTest.vue";
import EmployeeIndex from "@/components/EmployeeIndex.vue";
import EmployerIndex from "@/components/EmployerIndex.vue";
import SearchedPosts from "@/components/SearchedPosts.vue";
import PostDetail from "@/components/PostDetail.vue";
import EmployerPassword from "@/components/EmployerPassword.vue";
import EmployerBasicInfo from "@/components/EmployerBasicInfo.vue";
import PostList from "@/components/PostList.vue";
import AddPost from "@/components/AddPost.vue";

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
                path: 'searched-posts',
                name: 'SearchedPosts',
                component: SearchedPosts
            }
        ]
    },
    {
        path: '/employer',
        name: 'EmployerIndex',
        component: EmployerIndex,
        children: [
            {
                path: 'password',
                name: 'EmployerPassword',
                component: EmployerPassword
            },
            {
                path: 'basic-info',
                name: 'EmployerBasicInfo',
                component: EmployerBasicInfo
            },
            {
                path: 'post-list',
                name: 'PostList',
                component: PostList
            },
            {
                path: 'add-post',
                name: 'AddPost',
                component: AddPost
            }
        ]
    },
    {
        path: '/post',
        name: 'PostDetail',
        component: PostDetail
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
                if (token.slice(0, 8) == 'employee') {
                    next('/' + token.slice(0, 8) + '/hot-posts');
                } else {
                    next('/' + token.slice(0, 8) + '/basic-info');
                }
            } else {
                next();
            }
        }
    }
});

export default router