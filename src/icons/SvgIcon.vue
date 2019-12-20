<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {},
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`; // 确保use格式正确
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
};
</script>

<style lang='less' scoped>
.svg-icon{
  width: 1em;
  height: 1em;
  // vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden; 
}
</style>