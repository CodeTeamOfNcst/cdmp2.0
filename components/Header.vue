 <template>
    <div class="header">
        <div class="header-logo">
            <!--<img src="../assets/img/r_bg.jpg"/>-->
            <el-row  >
                <el-col :span="3" :offset="1" ><div class="header-item grid-content bg-purple-light"><h1>CDMP</h1></div></el-col>
                <el-col :span="4"><div class="header-item grid-content bg-purple-light"><nuxt-link class="button" to="/clcresources">计算资源</nuxt-link></div></el-col>
                <el-col :span="4"><div class="header-item grid-content bg-purple-light"><nuxt-link class="button" to="/device">仪器列表</nuxt-link></div></el-col>
                <el-col :span="4"><div class="header-item grid-content bg-purple"><nuxt-link class="button" to="/notice">通知公告</nuxt-link></div></el-col>
                <el-col :span="4"><div class="header-item grid-content bg-purple-light"><nuxt-link class="button" to="/usedirection">平台介绍 </nuxt-link></div></el-col>   
                 
                <el-col class="right" :span="4">
                    <span class="little">
                        <i class="iconfont icon-home"></i>
                        <nuxt-link to="/">首页</nuxt-link>
                    </span>
                    <span class="little">
                        <i class="iconfont icon-user"></i>
                        <nuxt-link to="/login">登录</nuxt-link>
                    </span>
                    <span class="little">
                        <i class="iconfont icon-register"></i>
                        <nuxt-link to="/signin">注册</nuxt-link>
                    </span>
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
        /* background: url("~assets/img/bg2.png") no-repeat left 100%; */
    }
    .nuxt-link-exact-active {
        // background: #6b8db4;
        color: #fff;
    }
     
    .el-row{
        width: 90%; 
        height:100%;
        .right{
            height:59px;;
            float:right;
            color:#fff;
            padding-left: 15px;
            .little {
                display: inline-block;
                height: 60px;
                line-height: 60px;
                margin: 11px 5px;
                .iconfont {
                    margin-right: 3px;
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
                hasError: false
            };
        }
    }
</script>
