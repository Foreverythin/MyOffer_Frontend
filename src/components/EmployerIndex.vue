<template>
  <a-layout class="layout-demo">
    <a-layout-sider collapsible breakpoint="xl">
      <a-menu
          :default-selected-keys="['0_1']"
          :style="{ width: '100%' }"
      >
        <a-menu-item key="0_1">
          <icon-user />
          Basic Info
        </a-menu-item>
        <a-menu-item key="0_2">
          <icon-folder-add />
          Post List
        </a-menu-item>
        <a-menu-item key="0_3">
          <icon-folder-add />
          Add Post
        </a-menu-item>
        <a-menu-item>
          <icon-pen />
          Change Password
        </a-menu-item>
        <a-menu-item @click="logout">
          <icon-close-circle />
          Log Out
        </a-menu-item>
      </a-menu>
      <!-- trigger -->
      <template #trigger="{ collapsed }">
        <IconCaretRight v-if="collapsed"></IconCaretRight>
        <IconCaretLeft v-else></IconCaretLeft>
      </template>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 20px;">
        <img src="@/assets/photo/logo.png" style="height: 40px; vertical-align: center;" alt="logo">
      </a-layout-header >
      <a-layout style="padding: 0 24px;">
        <a-breadcrumb :style="{ margin: '16px 0' }"></a-breadcrumb>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { defineComponent } from 'vue';
import { Message} from '@arco-design/web-vue';
import { OfficeBuilding } from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import router from "@/router";
import {ElMessage} from "element-plus";
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';

// function onClickMenuItem(key: any) {
//     Message.info({ content: `You select ${key}`, showIcon: true });
// }

function logout() {
  let token = localStorage.getItem('token');
  console.log(token);
  localStorage.removeItem('token');
  ElMessage({
    message: 'Logout successfully',
    type: 'success',
  })
  router.push('/login-signup');
}
</script>
<style scoped>
.arco-layout.arco-layout-has-sider.layout-demo {
  height: 100%;
}
.layout-demo {
  height: 500px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}
.layout-demo :deep(.arco-layout-sider-light) .logo{
  background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-header)  {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content)  {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
