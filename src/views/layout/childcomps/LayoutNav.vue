<template>
  <div class="LayoutNav">
    <h1 class="logo"><img src="@/assets/images/layout/logo.jpg"  alt=""></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item,index) in routes">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon :iconClass='item.meta.icon'></svg-icon>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 子集菜单 -->
          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.id"
            :index="subitem.path"
          >{{subitem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "LayoutNav",
  data() {
    return {
      // isCollapse: false,
      routes: []
    };
  },
  components: {},
  mounted() {
    this.routes = this.$router.options.routes;
    // console.log(this.routes);
  },
  methods: {
  },
  computed:{
    isCollapse(){
      return this.$store.state.app.isCollapse
    }
  }
};
</script>

<style lang='less' scoped>
.logo{
  text-align: center;
  img{
    width: 120px;
    border-radius: 50%;
  }
  
}
.close .logo img{
  width: 50px;
}
.el-submenu{
  .el-menu-item {
    padding-left: 50px !important;
    &.is-active {
      background-color: rgba(245, 108, 108, 0.2) !important;
    }
  }
}
svg{
  font-size: 18px;
  margin-right: 10px;
}
</style>