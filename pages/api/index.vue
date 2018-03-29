<template>
    <el-row :gutter="20" id="main">

      <el-col :span="8" id="left">
        <el-row clsss="url_input">
          <el-input placeholder="请输入内容" v-model="input3">
            <template slot="prepend">Http://</template>
          </el-input>
        </el-row>
        <el-row id="js_input">
          
        </el-row>
      </el-col>

      <el-col :span="8" id="center">
        <el-row id="center_button_list">

        </el-row>
        <el-row id="response_list">

        </el-row>
      </el-col>

      <el-col :span="8" id="right" >
        <el-row id="right_button_list">

        </el-row>
        <el-row id="exist_apis">
          
        </el-row>
      </el-col>

    </el-row>
</template>

<style lang='less' scoped>
  body{
    height: 100%;
    width: 100%;
    .area{

    }
    #main{
      #left {
        height: 100%;
        min-height: 700px;
        background-color: chartreuse;

        .url_input{
          height: auto;
          border-width: 10px;
        }
      }

      #center {
        height: 100%;
        min-height: 700px;
        background-color: darkgreen;
      }

      #right {
        height: 100%;
        min-height: 700px;
        background-color:darkcyan;
      }
    }
  }


</style>

<script>
  export default {

  }
</script>
