<template>
  <div>
    <!-- 表单 -->
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="label-wrap category">
          <label>类型:</label>
          <div class="label-content">
            <el-select v-model="categoryValue" placeholder="请选择" size="small" style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label>日期：</label>
          <div class="label-content">
            <el-date-picker
              v-model="dateValue"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
              size="small"
              style="width:100%"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap keyword">
          <label>关键字：</label>
          <div class="label-content">
            <el-select v-model="searchValue" placeholder="请选择" style="width:100%;" size="small">
              <el-option
                v-for="item in keyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入内容" size="small" style="width:100%"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" size="small" style="width:50%;">搜索</el-button>
      </el-col>

      <el-col :span="2">
        <el-button
          type="danger"
          size="small"
          style="width:100%"
          @click="handleDialog"
        >新增</el-button>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;" class="bd">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="400"></el-table-column>
      <el-table-column prop="category" label="类别" width="100"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="custodian" label="管理人" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDialog">编辑</el-button>
          <el-button size="mini" type="success" @click="handleDelete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <el-row style="margin-top:20px;">
      <el-col :span="12">
        <el-button type="danger" size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next,jumper"
          :total="1000"
          class="right"
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 新增-对话框 -->
    <DialogInfo :flag.sync = 'dialogIf'></DialogInfo>
  </div>
</template>

<script>
import DialogInfo from './dialog/DialonInfo'
import {confirm} from '@/utils/messageBox'
export default {
  name: "infoIndex",
  data() {
    return {
      options: [
        {
          value: 1,
          label: "国际信息"
        },
        {
          value: 2,
          label: "国内信息"
        },
        {
          value: 3,
          label: "行业信息"
        }
      ],
      keyOptions: [
        {
          value: 1,
          label: "ID"
        },
        {
          value: 2,
          label: "标题"
        }
      ],
      categoryValue: "",
      dateValue: "",
      searchValue: "ID",
      tableData: [
        {
          title:
            "新华社三亚12月17日电（记者李宣良、黎云）我国第一艘国产航空母舰”",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          custodian: "管理员"
        },
        {
          title: "师者为师亦为范 习近平这样关心“筑梦人”",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          custodian: "管理员"
        },
        {
          title: "习近平在码头接见了航母部队官兵代表和航母建设单位代表。”",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          custodian: "管理员"
        }
      ],
      dialogIf:false,
    };
  },
  components: {
    DialogInfo,
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleDialog(){
      this.dialogIf = true;
    },
    handleDelete(){
      confirm({
        content:'确认删除当前消息，确认后将无法恢复',
        fn:this.confirmDelete
      })
    },
    deleteAll(){
      confirm({
        content:'确认删除选择的数据，确认后将无法恢复',
        title:'警告',   
      })
    },
    confirmDelete(){
      console.log('哈哈哈！')
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../assets/css/config.less";
// 表单样式
.label-wrap {
  &.category {
    .labelDom(32px, 45px, left);
  }
  &.date {
    .labelDom(32px, 70px, right);
  }
  &.keyword {
    .labelDom(32px, 90px, right);
  }
}
// 表格样式
.bd /deep/ .el-table__header {
  border-bottom: 1px solid #ebeef5 !important;
}
</style>