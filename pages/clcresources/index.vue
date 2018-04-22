<template>
    <div class="all">
      <el-tabs :tab-position="tabPosition" type = "card" style="height: 700px;">
        <el-tab-pane label="计算资源">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div class="leftSty"></div>
                  <span class="bullCont"><i class="el-icon-d-arrow-right"></i>计算资源</span>
                  <el-row class="headerline"></el-row>
               </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="node">
                    各机柜实时资源使用状况
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="node">
                    当月计算资源使用情况
                  </div>
                </div>
              </el-col>
            </el-row>
            <div style="margin-top: 20px; height: 200px;">
                    <el-collapse-transition>
                      <div v-show="show1">
                        <div class="transition-box">
                          <!-- el-collapse-transition -->
                        </div>
                      </div>
                    </el-collapse-transition>
            </div>
        </el-tab-pane>
        <el-tab-pane label="MQTT记录">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div class="leftSty"></div>
                  <span class="bullCont"><i class="el-icon-d-arrow-right"></i>MQTT记录</span>
                  <el-row class="headerline"></el-row>
                </div>
              </el-col>
              <el-col :span="16" :offset="8"><h1>物联网MQTT协议机群管理记录</h1></el-col>
              <el-col :span="16" :offset="4" class="mqtt">
                <div class="grid-content bg-purple-dark">
                  <el-table
                      :data="tableData"
                      border
                      >
                      <el-table-column
                        prop="date"
                        label="探测器域名"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="机房温度 "
                        width="410">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="时间戳">
                      </el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
           
        </el-tab-pane>
        <el-tab-pane label="资源预约">
          <el-row>
            <el-col>
              <div class="leftSty"></div>
              <span class="bullCont"><i class="el-icon-d-arrow-right"></i>资源预约</span>
              <el-row class="headerline"></el-row> 
            </el-col>
            <el-col>
              <div class="appointCont">
                
              <el-row>
                  <el-col :span="24">
                      <div class="grid-content bg-purple-dark instruName">
                          <p>预约人:</p>
                          <div class="fillOutName">
                              <el-input
                                      placeholder="登录后自动获取"
                                      v-model="user"
                                      :disabled="true">
                              </el-input>
                          </div>
                      </div>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                      <div class="grid-content bg-purple-dark instruName">
                          <p>申请额度:</p>
                          <div class="fillOutName">
                              <el-input v-model="timeLimt" placeholder="请输入内容" ></el-input>
                          </div>
                      </div>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                      <div class="grid-content bg-purple-dark instruName">
                          <p>预约理由:</p>
                          <div class="fillOutName">
                              <el-input v-model="vioReason" placeholder="请输入内容" type="textarea"></el-input>
                          </div>
                      </div>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                      <div class="grid-content bg-purple-dark instruName">
                          <p>预约时间:</p>
                          <div class="fillOutTime">
                              <el-date-picker
                                      v-model="date"
                                      type="daterange"
                                      align="right"
                                      unlink-panels
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      class="timePicker">
                              </el-date-picker>
                          </div>
                      </div>
                  </el-col>
              </el-row>
        </div>
        <el-row class="submit_appoint">
            <el-col :span="10" :offset="11">
                <div class="grid-content bg-purple-dark">
                    <el-button :plain="true" @click="handleSubmit" type="primary">提交</el-button>
                </div>
            </el-col>
        </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>

      </el-tabs>
    </div>
</template>
<style lang="less" scoped>

.all{
    height:auto;
    margin-top:20px;
}
.bullCont{
  height:70%;
  margin-bottom:10px;
  font-size:14px;
  margin-bottom:5px;
}
.node{
  background-color: paleturquoise;
  width:300px;
  height:200px;
  border-radius:8px;
  // margin-left:100px; 
}
.transition-box {
  margin-bottom: 10px;
  width: 100%;
  height: 200px;
  border-radius: 4px;
  background-color: #409EFF;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.mqtt{
  margin-top:50px;
}
.el-table-boder{
  color:aquamarine;
}
.appointCont{
        width: 100%;
        margin-top: 70px;
}
.instruName p{
    width: 35%;
    min-width: 73px;
    float: left;
    text-align: right;
    line-height:40px;
}
.fillOutName{
    width: 30%;
    min-width: 214px;
    padding: 3px;
    float: left;
}
.fillOutTime{
    width: 30%;
    min-width: 214px;
    padding: 3px;
    float: left;
}
.selectCollege{
    width: 100%;
}
.timePicker{
    width: 100%;
}
.submit_appoint{
    margin-top: 20px;
}

</style>
<script>
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import Vue from 'vue'

Vue.component(CollapseTransition.name, CollapseTransition)
  export default {
    data() {
      return {
        tabPosition: 'left',
        show1:false,
        boder:true,
        tableData: [{
          date: 'dawningA',
          name: '	13.82 0000001111100001010000001111111000000000',
          address: '2018-04-22 14:20:24'
        }, {
          date: 'dawningB',
          name: '17.73 0000001111100001010000001111111000000000',
          address: '2018-04-22 14:19:33'
        }, {
          date: 'dawningC',
          name: '	17.87 0000001111100001010000000111111000000000',
          address: '2018-04-22 14:19:53'
        },{
          date: 'inspur',
          name: '	18.57 0000001111100001010000001111111000000000',
          address: '2018-04-22 14:20:08'
        }],
        name: null,
        deviceType: null,
        content: null,
        date: [],
        vioReason: '',
        user: null,
        device: {
            name:''
        }
         
      };
    }
  };
</script>
