<template>
    <div class="container">
        <div class="headerName">
            <!-- <div class="leftSty"></div> -->
            <span class="bullCont">仪器预约</span>
        </div>
        <el-row class="headerline"></el-row>
        <div style="color: red;">为防止预约时间冲突，管理员有权修改您的申请时间范围</div>
        <div style="color: red;">为防止预约失败，预约申请时间范围请尽量不超过两天，可分多次申请</div>
        <div style="color: red;">若超过预约申请开始时间还未审核通过，可发起重新申请</div>
        <div class="appointCont">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark instruName">
                        <p>仪器名称:</p>
                        <div class="fillOutName">
                            <el-input
                                    placeholder="跳转后自动获得"
                                    v-model="device.name"
                                    :disabled="true">
                            </el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark instruName">
                        <p>仪器分类:</p>
                        <div class="fillOutName">
                            <el-input
                                    placeholder="xxxxxxxxxxxx"
                                    v-model="device.device_type_name"
                                    :disabled="true">
                            </el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark instruName">
                        <p>预约人:</p>
                        <div class="fillOutName">
                            <el-input
                                    placeholder="登录后自动获取"
                                    v-model="user"
                                    :disabled="true">
                            </el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark instruName">
                        <p>预约理由:</p>
                        <div class="fillOutName">
                            <el-input v-model="vioReason" placeholder="请输入内容" type="textarea"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark instruName">
                        <p>预约时间:</p>
                        <div class="fillOutTime">
                            <el-date-picker
                                    v-model="date"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    class="timePicker">
                            </el-date-picker>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-row class="submit_appoint">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark submit">
                    <el-button :plain="true" @click="handleSubmit" type="primary">提交</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style lang='less' scoped>
    .appointCont{
        width: 100%;
        margin-top: 70px;
    }
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
    .fillOutTime{
        width: 30%;
        min-width: 214px;
        padding: 3px;
        float: left;
    }
    .selectCollege{
        width: 100%;
    }
    .timePicker{
        width: 100%;
    }
    .submit_appoint{
        margin-top: 20px;
        text-align: center;
    }
</style>

<script>
    import axios from 'axios'
    export default {
        methods:{
            async handleSubmit(){
                if(!(this.vioReason) || !(this.date)){
                    this.$message.error("请填写所有信息")
                    return
                }
                let resData = await this.$axios.$post('/api/deviceApply/addApplyFront', {
                    userAccount: parseInt(this.$auth.state.user.user),
                    deviceId: this.device.id,
                    vioReason: this.vioReason,
                    startDate: this.date[0],
                    endDate: this.date[1]
                })
                if(resData.status === 1){
                    this.$message({
                        type: 'success',
                        message: resData.message,
                    });
                    // window.location.href = '/device'
                }else{
                    this.$message.error(resData.message)
                }
            } , 
        },
        data(){
            return{
                name: null,
                deviceType: null,
                content: null,
                date: [],
                vioReason: '',
                user: null,
                device: {
                    name:''
                },
            }
        },
        async asyncData({params}){
            let resData = await axios.post('/api/device/getDeviceDataById', { id: params.id})
            if(resData.data.status === 1){
                return {
                    device: resData.data.device
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
                    this.user = userData[index].user.name
                }
            }     
        },
    }
</script>