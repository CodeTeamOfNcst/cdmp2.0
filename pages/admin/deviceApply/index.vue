<template>
    <div class="mianContent">
        <el-popover
                ref="popover4"
                placement="right"
                width="500"
                trigger="click"
                v-model="addFromVisible">
            <el-form ref="addForm" :model="addForm" label-width="100px">
                <el-form-item label="申请用户">
                    <el-col :span="18">
                        <el-select v-model="addForm.user" filterable placeholder="请选择用户">
                            <el-option
                                    v-for="item in users"
                                    :key="item.key"
                                    :label="item.label"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="审批人员">
                    <el-col :span="18">
                        <el-select v-model="addForm.check_user" filterable placeholder="请选择用户">
                            <el-option
                                    v-for="item in users"
                                    :key="item.key"
                                    :label="item.label"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="申请设备">
                    <el-col :span="18">
                        <el-select v-model="addForm.device" filterable placeholder="请选择对应的设备">
                            <el-option
                                    v-for="item in devices"
                                    :key="item.key"
                                    :label="item.label"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="使用时间">
                    <el-date-picker
                            v-model="addForm.date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始使用日期"
                            end-placeholder="结束使用日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="申请理由">
                    <el-col :span="18">
                        <el-input v-model="addForm.vioReason" clearable type="textarea"/>
                    </el-col>
                </el-form-item>
                <el-form-item label="是否同意">
                    <el-col :span="18">
                        <el-switch v-model="addForm.isAgree"/>
                    </el-col>
                </el-form-item>
                <el-form-item label="是否禁用">
                    <el-col :span="18">
                        <el-switch v-model="addForm.isUse"/>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">添加</el-button>
                    <el-button  @click="handleAddCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-popover>
        <div class="headerName">
            <div class="leftSty"></div>
            <span class="bullCont">设备预约管理</span>
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
                    <el-select v-model="searchType" placeholder="请选择">
                        <el-option
                                v-for="item in searchOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="add">
                    <el-button v-popover:popover4 @click="handleAddOpen" class="addContent">新增</el-button>
                </div>
            </div>
            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 70%;">
                    <el-table-column
                            label="申请id"
                            width="80">
                        <template slot-scope="scope">{{ scope.row.id }}</template>
                    </el-table-column>
                    <el-table-column
                            label="申请用户"
                            width="100">
                        <template slot-scope="scope">{{ scope.row.applyUser }}</template>
                    </el-table-column>
                    <el-table-column
                            label="申请设备"
                            width="180">
                        <template slot-scope="scope">{{ scope.row.device.substr(0,10) }}</template>
                    </el-table-column>
                    <el-table-column
                            label="开始使用时间"
                            width="120">
                        <template slot-scope="scope">{{ scope.row.startDate }}</template>
                    </el-table-column>
                    <el-table-column
                            label="结束使用时间"
                            width="120">
                        <template slot-scope="scope">{{ scope.row.endDate }}</template>
                    </el-table-column>
                    <el-table-column
                            label="申请理由"
                            width="">
                        <template slot-scope="scope">{{ scope.row.vioReason ? scope.row.vioReason.substr(0,10) : '暂未填写' }}</template>
                    </el-table-column>
                    <el-table-column
                            label="是否同意"
                            width="90">
                        <template slot-scope="scope">{{ scope.row.isAgree ? '是': '否' }}</template>
                    </el-table-column>
                    <el-table-column
                            label="是否禁用"
                            width="90">
                        <template slot-scope="scope">{{ scope.row.isUse ? '可用': '禁用' }}</template>
                    </el-table-column>
                    <el-table-column
                            label="审核状态"
                            width="90">
                        <template slot-scope="scope">{{ scope.row.createdAt == scope.row.updatedAt ? '待审核': '已审核' }}</template>
                    </el-table-column>
                    <el-table-column
                            prop="operation"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button type="text" @click="handleDelete(scope.row)" style="margin-left: 5px;">禁用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog title="编辑申请表" :visible.sync="editFromVisible">
                <el-form ref="form" :model="editForm" label-width="90px">
                    <el-form-item label="申请人" >
                        <el-col :span="18">
                            <el-select v-model="editForm.user" filterable placeholder="请选择用户">
                                <el-option
                                        v-for="item in users"
                                        :key="item.key"
                                        :label="item.label"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="审批人" >
                        <el-col :span="18">
                            <el-select v-model="editForm.checker" filterable placeholder="请选择用户">
                                <el-option
                                        v-for="item in users"
                                        :key="item.key"
                                        :label="item.label"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="申请设备">
                        <el-col :span="18">
                           <el-select v-model="editForm.device" filterable placeholder="请选择对应的设备">
                                <el-option
                                        v-for="item in devices"
                                        :key="item.key"
                                        :label="item.label"
                                        :value="item.key">
                                </el-option>
                        </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-col :span="18">
                            <el-date-picker
                                    v-model="editForm.date"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始使用日期"
                                    end-placeholder="结束使用日期">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="申请理由">
                        <el-col :span="18">
                            <el-input v-model="editForm.vioReason" clearable type="textarea"/>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="是否同意">
                        <el-switch v-model="editForm.isAgree"
                                   active-text="同意"
                                   inactive-text="拒绝"
                        />
                    </el-form-item>
                    <el-form-item label="是否禁用">
                        <el-switch v-model="editForm.isUse"
                                   active-text="可用"
                                   inactive-text="禁用"
                        />
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleEditCancle">取 消</el-button>
                    <el-button type="primary" @click="handleEditSubmit">提 交</el-button>
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
    .el-col-18 {
        width: 88%;
    }
    .announceCont{
        width: 100%;
        margin-top: 5px;
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
    
</style>

<script>
    import { Button } from 'element-ui'
    import axios from 'axios'
    export default {
        components: {
            Button
        },
        layout(){
            return  'admina'
        },
        methods: {
            async handleSearch(){
                if(! this.searchInput){
                    window.location.reload()
                }else{
                    let resData = await this.$axios.$post('/api/deviceApply/getApplySearch',{
                        device: this.searchInput
                    })
                    if(resData.status == 1){
                        this.tableData = resData.result
                    }else{
                        this.$message.error(resData.message)
                    }
                }
            },
            async handleAdd(){
                // 之后要加上手动验证逻辑
                let resData = await this.$axios.$post('api/deviceApply/addApply', {
                    device: this.addForm
                });
                if( resData.status == 1){
                    this.$message({
                        message: resData.message,
                        type: 'success'
                    });
                    window.location.reload()
                }else {
                    this.$message.error(resData.message)
                }
            },
            handleAddCancel(){
                this.addFromVisible = false
            },
            async handleEdit(row) {
                let resData = await this.$axios.$post('/api/deviceApply/getApplyById', {
                    id: row.id        
                });
                this.editForm.id = row.id;
                if( resData.status === 1){
                    this.editForm.device = resData.result.apply_device;
                    this.editForm.date = [resData.result.startDate, resData.result.endDate];
                    this.editForm.vioReason= resData.result.vioReason;
                    this.editForm.isAgree= resData.result.isAgree;
                    this.editForm.isUse= resData.result.isUse;
                    this.editForm.user = resData.result.apply_user;
                    this.editForm.checker = resData.result.check_user;
                    this.editFromVisible = true
                }else {
                    this.$message.error(resData.data.message)
                }
            },
            async handleEditSubmit(){
                try{
                    console.log(this.editForm)
                    let resData = await this.$axios.$post('/api/deviceApply/modifyApplyById', {
                        id: this.editForm.id,
                        apply_user:this.editForm.user,
                        check_user:this.editForm.checker,
                        device:this.editForm.device,
                        vioReason:this.editForm.vioReason,
                        isAgree:this.editForm.isAgree,
                        isUse:this.editForm.isUse,
                        date:this.editForm.date,
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
                }catch(err){
                    this.$message.error('服务器异常!!!');
                }
                this.editFromVisible = false
            },
            handleEditCancle(){
                this.editFromVisible = false
            },
            async handleDelete(row) {
                try{
                    await this.$confirm('此操作将禁用该用户, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    });
                    let resData = await this.$axios.$post('/api/deviceApply/deleteApplyById', {
                        id: row.id
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
                }catch (err){
                    this.$message.error('已取消');
                }
            },
            async handleCurrentChange(val) {
                let resData = await this.$axios.$get(`/api/deviceApply/getAll/${val}`);
                if(resData.data.status === 1){
                    this.tableData = resData.data.applys
                }else {
                    this.$message.error(resData.data.message)
                }
            },
        },
        data() {
            return {
                isShow:false,
                currentPage: 1,
                itemCounts:1,
                editFromVisible: false,
                formLabelWidth: '120px',
                addFromVisible: false,
                searchInput: '',
                searchType: '',
                addForm: {
                    user: '',
                    device:'',
                    date: '',
                    check_user:'',
                    vioReason: '',
                    isAgree: false,
                    isUse: false,

                },
                editForm: {
                    id:"",
                    user: '',
                    checker:'',
                    device: '',
                    date:[],
                    vioReason:'',
                    isAgree:false,
                    isUse: false,
                },
                users: [
                    {
                        key: '',
                        label: ''
                    },
                ],
                devices:[
                    {
                        key: '1',
                        label: '1-xxx'
                    }
                ],
                value: '',
                tableData: [
                    {
                        id: '1',
                        applyUser: '张扬果儿',
                        checkUser:'名字',
                        device: '第一台设备',
                        startDate: '',
                        endDate:'',
                        vioReason:'',
                        isAgree:'',
                        isUse:'',
                        createdAt:'',
                        updatedAt:'',
                    }
                ],
                searchOption: [
                    {
                        value: '1',
                        label: '申请设备'
                    }
                ],
            };
        },
        async mounted(){
            let getAllData = await this.$axios.$get('/api/deviceApply/getAllApplyData');
            let getOnlyUsersData = await this.$axios.$get('/api/user/onlyGetAllUser');
            this.postDataFront = await this.$axios.$post('/api/deviceApply/addApplyFront', {post: 'post'});
            let getOnlyData = await this.$axios.$get('/api/device/getDeviceOnlyData');
            this.tableData = getAllData.applys;
            this.users = getOnlyUsersData.users;
            this.devices = getOnlyData.devices;
            this.itemCounts = getAllData.counts;
        },
        head() {
            return {
                title: 'CDMP - 预约管理'
            }
        }
    }
</script>