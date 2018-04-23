<template>
  <div>
    欢迎进入CDMP后台管理系统！！！！
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
import axios from 'axios'
export default {
  layout() {
    return 'admina'
  },
  data() {
    return {

    }
  },
 async mounted(){
    if(!this.$auth.state.loggedIn) 
        window.location.href ='/login'
    let Data = await this.$axios.$get('/api/user/userGetAllData')
    let userData = Data.usersDetail;
    for(let index in userData){
        if(userData[index].user.account === this.$auth.state.user.user){
          window.location.href ='/admin'
        }else{
          window.location.href ='/'
        }
    }     
},
  created() {

  },
  async asyncData() {

  }
}
</script>

