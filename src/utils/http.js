import axios from "axios";
import router from "@/router/index";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";

// 创建axios实例
const axiosHttp = axios.create({
  // baseURL: "https://hrapi.ai17.cc/api/v1",
  baseURL: "/api/v1",
  timeout: 5000,
});

// 添加请求拦截器
axiosHttp.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore();
    if (userStore.access_token) {
      // 直接读取 Store 中的响应式 token
      config.headers.Access_token = `${userStore.access_token}`;
      config.headers.Refresh_token = `${userStore.refresh_token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axiosHttp.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const res = response.data;
    if (res.status === 200) {
      return response; // 业务成功，返回核心数据
    } else {
      // 主动抛出业务错误，触发 catch 分支
      ElMessage.error(res.message);
      return Promise.reject(response);
    }
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.status) {
      const status = error.status;
      const message = error.response.data.error;
      switch (status) {
        case 401:
          ElMessage.error(message);
          router.push("/login"); // 跳转登录页
          break;
        case 404:
          ElMessage.error(message);
          break;
        case 500:
          ElMessage.error(message);
          break;
        default:
          ElMessage.error(message);
      }
    } else if (error.request) {
      // 请求已发送但无响应
      ElMessage.error("网络错误，请检查连接");
    } else {
      ElMessage.error("请求配置错误");
    }
    return Promise.reject(error);
  }
);

export default axiosHttp;
