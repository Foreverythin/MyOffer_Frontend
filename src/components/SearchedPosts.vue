<template>
  <el-card v-if="postList.length === 0" style="margin-top: 10px;">
    <a-empty>
      <template #image>
        <icon-empty />
      </template>
      No results!
    </a-empty>
  </el-card>
  <el-card style="margin-top: 10px;" v-for="item in postList" class="postCard" data-postID="2" @click="toPostDetail(item.post_id)">
    <el-row :gutter="10">
      <el-col :span="15">
        <span style="font-weight: bold; font-size: large;">{{ item.title }}</span>
        <br/>
        <el-tag style="margin-right: 5px; margin-top: 20px;">¥{{ item.salary }}</el-tag>
        <el-tag type="success" style="margin-right: 5px; margin-top: 10px;">{{ item.degree }}</el-tag>
        <el-tag type="warning" style="margin-right: 5px; margin-top: 10px;">{{ item.label }}</el-tag>
      </el-col>
      <el-col :span="9">
        <el-row>
          <el-icon size="30px" style="position: relative; bottom: 5px;">
            <OfficeBuilding/>
          </el-icon>
          <span style="font-weight: bold; font-size: large; margin-left: 5px;">{{ item.employer_name }}</span>
        </el-row>
        <el-tag style="margin-right: 5px; margin-top: 10px;">{{ item.employer_dateOfEstablishment }}</el-tag>
        <el-tag type="success" style="margin-right: 5px; margin-top: 10px;">{{ item.employer_staff }} Staffs</el-tag>
        <el-tag type="warning" style="margin-right: 5px; margin-top: 10px;">{{ item.employer_researchDirection }}</el-tag>
        <el-tag type="danger" style="margin-top: 10px;">{{ item.employer_location }}</el-tag>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>

import { OfficeBuilding } from '@element-plus/icons-vue'
import {computed, onMounted, reactive, ref, watchEffect} from "vue";
import router from "@/router";
import axios from "axios";
import {ElMessage} from "element-plus";

let searchFilter = ref({
  title: '',
  city: '',
  salary: 2000,
  labels: [] as string[],
  viewMethod: ''
})

const getPostList = () => {
  if (searchFilter.value.labels[0] == undefined) {
    searchFilter.value.labels[0] = ''
  }
  console.log(searchFilter.value.labels[0]);
  axios({
    url: '/api/employee/post-list',
    method: 'get',
    params: {
      title: searchFilter.value.title,
      city: searchFilter.value.city,
      salary: searchFilter.value.salary,
      labels: searchFilter.value.labels[0],
      viewMethod: searchFilter.value.viewMethod
    }
  }).then((res) => {
    postList.value = res.data.data.posts;
  }).catch((err) => {
    ElMessage.error(err);
  })
}

// watch the change of the route
watchEffect(() => {
  searchFilter.value.title = router.currentRoute.value.query.title!.toString();
  searchFilter.value.city = router.currentRoute.value.query.city!.toString();
  searchFilter.value.salary = Number(router.currentRoute.value.query.salary!);
  searchFilter.value.viewMethod = router.currentRoute.value.query.viewMethod!.toString();
  if (router.currentRoute.value.query.labels) {
    searchFilter.value.labels = [];
    for (let i = 0; i < router.currentRoute.value.query.labels!.toString().split(',').length; i++) {
      if (router.currentRoute.value.query.labels!.toString().split(',')[i] !== '') {
        searchFilter.value.labels.push(router.currentRoute.value.query.labels!.toString());
      }
    }
  } else {
    searchFilter.value.labels = [];
  }

  getPostList();
})

const postList = ref([{
  post_id: 1,
  title: 'Post Title',
  salary: 2000,
  degree: '',
  label: '',
  employer_name: '',
  employer_dateOfEstablishment: '',
  employer_staff: 0,
  employer_researchDirection: '',
  employer_location: ''
}]);

const toPostDetail = (postID: number) => {
  router.push({
    path: '/post',
    query: {
      postID: postID
    }
  })
}

</script>

<style scoped>
.postCard:hover {
  cursor: pointer;
}

</style>