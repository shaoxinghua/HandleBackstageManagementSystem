<template>
  <div>
    <el-button
      type="danger"
      size="medium"
      @click="addFirCategory({type:'category_first_add'})"
    >添加一级分类</el-button>
    <hr class="hrs" />
    <el-row :gutter="30">
      <el-col :span="10">
        <div class="category" v-for="firitem in category" :key="firitem.id">
          <svg-icon iconClass="add"></svg-icon>
          <h4>
            {{firitem.category_name}}
            <div class="button-group">
              <el-button
                type="danger"
                size="mini"
                round
                @click="editCategory({data:firitem,type:'category_first_edit'})"
              >编辑</el-button>
              <el-button type="success" size="mini" round>添加子级分类</el-button>
              <el-button size="mini" round @click="deleteCategoryConfirm(firitem.id)">删除</el-button>
            </div>
          </h4>
          <ul v-if="firitem.children">
            <li v-for="secitem in firitem.children" :key="secitem.id">
              {{secitem.category_name}}
              <div class="button-group">
                <el-button type="danger" size="mini" round>编辑</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="14">
        <h4 class="menu-item">一级分类编辑</h4>
        <el-form label-width="118px" class="form-wrap" ref="categoryForm">
          <el-form-item label="一级分类名称" v-if="firStatus">
            <el-input type="text" v-model="ruleForm.firCategoryName" :disabled="firdisa"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称" v-if="secStatus">
            <el-input type="text" v-model="ruleForm.secCategoryName" :disabled="secdisa"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              @click="submitCate"
              :loading="loadingStatus"
              :disabled="subdisa"
            >确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  addFirstCategory,
  getCategory,
  deleteCategory,
  editCategory
} from "@/api/info";
import { confirm } from "@/utils/messageBox";
export default {
  name: "infoCategory",
  data() {
    return {
      ruleForm: {
        firCategoryName: "",
        secCategoryName: ""
      },
      firStatus: true,
      secStatus: true,
      category: [],
      loadingStatus: false,
      firdisa: true,
      secdisa: true,
      subdisa: true,
      deleteId: "",
      submit_type: "",
      editId: ""
    };
  },
  components: {},
  mounted() {
    // 获取分类数据
    getCategory({}).then(res => {
      // console.log(res);
      this.category = res.data.data.data;
    });
  },
  methods: {
    // 提交分类数据
    submitCate() {
      if (!this.ruleForm.firCategoryName) {
        this.$message({
          type: "error",
          message: "分类名称不能为空"
        });
        return false;
      }
      this.loadingStatus = true;

      // console.log(this.submit_type)
      if (this.submit_type == "category_first_add") {
        this.getCategoryFirstData();
      } else if (this.submit_type == "category_first_edit") {
        this.editCategoryFirstData();
      }
    },
    //点击添加一级分类按钮
    addFirCategory(params) {
      this.submit_type = params.type;
      this.firStatus = true;
      this.secStatus = false;
      this.firdisa = false;
      this.subdisa = false;
    },
    // 确认删除一级分类
    deleteCategoryConfirm(id) {
      this.deleteId = id;
      confirm({
        content: "是否确认删除当前一级分类，确认后将无法恢复",
        fn: this.deleteCategory,
        catchfn: () => {
          this.deleteId = "";
        }
      });
    },
    // 删除一级分类
    deleteCategory() {
      let data = {
        categoryId: this.deleteId
      };
      deleteCategory(data).then(res => {
        console.log(res);
        this.category = this.category.filter(item => {
          return item.id !== this.deleteId;
        });
      });
    },
    // 编辑一级分类
    editCategory(params) {
      this.submit_type = params.type;
      this.firStatus = true;
      this.secStatus = false;
      this.firdisa = false;
      this.subdisa = false;
      // console.log(params);
      this.ruleForm.firCategoryName = params.data.category_name;
      this.editId = params.data.id;
    },
    // 获取添加一级分类数据
    getCategoryFirstData() {
      let data = {
        categoryName: this.ruleForm.firCategoryName
      };

      addFirstCategory(data)
        .then(res => {
          // console.log(res);
          this.$message({
            type: "success",
            message: res.data.message
          });
          this.category.push(res.data.data);
          this.loadingStatus = false;
          this.ruleForm.firCategoryName = "";
          // this.$refs["categoryForm"].resetFields();
        })
        .catch(err => {
          this.loadingStatus = false;
          this.ruleForm.firCategoryName = "";
          // this.$refs["categoryForm"].resetFields();
        });
    },
    // 编辑一级分类数据
    editCategoryFirstData() {
      let data = {
        id: this.editId,
        categoryName: this.ruleForm.firCategoryName
      };
      editCategory(data).then(res => {
        console.log(res);
        this.$message({
          type: "success",
          message: res.data.message
        });
        // console.log(this.editId)
        let index = this.category.findIndex(item => item.id == this.editId);
        // console.log(index)
        this.category[index].category_name = this.ruleForm.firCategoryName;

        this.loadingStatus = false;
        this.ruleForm.firCategoryName = "";
        this.editId = ''
      });
    }
  }
};
</script>

<style lang='less' scoped>
.hrs {
  margin: 10px -20px;
  border: none;
  border-bottom: 1px solid #e9e9e9;
}
.category {
  position: relative;
  line-height: 30px;
  cursor: pointer;
  &::before {
    content: "";
    bottom: -8px;
    width: 2px;
    border-left: 1px dotted #000;
    position: absolute;
    left: 20px;
    top: 22px;
  }
  svg {
    position: absolute;
    left: 13px;
    top: 8px;
    z-index: 9;
  }
  h4 {
    padding-left: 40px;
    position: relative;
  }
  li {
    position: relative;
    list-style: none;
    margin-left: 20px;
    padding-left: 40px;
    &::before {
      content: "";
      width: 32px;
      border-bottom: 1px dotted #000;
      position: absolute;
      left: 0;
      top: 50%;
    }
  }
  &:last-child:before {
    bottom: 14px;
  }
  h4,
  li {
    transition: all 0.5s ease;
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
    .button-group {
      display: none;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
.menu-item {
  background-color: #f3f3f3;
  padding-left: 22px;
  line-height: 30px;
}
.form-wrap {
  width: 410px;
  margin-top: 20px;
}
</style>