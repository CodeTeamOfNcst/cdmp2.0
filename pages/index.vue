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
  <div class="navbar">

  </div>
  <el-row :gutter="20">
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
     
  </el-row>
  <div class="middle">
  </div>
  </section>
</template>


<style lang="less" scoped>
  @border-radius:4px;
  .navbar{
   height: 100px;
   background-color: aquamarine
  }
  .middle{
    height:300px;
    background-color: aquamarine;
    border-radius: @border-radius;
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
   width:96%;
   margin:auto;
}
// .title
// {
//   font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
//   display: block;
//   font-weight: 300;
//   font-size: 100px;
//   color: #35495e;
//   letter-spacing: 1px;
// }
// .subtitle
// {
//   font-weight: 300;
//   font-size: 42px;
//   color: #526488;
//   word-spacing: 5px;
//   padding-bottom: 15px;
// }
// .links
// {
//   padding-top: 15px;
// } 
</style>


<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data(){
    title: ''
    Myname: ''
  },
  async mounted(){
    let resData = await this.$axios.$get('/api/test')
    console.log(resData)
    this.Myname = resData
  },

  async asyncData({ app }){
    let resData = await app.$axios.$get('/api/test/')
    return {
      title: resData
    }
  }
}
</script>
