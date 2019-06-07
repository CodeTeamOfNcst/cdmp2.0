<template>
    <section class="container">
        <div class="headerName">
            <span class="bullCont">
                <p>平台使用规范--</p>
                <p class="bulletinName">平台仪器预约流程规则 </p>
            </span>
        </div>
        <el-row class="headerline"></el-row>
        <el-row :gutter="20">
            <el-col>
                <h1 style="text-align:center;">平台仪器预约流程规则 </h1>
            </el-col>
            <el-col>
                <div class="publish-date">
                    <h4>发布时间：2018-01-01</h4>
                </div>
            </el-col>
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple-dark detailsCont">
                    <p> 本次事先预约的设备为分析测试中心管理的各种设备及计算资源。 </p>
                    <p> 用户注册：用户需首先注册，认真填写各项内容，提供真实的个人信息，提供联系方式和转账账户，经平台管理人员确认后才能登陆预约。</p>
                    <p> 仪器预约：用户登录后，按所需填写内容逐一填写仪器预约信息，按照相关设备提供的开放时间进行预约，经管理人员确认后预约生效。</p>
                    <p> 仪器使用：用户需按照预约时间准时开始使用设备，并在规定时间内完成样品的分析测试工作，如果不能准时使用设备，需提前24小时取消预约。</p>
                    <p> 仪器信息发布：仪器管理人员须及时审核预约信息，审核过程不超过24小时，管理人员要及时发布仪器使用状态，对仪器故障、维修、维护动态及时发布。</p>
                    <p> 数据：当确认缴费完毕后，实验数据将通过电子邮件或拷贝的形式传送给测试用户。</p>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<style lang='less' scoped>
.bullCont p{
    width: auto;
    float: left;
}
.detailsCont{
    width: 100%;
    margin-top: 20px;
    min-height: 700px;
    height:auto;
}
.bulletinName{
    color:#7f828b;
    overflow: hidden;
}
.publish-date{
    float: right;
    margin-right: 10%
}
</style>

<script>
 
</script>