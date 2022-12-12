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
            <span style="font-weight: bold">In Recruitment</span>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="15">
              <span style="font-weight: bold; font-size: x-large;">C++开发工程师</span>
              <!--              <br/>-->
              <div style="font-size: 15px; margin-top: 10px;">This is a description of C++ 开发工程师.</div>
              <br/>
              <el-tag style="margin-right: 5px;">12-14k</el-tag>
              <el-tag type="success" style="margin-right: 5px;">Bachelor</el-tag>
              <el-tag type="warning" style="margin-right: 5px;">C++</el-tag>
              <br/>
              <el-button type="success" style="margin-top: 10px;">Deliver My Resume</el-button>
            </el-col>
            <el-col :span="9">
              <el-row>
                <el-icon size="30px" style="position: relative; bottom: 5px;">
                  <OfficeBuilding/>
                </el-icon>
                <span style="font-weight: bold; font-size: large; margin-left: 5px;">TM工作室</span>
              </el-row>
              <div style="font-size: 15px; margin-top: 10px;">This is a company.</div>
              <el-tag style="margin-right: 5px; margin-top: 10px;">5 Years</el-tag>
              <el-tag type="success" style="margin-right: 5px; margin-top: 10px;">500 staff</el-tag>
              <el-tag type="warning" style="margin-right: 5px; margin-top: 10px;">Game Development</el-tag>
              <el-tag type="danger" style="margin-top: 10px;">Chengdu</el-tag>
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
                  岗位职责
                </h3>
                1. 负责产品的Adaptive AUTOSAR标准模块开发、应用开发、系统调优与算法移植工作；
                2. 负责维护项目软件的编译环境和脚本；
                3. 负责视觉智能应用软件在不同嵌入式平台的移植和匹配工作；
                4. 负责产品软件平台化框架的实现工作；
                5. 负责解决软件攻关性问题；
                <h3>
                  任职要求
                </h3>
                1. 全日制本科及以上学历
                2. 2年以上相关嵌入式软件开发及测试工作经验；
                3. 熟练掌握C++语言开发，
                4. 熟练掌握数据结构、C++设计模式、STL，具备多线程编程、进程间通讯、系统内存优化等能力；
                5. 熟练掌握gdb调试，能够基于Linux、Shell、RTOS等环境开展软件开发工作；
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
                  TM工作室
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      CEO
                    </div>
                  </template>
                  Pangyu
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Research Direction
                    </div>
                  </template>
                  AI
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Date of Establishment
                    </div>
                  </template>
                  2018-10-03
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Location
                    </div>
                  </template>
                  Chengdu
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Staff
                    </div>
                  </template>
                  300
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      Email
                    </div>
                  </template>
                  1510397456@qq.com
                </el-descriptions-item>
              </el-descriptions>
              <h3>Introduction</h3>
              <div style="font-size: large; line-height: 25px;">
                南京红松信息成立于2014年4月，注册资金2000万，坐落于雨花台区宁双路18号沁恒科技园D栋一楼，公司以“用数据驱动行业进步”为使命，致力于大数据、人工智能、物联网技术研究和应用。自成立以来公司研发的“翌学”AI自动批阅系统、松果大数据分析系统、“e企学”在线学习平台，等产品在国内有着广泛的应用。作为一家创新型高新技术企业，公司研发技术人员占比超过70%，凭着多个领域的深入研究和积累，已累积申请发明专利20项，软件著作权28项。公司充分利用高校丰富的智力资源，和南京大学共建“研究生工作站”，和厦门集美大学、南京邮电大学等开展了深入的产学研合作。同时公司也是Prometric/VUE在国内的授权考试中心。

                红松，成就卓越自我！
              </div>
            </el-card>
          </el-col>
          <el-col :span="screenWidth<1000 ? 0 : 6" id="main-content-right">
            <el-card style="background-color: #e2e9f1;">
              <div style="font-size: 18px; font-weight: bold;">Similar Posts</div>
            </el-card>
            <el-card v-for="item in similarPosts" style="margin-top:10px; background-color: #e2e9f1"
                     class="similarPosts">
              <el-row>
                <div style="font-weight: bold; font-size: large;">Java开发工程师</div>
                <div style="font-size: 12px; margin-top: 10px;">This is a description of C++ 开发工程师.</div>
              </el-row>

              <el-row style="margin-top: 5px;">
                <el-tag style="margin-right: 5px;">12-14k</el-tag>
                <el-tag type="success" style="margin-right: 5px;">Bachelor</el-tag>
                <el-tag type="warning" style="margin-right: 5px;">C++</el-tag>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, toRefs} from 'vue'
import axios from "axios";
import router from "@/router";
import {OfficeBuilding, Back} from '@element-plus/icons-vue'
import EmployeeNav from "@/components/EmployeeNav.vue";

let screenWidth = ref(window.innerWidth);

let similarPosts = ref([1, 2, 3, 4, 5]);

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth;
});

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