<template>
    <section class="">
        <div class="headerName">
            <!-- <div class="leftSty"></div> -->
            <span class="bullCont">
                <p>平台使用规范--</p>
                <p class="bulletinName">云计算资源及仪器预约平台使用守则 </p>
            </span>
        </div>
        <el-row class="headerline"></el-row>
        <el-row :gutter="20">
            <el-col>
                <h1 style="text-align:center;">云计算资源及仪器预约平台使用守则 </h1>
            </el-col>
            <el-col>
                <div class="publish-date">
                    <h4>发布时间：2018-01-01</h4>
                </div>
            </el-col>
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple-dark detailsCont">
                    <p> 第一条 遵守纪律，按规定时间进入实验室，迟到15分钟以上者不准进行实验。 </p>

                    <p> 第二条 实验前认真准备，写出预习报告，经指导教师检查合格后方可进行实验。</p>

                    <p>  第三条 遵守实验室有关规章制度，服从实验指导教师的指导，保持良好的实验秩序。</p>

                    <p> 第四条 注意安全，遵守仪器设备操作规程，如发现仪器设备异常，立即报告指导教师。违反操作规程造成设备损坏者，按学校有关规定赔偿损失。</p>

                    <p> 第五条 爱护仪器设备，精心使用，节约水电及实验耗材，非本组所用仪器勿动，不准把实验室器材私自带出实验室。</p>

                    <p>  第六条 遵守校园文明行为规范；保持实验室环境整洁，实验结束后，整理好实验用品，做好清洁卫生。</p>

                    <p> 第七条 认真撰写实验报告，报告要项目齐全，内容真实，字迹工整、清晰，按时上交，不合格者应重做。</p>
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