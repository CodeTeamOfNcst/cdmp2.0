<template>
    <div class="all">
        <div class="AnotherLogin">
            <el-row :gutter="20">
                <el-col :span="16" :offset="4"><div class="grid-content bg-purple">
                     <el-form>
                         <el-form-item>
                             <el-alert
                                title="注册"
                                type="error"
                                show-icon>
                            </el-alert>
                         </el-form-item>
                     </el-form>
                </div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <div class="grid-content bg-purple">
                        <el-form class="loginform">
                            <el-form-item>
                                <el-input class="input1" v-model="user_account" placeholder="账号" type="text"/>
                            </el-form-item>
                            <!-- <el-form-item> -->
                                <!-- <el-input class="input1" v-model="user_password" placeholder="密码" type="password"/> -->
                                <!-- <input type="password" class="input2"  v-model="user_password" placeholder="密码" /> -->
                            <!-- </el-form-item>
                            <el-form-item> -->
                                <!-- <el-input class="input1" v-model="repeat_password" placeholder="确认密码" type="password"/> -->
                                <!-- <input type="password" class="input2"  v-model="repeat_password" placeholder="确认密码" /> -->
                            <!-- </el-form-item> -->
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <div class="grid-content bg-purple">
                        <input type="password" class="input2"  v-model="user_password" placeholder="密码" />
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <div class="grid-content bg-purple repeatPass">
                        <input type="password" class="input2"  v-model="repeat_password" placeholder="确认密码" @keyup.enter="handleUserRegist" />
                    </div>
                </el-col>
            </el-row>
            <el-button class="loginbutton" type="primary" @click="handleUserRegist" plain>注册</el-button>
        </div>
    </div>
</template>



<style scoped>
.loginbutton{
    margin-left:130px;
}
.input1{
    width: 320px;
}
.all{
    width:700px;
    height:500px;
    margin:auto auto;
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
.AnotherLogin{
    display: inline-block;
    width:70%;
    height:70%;
    margin:10% 15%;
    background-color: #fff;
 }
.repeatPass{
    margin-top: 5px;
}
.loginbutton{
    margin-left: 200px;
}
h2{
    display: block;
    margin-left:170px;
}
</style>

<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                user_account: '',
                user_password: '',
                repeat_password:'',
            }
        },
        async asycnData(context){
            return {
            }
        },
        methods:{
            async handleUserRegist(){
                if(!this.user_account || !this.user_password || !this.repeat_password){
                    this.$message.error("请输入用户名和密码");
                }
                if(this.user_password !== this.repeat_password){
                    this.$message.error("密码不一致");
                }
                try{
                    let resData = await this.$axios.$post('/api/user/userAddUser', {
                        account: this.user_account,
                        password: this.user_password,
                        //前台注册暂时默认用户类型为普通用户
                        user_type:'2',
                    })
                    if(resData.status === 1){
                        this.$message({
                            type: 'success',
                            message: resData.message
                        });
                        window.location.href = '/login'
                    }else {
                        this.$message.error(resData.message);
                    }
                }catch(err){
                    console.log(err)
                    this.$message.error(`服务器异常，由于 ${err}`);
                }
            }
        }
    }
</script>