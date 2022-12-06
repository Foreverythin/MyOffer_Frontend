import {createApp} from 'vue';
import App from './App.vue';
import router from "./router/index";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from "axios";


axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers!.Authorization = localStorage.getItem('token');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


createApp(App).use(router).use(ElementPlus).mount('#app')
