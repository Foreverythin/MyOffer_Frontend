<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <img src="@/assets/photo/logo.png" style="height: 40px; vertical-align: center;" alt="logo">
      <el-menu-item index="1">POST</el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="2">
        <template #title><el-avatar :size="30" :src="circleUrl" /></template>
        <el-menu-item index="2-1" @click="logout">Logout</el-menu-item>
      </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'
import axios from "axios";
import router from "@/router";
import {ElMessage} from "element-plus";

const state = reactive({
  circleUrl:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  sizeList: ['small', '', 'large'] as const,
})

const { circleUrl, sizeList } = toRefs(state);

const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}

function logout() {
  let token = localStorage.getItem('token');
  console.log(token);
  axios({
    url: '/api/logout/employee',
    method: 'get'
  }).then(res => {
    console.log(res);
    localStorage.removeItem('token');
    ElMessage({
      message: res.data.msg,
      type: 'success',
    })
    router.push('/login-signup');
  }).catch(err => {
    ElMessage.error(err);
  })
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>