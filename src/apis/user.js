import axiosHttp from "@/utils/http";

// 获取商品分类
export function categoryxxxList() {
  return axiosHttp({
    url: "/category/lixxxst",
    method: "GET",
  });
}