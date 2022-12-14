<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <employee-nav style="z-index: 1000;"/>
      </el-header>
      <el-main class="main-content" style="overflow-y: scroll">
        <el-backtop :right="50" :bottom="50" :visibility-height="100" target=".main-content"/>
        <el-card class="post-header-info">
          <el-row style="color: rgb(90, 156, 248); margin-bottom: 25px;">
            <span style="font-weight: bold">{{ postInfo.inRecruitment === true ? 'In Recruitment' : 'Out Of Recruitment'}}</span>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="15">
              <span style="font-weight: bold; font-size: x-large;">{{ postInfo.title }}</span>
              <br/>
              <el-tag style="margin-right: 5px; margin-top: 15px;">¥{{ postInfo.salary }}</el-tag>
              <el-tag type="success" style="margin-right: 5px;">{{ postInfo.degree }}</el-tag>
              <el-tag type="warning" style="margin-right: 5px;">{{ postInfo.label }}</el-tag>
              <br/>
              <el-button type="success" style="margin-top: 10px;" @click="deliverResume(postID)">Deliver My Resume</el-button>
            </el-col>
            <el-col :span="9">
              <el-row>
                <el-icon size="30px" style="position: relative; bottom: 5px;">
                  <OfficeBuilding/>
                </el-icon>
                <span style="font-weight: bold; font-size: large; margin-left: 5px;">{{ companyInfo.name }}</span>
              </el-row>
              <el-tag style="margin-right: 5px; margin-top: 10px;">{{ companyInfo.dateOfEstablishment }}</el-tag>
              <el-tag type="success" style="margin-right: 5px; margin-top: 10px;">{{ companyInfo.staff }} Staffs</el-tag>
              <el-tag type="warning" style="margin-right: 5px; margin-top: 10px;">{{ companyInfo.researchDirection }}</el-tag>
              <el-tag type="danger" style="margin-top: 10px;">{{ companyInfo.location }}</el-tag>
            </el-col>
          </el-row>
        </el-card>
        <el-row :gutter="20" style="margin-top: 10px;">
          <el-col :span="screenWidth<1000 ? 24 : 18" id="main-content-left">
            <el-card>
              <el-row>
                <h2>POST DETAIL</h2>
              </el-row>
              <div style="font-size: large">
                <h3>
                  Tasks
                </h3>
                <div style="line-height: 30px;">
                  {{ postInfo.tasks }}
                </div>
                <h3>
                  Requirements
                </h3>
                <div style="line-height: 30px;">
                  {{ postInfo.requirements }}
                </div>
              </div>
            </el-card>
            <el-card style="margin-top: 10px;">
              <el-row>
                <h2>COMPANY DETAIL</h2>
              </el-row>
              <el-descriptions
                  class="margin-top"
                  title="Basic Info"
                  :column="3"
                  border
              >
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Name
                    </div>
                  </template>
                  {{ companyInfo.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      CEO
                    </div>
                  </template>
                  {{ companyInfo.CEO }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Research Direction
                    </div>
                  </template>
                  {{ companyInfo.researchDirection }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Date of Establishment
                    </div>
                  </template>
                  {{ companyInfo.dateOfEstablishment }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Location
                    </div>
                  </template>
                  {{ companyInfo.location }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Staff
                    </div>
                  </template>
                  {{ companyInfo.staff }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Email
                    </div>
                  </template>
                  {{ companyInfo.email }}
                </el-descriptions-item>
              </el-descriptions>
              <h3>Introduction</h3>
              <div style="font-size: large; line-height: 30px;">
                {{ companyInfo.introduction }}
              </div>
            </el-card>
          </el-col>
          <!--     similar posts     -->
          <el-col :span="screenWidth<1000 ? 0 : 6" id="main-content-right">
            <el-card style="background-color: #e2e9f1;">
              <div style="font-size: 18px; font-weight: bold;">Similar Posts</div>
            </el-card>
            <el-card v-if="similarPosts.length === 0" style="margin-top: 10px;background-color: #e2e9f1;">
              <a-empty>
                <template #image>
                  <icon-empty />
                </template>
                No results!
              </a-empty>
            </el-card>
            <el-card v-for="item in similarPosts" style="margin-top:10px; background-color: #e2e9f1"
                     class="similarPosts" @click="toSimilarPost(item.post_id)">
              <el-row>
                <div style="font-weight: bold; font-size: large;">{{ item.title }}</div>
              </el-row>

              <el-row style="margin-top: 5px;">
                <el-tag style="margin-right: 5px;">¥{{ item.salary }}</el-tag>
                <el-tag type="success" style="margin-right: 5px;">{{ item.degree }}</el-tag>
                <el-tag type="warning" style="margin-right: 5px;">{{ item.label }}</el-tag>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, toRefs, watchEffect} from 'vue'
import axios from "axios";
import router from "@/router";
import {OfficeBuilding, Back} from '@element-plus/icons-vue'
import EmployeeNav from "@/components/EmployeeNav.vue";
import {ElMessage} from "element-plus";

let screenWidth = ref(window.innerWidth);

let similarPosts = ref([{
  post_id: 0,
  title: "",
  salary: 0,
  degree: "",
  label: ""
}]);

let postID = ref(1);
let postInfo = ref({
  title: '',
  salary: 2000,
  degree: '',
  label: '',
  tasks: '',
  requirements: '',
  inRecruitment: true
});
let companyInfo = ref({
  name: '',
  dateOfEstablishment: '',
  staff: 0,
  researchDirection: '',
  location: '',
  email: '',
  CEO: '',
  introduction: ''
})

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth;
});

postID.value = Number(router.currentRoute.value.query.postID!);
axios({
  url: '/api/employee/post-info',
  method: 'get',
  params: {
    postID: postID.value
  }
}).then(res => {
  postInfo.value = res.data.data.postInfo;
  companyInfo.value = res.data.data.companyInfo;
}).catch(err => {
  ElMessage.error(err);
})

axios({
  url: '/api/employee/similar-posts',
  method: 'get',
  params: {
    postID: postID.value
  }
}).then(res => {
  similarPosts.value = res.data.data.posts;
  console.log(similarPosts.value);
}).catch(err => {
  ElMessage.error(err);
})

const toSimilarPost = (postID: number) => {
  console.log(postID);
  router.push({
    path: '/post',
    query: {
      postID: postID
    }
  })
  setInterval(() => {
    window.location.reload();
  }, 100)
}

const deliverResume = (postID: number) => {
  if (postInfo.value.inRecruitment) {
    axios({
      url: '/api/employee/send-resume',
      method: 'post',
      data: {
        postID: postID
      }
    }).then(res => {
      if (res.data.status == 200) {
        ElMessage.success(res.data.msg);
      } else {
        ElMessage.error(res.data.msg);
      }
    }).catch(err => {
      ElMessage.error(err);
    })
  } else {
    ElMessage.error('The post is out of recruitment!');
  }
}

</script>

<style scoped>
.common-layout {
  background-color: rgba(236, 245, 255, 0.4);
  height: 100%;
}

.el-container.is-vertical {
  height: 100%;
}

.post-header-info {
  background-color: white;
}

.similarPosts:hover {
  cursor: pointer;
}
</style>