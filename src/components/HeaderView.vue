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
      <view v-if="has_back" class="h_back" @click="toBack">
        <uni-icons type="back" size="25" color="white"></uni-icons>
      </view>
      <view class="h_title" v-if="custom"><slot name="h_custom"></slot></view>
      <view class="h_title" v-else>
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
    custom?: boolean;
    has_back?: boolean;
  }>(),
  {
    title: "",
    background: "white",
    has_item: false,
    custom: false,
    has_back: true,
  }
);
const { height, top } = uni.getMenuButtonBoundingClientRect();
const toBack = () => {
  uni.navigateBack();
};
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
