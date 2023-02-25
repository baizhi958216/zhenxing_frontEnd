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
      <view
        v-if="has_back"
        :class="back_background ? 'h_back_withbackground' : 'h_back'"
        @click="toBack"
      >
        <uni-icons
          type="back"
          size="25"
          :color="back_background ? 'white' : 'black'"
        ></uni-icons>
      </view>
      <view :class="left ? 'h_left' : 'h_title'" v-if="custom"
        ><slot name="h_custom"></slot
      ></view>
      <view :class="left ? 'h_left' : 'h_title'" v-else>
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
    left?: boolean;
    back_background?: boolean;
  }>(),
  {
    title: "",
    background: "white",
    has_item: false,
    custom: false,
    has_back: true,
    left: false,
    back_background: true,
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
  .h_back,
  .h_back_withbackground {
    padding: 5rpx;
    border-radius: 50%;
    margin-left: 20rpx;
  }
  .h_back_withbackground {
    background-color: rgba(109, 109, 109, 0.377);
  }
  .h_title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .h_left {
    margin-left: 40rpx;
  }
}
</style>
