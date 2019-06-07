 <template>
    <div class="header">
        <div class="header-logo">
            <el-row>
                <el-col :span="3" :offset="1" ><div class="header-item grid-content bg-purple-light"><h1>CDMP</h1></div></el-col>
                <!-- <el-col :span="3"><div class="header-item grid-content bg-purple-light"><nuxt-link class="button" to="/clcresources">计算资源</nuxt-link></div></el-col> -->
                <el-col :span="3"><div class="header-item grid-content bg-purple-light"><nuxt-link class="button" to="/">首页</nuxt-link></div></el-col>
                <el-col :span="3"><div class="header-item grid-content bg-purple-light"><nuxt-link class="button" to="/device">仪器列表</nuxt-link></div></el-col>
                <el-col :span="3"><div class="header-item grid-content bg-purple"><nuxt-link class="button" to="/notice">通知公告</nuxt-link></div></el-col>
                <el-col :span="3"><div class="header-item grid-content bg-purple-light"><nuxt-link class="button" to="/usedirection">平台介绍 </nuxt-link></div></el-col>   
                 
                <el-col class="right" :span="7">
                    <!-- <span class="little">
                        <i class="iconfont icon-home"></i>
                        <nuxt-link to="/">首页</nuxt-link>
                    </span> -->
                    <div v-if="!status" class="little">
                        <i class="iconfont icon-user"></i>
                        <nuxt-link to="/login">登录</nuxt-link>
                        <i class="iconfont icon-register"></i>
                        <nuxt-link to="/signin">注册</nuxt-link>
                    </div>
                    <div v-else class="little" >
                        <i class="iconfont icon-user"></i>
                        <nuxt-link to="/personal">个人中心</nuxt-link>
                        
                        <i class="iconfont icon-register"></i>
                        <!-- <nuxt-link to="/signin">注册</nuxt-link> -->
                        <el-button type="text" class="signOut" @click="logOut">退出</el-button>
                    </div>
                </el-col>
            </el-row> 
        </div>
         
    </div>
</template>
<style lang="less" scoped>
    a{
        color:#fff;
    }
    .header-logo {
        width: 80%;
        height: 80px;
        margin-left:10%;
        background-color:#333;
        h1 {
        float: left;
        color: #fafafa;
        letter-spacing: 0;
        font-size:50px;
        text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135 ;
        }
    }
    .nuxt-link-exact-active {
        color: #fff;
    } 
    .el-row{
        width: 90%; 
        height:100%;
        margin-left: 5%;
        .right{
            height:59px;
            float:right;
            color:#fff;
            .little {
                display: inline-block;
                height: 60px;
                line-height: 60px;
                margin: 11px 5px;
                .iconfont {
                    margin-right: 3px;
                }
                .icon-register{
                  margin-left: 5px;
                }
                .signOut {
                  color:#fff;
                }
            }
        }
     }
    .header-item{
        text-align: center;
        height:100%;
        margin-top:11px;
        .button {
        font-family: SimHei;
        text-align: center;
        font-size:1.2em;
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                isActive: true,
                hasError: false,
                status:'',
            };
        },
        methods:{
            async logOut(){
                let resData = await this.$auth.logout()
                window.location.href = '/login'
                // window.location.reload()
            },
        },
        async mounted(){
            this.status = this.$auth.state.loggedIn         
        },
    }
</script>
