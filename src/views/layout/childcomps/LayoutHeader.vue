<template>
  <div class="LayoutHeader">
    <div class="left header-icon" @click='isCollapse'>
      <svg-icon iconClass="menu" ></svg-icon>
    </div>
    <div class="right">
      <div class="user-info left">
        <img src="@/assets/images/layout/header.jpg" width="40" />
        {{username}}
      </div>
      <div class="header-icon left">
        <svg-icon iconClass="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import {getUsername} from '@/utils/cook'
export default {
  name: "LayoutHeader",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {
    isCollapse(){
      // console.log(this.$store)
      this.$store.commit('app/setCollapse')
    }
  },
  computed:{
    username(){
      return this.$store.state.app.username
    }
  }
};
</script>

<style lang='less' scoped>
.LayoutHeader {
  color: #000;
  line-height: 60px;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  .header-icon {
    height: 60px;
    padding: 0 22px;
    svg {
      cursor: pointer;
      font-size: 20px;
      margin-bottom: -4px;
    }
  }
  .user-info {
    height: 60px;
    padding: 0 32px;
    border-right: 1px solid #ededed;
    + .header-icon {
      padding: 0 28px;
    }
    img {
      margin-bottom: -14px;
      margin-right: 18px;
    }
  }
}
</style>