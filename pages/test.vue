<template>
  <div>
    <h1>This is Test Page</h1>
    <h1>The Get axios with return {{ GetReturn ? GetReturn : 'undefined' }}</h1>
    <h1>The Post axios with return {{ PostReturn ? PostReturn : 'undefined' }}</h1>
    <h1>The Put axios with return {{ PutReturn ? PutReturn : 'undefined' }}</h1>
    <h1>The Delete axios with return {{ DeleteRerurn ? DeleteRerurn : 'undefined' }}</h1>
  </div>
</template>

<style lang="less" scoped>

</style>


<script>
export default {
  data() {
    return {
      GetReturn: '',
      PostReturn: '',
      PutReturn: '',
      DeleteRerurn: ''
    }
  },
  async mounted(){
    let GetReturn = await this.$axios.$get('/api/test/get');
    let PostReturn = await this.$axios.$post('/api/test/post', {post: 'post'});
    let PutReturn = await this.$axios.$put('/api/test/put', {put: 'put'});
    let DeleteRerurn = await this.$axios.$delete('/api/test/delete', { data:{delete: 'delete'}}) // 这边方式稍有不同

    this.GetReturn = GetReturn
    this.PostReturn = PostReturn
    this.PutReturn = PutReturn
    this.DeleteRerurn = DeleteRerurn
  }
}
</script>

