import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { userLogin } from "@/apis/user";

export const useUserStore = defineStore(
  "user",
  () => {
    // 用户数据
    const dataUser = ref({});
    // token
    const access_token = ref("");
    const refresh_token = ref("");

    // 获取用户数据
    async function getUser(request) {
      await userLogin(request).then((res) => {
        let _data = res?.data?.data?.user ?? {};
        dataUser.value = _data;
        access_token.value = res?.data?.data?.access_token ?? "";
        refresh_token.value = res?.data?.data?.refresh_token ?? "";
      });
    }

    // 清空用户数据
    function clearUserData() {
      dataUser.value = {};
      access_token.value = "";
      refresh_token.value = "";
    }

    return {
      dataUser,
      getUser,
      access_token,
      refresh_token,
      clearUserData,
    };
  },
  { persist: true }
);
