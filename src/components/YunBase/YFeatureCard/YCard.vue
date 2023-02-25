<template>
  <view class="f_wrap" @click="navto(link)">
    <view
      class="f_image"
      :style="{
        background: imgSrc,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }"
    ></view>
    <view><slot></slot></view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    link?: string;
    imgSrc?: string;
  }>(),
  {
    link: "",
    imgSrc: "",
  }
);

const navto = (link: string) => {
  if (link) {
    console.log(link);
  }
};
</script>

<style scoped lang="scss">
.f_wrap {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  font-size: 25rpx;
  width: 120rpx;
  height: 150rpx;
  .f_image {
    width: 100rpx;
    height: 100rpx;
    background-color: rgba(131, 131, 131, 0.26);
  }
}
</style>
