import axiosHttp from "@/utils/http";

// 用户登录
export function userLogin(data) {
  return axiosHttp({
    url: "/user/login",
    method: "POST",
    data
  });
}

// 用户注册
export function userRegister(data) {
  return axiosHttp({
    url: "/user/register",
    method: "POST",
    data
  });
}