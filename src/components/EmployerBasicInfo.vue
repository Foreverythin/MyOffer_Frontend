<template>
  <h3>Company Info</h3>
  <a-descriptions :data="data" title="" bordered size="large"/>
  <a-button type="primary" style="width: 100px; margin-top: 15px;" size="large" @click="handleClick">Edit</a-button>

<!-- dialog -->
  <a-modal v-model:visible="visible" @ok="handleOk(companyInfoRef)" @cancel="handleCancel">
    <template #title>
      Company Info
    </template>
    <el-form
        label-position="right"
        label-width="100px"
        :model="companyInfo"
        ref="companyInfoRef"
        style="max-width: 460px"
    >
      <el-form-item
          label="Name"
          prop="name"
          :rules="[
            { required: true, message: 'Please input company name', trigger: 'blur' }
          ]"
      >
        <el-input v-model="companyInfo.name" />
      </el-form-item>
      <el-form-item
          label="CEO"
          prop="CEO"
          :rules="[
            { required: true, message: 'Please input CEO name', trigger: 'blur' }
          ]"
      >
        <el-input v-model="companyInfo.CEO" />
      </el-form-item>
      <el-form-item
          label="Research"
          prop="researchDirection"
          :rules="[
            { required: true, message: 'Please input research direction', trigger: 'blur' }
          ]"
      >
        <el-input v-model="companyInfo.researchDirection" />
      </el-form-item>
      <el-form-item
          label="Date"
          prop="date"
      >
        <el-date-picker
            v-model="companyInfo.dateOfEstablishment"

            placeholder="Please input the date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :default-value="new Date(2020, 10, 10)"
            :disabled-date="disabledDate"
        />
      </el-form-item>
      <el-form-item
          label="Location"
          prop="location"
          :rules="[
            { required: true, message: 'Please input location', trigger: 'blur' }
          ]"
      >
        <el-input v-model="companyInfo.location" />
      </el-form-item>
      <el-form-item
          label="Staff"
          prop="staff"
          :rules="[
            { required: true, message: 'Please input staff number', trigger: 'blur' },
            { pattern: /^[0-9]*$/, message: 'Please input a positive number', trigger: 'blur' }
          ]"
      >
        <el-input v-model="companyInfo.staff" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="companyInfo.email" disabled/>
      </el-form-item>
      <br/>
      <el-form-item
          label="Introduction"
          prop="introduction"
          :rules="[
            { required: true, message: 'Please input staff number', trigger: 'blur' }
          ]"
      >
        <el-input type="textarea" v-model="companyInfo.introduction" rows="20" />
      </el-form-item>
    </el-form>
  </a-modal>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import axios from "axios";

const companyInfoRef = ref<FormInstance>()

const companyInfo = ref({
  name: '',
  CEO: '',
  researchDirection: '',
  dateOfEstablishment: '',
  location: '',
  staff: '',
  email: '',
  introduction: ''
})

const data = ref([{
  label: 'Name',
  value: '',
}, {
  label: 'CEO',
  value: '',
}, {
  label: 'Research Direction',
  value: '',
}, {
  label: 'Date of Establishment',
  value: ''
}, {
  label: 'Location',
  value: '',
}, {
  label: 'Staff',
  value: ''
}, {
  label: 'Email',
  value: ''
}, {
  label: '',
  value: ''
}, {
  label: '',
  value: ''
}, {
  label: 'Introduction',
  value: ''
}]);

const visible = ref(false);

axios({
  url: '/api/employer/basic-info',
  method: 'get'
}).then(res => {
  companyInfo.value = res.data.data;
  data.value[0].value = res.data.data.name;
  data.value[1].value = res.data.data.CEO;
  data.value[2].value = res.data.data.researchDirection;
  data.value[3].value = res.data.data.dateOfEstablishment;
  data.value[4].value = res.data.data.location;
  data.value[5].value = res.data.data.staff;
  data.value[6].value = res.data.data.email;
  data.value[9].value = res.data.data.introduction;
}).catch(err => {
  ElMessage.error(err.message)
})

const handleClick = () => {
  axios.get('/api/employer/basic-info').then(res => {
    companyInfo.value = res.data.data
    visible.value = true
  })
};

const handleOk = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios({
        url: '/api/employer/basic-info',
        method: 'post',
        data: companyInfo.value
      }).then(res => {
        if (res.data.status === 200) {
          data.value[0].value = res.data.data.name;
          data.value[1].value = res.data.data.CEO;
          data.value[2].value = res.data.data.researchDirection;
          data.value[3].value = res.data.data.dateOfEstablishment;
          data.value[4].value = res.data.data.location;
          data.value[5].value = res.data.data.staff;
          data.value[6].value = res.data.data.email;
          data.value[9].value = res.data.data.introduction;
          ElMessage.success(res.data.msg);
          visible.value = false;
        } else {
          ElMessage.error(res.data.msg);
        }
      }).catch(err => {
        ElMessage.error(err);
      })
    } else {
      ElMessage.error('Please input valid information');
      return false
    }
  })
}
const handleCancel = () => {
  visible.value = false;
}

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
</script>

<style scoped>

</style>