<template>
<section class="container">
<div class="main-box">
    <div class="headerName">
        <!-- <div class="leftSty"></div> -->
        <span class="bullCont">
            <p>仪器列表--</p>
            <p class="bulletinName">{{device.name}}</p>
        </span>
    </div>
    <el-row class="headerline"></el-row>
    <img :src="device.imgFilePath" class="equipment">
    <div class="equi-info">
        <div class="equi-name">
            <!-- <h2>{{device.name}}</h2> -->
        </div>
        <div class="equi-describe">
            <el-row :gutter="20" class="row">
                <el-col :span="4" class="col"><div class="grid-content bg-purpler text" style="margin-left:20px"><p>仪器名称</p></div></el-col>
                <el-col :span="8" class="col"><div class="grid-content bg-purple text"><p>{{device.name}}</p></div></el-col>
                <el-col :span="4" class="col"><div class="grid-content bg-purpler text" style="margin-left:20px"><p>联系人</p></div></el-col>
                <el-col :span="8" class="col"><div class="grid-content bg-purple text"><p>{{device.deviceUser.name}}</p></div></el-col>
            </el-row>
             <el-row :gutter="20" class="row">
                <el-col :span="4" class="col"><div class="grid-content bg-purpler text" style="margin-left:20px"><p>仪器地址</p></div></el-col>
                <el-col :span="8" class="col"><div class="grid-content bg-purple text"><p>{{device.location}}</p></div></el-col>
                <el-col :span="4" class="col"><div class="grid-content bg-purpler text" style="margin-left:20px"><p>邮箱</p></div></el-col>
                <el-col :span="8" class="col"><div class="grid-content bg-purple text"><p>cszx@ncst.edu.cn</p></div></el-col>
            </el-row>
             <el-row :gutter="20" class="row">
                <el-col :span="4" class="col"><div class="grid-content bg-purpler text" style="margin-left:20px"><p>购买日期</p></div></el-col>
                <el-col :span="8" class="col"><div class="grid-content bg-purple text"><p>{{device.purchaseDate}}</p></div></el-col>
                <el-col :span="4" class="col"><div class="grid-content bg-purpler text" style="margin-left:20px"><p>电话</p></div></el-col>
                <el-col :span="8" class="col"><div class="grid-content bg-purple text"><p>{{device.deviceUser.phone}}</p></div></el-col>
            </el-row>
            
        </div>
    </div>
    <div class="equi-others">
        <div class="equi-main">
            <h4>仪器描述</h4>
            <p>{{device.description}}</p>
        </div>
    </div>
</div>
</section>
</template>

<style scoped>

.main-box{
    /*margin-left:10%;*/
    width:100%;
    height:auto;
    text-align: center;
}
.bullCont p{
    width: auto;
    float: left;
}
.detailsCont{
    width: 100%;
    margin-top: 20px;
    min-height: 700px;
    height:auto;
}
.bulletinName{
    color:#7f828b;
    overflow: hidden;
}
.equipment{
    float: left;
    margin:30px 0 0 20px;
    width:170px;
    height:170px;
}
.equi-info{
    width:80%;
    float: left;
    margin:30px 0 0 40px;
}
.equi-name{
    float:left;
    width:50%;
}
.btn-success{
    width: 50px;
    height: 25px;
    float: left;
    margin:25px 0 0 5px;
    font-size:16px;
    padding:0;
}
.btn-warning{
    width: 50px;
    height: 25px;
    float: left;
    margin:25px 0 0 5px;
    font-size:16px;
    padding:0;
}
.equi-describe{
    width:100%;
    float:left;
    margin-left:10px;
}
.row {

    text-align: left;
    line-height:2
  }
.row p{
    margin-left:10px;
    margin-top:15px;
    text-align: center;
    line-height: 36px;
}
  .col {
    border-radius: 4px;
  }

  .text {
    background: #6b8db4;
  }
   .bg-purpler {
    background: #d7e1ec;
  }

  .text {
    border-radius: 4px;
    min-height: 36px;
  }

.equi-main{
    float: left;
    width:100%;
    height:auto;
    margin:30px 0 0 20px;
    text-align:left;
}
</style>


<script>
import axios from 'axios'
export default {
    data() {
        return {
        activeIndex: '1',
        activeIndex2: '1'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    async asyncData({params}){
        let resData = await axios.post('/api/device/getDeviceDataById', { id: params.id})
        if(resData.data.status === 1){
            console.log(resData.data.device)
            return {
                device: resData.data.device
            }
        }
    },
}
</script>
