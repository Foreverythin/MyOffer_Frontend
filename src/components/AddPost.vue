<template>
  <h3>New Post</h3>
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
      <a-form-item>
        <a-button type="primary" @click="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-space>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'
import {ElMessage, FormInstance} from "element-plus";
import axios from "axios";

const formRef = ref<FormInstance>();

const form = reactive({
  title: '',
  salary: 3000,
  degree: '',
  label: '',
  tasks: '',
  requirements: '',
  inRecruitment: 'true'
})

const submit = () => {
  // data not none
  if (form.title === '' || form.salary === 0 || form.degree === '' || form.label === '' || form.tasks === '' || form.requirements === '') {
    ElMessage.error('Please fill in all the blanks')
    return
  }
  axios({
    method: 'post',
    url: '/api/employer/posts',
    data: {
      title: form.title,
      salary: form.salary,
      degree: form.degree,
      label: form.label,
      tasks: form.tasks,
      requirements: form.requirements,
      inRecruitment: form.inRecruitment
    }
  }).then(res => {
    if (res.data.status === 200) {
      ElMessage.success(res.data.msg)
      formRef.value?.resetFields()
    } else {
      ElMessage.error(res.data.msg)
    }
  }).catch(err => {
    ElMessage.error(err)
  })
}

</script>

<style scoped>

</style>