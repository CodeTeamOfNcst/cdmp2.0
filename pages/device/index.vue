<template>
    <div>
        <section class="container">
            <div class="headerName">
                <el-row :gutter="20">
                    <el-col :span="15" class="padding">
                        <div class="grid-content bg-purple">
                            <span class="bullCont">仪器列表</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple inputCont">
                            <div>
                                <el-input placeholder="请输入内容" v-model="search_input" class="input-with-select">
                                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                                        <el-option label="设备名称" value="1"></el-option>
                                    </el-select>
                                    <el-button slot="append" icon="el-icon-search" @click="search_click"></el-button>
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-row class="headerline"></el-row>
            <div class="grid-content bg-purple keyword">
                <div class="chanceKey">
                    <el-menu @select="typeSelect">
                        <el-menu-item index="-1" >
                                <span slot="">全部</span>
                        </el-menu-item>
                        <div v-for="deviceType in deviceTypes" v-bind:key="deviceType">
                            <el-menu-item :index="deviceType.id" >
                                <span slot="">{{deviceType.name}}</span>
                            </el-menu-item>
                        </div>
                    </el-menu>
                </div>
            </div>
            <div class="grid-content bg-purple key-content">
                <div v-for="device in devices" v-bind:key="device" v-if="device.canReserve">          
                    <div class="oneDevice">
                        <el-row :gutter="20" class="leftImg">
                            <el-col :span="8">
                                <div class="grid-content bg-purple bullImg">
                                    <nuxt-link :to="'device/details/' + device.id">
                                        <img :src="device.imgFilePath" alt="Nuxt.js Logo"  />
                                    </nuxt-link>
                                </div>
                            </el-col>
                            <el-col :span="16">
                                <div class="grid-content bg-purple">
                                    <el-row class="topOneCol">
                                        <el-col :span="24">
                                            <div class="grid-content bg-purple-dark">
                                                <el-row>
                                                    <el-col :span="17">
                                                        <div class="grid-content bg-purple nameFrame">
                                                            <nuxt-link :to="'device/details/' + device.id">
                                                                <p class="bullName">{{device.name}}</p>
                                                            </nuxt-link>
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="3">
                                                        <div class="grid-content bg-purple-light button_center" >
                                                            <nuxt-link :to="'device/appoint/' + device.id">
                                                                <el-button type="primary" class="appoint">预约</el-button>
                                                            </nuxt-link>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="maketop">
                                        <el-row :gutter="20" class="contactUser mainInfor">
                                            <el-col :span="8"><div class="grid-content bg-purple">负责人</div></el-col>
                                            <el-col :span="16"><div class="grid-content bg-purple">{{device.device_manager}}</div></el-col>
                                        </el-row>
                                        <el-row :gutter="20" class="contactUser">
                                            <el-col :span="8"><div class="grid-content bg-purple">设备分类</div></el-col>
                                            <el-col :span="16"><div class="grid-content bg-purple">{{device.type}}</div></el-col>
                                        </el-row>
                                        <el-row :gutter="20" class="contactUser mainInfor">
                                            <el-col :span="8"><div class="grid-content bg-purple">设备地址</div></el-col>
                                            <el-col :span="16"><div class="grid-content bg-purple">{{device.location }}</div></el-col>
                                        </el-row>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </section>
        <section class="el-dialog--center">
            <div class="grid-content pagination" style="z-index: 999999;">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark paging" >
                            <el-pagination
                                    :page-size="10"
                                    background
                                    @current-change="handlePageChange"
                                    layout="prev, pager, next"
                                    :total="deviceCounts" class="lalala">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </section>
    </div>
</template>

<style lang='less' scoped>
    a{
        text-decoration:none;
        color: black;
    }
    .pagination{
        padding: 20px;
        
    }
    .el-select{
        width: 130px;
    }
    .input-with-select {
        background-color: #fff;
    }
    .keyword{
        width: 240px;
        float: left;
        .chanceKey{
            width: 80%;
            margin-left: 10%;
            height: auto;
            margin-top: 25px;
            background: #ECECEC;
        }
    }
    .key-content{
        width: 80%;
        float: right;
        height: auto;
    }
    .padding{
        padding: 0px !important;
    }
    .inputCont{
        line-height: 50px;
        width: 85%;
        float: right;
        margin-right: 10px;
    }    
    .keyContent{
        width: 80%;
        height: 28%;
        background: #ffffff;
        float: left;
        margin-left: 10%;
        line-height: 56px;
        margin-top: 2.5%;
        cursor: pointer;
    }
    .oneDevice{
        width: 48%;
        min-width:250px;
        float: left;
        margin-left: 1%;
        margin-top: 25px;
        height: 185px;
    }
    .leftImg{
        width: 100%;
        height: 100%;
        .bullImg{
            width: 110px;
            height: 110px;
            float: right;
            margin-top: 22px;
            .bullImg img{
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
            }
        }
        .topOneCol{
            margin-top: 12px;
            .nameFrame{
                height: 25px;
                .bullName{
                    width: 100%;
                    height: 100%;
                    text-align: left;
                    line-height: 25px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
            }
            .button_center{
                text-align: center;
                .appoint{
                    width: 100%;
                    padding: 0;
                    height: 25px;
                }
            }
        }
        .maketop{
            margin-top: 20px;
            .contactUser{
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: left;
            }
            .mainInfor{
                background: #eef2f5;;
            }
        }
    }  
    .grid-content{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
</style>

<script>
    import { Button } from 'element-ui'
    import axios from 'axios'
    export default {
        components: {
            Button
        },
        data() {
            return {
                deviceCounts: null,
                devices:[
                    {
                        id: 'id',
                        date: 'purchaseDate',
                        name: 'name',
                        location: '',
                        type: 'name',
                        imgFilePath: 'imgFilePath',
                        canReserve:'canReserve',
                    }
                ],
                deviceTypes:[
                    {
                        value: '1',
                        label: '计算机系'
                    }
                ],
                search_input: '',
                select: '',
                deviceName:'全自动智能倒置显微镜及金相分析系统',
                userName:'李云龙',
                address:'核心区教学楼E座304',
                phone:'1234567891',
            }
        },
        methods: {     
            async typeSelect(index){
                if(index == -1){
                    let resData  = await this.$axios.$get(`/api/device/getAllDeviceData`);
                    this.devices =  resData.Devices
                }else{
                    let resData = await this.$axios.$post('/api/device/getDeviceDataById',{
                        id: index
                    })
                    this.devices =  resData.TypesDevice
                }
            },
            async handlePageChange(page){
                let resData = await this.$axios.$get(`/api/device/getAllDeviceData/${page}`);
                if(resData.status === 1){
                    this.devices = resData.Devices;
                }else {
                    this.$message.error(resData.message)
                }
            },
            async search_click(){
                if(!this.search_input){
                    this.$message.error("请输入搜索内容")
                }else{
                    let resData = await this.$axios.$post('/api/device/getDeviceSearch',{
                        name: this.search_input
                    })
                    if(resData.status === 1){
                        this.devices = resData.result
                    }else{
                        this.$message.error(resData.message)
                    }
                } 
            } 
        },
        async mounted(){  
            let getAllData = await this.$axios.$get('/api/device/getAllDeviceData');
            this.devices = getAllData.Devices,
            this.deviceTypes = getAllData.DeviceTypes,
            this.deviceCounts = getAllData.counts;
        },
    }
</script>