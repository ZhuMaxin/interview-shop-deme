<script setup>
import { ref, onMounted } from "vue";
import { carousels } from "@/apis/commodity";

const dataCarousel = ref([]);
function getCarousel() {
  carousels().then((res) => {
    let _data = res?.data?.data?.item ?? [];
    if (!Array.isArray(_data)) _data = [];
    dataCarousel.value = _data;
  });
}
getCarousel();
</script>

<template>
  <div class="carousel-image">
    <div class="container">
      <el-carousel height="465px" motion-blur>
        <el-carousel-item v-for="item in dataCarousel" :key="item.id">
          <el-image class="carousel-img" :src="item.img_path" fill="fill" alt="">
            <template #error>
              <div class="error-img">
                加载失败
              </div>
            </template>
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-image {
  width: 100%;
}
.container {
  background-color: #fff;
}
.carousel-img {
  width: 100%;
  height: 100%;
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
</style>
