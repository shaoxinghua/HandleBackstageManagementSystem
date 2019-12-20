<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialog_info" @close="handleClose" width="580px">
      <el-form :model="form">
        <el-form-item label="类别：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择类别">
            <el-option label="国际信息" value="shanghai"></el-option>
            <el-option label="国内信息" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概况：" :label-width="formLabelWidth">
          <el-input v-model="form.name" type="textarea" :rows="5" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="danger" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog_info: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "70px"
    };
  },
  components: {},
  mounted() {},
  methods: {
    handleClose() {
      this.dialog_info = false;
      this.$emit("update:flag", false);
    }
  },
  watch: {
    flag(nval, oval) {
      this.dialog_info = nval;
    }
  }
};
</script>

<style lang='less' scoped>
</style>