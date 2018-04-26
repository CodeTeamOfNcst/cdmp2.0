<template>
    <div class="mianContent">
        <el-popover
                ref="popover4"
                placement="right"
                width="500"
                trigger="click"
                v-model="addFormVisible">
            <el-form ref="addForm" :model="addForm" label-width="100px">
                <el-form-item label="课题负责人">
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
                <el-form-item label="机时额度">
                    <el-col :span="18">
                        <el-input v-model="addForm.hours" clearable />
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
            <span class="bullCont">云计算资源管理</span>
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
                    <el-select v-model="value" placeholder="筛选依据">
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="add">
                    <el-button v-popover:popover4 @click="handleAddOpen" class="addContent">新增</el-button>
                </div>
                <el-popover
                    ref="popover1"
                    placement="right"
                    width="600"
                    trigger="click">
                    <div>
                        <el-row>
                            <el-col :span="24">
                                <div class="grid-content bg-purple-dark cloudStatis">
                                    <el-row>
                                        <el-col :span="24">
                                            <div class="resName" >
                                                <p>云计算资源统计</p>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <div class="resContent"> 
                                                <p>2018-01-01 00:00:00 至 2018-03-08 17:09:41 总共运行了 1601.16 小时</P>
                                                <p>目前投入运行的CPU核数：7524</p>
                                                <p>理论计算资源(扣除系统维护和假期停机时间 0 天)：12047127.84 CPU核小时</p>
                                                <p>用户计算资源总共使用了：6634752.43 CPU核小时</p>
                                                <p>中心机群实际使用效率：55.07%</p>
                                                <p>目前用户总共占用了：16.17 TB的存储空间</p>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-popover>
                <div class="resStatis">
                    <el-button v-popover:popover1>云计算资源统计</el-button>
                </div>
            </div>
            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 70%;">
                    <el-table-column
                        label="申请id"
                        type="index"
                        width="100">
                    </el-table-column>
                    <el-table-column
                            prop="chargePerson"
                            label="课题负责人"
                            width="110">
                    </el-table-column>
                    <el-table-column
                            prop="startTime"
                            label="开始时间"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="endTime"
                            label="结束时间"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="timeLimit"
                            label="申请机时额度"
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop="checkUser"
                            label="审批人"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="isAgree"
                            label="是否同意"
                            width="110">
                            <template slot-scope="scope">{{scope.row.isAgree ? '同意':'不同意'}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="isUse"
                            label="是否禁用"
                            width="110">
                            <template slot-scope="scope">{{scope.row.isUse ? '未禁用':'禁用'}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="isExamine"
                            label="审核状态"
                            width="110">
                        <template slot-scope="scope">{{scope.row.createdAt == scope.row.updatedAt ? '待审核':'已审核'}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="operation"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button type="text" @click="forbidRule(scope.row)" style="margin-left: 5px;">禁用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="itemCounts">
                </el-pagination>
            </div>
            <el-dialog title="用户云计算资源" :visible.sync="editFormVisible">
                <el-form ref="form" :model="editForm" label-width="100px">
                    <el-form-item label="课程负责人">
                        <el-col :span="15">
                            <el-input v-model="editForm.chargePerson" :disabled="true"/>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="申请机时额度">
                        <el-col :span="15">
                            <el-input v-model="editForm.hours" clearable />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="申请起止时间">
                        <el-date-picker
                            v-model="editForm.date"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="登录账号">
                        <el-col :span="15">
                            <el-input v-model="editForm.account" clearable />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-col :span="15">
                            <el-input v-model="editForm.password" clearable />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="申请状态">
                        <el-switch
                            v-model="editForm.status"
                            active-text="审核通过"
                            inactive-text="审核未通过">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleEditSubmit" type="primary">提 交</el-button>
                    <el-button  @click="handleEditCanacel">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<style lang='less' scoped>
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
    .grid-content {
        min-height: 200px;
        font-family: 幼圆;
        font-size: 1.1em;
    }
    .resStatis{
        margin-left: 5px;
        min-width: 31px;
        .commonGround;
        width: 10%;
    }
    .resName{
        height:30px;
        width: 100%;
        text-align:center;
        p{
            font-weight: 700;
            font-size: 1.2em;
        }
    }
    .resContent{
        width: 100%;  
        min-height: 200px;
        float: right;
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
        data() {
            return {
                currentPage: 1,
                itemCounts:1,
                addForm: {
                    user: '',
                    hours: '',
                    date:'',
                    isAgree:'false',
                    isUse: 'false',
                },
                users: [
                    {
                        key: '1',
                        label: '1-用户名'
                    },
                ],
                tableData: [{
                    id: '1',
                    chargePerson: '魏宝仁',
                    checkUser:'',
                    startTime: '2017-09-11',
                    endTime:'2018-01-01',
                    timeLimit:'20000.00',
                    isAgree:'否',
                    isUse:'可用', 
                    createdAt:'',
                    updatedAt:'',                  
                }],
                options1: [
                    {
                        value: '1',
                        label: '课题负责人'
                    }
                ],
                editForm: {
                    id:'',
                    chargePerson:'',
                    date:[],
                    hours:'',
                    account:'',
                    password:'',
                    status:'false',
                    isUse: 'false',
                },
                tableData1: [{
                    monthlyTotal: 'Jan 2018',
                    homeworkNum: '97',
                    useTime: '996591.67',
                    systemPercent:'21.48 %',
                    averNum:'55.00',
                    averWaitTime:'9.52'
                    }, {
                    monthlyTotal: 'Feb 2018',
                    homeworkNum: '92',
                    useTime: '210116.11',
                    systemPercent:'13.53 %',
                    averNum:'46.18',
                    averWaitTime:'2.11'
                    }, {
                    monthlyTotal: 'Mar 2018',
                    homeworkNum: '8',
                    useTime: '923.58',
                    systemPercent:'0.14 %',
                    averNum:'30.25',
                    averWaitTime:'1.55'
                    },
                ],             
                addFormVisible:false,            
                editFormVisible: false,
            };
        },
        methods: {
            async handleSearch(){
                if(! this.searchInput){
                    window.location.reload()
                }else{
                    let resData = await this.$axios.$post('/api/computeApply/getApplySearch',{
                        apply_user: this.searchInput
                    })
                    if(resData.status === 1){
                        this.tableData = resData.result
                    }else{
                        this.$message.error(resData.message)
                    }
                }
            },
            async handleAdd(){
                let resData = await this.$axios.$post('/api/computeApply/addApply', {
                    hours: this.addForm.hours,
                    apply_user:this.addForm.user,
                    startDate:this.addForm.date[0],
                    endDate:this.addForm.date[1], 
                    isUse:this.addForm.isUse,
                    // account:'687432',
                    // password:'123456',
                    isAgree:this.addForm.isAgree,
                    check_user:5,   
                });
                if( resData.status === 1){
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
                this.addFormVisible = false
            },
            async handleEdit(row){
                try{
                    let resData = await this.$axios.$post('/api/computeApply/getApplyById',{
                        id: row.id
                    });
                    if(resData.status === 1){
                        this.editForm.id = row.id,
                        this.editForm.status = resData.result.isAgree,
                        this.editForm.account = resData.result.account,
                        this.editForm.password = resData.result.password,
                        this.editForm.chargePerson = resData.result.applyUser.name,
                        this.editForm.isUse= resData.result.isUse,
                        this.editForm.hours = resData.result.hours,
                        this.editForm.date[0] = resData.result.startDate,
                        this.editForm.date[1] = resData.result.endDate,
                        this.editFromVisible = true
                    }else {
                        this.$message.error(resData.message);
                    }
                }catch(err) {
                    this.$message.error(`异常 由于 ${err}`);
                }
                this.editFormVisible = true
            },
            async forbidRule(row) {
                try{
                    await this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    });
                    let deleteData = await this.$axios.$post('/api/computeApply/deleteApplyById', {
                        id: row.id
                    })
                    if(deleteData.status === 1){
                        this.$message({
                            type: 'success',
                            message: '成功禁用'
                        });
                        window.location.reload()
                    }else {
                        this.$message.error(deleteData.message);
                    }
                }catch (err){
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                }
            },
            async handleEditSubmit(){
                try{
                    let resData = await this.$axios.$post('/api/computeApply/modifyApplyById',{
                        id: this.editForm.id,
                        hours:this.editForm.hours,
                        account:this.editForm.account,
                        password:this.editForm.password,
                        isAgree:this.editForm.status,
                        startDate:this.editForm.date[0],
                        endDate:this.editForm.date[1],
                    });
                    if(resData.status === 1){
                        this.$message({
                            message: resData.message
                        });
                        window.location.reload()
                    }else {
                        this.$message.error(resData.message);
                    }
                }catch (err){
                    this.$message.error(`异常 由于 ${err}`);
                }
                this.editFormVisible = false
            },
            handleEditCanacel(){
                this.editFormVisible = false
            },  
            async handleCurrentChange(val) {
                let resData = await this.$axios.$get(`/api/computeApply/getAllApplyData/${val}`)
                if(resData.status === 1){
                    this.tableData = resData.Messages;
                }else {
                    this.$message.error(resData.message)
                }
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += '';
                    } else {
                        sums[index] = '';
                    }
                });
                return sums;
            }            
        },
        async mounted(){
            let getAllData = await this.$axios.$get('/api/computeApply/getAllApplyData');
            let getOnlyUsersData = await this.$axios.$get('/api/user/onlyGetAllUser');

            this.tableData = getAllData.applys;
            this.users = getOnlyUsersData.users;
            this.itemCounts = getAllData.counts;
        },
        head() {
            return {
                title: 'CDMP - 云计算资源管理'
            }
        },
    }
</script>