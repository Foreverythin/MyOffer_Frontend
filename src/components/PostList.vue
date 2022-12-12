<template>
  <h3>Post List</h3>
  <a-empty v-if="postList.length === 0">
    <template #image>
      <icon-empty />
    </template>
    No posts, please load!
  </a-empty>
  <a-collapse :default-active-key="[0]" accordion>
    <a-collapse-item :header="key.title" :key="index" v-for="(key, index) in postList">
      <template #extra>
        <a-button class="extra-button" type="primary" size="mini" @click.stop="editPost(index)" style="width: 60px;">Edit</a-button>
        <a-button class="extra-button" size="mini" @click.stop="deletePost(index)">Delete</a-button>
      </template>
      <div>
        <a-space direction="vertical" size="large" fill>
          <a-descriptions size="large" style="margin-top: 5px;">
            <a-descriptions-item label="Salary">
              <a-tag>{{ key.salary }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="Degree">
              <a-tag>{{ key.degree }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="Label">
              <a-tag>{{ key.label }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="Tasks" :span="24">
              <a-card style="width: 700px;">
                {{ key.tasks }}
              </a-card>
            </a-descriptions-item>
            <a-descriptions-item label="Requirements" :span="24" style="border-radius: 6px;">
              <a-card style="width: 700px;">
                {{ key.requirements }}
              </a-card>
            </a-descriptions-item>
            <a-descriptions-item label="Status">
              <a-tag>{{ key.inRecruitment }}</a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-space>
      </div>
    </a-collapse-item>
  </a-collapse>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'
import axios from "axios";

let postList = ref([]);

axios({
  url: '/api/employer/posts',
  method: 'get'
}).then(res => {
  console.log(res);
  postList.value = res.data.data;
  console.log(postList.value);
}).catch(err => {
  console.log(err);
})

</script>

<style scoped>
.extra-button:hover {
  cursor: pointer;
}

</style>