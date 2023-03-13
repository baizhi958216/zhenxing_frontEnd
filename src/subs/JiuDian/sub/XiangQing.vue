<template>
  <header-view
    :has_item="true"
    has_back
    :back_background="false"
    title="商家详情"
  />
  <view :style="{ padding: `${top + height}px 40rpx 100rpx 40rpx` }">
    {{ jd_id }}
  </view>
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
const { height, top } = uni.getMenuButtonBoundingClientRect();
const jd_id = ref<number>();
onLoad((...option) => {
  jd_id.value = option[0]!.jd_id;
});
</script>

<style scoped></style>
