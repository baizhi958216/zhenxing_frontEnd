<template>
  <header-view :has_item="true" has_back :back_background="false" />
  <view :style="{ padding: `${top + height}px 40rpx 100rpx 40rpx` }"></view>
</template>
<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
const { height, top } = uni.getMenuButtonBoundingClientRect();
</script>
<style scoped></style>
