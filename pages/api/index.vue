<template>
    <el-row :gutter="0" id="main">

      <el-col :span="8" id="left">

        <el-row>
          <el-col class="input_col">
            <el-input placeholder="请输入内容" v-model="query_url">
              <template slot="prepend">{{url_prefix}}</template>
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
                    <el-col class="response_data_col">
            <el-input
              type="textarea"
              :autosize="{ minRows: 30, maxRows: 35}"
              placeholder="这里会显示返回的数据"
              :disabled="true"
              v-model="input_json">
            </el-input>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="8" id="right" >
        <el-row id="right_button_list">
            <el-input placeholder="请输入搜索内容" v-model="input5" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择查询方式">
                <el-option
                v-for="item in search_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-row>

        <el-row id="exist_apis">
            <el-table
              :data="exist_api_tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="api_url"
                label="api接口">
              </el-table-column>
               <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleCopy(scope.$index, scope.row)">复制</el-button>
                    <el-button
                    size="mini"
                    @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                </template>
              </el-table-column>
          </el-table>
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
        url_prefix: 'http://localhost:3000/', //url前缀
        data_options: [
          {
            value: 0,
            label: '闭合'
          },
          {
            value: 1,
            label: '展开'
          }
        ], // 返回数据的操作选项
        search_options: [
          {
            value: 0,
            label: '数据模型'
          },
          {
            value: 1,
            label: '特殊接口'
          }
        ], //查询数据的操作选项
        exist_api_tableData: [
          {
            id: 1,
            api_url: 'api/user/get'
          },
          {
            id: 2,
            api_url: 'api/user/post'
          },
          {
            id: 3,
            api_url: 'api/user/put'
          },
          {
            id: 4,
            api_url: 'api/user/delete'
          },
          {
            id: 5,
            api_url: 'api/device/get'
          },
        ]
      } 
    },
    methods:{

        async handleCopy (index, row) {
          this.$message.error('click me !!')
          this.$message.error('click for Copy' + index + row )
      }
    }
  }
</script>
