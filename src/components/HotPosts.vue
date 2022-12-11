<template>
  <el-card style="margin-top: 10px;" v-for="item in postList" class="postCard" data-postID="2" @click="toPostDetail(2)">
    <el-row :gutter="10">
      <el-col :span="15">
        <span style="font-weight: bold; font-size: large;">C++开发工程师</span>
        <br/>
        <span style="font-size: 13px;">This is a description of C++ 开发工程师.</span>
        <br/>
        <el-tag style="margin-right: 5px; margin-top: 10px;">12-14k</el-tag>
        <el-tag type="success" style="margin-right: 5px; margin-top: 10px;">Bachelor</el-tag>
        <el-tag type="warning" style="margin-right: 5px; margin-top: 10px;">C++</el-tag>
      </el-col>
      <el-col :span="9">
        <el-row>
          <el-icon size="30px" style="position: relative; bottom: 5px;">
            <OfficeBuilding/>
          </el-icon>
          <span style="font-weight: bold; font-size: large; margin-left: 5px;">TM工作室</span>
        </el-row>
        <el-tag style="margin-right: 5px; margin-top: 10px;">5 Years</el-tag>
        <el-tag type="success" style="margin-right: 5px; margin-top: 10px;">500 staff</el-tag>
        <el-tag type="warning" style="margin-right: 5px; margin-top: 10px;">Game Development</el-tag>
        <el-tag type="danger" style="margin-top: 10px;">Chengdu</el-tag>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>

import { OfficeBuilding } from '@element-plus/icons-vue'
import {ref} from "vue";
import router from "@/router";

const postList = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

const toPostDetail = (postID: number) => {
  router.push('/post');
}

</script>

<style scoped>
.postCard:hover {
  cursor: pointer;
}

</style>