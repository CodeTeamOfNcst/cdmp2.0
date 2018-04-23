<template>
  <section class="container">
    <!-- <div>
      <logo/>
      <h1 class="title">
        CDMP
      </h1>
      <h2 class="subtitle">
        云计算及试验设备管理系统 {{ Myname }}
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div> -->
   
  <el-row :gutter="20">
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">
        <el-carousel :interval="5000" arrow="hover" indicator-position="none">
          <el-carousel-item v-for="item in img" :key="item">
            <img :src="item.imgFilePath" alt="Nuxt.js Logo" class="Img" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <div class="middle"> 
    <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in img" :key="item">
          <img :src="item.imgFilePath" alt="Nuxt.js Logo" class="Img" />
        </el-carousel-item>
    </el-carousel>
  </div>
  <el-row class="content" :gutter="20">
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="10"><div class="grid-content bg-purple">
       
      </div>
    </el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <div class="device">
  </div>
  </section>
</template>


<style lang="less" scoped>
@border-radius:4px;
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
  .middle{
    height:300px;
    // background-color: #99a9bf;
    border-radius: @border-radius;
  }
  .device{
    height:200px;
    border-radius:@border-radius;
    background-color: burlywood;
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
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .Img{
    width: 100%;
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
