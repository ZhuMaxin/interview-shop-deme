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

// 获取商品列表
export function productList(params) {
  return axiosHttp({
    url: "/product/list",
    method: "GET",
    params
  });
}

// 搜索商品
export function productSearch(data) {
  return axiosHttp({
    url: "/product/search",
    method: "POST",
    data
  });
}