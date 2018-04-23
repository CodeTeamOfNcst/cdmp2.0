<template>
  <section class="container"> 
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="orderbefore"></div>
          <span class="order"><i class="el-icon-d-arrow-right"></i> 通知公告</span>
          <div class="indnotice">
              <div v-for="info in infoDetail" v-bind:key="info" >
                  <el-col :span="24">
                    <div class="infoContent">
                      <a :href='"/notice/" + info.id'>{{ info.title.substr(0,24) }} --{{ info.releaseDate }} </a>
                      <div class="classLine"></div>
                    </div>
                  </el-col>
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
         <el-col :span="24"> 
          <div class="orderbefore"></div>
          <span class="order"><i class="el-icon-d-arrow-right"></i> 快速通道</span>
         </el-col> 
        <!-- <el-col class="linkcol" :span="24"> <nuxt-link class="link" to="/usedirection">平台介绍 </nuxt-link></el-col>
        <el-col :span="24"> <nuxt-link class="link" to="/usedirection">仪器预约 </nuxt-link></el-col>
        <el-col :span="24"> <nuxt-link class="link" to="/usedirection">资源情况 </nuxt-link></el-col>
        <el-col :span="24"> <nuxt-link class="link" to="/usedirection">仪器列表 </nuxt-link></el-col> -->
        <el-col><nuxt-link to="/device"><el-button type="primary" class="link">仪器列表</el-button></nuxt-link></el-col>
        <el-col><nuxt-link to="/clcresources"><el-button type="primary" class="link">资源情况</el-button></nuxt-link></el-col>
        <el-col><nuxt-link to="/usedirection"><el-button type="primary" class="link">平台介绍</el-button></nuxt-link></el-col>
        <el-col><nuxt-link to="/personal"><el-button type="primary" class="link">个人中心</el-button></nuxt-link></el-col>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-col :span="24"> 
          <div class="orderbefore"></div>
          <span class="order"><i class="el-icon-d-arrow-right"></i> 平台介绍</span>
          </el-col> 
          <el-col :span="24"> 
          <div class="intro">
          </div>
          </el-col> 
        
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-col :span="24"> 
          <div class="orderbefore"></div>
          <span class="order"><i class="el-icon-d-arrow-right"></i> 计算中心简介</span>
          </el-col> 
          <el-col :span="24"> 
          <div class="intro">
            <p>曙光星云高性能计算机是由中科曙光制造并拥有完全自主知识产权的全球技术领先的高性能计算机系统,采用我国自主设计的HPP体系结构、
              曙 光最新的符合SSI标准的模块化刀片服务器TC3600计算节点和全线速QDR Infiniband互联网络曙光“星云”高性能计算平台每秒双精度浮点计算峰值达64万亿次(64TFlops)，
              Linpack实测值达每秒50.94万亿次(50.94TFlops)，其系统峰值和实测Linpack值双双位居当时中国高校投入运营计算机系统第一。 
              并且曙光星云是国产模块化刀片服务器的异构体系(x86处理器+GPU计算卡)。
              </p>
          </div>
          </el-col> 
          
        </div>
      </el-col>
    </el-row>
    <el-row class="last" :gutter="20">
      
      <el-col class="lastleft" :span="16">
        <div class="grid-content1 bg-purple">
        <el-col :span="24"> 
        <div class="orderbefore"></div>
        <span class="order"><i class="el-icon-d-arrow-right"></i> 友情链接</span>
        </el-col>
        <p><i class="el-icon-caret-right"></i><a href="http://nrii.org.cn/">重大科研基础设施和大型科研仪器国家网络管理平台</a></p>
        <p><i class="el-icon-caret-right"></i><a href="http://www.most.gov.cn/">中华人民共和国科学技术部</a></p>
        </div>
      </el-col>
     

      <el-col class="lastleft" :span="8">
        <div class="grid-content1 bg-purple">
          <el-col :span="24"> 
            <div class="orderbefore"></div>
            <span class="order"><i class="el-icon-d-arrow-right"></i> 联系我们</span>
          </el-col>
          <el-col :span="10" :offset="2">
            <p>tel:88888888</p>
            <p>E-mail:</p>
            <p>地址：</p>
          </el-col>
          </div>
        </el-col>
    </el-row>
   
  </section>
</template>


<style lang="less" scoped>
a{
  color:#fff;
}

@border-radius:4px;
.link{
  margin-top:15px;
  width:90%;
}
.intro{
  width:80%;
  height:250px;
  // background-color: #475669;
  margin:auto;
}
.deviceimg{
  width:80%;
  margin:auto;
}
.di{
  width:100%;
  height:50px;
}
.indnotice{
      width:100%;
      height:300px;
      .infoContent{
        float: left;
        font-size: 1.1em;
      }
      .infoContent a{
        color: black;
      }
      .infoContent a:hover{
        color:blue;
      }
      .classLine{
        width: 100%;
        height:5px;
        background: burlywood;
      }
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
    margin:12px 0 0 10px;
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
.grid-content1 {
  border-radius: @border-radius;
  min-height: 36px;
  height:140px;
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
    height:150px;
    border-radius: @border-radius;
    // background: #d3dce6;
    p{
      text-align: left;
      a{
        color:#2e2f30;
      }
    }
    .lastleft{
      height:140px;
    }
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
    infoDetail: null,
    }    
  },
  async mounted(){   
    let getAllData = await this.$axios.$get('/api/device/getAllDeviceData');
    this.img = getAllData.Devices;
    let getAllInfoData = await this.$axios.$get('/api/info/getAllInfoData');
    this.infoDetail = getAllInfoData.infoDetail 
  },
  async asyncData({ app }){
    let resData = await app.$axios.$get('/api/test/')
    return {
      title: resData
    }
  }
}
</script>
