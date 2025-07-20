import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { categoryList } from "@/apis/commodity";

export const useCommodityStore = defineStore("commodity", () => {
  // 分类信息
  const dataCategoryList = ref([]);
  function getCategoryList() {
    categoryList().then((res) => {
      let _data = res?.data?.data?.item ?? [];
      if (!Array.isArray(_data)) _data = [];
      dataCategoryList.value = _data;
    });
  }

  // 产品列表搜索框 value
  const searchValue = ref("");
  function setSearchValue(value) {
    searchValue.value = value;
  }

  return {
    dataCategoryList,
    getCategoryList,
    searchValue,
    setSearchValue,
  };
});
