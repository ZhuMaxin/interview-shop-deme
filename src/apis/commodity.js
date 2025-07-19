import axiosHttp from "@/utils/http";

// 获取商品分类
export function categoryList() {
  return axiosHttp({
    url: "/category/list",
    method: "GET",
  });
}

// 获取轮播图
export function carousels() {
  return axiosHttp({
    url: "/carousels",
    method: "GET",
  });
}
