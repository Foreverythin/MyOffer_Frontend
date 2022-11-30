<template>
  <div id="background" v-if="screenWidth >= 560">
    <div id="login-signup-wide" class="login-signup">
      <el-card class="box-card" id="login-box-card">
        <el-tabs v-model="activeName" class="demo-tabs" :stretch=true>
          <el-tab-pane label="Looking for jobs" name="first">
            <div v-if="employeeSignup">
              <el-form size="large" label-position="top">
                <el-form-item label="Email">
                  <el-input placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="Password">
                  <el-input placeholder=""></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" size="large" style="width: 100%;" @click="employeeSigninSubmit">Submit</el-button>
              <br>
              <el-button size="large" style="width: 100%; margin-top: 10px;">Reset</el-button>
              <span class="switch-to-login-signup" @click="switchEmployee">Does not have an account? Sign up. -></span>
            </div>
            <div v-else>
              <el-form size="large" label-position="top">
                <el-form-item label="Email">
                  <el-input placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                  <el-col :span="17">
                    <el-input placeholder=""></el-input>
                  </el-col>
                  <el-col :span="7">
                    <el-button>Captcha</el-button>
                  </el-col>
                </el-form-item>
                <el-form-item label="Password">
                  <el-input placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="Confirm Password">
                  <el-input placeholder=""></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" size="large" style="width: 100%;" @click="employeeSignupSubmit">Submit</el-button>
              <br>
              <el-button size="large" style="width: 100%; margin-top: 10px;">Reset</el-button>
              <span class="switch-to-login-signup" @click="switchEmployee">Already have an account? Sign in. -></span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="I want to recruit" name="second">
            <div v-if="employerSignup">
              <el-form size="large" label-position="top">
                <el-form-item label="Email">
                  <el-input placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="Password">
                  <el-input placeholder=""></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" size="large" style="width: 100%;" @click="employerSigninSubmit">Submit</el-button>
              <br>
              <el-button size="large" style="width: 100%; margin-top: 10px;">Reset</el-button>
              <span class="switch-to-login-signup" @click="switchEmployer">Does not have an account? Sign up. -></span>
            </div>
            <div v-else>
              <el-form size="large" label-position="top">
                <el-form-item label="Email">
                  <el-input placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                  <el-col :span="17">
                    <el-input placeholder=""></el-input>
                  </el-col>
                  <el-col :span="7">
                    <el-button>Captcha</el-button>
                  </el-col>
                </el-form-item>
                <el-form-item label="Password">
                  <el-input placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="Confirm Password">
                  <el-input placeholder=""></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" size="large" style="width: 100%;" @click="employerSignupSubmit">Submit</el-button>
              <br>
              <el-button size="large" style="width: 100%; margin-top: 10px;">Reset</el-button>
              <span class="switch-to-login-signup" @click="switchEmployer">Already have an account? Sign in. -></span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
  <div id="login-signup-narrow" class="login-signup" v-else>
    <h2 class="title-narrow">MyOffer</h2>
    <el-tabs v-model="activeName" class="demo-tabs" :stretch=true>
      <el-tab-pane label="Looking for jobs" name="first">
        <div v-if="employeeSignup">
          <el-form size="large" label-position="top">
            <el-form-item label="Email">
              <el-input placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="large" style="width: 100%;" @click="employeeSigninSubmit">Submit</el-button>
          <br>
          <el-button size="large" style="width: 100%; margin-top: 10px;">Reset</el-button>
          <span class="switch-to-login-signup" @click="switchEmployee">Does not have an account? Sign up. -></span>
        </div>
        <div v-else>
          <el-form size="large" label-position="top">
            <el-form-item label="Email">
              <el-input placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
              <el-col :span="16">
                <el-input placeholder=""></el-input>
              </el-col>
              <el-col :span="8">
                <el-button>Captcha</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="Password">
              <el-input placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password">
              <el-input placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="large" style="width: 100%;" @click="employeeSignupSubmit">Submit</el-button>
          <br>
          <el-button size="large" style="width: 100%; margin-top: 10px;">Reset</el-button>
          <span class="switch-to-login-signup" @click="switchEmployee">Already have an account? Sign in. -></span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="I want to recruit" name="second">
        <div v-if="employerSignup">
          <el-form size="large" label-position="top">
            <el-form-item label="Email">
              <el-input placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="large" style="width: 100%;" @click="employerSigninSubmit">Submit</el-button>
          <br>
          <el-button size="large" style="width: 100%; margin-top: 10px;">Reset</el-button>
          <span class="switch-to-login-signup" @click="switchEmployer">Does not have an account? Sign up. -></span>
        </div>
        <div v-else>
          <el-form size="large" label-position="top">
            <el-form-item label="Email">
              <el-input placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
              <el-col :span="16">
                <el-input placeholder=""></el-input>
              </el-col>
              <el-col :span="8">
                <el-button>Captcha</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="Password">
              <el-input placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password">
              <el-input placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="large" style="width: 100%;" @click="employerSignupSubmit">Submit</el-button>
          <br>
          <el-button size="large" style="width: 100%; margin-top: 10px;">Reset</el-button>
          <span class="switch-to-login-signup" @click="switchEmployer">Already have an account? Sign in. -></span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
// import { useRouter } from 'vue-router';
import {ref} from 'vue';
// const router = useRouter();
const activeName = ref('first');
let screenWidth = ref(window.innerWidth);

const employeeSignup = ref(true);
const employerSignup = ref(true);

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth;
});

function employeeSignupSubmit() {
  console.log('employeeSignupSubmit');
}

function employeeSigninSubmit() {
  // router.push('/employee');
  console.log('employeeSigninSubmit');
}

function employerSignupSubmit() {
  // router.push('/employer');
  console.log('employerSignupSubmit');
}

function employerSigninSubmit() {
  // router.push('/employer');
  console.log('employerSigninSubmit');
}

function switchEmployee() {
  employeeSignup.value = !employeeSignup.value;
}

function switchEmployer() {
  employerSignup.value = !employerSignup.value;
}
</script>

<style scoped>
#background {
  position: absolute;
  background-image: url("@/assets/photo/job.jpg");
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