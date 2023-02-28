<template>
  <header-view :has_item="true" has_back :back_background="false" custom>
    <template #h_custom>
      <y-input :width="250" :height="55" placeholder="搜索" />
    </template>
  </header-view>
  <view :style="{ paddingTop: `${top + height}px` }">
    <view class="zx_featuretitlewrap">
      <view
        v-for="feature in featureslist"
        :key="feature.id"
        @click="zxPage = feature.id"
        :class="feature.id == zxPage ? 'activePage' : ''"
      >
        {{ feature.name }}
      </view>
    </view>

    <swiper
      @change="pageChange"
      :current="zxPage"
      style="height: 100vh"
      :style="{ paddingTop: `${top + height * 2}rpx` }"
    >
      <swiper-item v-for="feature in featureslist" :key="feature.id">
        <template v-if="feature.id === 0">
          <GuanZhu />
        </template>
        <template v-else-if="feature.id === 1">
          <TuiJian />
        </template>
        <template v-else-if="feature.id === 2">
          <TouTiao />
        </template>
        <template v-else-if="feature.id === 3">
          <ZhengZhi />
        </template>
        <template v-else-if="feature.id === 4">
          <JiaoYu />
        </template>
        <template v-else-if="feature.id === 5">
          <JianKang />
        </template>
        <template v-else-if="feature.id === 6">
          <KeXue />
        </template>
        <template v-else> 404 </template>
      </swiper-item>
    </swiper>
  </view>
</template>
<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import YInput from "@/components/YunBase/YInput/YInput.vue";
import GuanZhu from "./subs/GuanZhu.vue";
import TuiJian from "./subs/TuiJian/TuiJian.vue";
import TouTiao from "./subs/TouTiao.vue";
import ZhengZhi from "./subs/ZhengZhi.vue";
import JiaoYu from "./subs/JiaoYu.vue";
import JianKang from "./subs/JianKang.vue";
import KeXue from "./subs/KeXue.vue";

import { reactive, ref } from "vue";
const { height, top } = uni.getMenuButtonBoundingClientRect();

const zxPage = ref(1);

const featureslist = reactive([
  { name: "关注", id: 0 },
  { name: "推荐", id: 1 },
  { name: "头条", id: 2 },
  { name: "政治", id: 3 },
  { name: "教育", id: 4 },
  { name: "健康", id: 5 },
  { name: "科学", id: 6 },
]);

const pageChange = (e: { detail: { current: number } }) => {
  zxPage.value = e.detail.current;
};
</script>
<style scoped>
.zx_featuretitlewrap {
  padding: 20rpx 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 28rpx;
  color: #a8a8a8;
  position: fixed;
  width: 100vw;
  background-color: white;
  z-index: 999;
}

.activePage {
  color: black;
  font-weight: bold;
  font-size: 32rpx;
}
.activePage::before {
  content: "";
  position: absolute;
  width: 50rpx;
  border-radius: 10rpx;
  background-color: blue;
  margin-top: 40rpx;
  height: 12rpx;
}
</style>
