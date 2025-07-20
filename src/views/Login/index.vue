<script setup>
import { ref, useTemplateRef } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { userRegister } from "@/apis/user";
const userStore = useUserStore();
const router = useRouter();
const formLogin = ref({
  nick_name: "",
  user_name: "",
  password: "",
  key: "",
  agree: true,
});
const rulesLogin = {
  nick_name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  user_name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 14, message: "长度必须在 6 到 14 之间", trigger: "blur" },
  ],
  key: [
    { required: true, message: "请输入支付密码", trigger: "blur" },
    { min: 6, max: 6, message: "长度必须是 6 位数", trigger: "blur" },
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("请勾选协议"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
};

const loadLogin = ref(false);
function proceedLogin() {
  loadLogin.value = true;
  userStore.getUser(formLogin.value).then((res) => {
    ElMessage({
      message: "登录成功",
      type: "success",
    });
    router.replace("/");
  }).finally(() => {
    loadLogin.value = false;
  });
}

const loadRegister = ref(false);
function subRegister() {
  loadRegister.value = true;
  userRegister(formLogin.value).then((res) => { 
    ElMessage({
      message: res.data.data,
      type: "success",
    });
    isLogin.value = true
    refLogin.value.resetFields()
  }).finally(() => {
    loadRegister.value = false;
  });
}
const refLogin = useTemplateRef("refLogin");
async function btnLogin() {
  await refLogin.value.validate((valid, fields) => {
    if (valid) {
      if (isLogin.value) {
        proceedLogin();
      }else {
        subRegister()
      }
      
    } else {
      // console.log("error submit!", fields);
    }
  });
}

const isLogin = ref(true);
function changeRegisterORlogin() {
  isLogin.value = !isLogin.value;
  refLogin.value.resetFields()
}
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section v-loading.fullscreen="loadLogin" class="login-section">
      <div v-loading="loadRegister" class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form
              :model="formLogin"
              label-position="right"
              label-width="auto"
              status-icon
              :rules="rulesLogin"
              ref="refLogin"
            >
              <el-form-item v-if="!isLogin" label="昵称" prop="nick_name">
                <el-input v-model="formLogin.nick_name" clearable placeholder="请输入昵称" />
              </el-form-item>
              <el-form-item label="账户" prop="user_name">
                <el-input v-model="formLogin.user_name" clearable placeholder="请输入账户" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="formLogin.password" clearable show-password placeholder="请输入密码" />
              </el-form-item>
              <el-form-item v-if="!isLogin" label="支付密码" prop="key">
                <el-input v-model="formLogin.key" clearable show-password placeholder="请输入支付密码" />
              </el-form-item>
              <!-- <el-form-item prop="agree" label-width="22px">
                <el-checkbox v-model="formLogin.agree" size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item> -->
              <el-button size="large" class="subBtn" @click="btnLogin">点击{{ isLogin?'登录':'注册' }}</el-button>
              <div class="register-login">
                <template v-if="isLogin">
                  还没有账户？
                  <el-button type="primary" text @click="changeRegisterORlogin">
                    立即注册
                  </el-button>
                </template>
                <template v-else>
                  已有账户？
                  <el-button type="primary" text @click="changeRegisterORlogin">
                    去登陆
                  </el-button>
                </template>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <!-- <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a> -->
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; xxl</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url("@/assets/images/login-bg.png") no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}

.register-login {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 14px 0;
}
</style>
