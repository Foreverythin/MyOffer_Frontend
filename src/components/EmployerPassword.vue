<template>
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <h3 style="margin-top: 80px;">Change My Password</h3>
        <br/>
        <el-form :model="passwordChangeForm" ref="passwordChangeFormRef" label-position="top">
          <el-form-item
              label="Captcha"
              prop="captcha"
              :rules="[
            { required: true, message: 'Please input the captcha', trigger: 'blur' },
            { min: 4, max: 4, message: 'Length should be 4', trigger: 'blur' }
          ]"
          >
            <el-col :span="15">
              <el-input type="text" placeholder="Get Captcha" v-model="passwordChangeForm.captcha" size="large"/>
            </el-col>
            <el-col :span="8">
              <el-button style="width: 100%; margin-left: 15px;" size="large" @click="getPasswordChangingCaptcha">{{ passwordChangeButtonContent }}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item
              label="New Password"
              prop="newPassword"
              :rules="[
            { required: true, message: 'Please input the new password', trigger: 'blur' },
            { min: 6, max: 20, message: 'Length should be 6-20', trigger: 'blur' }
          ]"
          >
            <el-input show-password type="password" placeholder="New Password" v-model="passwordChangeForm.newPassword" size="large"/>
          </el-form-item>
          <el-button style="float: right; width: 100%; margin-top: 5px;" size="large" type="primary" @click="newPasswordSubmit(passwordChangeFormRef)">Submit</el-button>
          <br/>
          <el-button size="large" style="width: 100%; margin-top: 15px;" @click="reset(passwordChangeFormRef)">Reset</el-button>
        </el-form>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import axios from "axios";

let passwordChangeForm = ref({
  captcha: '',
  newPassword: ''
});

let passwordChangeButtonContent = ref('Captcha');
let passwordChangeFormRef = ref<FormInstance>();

function getPasswordChangingCaptcha() {
  axios({
    url: '/api/changePassword/employer',
    method: 'get'
  }).then((res) => {
    ElMessage.success(res.data.msg);
    if (res.data.status === 200) {
      let count = 60;
      let timer = setInterval(() => {
        if (count > 0 && count <= 60) {
          count--;
          passwordChangeButtonContent.value = count + 's';
        } else {
          clearInterval(timer);
          passwordChangeButtonContent.value = 'Captcha';
        }
      }, 1000);
    }
  })
}

const newPasswordSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios({
        url: '/api/changePassword/employer',
        method: 'put',
        data: {
          captcha: passwordChangeForm.value.captcha,
          password: passwordChangeForm.value.newPassword,
        }
      }).then((res) => {
        ElMessage.success(res.data.msg);
        formEl.resetFields();
      }).catch((err) => {
        ElMessage.error(err);
      })
    } else {
      ElMessage.error('Please input the correct information!')
      return false
    }
  })
}

function reset(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
}

</script>

<style scoped>

</style>