<template>
    <div class="mianContent">
        <el-popover
                ref="popover4"
                placement="right"
                width="800"
                height="1000"
                trigger="click"
                v-model="addFromVisible">
            <el-form ref="addForm" :model="addForm" label-width="100px">
                <el-form-item label="消息发布日期">
                    <el-col :span="14">
                        <el-date-picker :rows="14" type="date" placeholder="选择日期" v-model="addForm.releaseDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="消息类别">
                    <el-col :span="11">
                        <el-select v-model="addForm.message_type" placeholder="请选择消息类别">
                            <el-option
                                    v-for="item in MessageTypes"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="选择发送用户">
                    <el-col :span="18">
                        <el-transfer
                                filterable
                                :filter-method="userFilterMethod"
                                filter-placeholder="用户名筛选"
                                v-model="addForm.selected_user"
                                :titles="['用户列表', '发送用户']"
                                :data="userTransferData">
                        </el-transfer>
                    </el-col>
                </el-form-item>
                <el-form-item label="是否可用">
                    <el-switch v-model="addForm.isUse"
                               active-text="可用"
                               inactive-text="禁用"
                    />
                </el-form-item>
                <el-form-item label="是否已读">
                    <el-col :span="14">
                        <el-switch v-model="addForm.isRead"
                                   active-text="已读"
                                   inactive-text="未读"
                        />
                    </el-col>
                </el-form-item>
                <el-form-item label="消息内容">
                    <el-input :rows="1" type="textarea" v-model="addForm.content" class="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">添加</el-button>
                    <el-button  @click="handleAddCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-popover>
        <div class="headerName">
            <div class="leftSty"></div>
            <span class="bullCont">消息管理</span>
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
                    <el-select v-model="searchType" placeholder="筛选条件">
                        <el-option
                                v-for="item in searchOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="add">
                    <el-button v-popover:popover4 class="addContent" @click="handleAddOpen">新增</el-button>
                </div>
            </div>
            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 70%;">
                    <el-table-column
                        label="消息id"
                        type="index"
                        width="100">
                    </el-table-column>
                    <el-table-column
                            prop="releaseDate"
                            label="消息发布日期"
                            width="130">
                    </el-table-column>
                    <el-table-column
                            prop="message_type"
                            label="消息一级类别"
                            width="130">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="消息二级类别"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            fit="false"
                            label="消息内容"
                            width="">
                        <template slot-scope="scope">{{ scope.row.content.substr(0,14)}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="消息接收人"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            label="已读"
                            width="100">
                        <template slot-scope="scope">{{ scope.row.isRead ? '是': '否'}}</template>
                    </el-table-column>
                    <el-table-column
                            label="是否禁用"
                            width="100">
                        <template slot-scope="scope">{{ scope.row.isUse ? '可用': '不可用'}}</template>
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
            <el-dialog title="编辑消息" :visible.sync="editFromVisible">
                <el-form ref="form" :model="editForm" label-width="110px">
                    <el-form-item label="消息类别">
                        <el-col :span="11">
                            <el-select v-model="editForm.type" placeholder="请选择消息类别">
                                <el-option
                                        v-for="item in userKlasses"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="消息发布日期">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.publishDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="消息用户">
                        <div style="width: 60%;">
                            <el-col :span="18">
                                <el-input v-model="editForm.user" disabled="true"/>
                            </el-col>
                        </div>
                    </el-form-item>
                    <el-form-item label="消息内容">
                        <el-col :span="18">
                            <el-input v-model="editForm.content" clearable type="textarea"/>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="是否已读">
                        <el-col :span="18">
                            <el-switch v-model="editForm.isRead" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="禁用标识">
                        <el-switch v-model="editForm.isUse" />
                    </el-form-item>
                    <el-form-item label="是否发布">
                        <el-switch v-model="editForm.isPublished" />
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
    .el-col-14 {
        width: 45%;
    }
    .el-col-11 {
        width: 45%;
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
        components: {Button},
        layout(){
            return  'admina'
        },
        methods: {
            async handleSearch(){
                if(! this.searchInput){
                    window.location.reload()
                }else{
                    let resData = await this.$axios.$post('/api/message/getMessageSearch',{
                        message_user: this.searchInput
                    })
                    if(resData.status === 1){
                        this.tableData = resData.Message
                    }else{
                        this.$message.error(resData.message)
                    }
                }
            },
        //     userFilterMethod(query, item){
        //         return item.key.indexOf(query) > -1;
        //     },
            handleAddOpen() {
            },
            async handleAdd(){
                if( this.addForm.selected_user.length !== 0){
                    console.log(this.addForm.message_type)
                    let resData = await this.$axios.$post('api/message/addMessage', {
                        selected_user: this.addForm.selected_user,
                        releaseDate:this.addForm.releaseDate,
                        isUse:this.addForm.isUse,
                        isRead:this.addForm.isRead,
                        content:this.addForm.content,
                        message_type:this.addForm.message_type
                    });
                    if(resData.status === 1){
                        this.$message({
                            type: 'success',
                            message: resData.message
                        });
                        window.location.reload()
                    }else{
                        this.$message.error(resData.message);
                    }
                }else {
                    this.$message.error('至少选择一个用户');
                    this.addFromVisible = false
                }
            },
            handleAddCancel(){
                console.log(this.addForm.selected_user);
                this.addFromVisible = false
            },
            async handleEdit(row) {
                let resData = await this.$axios.$post('/api/message/getMessageDataById', {
                    id: row.id
                });
                if(resData.status === 1){
                    this.editForm.id = row.id;
                    this.editForm.type = resData.thisMessage.message_type;
                    this.editForm.user = resData.thisMessageUser;
                    this.editForm.publishDate = resData.thisMessage.releaseDate;
                    this.editForm.isRead = resData.thisMessage.isRead;
                    this.editForm.isUse = resData.thisMessage.isUse;
                    this.editForm.content = resData.thisMessage.content;
                }else {
                    this.$message.error(resData.message)
                }
                this.editFromVisible = true
            },
            async handleEditSubmit(){
                let resData = await axios.post('/api/message/modifyMessageById',{
                    id: this.editForm.id,
                    message_type:this.editForm.message_type,
                    releaseDate:this.editForm.releaseDate,
                    content:this.editForm.content,
                    isRead:this.editForm.isRead,
                    isUse:this.editForm.isUse
                });
                if(resData.status === 1){
                    this.$message({
                        type: 'success',
                        message: resData.message
                    });
                    window.location.reload()
                }else {
                    this.$message.error(resData.message)
                }
                this.editFromVisible = false
            },
            handleEditCancle(){
                this.editFromVisible = false
            },
            async handleDelete(row) {
                try{
                    await this.$confirm('此操作将使该记录失效, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    });
                    let resData = await this.$axios.$post('/api/message/deleteMessageById',{
                        id: row.id
                    });
                    if(resData.status === 1){
                        this.$message({
                            type: 'success',
                            message: resData.message
                        })
                        window.location.reload()
                    }else {
                        this.$message.error(resData.message)
                    }
                }catch (err){
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                }
            },
            async handleCurrentChange(val) {
                let resData = await this.$axios.$get(`/api/message/getAllMessageData/${val}`)
                if(resData.status === 1){
                    this.tableData = resData.Messages;
                }else {
                    this.$message.error(resData.message)
                }
            }, 
        },
        data() {
            return {
                isShow:false,
                currentPage: 4,
                itemCounts: null,
                addForm: {
                    releaseDate: '',
                    message_type: '',
                    selected_user: [],
                    isUse: false,
                    isRead: false,
                    content: '',
                },
                editForm: {
                    id: '',
                    type: '',
                    user: '',
                    publishDate: '',
                    content: '',
                    isPublished: '',
                    isRead: '',
                    isUse: '',
                },
                userKlasses: [
                    {
                        id: '选项1',
                        name: '按时间由近及远排序'
                    },
                ],
                tableData: [
                    {
                        id: '1',
                        releaseDate:'2017-08-26',
                        content: '这是一条系统消息',
                        isRead:'未读',
                        isUse:'可用',
                        message_type:'',
                        title:'',
                        name:'',
                    }
                ],
                userTransferData:[
                    {
                        key: '',
                        label: ''
                    }
                ],
                editFromVisible: false,
                formLabelWidth: '120px',
                addFromVisible: false,
                searchInput: '',
                searchType: '',
                searchOption: [
                    {
                        value: '1',
                        label: '消息用户'
                    },
                ],
                // 从数据库加载的数据， 这里只是数据的格式
                Messages: [
                    {
                        message: {
                            content:"这是一条成功的消息",
                            createdAt:"2018-01-25",
                            id:1,
                            releaseDate:false,
                            isRead: false,
                            isUse:true,
                            message_type:1,
                            message_user:1,
                            publishDate:"2018-01-25T12:04:23.000Z",
                            updatedAt:"2018-01-25T12:04:23.000Z",
                        },
                    },
                ],
                MessageTypes: [
                    {
                        id:'1',
                        label:'普通1-预约到期'
                    }
                ]
            };
        },
        async mounted() {
            // 将信息挂载
            let getAllData = await this.$axios.$get('/api/message/getAllMessageData');
            let getOnlyUsersData = await this.$axios.$get('/api/user/onlyGetAllUser');

            this.tableData = getAllData.Messages;
            this.MessageTypes = getAllData.MessageTypes;
            this.userTransferData = getOnlyUsersData.users;
            this.itemCounts = getAllData.counts;

        },
        head() {
            return {
                title: 'CDMP - 消息管理'
            }
        }
    }
</script>