<template>
    <div class="mianContent">
        <div class="popover-el">
            <el-popover
                ref="popover4"
                placement="right"
                width="600"
                offset="300"
                trigger="click"
                v-model="addFormVisible">
            <el-form ref="addForm" :model="addForm" label-width="100px">
                <el-form-item label="设备名称">
                    <div class="inputName">
                        <el-input v-model="addForm.name" clearable />
                    </div>
                </el-form-item>
                <el-form-item label="设备类型">
                    <div class="deviceSelect">
                        <el-select v-model="addForm.deviceType" placeholder="请选择">
                            <el-option
                                    v-for="item in deviceTypes"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="设备负责人">
                    <div class="deviceSelect">
                        <el-select v-model="addForm.deviceManager" placeholder="请选择">
                            <el-option
                                    v-for="item in deviceManagers"
                                    :key="item.key"
                                    :label="item.label"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="设备地址">
                    <div class="inputName">
                        <el-input v-model="addForm.location" clearable />
                    </div>
                </el-form-item>
                <el-form-item label="设备购买日期">
                    <div class="timeDevice" style="width: 100%;">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.addDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </div>
                </el-form-item>
                <el-form-item label="设备描述">
                    <el-input :rows="3" type="textarea" v-model="addForm.describe" class="textarea"  />
                </el-form-item>
                <el-form-item label="是否需要维护">
                    <el-switch v-model="addForm.needRepair"
                               active-text="维护中"
                               inactive-text="可预约"
                    />
                </el-form-item>
                <el-form-item label="是否能被预约">
                    <el-switch v-model="addForm.canApply"
                               active-text="可预约"
                               inactive-text="不可预约"
                    />
                </el-form-item>
                <el-form-item label="禁用标识">
                    <el-switch v-model="addForm.isUse"
                               active-text="可用"
                               inactive-text="禁用"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="handleAdd">添加</el-button>
                    <el-button  @click="addFormVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-popover>
        </div>
        <div class="headerName">
            <div class="leftSty"></div>
            <span class="bullCont">设备管理</span>
        </div>
        <el-row class="headerline"/>
        <div class="announceCont">
            <div class="oneline">
                <div class="demo-input-suffix search">
                    <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            v-model="searchInput">
                            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </div>
                <div class="select">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="add">
                    <el-button v-popover:popover4 class="addContent">新增</el-button>
                </div>
            </div>

            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 70%;">
                    <el-table-column
                            prop="id"
                            label="设备id"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="设备购买日期"
                            width="130">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="设备名称">
                    </el-table-column>                    
                    <el-table-column
                            prop="type"
                            label="设备类型"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="needRepair"
                            label="是否需要维修"
                            width="130">
                    </el-table-column>
                    <el-table-column
                            prop="canReserve"
                            label="是否可预约"
                            width="130">
                    </el-table-column>
                    <el-table-column
                            prop="isUse"
                            label="是否禁用"
                            width="110">
                    </el-table-column>
                    <el-table-column
                            prop="operation"
                            label="操作"
                            width="110">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button type="text" @click="handleForbid(scope.row)" style="margin-left: 5px;">禁用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <el-dialog title="编辑设备" :visible.sync="editFormVisibel" >
                <el-form :model="editForm" >
                    <el-form-item label="设备名称" :label-width="editFormLabelWidth">
                        <div class="inputName">
                            <el-input v-model="editForm.name" clearable></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="设备类型" :label-width="editFormLabelWidth">
                        <div class="deviceSelect">
                            <el-select v-model="editForm.deviceType" placeholder="请选择">
                                 <el-option
                                    v-for="item in deviceTypes"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="设备负责人" :label-width="editFormLabelWidth">
                    <div class="deviceSelect">
                        <el-select v-model="editForm.deviceManager" placeholder="请选择">
                            <el-option
                                    v-for="item in deviceManagers"
                                    :key="item.key"
                                    :label="item.label"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                    <el-form-item label="设备地址" :label-width="editFormLabelWidth">
                        <div class="inputName">
                            <el-input v-model="editForm.location" clearable></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="设备购买日期" :label-width="editFormLabelWidth">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.addDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="设备图片">
                        <el-upload
                                action="/api/upload/imageUpload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="editForm.deviceImageUrl" :src="editForm.deviceImageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="设备描述" :label-width="editFormLabelWidth">
                        <el-input :rows="3" type="textarea" v-model="editForm.describe" class="textarea" />
                    </el-form-item>
                    <el-form-item label="是否需要维护" :label-width="editFormLabelWidth">
                        <el-switch v-model="editForm.needRepair"/>
                    </el-form-item>
                    <el-form-item label="是否能被预约"
                                  :label-width="editFormLabelWidth"
                                  active-text="可预约"
                                  inactive-text="不可预约"
                    >
                        <el-switch v-model="editForm.canApply"/>
                    </el-form-item>
                    <el-form-item label="可用标识"
                                  :label-width="editFormLabelWidth"
                                  active-text="可用"
                                  inactive-text="禁用"
                    >
                        <el-switch v-model="editForm.isUse"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editFormVisibel = false">取 消</el-button>
                    <el-button type="primary" @click="handleSubmitEdit">提 交</el-button>
                </div>
            </el-dialog>
            <div class="page">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="itemCounts">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<style lang='less' scoped>
    .announceCont{
        width: 100%;
        margin-top: 5px;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .avatar-uploader .el-upload {
        border: 4px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .deviceSelect {
        width:72%;
    }
    .el-col-11 {
        width: 72%!important;
    }
    .el-form-item {
        margin-bottom: 8px;
    }
    .el-table {
        font-size: 15px;
        color: gray;
    }
    .inputName{
        width: 72%;
    }
    .commonGround{
        width: 15%;
        height: 40px;
        float: left;
        z-index: 9999;
    }
    .oneline{
        width: 100%;
        height:60px;
        .search{        
            min-width: 120px; 
            .commonGround;   
        }
        .select{            
            min-width: 170px;
            margin-left: 10px;
            .commonGround;
        }
    }
    .textarea{
        height: 120px;
    }     
</style>

<script>
import axios from 'axios'

export default{
    layout() {
        return 'admina'
    },
    methods: {
        // return {
            async handleAdd() {
                let deviceName = this.addForm.name;
                let deviceTypeId = this.addForm.deviceType;
                let deviceManagerId = this.addForm.deviceManager;
                let deviceAddDate = this.addForm.addDate;
                let location = this.addForm.location;
                let deviceDescribe = this.addForm.describe;
                let deviceNeedRepair = this.addForm.needRepair;
                let deviceCanApply = this.addForm.canApply;
                let deviceIsUse = this.addForm.isUse;
                if(deviceName && deviceTypeId && deviceAddDate && deviceDescribe){
                    let result = await this.$axios.$post('/api/device/AddDevice', {
                        name: deviceName,
                        device_type: deviceTypeId,
                        UserId: deviceManagerId,
                        purchaseDate: deviceAddDate,
                        location:location,
                        description: deviceDescribe,
                        needRepair: deviceNeedRepair,
                        canReserve: deviceCanApply,
                        isUse: deviceIsUse
                    })
                    if(result.status === 1){
                        this.$message({
                            message: result.message,
                            // type: 'success'
                        });
                        window.location.reload()
                    }else {
                        this.$message.error(result.message);
                    }
                }else {
                    this.$message.error('请填写所有项');
                }
                this.addFormVisible = false
            },
            async handleSearch(){
                if(! this.searchInput){
                    window.location.reload()
                }else{
                    let resData = await this.$axios.$post('/api/device/getDeviceSearch',{
                        name: this.searchInput
                    })
                    if(resData.status === 1){
                        this.tableData = resData.result
                    }else{
                        this.$message.error(resData.message)
                    }
                }
            },
            async editDialogClose(){
                let resData = await this.$axios.$post('/api/upload/deleteTempFile', {
                    path: this.editForm.deviceImageUrl
                });
                if(resData.status === 1){
                    console.log(resData.message)
                }else {
                    this.$message.error('服务器异常，请联系管理员')
                }
            },
            handleAvatarSuccess(res, file) {
                this.editForm.deviceImageUrl = res.imgPath;  // 将返回的图片url存储到editForm数据中
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }, 
            async handleEdit(row) {
                let rowId = row.id;
                this.editForm.id = rowId;
                let resData = await this.$axios.$post('/api/device/getDeviceDataById',{
                    id: rowId
                });
                if(resData.status === 1){
                    this.editForm.name = resData.device.name;
                    this.editForm.deviceType = resData.device.device_type_id;
                    this.editForm.addDate = resData.purchaseDate;
                    this.editForm.deviceManager = resData.device.device_manager;
                    this.editForm.describe = resData.device.description;
                    this.editForm.location = resData.device.location;
                    this.editForm.needRepair = resData.device.needRepair;
                    this.editForm.canApply = resData.device.canReserve;
                    this.editForm.isUse = resData.device.isUse;
                    this.editForm.deviceImageUrl = resData.device.imgFilePath;
                    this.editFormVisibel = true;
                }else {
                    this.$message.error(resData.message + '请联系管理员');
                }
            },
            async handleSubmitEdit() {
                try{
                    let resData = await this.$axios.$put('/api/device/modifyDeviceById',{
                        id: this.editForm.id,
                        name: this.editForm.name,
                        deviceTypeId: this.editForm.deviceType,
                        deviceManager:this.editForm.deviceManager,
                        purchaseDate: this.editForm.addDate,
                        describe: this.editForm.describe,
                        location: this.editForm.location,
                        needRepair: this.editForm.needRepair,
                        canApply: this.editForm.canApply,
                        isUse: this.editForm.isUse,
                        imgFilePath: this.editForm.deviceImageUrl,
                    });
                    if( resData.status === 1 ){
                        this.$message({
                            type: 'success',
                            message: resData.message
                        });
                        window.location.reload()
                    }else {
                        this.$message.error( resData.status );
                    }
                }catch(err){
                    this.$message.error('服务器异常!!!');
                }
                this.editFormVisibel = false
            },
            async handleForbid(row) {
                try{
                    await this.$confirm('此操作将禁用该设备, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    });
                    let result = await this.$axios.$delete('/api/device/deleteDeviceById', {data:{
                        id: row.id
                    }});
                    if(result.status === 1){
                        this.$message({
                            type: 'success',
                            message: result.message
                        });
                        window.location.reload()
                    }else {
                        this.$message({
                            type: 'info',
                            message: result.message
                        });
                    }
                }catch (err){
                    this.$message({
                        type: 'info',
                        message: ` 取消 由于 ${ err }`
                    });
                }
            },
            async handleCurrentChange(val) {
                let resData = await this.$axios.$get(`/api/device/getAllDeviceData/${val}`);
                if(resData.status === 1){
                    this.tableData = resData.Devices
                }else {
                    this.$message.error(resData.message)
                }
            },       
    },
    data() {
        return {
            currentPage:1,
            itemCounts: null,
            editFormLabelWidth:'100px',
            searchInput:'',
            deviceTypes: [
                {
                    id: '选项1',
                    name: '黄金糕'
                }
            ],
            deviceManagers:[
                {
                    key:'1',
                    label:'xxx'
                }
            ],
            value:'',
            options1: [
                {
                    value: '1',
                    label: '仪器名称'
                }
            ],
            addForm: {
                name: '',
                deviceType: '',
                deviceManager:'',
                location:'',
                addDate: '',
                describe: '',
                needRepair: false,
                canApply: true,
                isUse: true,
            },
            editForm: {
                id: '',
                name: '',
                deviceType: '',
                addDate: '',
                deviceManager:'',
                location:'',
                describe: '',
                needRepair: false,
                canApply: true,
                isUse: true,
                deviceImageUrl: null,
            },
            tableData: [
                {
                    id: '',
                    date: '',
                    name: '',
                    isUse: '',
                    needRepair:'',
                    canReserve:'',
                    type: '',
                    operation:'',
                }
            ],
            editFormVisibel: false,
            addFormVisible: false,
        };
    },
    head() {
        return {
            title: 'CDMP - 设备管理'
        }
    },
    async mounted() {
        // 挂载数据        
        let getDataByName = await this.$axios.$post('/api/device/getDeviceDataByName', {post: 'post'});
        let getOnlyData = await this.$axios.$get('/api/device/getDeviceOnlyData');
        let getOnlyUsersData = await this.$axios.$get('/api/user/onlyGetAllUser');
        let getAllData = await this.$axios.$get('/api/device/getAllDeviceData');

        this.tableData = getAllData.Devices;
        this.deviceTypes = getAllData.DeviceTypes;
        this.itemCounts = getAllData.counts;
        this.deviceManagers = getOnlyUsersData.users;
    },
}
</script>