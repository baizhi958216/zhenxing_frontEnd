<template>
  <view
    class="h_wrap"
    :style="{ height: `${height + top}px`, background: background }"
  >
    <view
      class="h_wrap_items"
      :style="{ top: `${top}px`, height: `${height}px` }"
      v-if="has_item"
    >
      <view class="h_back">
        <uni-icons type="back" size="25" color="white"></uni-icons>
      </view>
      <view class="h_title">
        {{ title }}
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    background?: string;
    has_item?: boolean;
  }>(),
  {
    title: "",
    background: "white",
    has_item: false,
  }
);
const { height, top } = uni.getMenuButtonBoundingClientRect();
</script>
<style scoped lang="scss">
.h_wrap {
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 1000;
  .h_wrap_items {
    position: absolute;
    width: 100vw;
    display: flex;
    align-items: center;
  }
  .h_back {
    background-color: rgba(109, 109, 109, 0.377);
    padding: 5rpx;
    border-radius: 50%;
    margin-left: 20rpx;
  }
  .h_title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
