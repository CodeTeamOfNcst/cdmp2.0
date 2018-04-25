<template>
    <div class="all">
        <b-alert v-if="error" show variant="danger">{{ error + '' }}</b-alert>
        <div class="AnotherLogin">
            <el-row :gutter="20">
                <el-col :span="16" :offset="4"><div class="grid-content bg-purple">
                     <el-form>
                         <el-form-item>
                             <el-alert
                                title="请先登陆"
                                type="error"
                                show-icon>
                            </el-alert>
                         </el-form-item>
                     </el-form>
                </div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="16" :offset="4"><div class="grid-content bg-purple">
                     <el-form>
                         <el-form-item>
                             <el-input type="text" class="input1" v-model="account" placeholder="账号"/>
                         </el-form-item>
                     </el-form>
                </div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="16" :offset="4"><div class="grid-content bg-purple">
                    <el-form>
                        <el-form-item>
                            <!-- <el-input class="input1" v-model="password" placeholder="密码" type="password"/> -->
                            <input type="password" class="input2"  v-model="password" placeholder="密码" />
                        </el-form-item>
                    </el-form>
                </div></el-col>
            </el-row>
            <el-button class="loginbutton" type="primary" @click="handleLogIn">登录</el-button>
        </div>
    </div>
</template>

<style scoped>
 .all{
    width:700px;
    height:500px;
    margin:auto auto;
    /*background-color: #3498DB;*/
}
.AnotherLogin{
    display: inline-block;
    width:70%;
    height:70%;
    margin:10% 15%;
    background-color: #fff;
 }
 
.loginbutton{
    margin-left: 200px;
}
h2{
    display: block;
    margin-left:170px;
}
.input2{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
input::-webkit-input-placeholder{
            color:#BBBBBB;
        }
        input::-moz-placeholder{   
            color:#BBBBBB;
        }
        input:-moz-placeholder{    
            color:#BBBBBB;
        }
        input:-ms-input-placeholder{  
            color:#BBBBBB;
        }
</style>

<script>
    import axios from 'axios'
    import { Input } from 'element-ui'
    export default {
        middleware: 'auth',
        data(){
            return {
                account: '',
                password: ''
            }
        },
        async asycnData(context){
            return {
            }
        },
        methods:{
            async handleLogIn(){
                if(!this.account || !this.password){
                    this.$message.error("请输入用户名和密码");
                }else{
                    let res = await this.$auth.loginWith('local',{
                        data:{
                            account: this.account,
                            password: this.password
                        }
                    })
                    if(this.$auth.$state.user){
                        if(this.$auth.hasScope('admin')){   
                            window.location.href ='/admin'
                        }
                        else{
                            window.location.href ='/'
                        }              
                    }else{
                        this.$message.error("用户名或密码错误")
                    }     
                }   
            },
        }
    }
</script>