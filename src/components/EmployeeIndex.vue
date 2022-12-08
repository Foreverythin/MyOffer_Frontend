<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-affix>
          <employee-nav style="z-index: 1000;"/>
        </el-affix>
      </el-header>
      <el-main class="main-content" style="overflow-y: scroll">
        <el-backtop :right="50" :bottom="100"/>
        <el-row :gutter="20">
          <el-col :span="screenWidth<1000 ? 24 : 18" id="main-content-left">
            <div class="grid-content ep-bg-purple"/>
            <el-card>
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-select v-model="citySelected" class="m-2" placeholder="Select A City" size="large">
                    <el-option
                        v-for="item in cities"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="16">
                  <el-input
                      v-model="postSearch"
                      class="w-50 m-2"
                      size="large"
                      placeholder="Please Input A Post"
                      :prefix-icon="Search"
                  />
                </el-col>
                <el-col :span="4">
                  <div class="grid-content ep-bg-purple-light"/>
                  <el-button size="large" style="width: 100%" :icon="Search">Search</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="10" justify="center" style="margin-top: 20px;">
                <el-col :span="4">
                  <el-button size="large" style="width: 95%; border: none" disabled>Exp Salary</el-button>
                </el-col>
                <el-col :span="20">
                  <el-slider v-model="salaryValue" show-input :min="2000" :max="30000" :step="1000" size="large"
                             input-size="large"/>
                </el-col>
              </el-row>
              <el-row :gutter="10" justify="center" style="margin-top: 20px;">
                <el-col :span="4">
                  <el-button size="large" style="width: 95%; border: none" disabled>Labels</el-button>
                </el-col>
                <el-col :span="20">
                  <el-checkbox v-for="(item, index) in labelList" v-model="labelIndexSelected[index]" :label="item"
                               size="large" border style="margin-top: 10px; border-radius: 5px;"/>
                </el-col>
              </el-row>
            </el-card>
            <el-card style="margin-top: 10px;">
              <el-radio-group v-model="viewMethod" size="large">
                <el-radio-button label="Hot Posts"/>
                <el-radio-button label="Latest Posts"/>
              </el-radio-group>
            </el-card>

            <!--  all posts  -->
            <el-card style="margin-top: 10px;" v-for="item in postList">
              <el-row :gutter="10">
                <el-col :span="15">
                  <span style="font-weight: bold; font-size: large;">C++开发工程师</span>
                  <br/>
                  <span style="font-size: 13px;">This is a description of C++ 开发工程师.</span>
                  <br/>
                  <el-tag style="margin-right: 5px; margin-top: 10px;">12-14k</el-tag>
                  <el-tag type="success" style="margin-right: 5px; margin-top: 10px;">Bachelor</el-tag>
                </el-col>
                <el-col :span="9">
                  <el-row>
                    <el-icon size="30px" style="position: relative; bottom: 3px;">
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
          </el-col>
          <el-col :span="screenWidth<1000 ? 0 : 6" id="main-content-right">
            <el-card style="background-color: #e2e9f1;">
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-avatar class="my-avatar" :size="45" :src="myAvatarUrl" @click="uploadAvatarDialog=true"/>
                </el-col>
                <el-col :span="18">
                  <el-row><strong>Pangyu Li</strong></el-row>
                  <el-row style="margin-top: 10px;"><strong>20 | CS | Bachelor</strong></el-row>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;">
                <el-col :span="24">
                  <el-button style="width: 100%;" @click="profileEditDialogButton" :icon="Edit">Profile Editing
                  </el-button>
                </el-col>
                <el-col :span="24" style="margin-top: 10px;">
                  <el-button style="width: 100%;" @click="passwordChangeDialog=true" :icon="EditPen">Password Updating
                  </el-button>
                </el-col>
              </el-row>
            </el-card>

            <el-card style="margin-top: 15px; background-color: #e2e9f1;">
              <div class="card-header">
                <span style="font-weight: bold;">Resume Management</span>
              </div>
              <el-divider/>
              <div id="resumeText">No files uploaded.</div>
              <el-divider/>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-button style="width: 100%;" :icon="Upload">Upload</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button style="width: 100%;" :icon="Delete">Delete</el-button>
                </el-col>
              </el-row>
            </el-card>

            <!-- ads -->
            <el-card style="background-color: #e2e9f1; margin-top: 15px;">
              hhh
            </el-card>
            <el-card style="background-color: #e2e9f1; margin-top: 15px;">
              hhh
            </el-card>
            <el-card style="background-color: #e2e9f1; margin-top: 15px;">
              hhh
            </el-card>
            <el-card style="background-color: #e2e9f1; margin-top: 15px;">
              hhh
            </el-card>
            <el-card style="background-color: #e2e9f1; margin-top: 15px;">
              hhh
            </el-card>
            <el-card style="background-color: #e2e9f1; margin-top: 15px;">
              hhh
            </el-card>
            <el-card style="background-color: #e2e9f1; margin-top: 15px;">
              hhh
            </el-card>
            <el-card style="background-color: #e2e9f1; margin-top: 15px;">
              hhh
            </el-card>
            <el-card style="background-color: #e2e9f1; margin-top: 15px;">
              hhh
            </el-card>

          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>

  <!--  Profile Editing Dialog  -->
  <el-dialog :model-value="profileEditDialog" title="Edit your profile" style="width: 500px;"
             :before-close="closeProfileEditDialog">
    <el-form>
      <el-form ref="profileFormRef" :model="profileForm" label-width="85px">
        <el-form-item
            label="Email"
            prop="email"
            :rules="[
              { required: true, message: 'Please input the email', trigger: 'blur' },
              { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
            ]"
        >
          <el-input v-model="profileForm.email" disabled/>
        </el-form-item>
        <el-form-item
            label="Name"
            prop="name"
            :rules="[
              { required: true, message: 'Please input your name', trigger: 'blur' },
            ]"
        >
          <el-input v-model="profileForm.name"/>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item
                label="Gender"
                prop="gender"
                :rules="[
                    { required: true, message: 'Please select your gender', trigger: 'blur' },
                ]"
            >
              <el-select v-model="profileForm.gender" class="m-2" placeholder="Select" size="default">
                <el-option
                    v-for="item in genderList"
                    :key="item"
                    :label="item"
                    :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
                label="Age"
                prop="age"
                :rules="[
                  { required: true, message: 'Please input the age', trigger: 'blur' },
                  { type: 'number', message: 'Please input number value', trigger: 'blur' }
                ]"
            >
              <el-input-number v-model="profileForm.age" :min="18" :max="120" @change=""/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
            label="Major"
            prop="major"
            :rules="[
              { required: true, message: 'Please input your major', trigger: 'blur' },
            ]"
        >
          <el-input v-model="profileForm.major"/>
        </el-form-item>
        <el-form-item
            label="Degree"
            prop="degree"
            :rules="[
              { required: true, message: 'Please select your degree', trigger: 'blur' },
            ]"
        >
          <el-select v-model="profileForm.degree" class="m-2" placeholder="Select" size="default">
            <el-option
                v-for="item in degreeList"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
            label="Tel"
            prop="tel"
            :rules="[
              { required: true, message: 'Please input the email', trigger: 'blur' },
              { type: 'number', validator: checkTel, message: 'Please input your telephone number', trigger: 'blur'}
            ]"
        >
          <el-input v-model="profileForm.tel"/>
        </el-form-item>
      </el-form>
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="closeProfileEditDialog">Cancel</el-button>
            <el-button type="primary" @click="editProfileSubmit(profileFormRef)">
              Confirm
            </el-button>
          </span>
    </template>
  </el-dialog>

  <!--  PasswordChangeDialog  -->
  <el-dialog :model-value="passwordChangeDialog" title="Change your password" :before-close="closePasswordChangeDialog"
             style="width: 500px;">
    <el-form>
      <el-form :model="passwordChangeForm" ref="passwordChangeFormRef">
        <el-form-item
            label="Captcha"
            prop="captcha"
            :rules="[
              { required: true, message: 'Please input the captcha', trigger: 'blur' },
              { min: 4, max: 4, message: 'Length should be 4', trigger: 'blur' }
            ]"
        >
          <el-col :span="15">
            <el-input type="text" placeholder="Get Captcha" v-model="passwordChangeForm.captcha"/>
          </el-col>
          <el-col :span="8">
            <el-button style="width: 100%; margin-left: 15px;" @click="getPasswordChangingCaptcha">{{ passwordChangeButtonContent }}</el-button>
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
          <el-input show-password type="password" placeholder="New Password" v-model="passwordChangeForm.newPassword"/>
        </el-form-item>
      </el-form>
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="closePasswordChangeDialog">Cancel</el-button>
            <el-button type="primary" @click="newPasswordSubmit(passwordChangeFormRef)">
              Confirm
            </el-button>
          </span>
    </template>
  </el-dialog>

  <!--  Upload the avatar  -->
  <el-dialog v-model="uploadAvatarDialog" title="Upload your avatar" :before-close="closeUploadAvatarDialog">
    <a-space direction="vertical" :style="{ width: '100%' }">
      <a-upload
          :action="myAvatarUrl"
          :fileList="file ? [file] : []"
          :show-file-list="false"
          @change="onChange"
          @progress="onProgress"
      >
        <template #upload-button>
          <div
              :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`"
          >
            <div
                class="arco-upload-list-picture custom-upload-avatar"
                v-if="file && file.url"
            >
              <img :src="file.url" />
              <div class="arco-upload-list-picture-mask">
                <IconEdit />
              </div>
              <a-progress
                  v-if="file.status === 'uploading' && file.percent < 100"
                  :percent="file.percent"
                  type="circle"
                  size="mini"
                  :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                  }"
              />
            </div>
            <div class="arco-upload-picture-card" v-else>
              <div class="arco-upload-picture-card-text">
                <IconPlus />
                <div style="margin-top: 10px; font-weight: 600">Upload</div>
              </div>
            </div>
          </div>
        </template>
      </a-upload>
    </a-space>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="closeUploadAvatarDialog">Cancel</el-button>
          </span>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {Search, Upload, Delete, Edit, OfficeBuilding, EditPen} from '@element-plus/icons-vue'
import IconEdit from '@arco-design/web-vue/es/icon/icon-edit';
import IconPlus from '@arco-design/web-vue/es/icon/icon-plus';
import EmployeeNav from './EmployeeNav.vue'
import type {CSSProperties} from 'vue'

import type {FormInstance} from 'element-plus'
import axios from "axios";
import {get} from "http";
import router from "@/router";
import {ElMessage} from "element-plus";

const passwordChangeFormRef = ref<FormInstance>()
const profileFormRef = ref<FormInstance>()

const genderList = ref(['Male', 'Female']);
const degreeList = ref(['Bachelor', 'Master', 'PhD']);

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth;
});

let screenWidth = ref(window.innerWidth);

const viewMethod = ref('Hot Posts');

const passwordChangeForm = ref({
  captcha: '',
  newPassword: ''
});

let profileEditDialog = ref(false);
let passwordChangeDialog = ref(false);
let uploadAvatarDialog = ref(false);

function closeProfileEditDialog() {
  profileEditDialog.value = false
}

function closePasswordChangeDialog() {
  passwordChangeDialog.value = false
}

function closeUploadAvatarDialog() {
  uploadAvatarDialog.value = false
}

const labelList = reactive([
  'Java', 'C/C++', 'Golang', 'PHP', 'C#', '.NET', 'Python', 'Deep Learning', 'Data Analysis', 'ARM Dev', 'FPGA', 'PCB Design'
])

const profileForm = reactive({
  email: ' ',
  name: ' ',
  gender: ' ',
  age: 18,
  major: ' ',
  degree: ' ',
  tel: ' '
})

const labelIndexSelected: any = reactive([])
for (let i = 0; i < labelList.length; i++) {
  labelIndexSelected.push(false)
}

const salaryValue = ref(3000)

const postSearch = ref('')

const citySelected = ref('')

const cities = [
  {
    value: 'All Cities',
    label: 'All Cities',
  },
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Chongqing',
    label: 'Chongqing',
  }
]

const postList = ref(['1', '2', '3', '4', '5', '6']);

const file = ref();

let myAvatarUrl = ref('/api/avatar/employee/' + localStorage.getItem('token'));

const onChange = (_: any, currentFile: any) => {
  file.value = {
    ...currentFile,
    // url: URL.createObjectURL(currentFile.file),
  };
};

const onProgress = (currentFile: any) => {
  file.value = currentFile;
  ElMessage.success('Upload successfully');
  setTimeout(() => {
    // reload the page
    window.location.reload();
  }, 2000);
};

let passwordChangeButtonContent = ref('Captcha');

function getPasswordChangingCaptcha() {
  axios({
    url: '/api/changePassword/employee',
    method: 'get',
  }).then((res) => {
    ElMessage.success(res.data.msg);
    if (res.data.status === 200) {
      let count = 60;
      let timer = setInterval(function () {
        if (count > 0) {
          count--;
          passwordChangeButtonContent.value = count + 's';
        } else {
          passwordChangeButtonContent.value = 'Captcha';
          clearInterval(timer);
        }
      }, 1000);
    }
  }).catch((err) => {
    ElMessage.error(err);
  })
}

const newPasswordSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios({
        url: '/api/changePassword/employee',
        method: 'post',
        data: {
          captcha: passwordChangeForm.value.captcha,
          password: passwordChangeForm.value.newPassword,
        }
      }).then((res) => {
        ElMessage.success(res.data.msg);
        if (res.data.status === 200) {
          closePasswordChangeDialog();
        }
      }).catch((err) => {
        ElMessage.error(err);
      })
    } else {
      ElMessage.error('Please input the correct information!')
      return false
    }
  })
}

const editProfileSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(profileForm);
      axios({
        url: '/api/employee/profile',
        method: 'put',
        data: {
          name: profileForm.name,
        }
      }).then((res) => {
        ElMessage.success(res.data.msg);
        if (res.data.status === 200) {
          closeProfileEditDialog();
        }
      }).catch((err) => {
        ElMessage.error(err);
      })
    } else {
      ElMessage.error('Please input the correct information!')
      return false;
    }
  })
}

const checkTel = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    let reg = /^1[345789]\d{9}$/;
    if (!reg.test(value)) {
      callback(new Error('Please input your telephone number'))
    } else {
      callback()
    }
  }
}


function profileEditDialogButton() {
  // get request to get the profile, not axios
  axios({
    url: '/api/employee/profile',
    method: 'get'
  }).then((res) => {
    console.log(res.data.data);
      profileForm.email = res.data.data.email;
      profileForm.name = res.data.data.name;
      profileForm.gender = res.data.data.gender;
      profileForm.age = res.data.data.age;
      profileForm.major = res.data.data.major;
      profileForm.degree = res.data.data.degree;
      profileForm.tel = res.data.data.tel;
      console.log(profileForm);
      profileEditDialog.value = true;
    }
  )
}

</script>

<style scoped>
.common-layout {
  background-color: rgba(236, 245, 255, 0.4);
  height: 100%;
}

#resumeText {
  border-radius: 12px;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
}

#resumeText:hover {
  background-color: rgba(236, 245, 255, 0.5);
  cursor: pointer;
}

.el-divider {
  margin-top: 10px;
  margin-bottom: 10px;
}

.el-container.is-vertical {
  height: 100%;
}

.my-avatar:hover {
  cursor: pointer;
}
</style>
