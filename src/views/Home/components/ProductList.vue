<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { productList } from "@/apis/commodity";
import { useCommodityStore } from "@/stores/commodity";
const commodityStore = useCommodityStore();

const route = useRoute();
const dataProductList = ref([]);

const total = ref(0);
const pagination = ref({
  page_num: 1,
  page_size: 10,
});

function getProductList() {
  productList(pagination.value).then((res) => {
    let _data = res?.data?.data?.item ?? [];
    if (!Array.isArray(_data)) _data = [];
    dataProductList.value = _data;
    total.value = res?.data?.data?.total ?? 0;
  });
}
getProductList()

watch(()=>commodityStore.searchValue, (newValue) => { 
  
})
</script>

<template>
  <div class="product-list">
    <div class="container">
      <div class="list-box">
        <div v-for="item in dataProductList" :key="item.id" class="list-item">
          <div class="item-img">
            <div class="item-img-box">
              <el-image style="width: 100%; height: 100%" :src="item.img_path" fit="fill" lazy>
                <template #error>
                  <div class="error-img">加载失败</div>
                </template>
              </el-image>
            </div>
          </div>
          <div class="info-box">
            <div class="item-title">
              <el-text truncated>{{ item.name }} · {{ item.title }}</el-text>
            </div>
            <div class="item-info">
              <el-text truncated>{{ item.info }}</el-text>
            </div>
            <div class="item-price">
              <el-text truncated>{{ item.price }}</el-text>
            </div>
          </div>
        </div>
      </div>
      <div class="page-box">
        <el-pagination
          v-model:current-page="pagination.page_num"
          v-model:page-size="pagination.page_size"
          :page-sizes="[10, 20, 30, 50, 100]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="getProductList"
          @current-change="getProductList"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-list {
  width: 100%;
}
.container {
  background-color: #fff;
  padding-top: 20px;
}
.list-box {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  // grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 20px;
  .list-item {
    padding: 20px 30px;
    transition: all 0.3s;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }
  }
  .item-img {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
  }
  .item-img-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.error-img {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #a8abb2;
  background-color: #f5f7fa;
}
.info-box {
  .item-title,
  .item-info,
  .item-price {
    margin-top: 8px;
    text-align: center;
  }
  .item-title {
    .el-text {
      font-size: 16px;
      color: #333;
    }
  }
  .item-info {
    .el-text {
      font-size: 14px;
      color: #999;
    }
  }
  .item-price {
    .el-text {
      color: #cf4444;
      font-size: 20px;
    }
  }
}
.page-box {
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>
