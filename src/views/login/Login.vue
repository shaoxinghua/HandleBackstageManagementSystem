<template>
  <div class="login">
    <div class="tab">
      <ul>
        <li :class='{current:item.isActive}'  v-for="(item,index) in tabdatas" :key="index"  @click='toggleMenu(item)'>{{item.txt}}</li>
      </ul>
    </div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="loginForm"
      size='medium'
    >
      <el-form-item  prop="email">
        <label>邮箱</label>
        <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="pass">
        <label>密码</label>
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" maxlength='20' minlength="6"></el-input> 
      </el-form-item>
      <el-form-item  prop="checkPass" v-if="model==='register'">
        <label>确认密码</label>
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" maxlength="20" minlength="6"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <label>获取验证码</label>
        <el-row :gutter="10">
          <el-col :span='15'>
            <el-input type='text' v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
          </el-col>
          <el-col :span='9'>
            <el-button class='block' type='success' @click='getMes()' :disabled='codeStatus'>{{codeTxt}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button class='block mt' type="danger" @click="submitForm('ruleForm')" :disabled='submitStatus'>{{model==='login' ?"登录":"注册"}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import {getCode,getLogin,getRegister} from '@/api/login.js'
export default {
  name: "Login",
  data() {
    // 验证邮箱
    var validateEmail = (rule, value, callback) => {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;	
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if(!reg.test(value)){		
        callback(new Error("邮箱格式错误"));
      } else{	
        callback();
      } 
    };
    // 验证密码
    var validatePass = (rule, value, callback) => {
      var reg=/^(?![0-9]+$)(?![a−zA−Z]+$)[0-9A-Za-z]{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(!reg.test(value)){
        callback(new Error("请输入6到20位的字母加数字"));
      } else {
        callback();
      } 
        
    
    };
    // 验证重复密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 验证验证码
    var validateCode = (rule, value, callback) => {
      var reg = /^[\da-zA-Z]{6}$/;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!reg.test(value)) {
        callback(new Error("验证码错误，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      tabdatas: [{txt:"登录",type:"login",isActive:true}, {txt:"注册",type:"register",isActive:false}],
      model:'login',
      codeTxt:'获取验证码',
      codeStatus:false,
      submitStatus:true,
      timer:null,
      ruleForm: {
        email:"",
        pass: "",
        checkPass: "",
        code: ""
      },
      rules: {
        email:[{validator: validateEmail, trigger: "blur"}],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      }
    };
  },
  components: {},
  mounted() {},
  methods: {
    // tab切换
    toggleMenu(data){
      this.tabdatas.forEach(item => {
        item.isActive = false;
      });
      data.isActive = true;
      this.model = data.type;
      this.$refs['ruleForm'].resetFields();
      
      // 清除定时器
      this.clearCountDown();
    },
    // 获取验证码
    getMes(){
      if(this.ruleForm.email === ''){
        this.$message.error('邮箱不能为空');
        return false
      }
      let data = {
        username:this.ruleForm.email,
        module:this.model
      };
      // 修改验证码按钮状态
      this.codeTxt ='发送中';
      this.codeStatus = true;
      // 获取验证码
      setTimeout(()=>{
        getCode(data).then(res=>{
          // console.log(res);
          let data = res.data;
          this.$message({
            message: data.message,
            type: 'success'
          });
          // 修改提交按钮状态
          this.submitStatus = false;
          // 调用定时器
          this.countDown(6);
        }).catch(err=>{
          console.log(err);
        })
      },3000) 
    },
    // 注册/登录
    submitForm(formName) {
      // 模拟注册成功
      // this.toggleMenu(this.tabdatas[0]);
      // this.clearCountDown();
      // return false
      // console.log(this.model)
      this.$refs[formName].validate((valid) => {
        // console.log(valid);
         if (valid) {
         this.model === 'login' ? this.login() : this.register() ;
         } else {
         console.log('error submit!!');
         return false;
         }
      });
    },
    // 设置定时器
    countDown(number){
      clearInterval(this.timer);
      let time = number;
      this.timer = setInterval(()=>{
        time--;
        if(time===0){
          clearInterval(this.timer);
          this.codeStatus = false;
          this.codeTxt = '重新获取';
        }else{
          this.codeTxt = `倒计时${time}秒`
        } 
      },1000)
    },
    // 清除定时器
    clearCountDown(){
      this.codeTxt='获取验证码';
      this.codeStatus = false;
      clearInterval(this.timer);
    },
    // 登录
    login(){
      let data = {
        username: this.ruleForm.email,
        password: sha1(this.ruleForm.pass),
        code: this.ruleForm.code,
      };
      this.$store.dispatch('app/getLogin',data).then(res=>{
        // console.log(res)
        let data = res.data;
        this.$message({
          message: data.message,
          type: 'success'
        });
        this.$router.push('/layout')
      })
    },
    // 注册
    register(){
      let data = {
        username: this.ruleForm.email,
        password: sha1(this.ruleForm.pass),
        code: this.ruleForm.code,
        module:this.model
      };
      getRegister(data).then(res=>{
        let data = res.data;
        this.$message({
          message: data.message,
          type: 'success'
        });
        this.toggleMenu(this.tabdatas[0]);
        this.clearCountDown();
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  height: 100vh;
  padding-top:50px;
  .tab{
    width: 330px;
    margin: 0 auto;
    ul {
      width: 100%;
      display: flex;
      text-align: center;
      justify-content: center;
      li {
        margin-right: 20px;
        padding: 10px 15px;
        list-style: none;
      }
      .current{
        background-color: #353557;
      }
    }
  }
  .loginForm{
    width: 330px;
    margin: 0 auto;
    margin-top: 10px;
    .block{
      width: 100%;
    }
    .mt{
      margin-top: 19px;
    }
  } 
  
}
</style>
