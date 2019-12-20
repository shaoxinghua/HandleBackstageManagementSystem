<template>
   <div class="LayoutMain">
     <div class="mainContent">
       <router-view></router-view>
     </div>
   </div>
</template>

<script>
export default {
  name: 'LayoutMain',
  data () {
    return {
       }
  },
  components: {},
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scoped>
.LayoutMain .mainContent{
  background-color: #fff;
  height: 100%;
  color: #000;
  padding: 20px 20px 0 20px;
}
</style>