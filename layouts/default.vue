 <template>
  <div class="allBody">
    <my-header/>
    <div class="mainwidth">
      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
    import MyHeader from '~/components/Header.vue'
    import MyFooter from '~/components/Footer.vue'
    export default {
        components: {
            MyHeader,
            MyFooter
        }
    }
</script>

<style lang="less">
  .allBody{
    width: 100%;
    background: #fff;
    .mainwidth{
    width: 80%;
    min-height: 800px;
    margin: 0 auto;
    border-radius: 5px;
    background: #fff;
    }
  }
  .container {
    margin: 0;
    width: 100%;
    // text-align: center;
    overflow: hidden;
    height: auto;
  }
  .button, .button:visited
  {
    width:100%;
    display: inline-block;
    color: #fff;
    letter-spacing: 1px;
    text-decoration: none;
    text-transform: uppercase;
    // padding: 20px 2%;
  }
  .button:hover, .button:focus
  {
    width:100%;
    color: #fff;
    background-color: #6b8db4;
  }
  .title
  {
    color: #505153;
    font-weight: 300;
    font-size: 2.5em;
    margin: 0;
  }
</style>
