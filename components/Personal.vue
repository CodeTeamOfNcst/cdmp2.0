<template>
  <section class="container">
        <div v-if="res">
            <el-tabs :tab-position="tabPosition">
                <el-tab-pane label="仪器设备预约记录">
                    <div v-for="data in res" v-bind:key="data" v-if="data.account === form.account">
                        <div class="history">
                            <img :src="data.Img" >
                            <div class="hisCont">
                                <p>{{data.device}}</p>
                                <div class="startTime">开始时间:{{data.startDate}}</div>
                                <div class="startTime">结束时间:{{data.endDate}}</div>
                                <div class="startTime" v-if="data.createdAt !== data.updatedAt">是否批准使用:{{data.isAgree ? '是':'否'}}</div>
                                <div class="startTime">审核状态:{{data.createdAt === data.updatedAt ? '待审核' : '已审核'}}</div>
                                <div class="startTime" v-if="data.createdAt === data.updatedAt">
                                  <el-button @click="onCloceExamine(data)">取消审核</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                 <el-tab-pane label="个人信息">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-row>
                            <el-col :span="15">
                                <div class="grid-content bg-purple-dark format">
                                    <el-form-item label="账号">
                                        <el-input v-model="form.account" :disabled="true"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="15">
                                <div class="grid-content bg-purple-dark format">
                                    <el-form-item label="密码">
                            <el-input v-model="form.password"></el-input>
                        </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="15">
                                <div class="grid-content bg-purple-dark format">
                                    <el-form-item label="用户名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="15">
                                <div class="grid-content bg-purple-dark format">
                                    <el-form-item label="用户邮箱">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="15">
                                <div class="grid-content bg-purple-dark format">
                                    <el-form-item label="用户手机号">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                                </div>
                            </el-col>
                        </el-row> 
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                            <el-button @click="onSubmitCancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>        
            </el-tabs>
        </div>
        <div v-else>
            <h1>与服务器断开连接</h1>
        </div>
    </section>
</template>

<style lang="less" scoped>    
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
    .el-tabs__content{
            overflow: visible!important;
    }
    .format{
        margin-left:50%;
    }
    .history{
        width: 30%;
        height:161px;
        min-width: 287px;
        margin-bottom: 10px;
        margin-left: 2.5%;
        float: left;
        display: block;
    }
    img{
        width: 40%;
        height: 100%;
        float: left;
        background-size: 100% 100%;
    }
    .hisCont{
        width: 60%;

        float: right;
        height: 80%;
        margin-top: 8%;
    }
    .hisCont p{
        width: 100%;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .startTime{
        width: 100%;
        height: 20px;
        margin-top: 5px;
    }
</style>

<script>
    import axios from 'axios'
    
    export default {
        data() {
            return {     
                form: {
                    name: '',
                    account: '',
                    password: '',
                    email: '',
                    phone:'',
                    user_type:'',
                },
                dialogFormVisible: false,
                form2: {
                    password:'',
                    email:'',
                },                         
                formLabelWidth: '80px',
                tableData0: [
                    {
                        startDate:'2018-01-05',
                        endDate:'2018-03-31',
                        hours:'20000.00',
                        account:'16548',
                        password:'',
                        operation:''
                    }
                ],
                tableData1: [
                    {
                        startDate:'2017-12-02',
                        endDate:'2018-01-01',
                        hours:'20000.00',
                        isAgree:'成功',
                        operation1:''
                    },
                ],
                tabPosition: '',
                res: [],
                chance: false,
            }
        },  
        methods: {
            async onSubmit(){
                let getUser = await this.$axios.$post('/api/user/userGetUserData',{id:this.form.id})
                let resData = await this.$axios.$post('/api/user/modifyUserById', {
                    userId: this.form.id,
                    account: this.form.account,
                    name: this.form.name,
                    phone: this.form.phone,
                    email:this.form.email,
                    user_type:getUser.user.userType,
                    password: this.form.password,
                    isUse:getUser.user.isUse,
                })
                if(resData.status === 1){
                    this.$message({
                        type: 'success',
                        message: resData.message
                    })
                    window.location.reload()
                }else {
                    this.$message.error(resData.message);
                }
            },  
            async onSubmitCancel(){
                window.location.reload()
            },
            async onCloceExamine(data) {
              let resData = await this.$axios.$post('/api/deviceApply/deleteApplyById', {
                  id: data.id
              });
              if(resData.status === 1){
                  this.$message({
                      type: 'success',
                      message: resData.message
                  });
                  window.location.reload()
              }else {
                  this.$message.error(resData.message);
              }
            }
        },
        
        async mounted(){  
            if(!this.$auth.state.loggedIn) 
                window.location.href ='/login' 
            let Data = await this.$axios.$get('/api/user/userGetAllData')
            let userData = Data.usersDetail;
            for(let index in userData){
                if(userData[index].user.account === this.$auth.state.user.user){
                    this.form = userData[index].user
                }
            }      
            let getAllData = await this.$axios.$get('/api/deviceApply/getAllApplyData');
            let getDataById = await this.$axios.$post('/api/computeApply/getApplySearchFront',{account:this.$store.state.auth.user});
            this.tableData1 = getDataById.result;
            this.tableData0 = getDataById.result;
            let array = [];
            for (let i in getAllData.applys) {
              if (getAllData.applys[i].isUse) {
                array.push(getAllData.applys[i]);
              }
            }
            this.res = array;
        },
        head(){
            return {
                title: 'CDMP - 个人中心'
            }
        },
        async asyncData(context){
            return{
                
            }
            
        },
    }
</script>
