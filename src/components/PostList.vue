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
        <a-button class="extra-button" type="primary" size="mini" @click.stop="editPost(key.ID)" style="width: 60px;">Edit</a-button>
        <a-button class="extra-button" size="mini" @click.stop="deletePost(key.ID)">Delete</a-button>
      </template>
      <div>
        <a-space direction="vertical" size="large" fill>
          <a-descriptions size="large" style="margin-top: 5px;">
            <a-descriptions-item label="Salary" :span="24">
              <a-tag>{{ key.salary }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="Degree" :span="24">
              <a-tag>{{ key.degree }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="Label" :span="24">
              <a-tag>{{ key.label }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="Tasks" :span="24">
              <a-card style="width: 800px;">
                {{ key.tasks }}
              </a-card>
            </a-descriptions-item>
            <a-descriptions-item label="Requirements" :span="24" style="border-radius: 6px;">
              <a-card style="width: 800px;">
                {{ key.requirements }}
              </a-card>
            </a-descriptions-item>
            <a-descriptions-item label="Status" :span="24">
              <a-tag>{{ key.inRecruitment }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="Received Resumes" :span="24">
              <a-tag>{{ key.receivedResumes }}</a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-space>
      </div>
    </a-collapse-item>
  </a-collapse>

  <!-- Dialog for editing the post -->
  <a-modal
    v-model:visible="editPostDialogVisible"
    width="750px"
    title="Edit the post"
    ok-text="Submit"
    cancel-text="Cancel"
    @ok="handleEditPostOk"
    @cancel="handleEditPostCancel">
    <a-space size="large" :style="{width: '700px'}">
      <a-form :model="form" layout="horizontal" ref="formRef">
        <a-form-item
            hide-asterisk
            field="title"
            label="Title"
            validate-trigger="blur" required
        >
          <a-input v-model="form.title" placeholder="please enter the title" />
        </a-form-item>
        <a-form-item field="salary" label="Salary" hide-asterisk validate-trigger="blur" required>
          <el-input-number v-model="form.salary" :min="1000" :max="30000" :step="1000"/>
        </a-form-item>
        <a-form-item field="degree" label="Degree" hide-asterisk validate-trigger="blur" required>
          <a-select v-model="form.degree" :style="{width:'500px'}" placeholder="Please select the degree required">
            <a-option>Bachelor</a-option>
            <a-option>Master</a-option>
            <a-option>Doctor</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="label" label="Label" hide-asterisk validate-trigger="blur" required>
          <a-select v-model="form.label" :style="{width:'500px'}" placeholder="Please select the Label">
            <a-option>Java</a-option>
            <a-option>C/C++</a-option>
            <a-option>Golang</a-option>
            <a-option>PHP</a-option>
            <a-option>C#</a-option>
            <a-option>.NET</a-option>
            <a-option>Python</a-option>
            <a-option>Deep Learning</a-option>
            <a-option>Data Analysis</a-option>
            <a-option>ARM Dev</a-option>
            <a-option>FPGA</a-option>
            <a-option>PCB Design</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="tasks" label="Tasks" hide-asterisk validate-trigger="blur" required>
          <a-textarea v-model="form.tasks" placeholder="please edit the tasks" allow-clear style="height: 200px;"/>
        </a-form-item>
        <a-form-item field="requirements" label="Requirements" hide-asterisk validate-trigger="blur" required>
          <a-textarea v-model="form.requirements" placeholder="please edit the requirements" allow-clear style="height: 250px;"/>
        </a-form-item>
        <a-form-item field="inRequirement" label="In Requirement">
          <a-select v-model="form.inRecruitment" :style="{width:'500px'}" placeholder="Please select the status">
            <a-option>true</a-option>
            <a-option>false</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-space>
  </a-modal>

</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from "axios";
import {ElMessage, FormInstance} from "element-plus";

let editPostDialogVisible = ref(false)

let postList = ref([{
  ID: 1,
  title: '',
  salary: 2000,
  degree: '',
  label: '',
  tasks: '',
  requirements: '',
  inRecruitment: 'true',
  receivedResumes: 0
}]);

const formRef = ref<FormInstance>();

const form = reactive({
  title: '',
  salary: 2000,
  degree: '',
  label: '',
  tasks: '',
  requirements: '',
  inRecruitment: 'true',
})

let currentPostID = ref(0);

function getPostList() {
  axios({
    url: '/api/employer/posts',
    method: 'get'
  }).then(res => {
    console.log(res);
    postList.value = res.data.data;
    console.log(postList.value);
  }).catch(err => {
    ElMessage.error(err);
  })
}

getPostList();

const editPost = (id: number) => {
  axios({
    url: '/api/employer/one-post',
    method: 'get',
    params: {
      pid: id
    }
  }).then(res => {
    form.title = res.data.data.title;
    form.salary = res.data.data.salary;
    form.degree = res.data.data.degree;
    form.label = res.data.data.label;
    form.tasks = res.data.data.tasks;
    form.requirements = res.data.data.requirements;
    form.inRecruitment = res.data.data.inRecruitment.toString();
    currentPostID.value = id;
    editPostDialogVisible.value = true;
  }).catch(err => {
    ElMessage.error(err);
  })
}

const handleEditPostOk = () => {
  // data not none
  if (form.title === '' || form.salary === 0 || form.degree === '' || form.label === '' || form.tasks === '' || form.requirements === '') {
    ElMessage.error('Please fill in all the blanks')
    return
  } else {
    axios({
      url: '/api/employer/one-post',
      method: 'put',
      data: {
        pid: currentPostID.value,
        title: form.title,
        salary: form.salary,
        degree: form.degree,
        label: form.label,
        tasks: form.tasks,
        requirements: form.requirements,
        inRecruitment: form.inRecruitment
      }
    }).then(res => {
      ElMessage.success(res.data.msg);
      getPostList();
      editPostDialogVisible.value = false;
    }).catch(err => {
      ElMessage.error(err);
    })
  }
}

const handleEditPostCancel = () => {
  currentPostID.value = 0;
  editPostDialogVisible.value = false;
}

const deletePost = (id: number) => {
  console.log(id);
  axios({
    url: '/api/employer/posts',
    method: 'delete',
    data: {
      pid: id
    }
  }).then(res => {
    ElMessage({
      message: res.data.msg,
      type: 'success',
    })
    getPostList();
  }).catch(err => {
    ElMessage.error(err);
  })
}

</script>

<style scoped>
.extra-button:hover {
  cursor: pointer;
}

</style>