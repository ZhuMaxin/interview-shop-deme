import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { categoryList } from "@/apis/commodity";

export const useCommodityStore = defineStore("commodity", () => {
  const dataCategoryList = ref([]);
  function getCategoryList() {
    categoryList().then((res) => {
      let _data = res?.data?.data?.item ?? [];
      if (!Array.isArray(_data)) _data = [];
      dataCategoryList.value = _data;
    });
  }

  return {
    dataCategoryList,
    getCategoryList,
  };
});
