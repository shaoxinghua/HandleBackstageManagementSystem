<template>
  <div class="Layout">
    <layout-nav class="left" :class="menuStatus?'close':'open'"></layout-nav>
    <div class="content">
       <layout-header class="header"></layout-header>
       <layout-main class="main"></layout-main>
    </div> 
   </div>
</template>

<script>
import LayoutNav from './childcomps/LayoutNav'
import LayoutHeader from './childcomps/LayoutHeader'
import LayoutMain from './childcomps/LayoutMain'

export default {
  name: 'Layout',
  data () {
    return {
       }
  },
  components: {
    LayoutNav,
    LayoutHeader,
    LayoutMain,
  },
  mounted () {},
  methods: {},
  computed:{
    menuStatus(){
      return this.$store.state.app.isCollapse
    }
  }
}
</script>

<style lang='less' scoped>
.Layout{
  display:flex;
  .left{
    width:200px;
    height: 100vh;
    transition:all 0.3s ease;
  }
  .content{
    flex:1;
    background-color:#f7f7f7;
    .header{
      height: 60px;
      background-color: #fff;
    }
    .main{
      padding: 20px;
      padding-bottom: 0;
      height: calc(100vh - 75px);
    }
  }
  .close{
    width: 64px;
  }
  .open{
    width: 200px;
  }
}


</style>