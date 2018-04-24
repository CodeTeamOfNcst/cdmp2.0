<template>
<div class="all">
  <el-tabs :tab-position="tabPosition" type = "card" style="height: 700px;">
     
    <el-tab-pane label="平台概况介绍">
        <div class="leftSty"></div>
        <span class="bullCont"><i class="el-icon-d-arrow-right"></i>平台概况介绍</span>
        <el-row class="headerline"></el-row> 
        <el-row class="video">
            <el-col :span="16">
                <div class="usvideo">
                    <el-col :span="20" :offset="4">
                        <div class="video grid-content bg-purple">
                            <video id="my_video_1" class="video-js vjs-default-skin" width="800px" height="500px" controls
                                    data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'>
                                <source src="/api/video/getStream" type='video/mp4' />
                            </video>
                        </div>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="平台使用规范">   
        <div class="leftSty"></div>
        <span class="bullCont"><i class="el-icon-d-arrow-right"></i>平台使用规范</span>   
        <el-row class="headerline"></el-row>  
         <div class="contentList">
            <el-row class="strip">
                <el-col :span="24"><div class="grid-content bg-purple-dark"> <a href="/usedirection/userules/one">实验室仪器使用守则  </a></div></el-col>
                <el-col :span="24"><div class="grid-content bg-purple-dark"> <a href="/usedirection/userules/two">平台仪器预约流程规则  </a></div></el-col>
                <el-col :span="24"><div class="grid-content bg-purple-dark"> <a href="/usedirection/userules/three">云计算资源及仪器预约平台使用守则 </a></div></el-col>
            </el-row>
        </div>
    </el-tab-pane>
  </el-tabs>
</div>
    
  
</template>
<style lang="less" scoped>
a{
text-decoration: none;
color:black;
}
.all{
    margin-top:20px;
}
.el-tabs {
    border: 0;
}
.usvideo{
     margin-top:70px;
 }
.bullCont{
    font-size:14px;
 }
 
.contentList{
    width: 100%;
    height:650px;
}
.paging{
    width: 40%;
    margin-left: 30%;
}
.strip{
    margin-left:30px;
    width: 80%;
    height: 35px;
    /*border: 1px solid #2e2f30;*/
}
.grid-content{
    float:left;
    line-height: 35px;
    .grid-content>a{
    color:#3675a8;
    }
    .grid-content>a:hover{
        color:black;
    }
}

</style>
<script>
  export default {
    data() {
      return {
        tabPosition: 'left'
      };
    }
  };
</script>