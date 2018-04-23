<template>
  <section class="container"> 
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="orderbefore"></div>
          <span class="order"><i class="el-icon-d-arrow-right"></i> 通知公告</span>
          <div class="indnotice">
              <div v-for="info in infoDetail" v-bind:key="info">
                  <el-col :span="24"><div class="grid-content bg-purple-dark"><a :href='"/notice/" + rule.id'>{{ info.title }} 发布时间：{{ info.releaseDate }} </a></div></el-col>
              </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple ">
          <div class="di"><div class="orderbefore"></div>
                <span class="order"> 
                  <i class="el-icon-d-arrow-right"></i> 仪器展示</span>
          </div>
          <el-carousel class="deviceimg" :interval="5000" type="card" height="200px">
            <el-carousel-item v-for="item in img" :key="item">
              <img :src="item.imgFilePath" alt="Nuxt.js Logo" class="Img" />
            </el-carousel-item>
          </el-carousel>
        </div>     
      </el-col>
      
    </el-row>
    <el-row class="content" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="orderbefore"></div>
          <span class="order"><i class="el-icon-d-arrow-right"></i> 快速通道</span>
          
        </div>
      </el-col>
      <el-col :span="10"><div class="grid-content bg-purple">
        
        </div>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row class="last">

    </el-row>
   
  </section>
</template>


<style lang="less" scoped>
@border-radius:4px;
.deviceimg{
  width:80%;
  margin:auto;
}
.di{
  width:100%;
  height:50px;
}
.indnotice{
      width:400px;
      height:300px;
  }
.orderbefore{
    width: 5px;
    height:30px;
    float: left;
    margin-top:10px;
    background: #2e2f30;
}
.order{
    display:block;
    float:left;
    margin:12px 0 0 20px;
}
.el-row {
    margin-top: 20px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.el-col {
  border-radius: @border-radius;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: @border-radius;
  min-height: 36px;
  height:300px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.container
{
   width:100%;
   margin:auto;
   .last{
    height:200px;
    border-radius: @border-radius;
    background: #d3dce6;
  }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #fff;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color:  #fff;
  }
  .Img{
    width: 50%;
    height: 100%;
    background-size:100% 100%; 
  }
  
 
</style>


<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data(){
    return{
    title: '',
    Myname: '',
    img:'',
    }
    
  },
  async mounted(){
    
    let getAllData = await this.$axios.$get('/api/device/getAllDeviceData');
    this.img = getAllData.Devices;
    // this.getDataById = await this.$axios.$get('/api/auth/getUser');
    // this.getDataById = await this.$axios.$get('/api/auth/checkLogIn');
    // this.putData = await this.$axios.$get('/api/auth/logOut');
    // this.resData = await this.$axios.$post('/api/auth/regist', {post: 'post'});
    // this.putData = await this.$axios.$post('/api/auth/logIn', {post: 'post'});
    
    
  },

  async asyncData({ app }){
    let resData = await app.$axios.$get('/api/test/')
    return {
      title: resData
    }
  }
}
</script>
