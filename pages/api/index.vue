<template>
    <el-row :gutter="0" id="main">

      <el-col :span="8" id="left">

        <el-row>
          <el-col class="input_col">
            <el-input placeholder="请输入内容" v-model="query_url">
              <template slot="prepend">Http://</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row id="js_input">
          <el-col class="input_col">
            <el-input
              type="textarea"
              :autosize="{ minRows: 30, maxRows: 35}"
              placeholder="请输入查询的 api json"
              v-model="input_json">
            </el-input>
          </el-col>
        </el-row>

      </el-col>

      <el-col :span="8" id="center">
        <el-row id="center_button_list">
          <el-col>
            <el-select v-model="response_data_option" placeholder="数据选项">
              <el-option
                v-for="item in data_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
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
          border-width: 100px;
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
    data(){
      return{
        query_url: '', // 查询的 url 地址
        input_json: '', // 查询的 json 数据
        response_data_option: '', //返回数据的选项
        data_options: [
          {
            value: 0,
            label: '闭合'
          },
          {
            value: 1,
            label: '展开'
          }
        ]
      }
    }
  }
</script>
