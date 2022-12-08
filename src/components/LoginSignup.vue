<template>
  <div id="background" v-if="screenWidth >= 560">
    <div id="login-signup-wide" class="login-signup">
      <el-card class="box-card" id="login-box-card">
        <el-tabs v-model="activeName" class="demo-tabs" :stretch=true>
          <el-tab-pane label="Looking for jobs" name="first">
            <!--     login for employees      -->
            <div v-if="!employeeSignup">
              <el-form
                  size="large"
                  label-position="top"
                  ref="employeeSigninFormRef"
                  :model="employeeSigninForm"
              >
                <el-form-item
                    label="Email"
                    prop="email"
                    :rules="[
                      { required: true, message: 'Please input your email', trigger: 'blur' },
                      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                    ]"
                >
                  <el-input placeholder="" v-model="employeeSigninForm.email"></el-input>
                </el-form-item>
                <el-form-item
                    label="Password"
                    prop="password"
                    :rules="[
                      { required: true, message: 'Please input your password', trigger: 'blur' },
                      { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                      { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] }
                    ]"
                >
                  <el-input type="password" v-model="employeeSigninForm.password" show-password></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" size="large" style="width: 100%;" @click="SigninSubmit(employeeSigninFormRef, 'employee')">Submit</el-button>
              <br>
              <el-button size="large" style="width: 100%; margin-top: 10px;" @click="reset(employeeSigninFormRef)">Reset</el-button>
              <span class="switch-to-login-signup" @click="switchEmployee">Does not have an account? Sign up. -></span>
            </div>
            <!--     sign up for employees      -->
            <div v-else>
              <el-form
                  size="large"
                  label-position="top"
                  ref="employeeSignupFormRef"
                  :model="employeeSignupForm"
              >
                <el-form-item
                    label="Email"
                    prop="email"
                    :rules="[
                      { required: true, message: 'Please input your email', trigger: 'blur' },
                      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                    ]"
                >
                  <el-input placeholder="" v-model="employeeSignupForm.email"></el-input>
                </el-form-item>
                <el-form-item
                    prop="captcha"
                    :rules="[
                        { required: true, message: 'Please input the captcha', trigger: 'blur' },
                        {len: 4, message: 'The captcha must be 4 characters', trigger: ['blur', 'change']}
                    ]"
                >
                  <el-col :span="17">
                    <el-input placeholder="" v-model="employeeSignupForm.captcha"></el-input>
                  </el-col>
                  <el-col :span="7">
                    <el-button :disabled="employeeCaptchaButtonDisabled" @click="getCaptcha('employee')">{{ employeeCaptchaButtonContent }}</el-button>
                  </el-col>
                </el-form-item>
                <el-form-item
                    label="Password"
                    prop="password"
                    :rules="[
                      { required: true, message: 'Please input your password', trigger: 'blur' },
                      { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                      { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] }
                    ]"
                >
                  <el-input placeholder="" v-model="employeeSignupForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item
                    label="Confirm Password"
                    prop="confirmPassword"
                    :rules="[
                      { required: true, message: 'Please confirm your password', trigger: 'blur' },
                      { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                      { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] },
                      { validator: validateEmployeeConfirmPassword, trigger: 'blur' }
                    ]"
                >
                  <el-input placeholder="" v-model="employeeSignupForm.confirmPassword" show-password></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" size="large" style="width: 100%;" @click="SignupSubmit(employeeSignupFormRef, 'employee')">Submit</el-button>
              <br>
              <el-button size="large" style="width: 100%; margin-top: 10px;" @click="reset(employeeSignupFormRef)">Reset</el-button>
              <span class="switch-to-login-signup" @click="switchEmployee">Already have an account? Sign in. -></span>
            </div>
          </el-tab-pane>
<!-- Login in for employers -->
          <el-tab-pane label="I want to recruit" name="second">
            <div v-if="!employerSignup">
              <el-form
                  size="large"
                  label-position="top"
                  ref="employerSigninFormRef"
                  :model="employerSigninForm"
              >
                <el-form-item
                    label="Company Email"
                    prop="email"
                    :rules="[
                        { required: true, message: 'Please input your company email', trigger: 'blur' },
                        { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                    ]"
                >
                  <el-input placeholder="" v-model="employerSigninForm.email"></el-input>
                </el-form-item>
                <el-form-item
                    label="Password"
                    prop="password"
                    :rules="[
                        { required: true, message: 'Please input your password', trigger: 'blur' },
                        { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                        { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] }
                    ]"
                >
                  <el-input placeholder="" v-model="employerSigninForm.password" show-password></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" size="large" style="width: 100%;" @click="SigninSubmit(employerSigninFormRef, 'employer')">Submit</el-button>
              <br>
              <el-button size="large" style="width: 100%; margin-top: 10px;" @click="reset(employerSigninFormRef)">Reset</el-button>
              <span class="switch-to-login-signup" @click="switchEmployer">Does not have an account? Sign up. -></span>
            </div>
<!-- sign up for employers -->
            <div v-else>
              <el-form
                  size="large"
                  label-position="top"
                  ref="employerSignupFormRef"
                  :model="employerSignupForm"
              >
                <el-form-item
                    label="Company Email"
                    prop="email"
                    :rules="[
                        { required: true, message: 'Please input your email', trigger: 'blur' },
                        { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                    ]"
                >
                  <el-input placeholder="" v-model="employerSignupForm.email"></el-input>
                </el-form-item>
                <el-form-item
                    prop="captcha"
                    :rules="[
                        { required: true, message: 'Please input the captcha', trigger: 'blur' },
                        {len: 4, message: 'The captcha must be 4 characters', trigger: ['blur', 'change']}
                    ]"
                >
                  <el-col :span="17">
                    <el-input placeholder="" v-model="employerSignupForm.captcha"></el-input>
                  </el-col>
                  <el-col :span="7">
                    <el-button :disabled="employerCaptchaButtonDisabled" @click="getCaptcha('employer')">{{ employerCaptchaButtonContent }}</el-button>
                  </el-col>
                </el-form-item>
                <el-form-item
                    label="Password"
                    prop="password"
                    :rules="[
                        { required: true, message: 'Please input your password', trigger: 'blur' },
                        { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                        { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] }
                    ]"
                >
                  <el-input placeholder="" show-password v-model="employerSignupForm.password"></el-input>
                </el-form-item>
                <el-form-item
                    label="Confirm Password"
                    prop="confirmPassword"
                    :rules="[
                        { required: true, message: 'Please confirm your password', trigger: 'blur' },
                        { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                        { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] },
                        { validator: validateEmployerConfirmPassword, trigger: 'blur' }
                    ]"
                >
                  <el-input placeholder="" show-password v-model="employerSignupForm.confirmPassword"></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" size="large" style="width: 100%;" @click="SignupSubmit(employerSignupFormRef, 'employer')">Submit</el-button>
              <br>
              <el-button size="large" style="width: 100%; margin-top: 10px;" @click="reset(employerSignupFormRef)">Reset</el-button>
              <span class="switch-to-login-signup" @click="switchEmployer">Already have an account? Sign in. -></span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>

<!-- login-signup card in small devices -->
  <div id="login-signup-narrow" class="login-signup" v-else>
    <h2 class="title-narrow">MyOffer</h2>
    <el-tabs v-model="activeName" class="demo-tabs" :stretch=true>
      <el-tab-pane label="Looking for jobs" name="first">
        <!-- sign in for employees -->
        <div v-if="!employeeSignup">
          <el-form
              size="large"
              label-position="top"
              ref="employeeSigninFormRef"
              :model="employeeSigninForm"
          >
            <el-form-item
                label="Email"
                prop="email"
                :rules="[
                  { required: true, message: 'Please input your email', trigger: 'blur' },
                  { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                ]"
            >
              <el-input placeholder="" v-model="employeeSigninForm.email"></el-input>
            </el-form-item>
            <el-form-item
                label="Password"
                prop="password"
                :rules="[
                  { required: true, message: 'Please input your password', trigger: 'blur' },
                  { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                  { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] }
                ]"
            >
              <el-input placeholder="" type="password" v-model="employeeSigninForm.password" show-password></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="large" style="width: 100%;" @click="SigninSubmit(employeeSigninFormRef, 'employee')">Submit</el-button>
          <br>
          <el-button size="large" style="width: 100%; margin-top: 10px;" @click="reset(employeeSigninFormRef)">Reset</el-button>
          <span class="switch-to-login-signup" @click="switchEmployee">Does not have an account? Sign up. -></span>
        </div>
        <!-- sign up for employees -->
        <div v-else>
          <el-form
              size="large"
              label-position="top"
              ref="employeeSignupFormRef"
              :model="employeeSignupForm"
          >
            <el-form-item
                label="Email"
                prop="email"
                :rules="[
                  { required: true, message: 'Please input your email', trigger: 'blur' },
                  { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                ]"
            >
              <el-input placeholder="" v-model="employeeSignupForm.email"></el-input>
            </el-form-item>
            <el-form-item
                prop="captcha"
                :rules="[
                  { required: true, message: 'Please input the captcha', trigger: 'blur' },
                  {len: 4, message: 'The captcha must be 4 characters', trigger: ['blur', 'change']}
                ]"
            >
              <el-col :span="16">
                <el-input placeholder="" v-model="employeeSignupForm.captcha"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button :disabled="employeeCaptchaButtonDisabled" @click="getCaptcha('employee')">{{ employeeCaptchaButtonContent }}</el-button>
              </el-col>
            </el-form-item>
            <el-form-item
                label="Password"
                prop="password"
                :rules="[
                  { required: true, message: 'Please input your password', trigger: 'blur' },
                  { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                  { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] }
                ]"
            >
              <el-input placeholder="" show-password v-model="employeeSignupForm.password"></el-input>
            </el-form-item>
            <el-form-item
                label="Confirm Password"
                prop="confirmPassword"
                :rules="[
                  { required: true, message: 'Please confirm your password', trigger: 'blur' },
                  { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                  { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] },
                  { validator: validateEmployeeConfirmPassword, trigger: 'blur' }
                ]"
            >
              <el-input placeholder="" show-password v-model="employeeSignupForm.confirmPassword"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="large" style="width: 100%;" @click="SignupSubmit(employeeSignupFormRef)">Submit</el-button>
          <br>
          <el-button size="large" style="width: 100%; margin-top: 10px;" @click="reset(employeeSignupFormRef)">Reset</el-button>
          <span class="switch-to-login-signup" @click="switchEmployee">Already have an account? Sign in. -></span>
        </div>
      </el-tab-pane>
<!-- sign in for employers-->
      <el-tab-pane label="I want to recruit" name="second">
        <div v-if="!employerSignup">
          <el-form
              size="large"
              label-position="top"
              ref="employerSigninFormRef"
              :model="employerSigninForm"
          >
            <el-form-item
                label="Email"
                prop="email"
                :rules="[
                  { required: true, message: 'Please input your email', trigger: 'blur' },
                  { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                ]"
            >
              <el-input placeholder="" v-model="employerSigninForm.email"></el-input>
            </el-form-item>
            <el-form-item
                label="Password"
                prop="password"
                :rules="[
                  { required: true, message: 'Please input your password', trigger: 'blur' },
                  { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                  { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] }
                ]"
            >
              <el-input placeholder="" show-password v-model="employerSigninForm.password"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="large" style="width: 100%;" @click="SigninSubmit(employerSigninFormRef, 'employer')">Submit</el-button>
          <br>
          <el-button size="large" style="width: 100%; margin-top: 10px;" @click="reset(employerSigninFormRef)">Reset</el-button>
          <span class="switch-to-login-signup" @click="switchEmployer">Does not have an account? Sign up. -></span>
        </div>
<!-- sign up for employers-->
        <div v-else>
          <el-form
              size="large"
              label-position="top"
              ref="employerSignupFormRef"
              :model="employerSignupForm"
          >
            <el-form-item
                label="Email"
                prop="email"
                :rules="[
                  { required: true, message: 'Please input your email', trigger: 'blur' },
                  { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                ]"
            >
              <el-input placeholder="" v-model="employerSignupForm.email"></el-input>
            </el-form-item>
            <el-form-item
                prop="captcha"
                :rules="[
                  { required: true, message: 'Please input the captcha', trigger: 'blur' },
                  {len: 4, message: 'The captcha must be 4 characters', trigger: ['blur', 'change']}
                ]"
            >
              <el-col :span="16">
                <el-input placeholder="" v-model="employerSignupForm.captcha"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button :disabled="employerCaptchaButtonDisabled" @click="getCaptcha('employer')">{{ employerCaptchaButtonContent }}</el-button>
              </el-col>
            </el-form-item>
            <el-form-item
                label="Password"
                prop="password"
                :rules="[
                  { required: true, message: 'Please input your password', trigger: 'blur' },
                  { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                  { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] }
                ]"
            >
              <el-input placeholder="" show-password v-model="employerSignupForm.password"></el-input>
            </el-form-item>
            <el-form-item
                label="Confirm Password"
                prop="confirmPassword"
                :rules="[
                  { required: true, message: 'Please confirm your password', trigger: 'blur' },
                  { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
                  { max: 20, message: 'Password must be at most 20 characters', trigger: ['blur', 'change'] },
                  { validator: validateEmployerConfirmPassword, trigger: 'blur' }
                ]"
            >
              <el-input placeholder="" show-password v-model="employerSignupForm.confirmPassword"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="large" style="width: 100%;" @click="SignupSubmit(employerSignupFormRef, 'employer')">Submit</el-button>
          <br>
          <el-button size="large" style="width: 100%; margin-top: 10px;" @click="reset(employerSignupFormRef)">Reset</el-button>
          <span class="switch-to-login-signup" @click="switchEmployer">Already have an account? Sign in. -></span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
// import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus'
import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus'
import {get} from "http";
import router from "@/router";
// const router = useRouter();
const activeName = ref('first');
let screenWidth = ref(window.innerWidth);
const employeeSignup = ref(false);
const employerSignup = ref(false);

const employeeSigninFormRef = ref<FormInstance>();
const employeeSignupFormRef = ref<FormInstance>();
const employerSigninFormRef = ref<FormInstance>();
const employerSignupFormRef = ref<FormInstance>();
const employeeSigninForm = reactive({
  email: '',
  password: '',
})
const employeeSignupForm = reactive({
  email: '',
  captcha: '',
  password: '',
  confirmPassword: '',
})
const employerSigninForm = reactive({
  email: '',
  password: '',
})
const employerSignupForm = reactive({
  email: '',
  captcha: '',
  password: '',
  confirmPassword: '',
})

const employeeCaptchaButtonContent = ref('Captcha');
const employerCaptchaButtonContent = ref('Captcha');
const employeeCaptchaButtonDisabled = ref(false);
const employerCaptchaButtonDisabled = ref(false);

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth;
});

function validateEmployeeConfirmPassword(rule: any, value: string, callback: any) {
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== employeeSignupForm.password) {
    callback(new Error('Two passwords that you enter is inconsistent!'));
  } else {
    callback();
  }
}
function validateEmployerConfirmPassword(rule: any, value: string, callback: any) {
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== employerSignupForm.password) {
    callback(new Error('Two passwords that you enter is inconsistent!'));
  } else {
    callback();
  }
}

function SigninSubmit(formEl: FormInstance | undefined, userType: string) {
  if (formEl) {
    formEl.validate((valid: boolean) => {
      if (valid) {
        axios({
          method: 'post',
          url: '/api/login/' + userType,
          data: {
            email: userType === 'employee' ? employeeSigninForm.email : employerSigninForm.email,
            password: userType === 'employee' ? employeeSigninForm.password : employerSigninForm.password,
          }
        }).then((res) => {
          if (res.data.status === 200) {
            ElMessage.success(res.data.msg);
            localStorage.setItem('token', res.data.token);
            setTimeout(() => {
              if (userType === 'employee') {
                router.push('/employee');
              } else {
                router.push('/employer');
              }
            }, 1000);
          } else {
            ElMessageBox.alert(res.data.msg, 'Tips', {
              confirmButtonText: 'OK',
            })
          }
        }).catch((err) => {
          ElMessageBox.alert(err, 'Tips', {
            confirmButtonText: 'OK',
          })
        })
      } else {
        ElMessageBox.alert('Please fill in the table correctly!', 'Tips', {
          confirmButtonText: 'OK',
        })
        return false;
      }
    });
  }
}

function SignupSubmit(formEl: FormInstance | undefined, userType: string) {
  if (formEl) {
    formEl.validate((valid: boolean) => {
      if (valid) {
        axios({
          method: 'post',
          url: '/api/register/' + userType,
          data: {
            email: userType === 'employee' ? employeeSignupForm.email : employerSignupForm.email,
            password: userType === 'employee' ? employeeSignupForm.password : employerSignupForm.password,
            confirmedPassword: userType === 'employee' ? employeeSignupForm.confirmPassword : employerSignupForm.confirmPassword,
            captcha: userType === 'employee' ? employeeSignupForm.captcha : employerSignupForm.captcha,
          }
        }).then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            ElMessage.success(res.data.msg);
            if (userType === 'employee') {
              switchEmployee();
            } else {
              switchEmployer();
            }
          } else {
            ElMessageBox.alert(res.data.msg, 'Tips', {
              confirmButtonText: 'OK',
            })
          }
        }).catch((err) => {
          ElMessageBox.alert(err, 'Tips', {
            confirmButtonText: 'OK',
          })
        })
      } else {
        ElMessageBox.alert('Please fill in the table correctly!', 'Tips', {
          confirmButtonText: 'OK',
        })
        return false;
      }
    });
  }
  console.log('SignupSubmit');
}

function reset(formEl: FormInstance | undefined) {
  if (!formEl) return;
    formEl.resetFields();
}

function switchEmployee() {
  employeeSignup.value = !employeeSignup.value;
}

function switchEmployer() {
  employerSignup.value = !employerSignup.value;
}

function getCaptcha(userType: string) {
  let email;
  if (userType === 'employee') {
    email = employeeSignupForm.email;
    if (IsEmail(email)) {
      axios.get('/api/captcha', {
        params: {
          email: email
        }
      }).then((res) => {
        ElMessage({
          message: res.data.msg,
          type: 'success',
        })
        if (res.data.status === 200) {
          let count = 60;
          let timer = setInterval(function () {
            if (count > 0) {
              count--;
              employeeCaptchaButtonContent.value = count + 's';
              employeeCaptchaButtonDisabled.value = true;
            } else {
              employeeCaptchaButtonContent.value = 'Captcha';
              employeeCaptchaButtonDisabled.value = false;
              clearInterval(timer);
            }
          }, 1000);
        }
      }).catch((err) => {
        ElMessageBox.alert(err, 'Tips', {
          confirmButtonText: 'OK',
        })
      });
    } else {
      ElMessageBox.alert('Please input a valid email address', 'Tips', {
        confirmButtonText: 'OK',
      })
    }
  } else {
    email = employerSignupForm.email;
    if (IsEmail(email)) {
      console.log(email);
      axios.get('/api/captcha', {
        params: {
          email: email
        }
      }).then((res) => {
        ElMessage({
          message: res.data.msg,
          type: 'success',
        })
        if (res.data.status === 200) {
          let count = 60;
          let timer = setInterval(function () {
            if (count > 0) {
              count--;
              employerCaptchaButtonContent.value = count + 's';
              employerCaptchaButtonDisabled.value = true;
            } else {
              employerCaptchaButtonContent.value = 'Captcha';
              employerCaptchaButtonDisabled.value = false;
              clearInterval(timer);
            }
          }, 1000);
        }
      }).catch((err) => {
        ElMessageBox.alert(err, 'Tips', {
          confirmButtonText: 'OK',
        })
      });
    } else {
      ElMessageBox.alert('Please input a valid email address', 'Tips', {
        confirmButtonText: 'OK',
      })
    }
  }
}

function IsEmail(email: string) {
  let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return  reg.test(email);
}

</script>

<style scoped>
#background {
  position: absolute;
  background-image: url("@/assets/photo/job-blur.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
}

#login-signup-wide {
  padding-top: 80px;
}

#login-signup-narrow {
  padding-right: 10px;
  padding-left: 10px;
}

.login-signup {
  text-align: center;
}

.switch-to-login-signup {
  margin-top: 5px;
  color: #409EFF;
}

.switch-to-login-signup:hover {
  text-decoration: underline;
  cursor: pointer;
}

.title-narrow {
  color: #409eff;
}

#login-box-card {
  width: 375px;
  margin: 0 auto;
}
</style>