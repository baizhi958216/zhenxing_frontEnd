<template>
  <view class="f_wrap" @click="navto(link)">
    <view
      class="f_image"
      :style="{
        background: imgSrc,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: width,
        height: height,
        borderRadius: `${round ? '30rpx' : ''}`,
        padding: `${inner ? '0 0 20rpx 20rpx' : ''}`,
      }"
    >
      <view class="title">
        <slot v-if="inner" name="title"></slot>
      </view>
      <view class="desc">
        <slot v-if="inner" name="desc"></slot>
      </view>
    </view>
    <view><slot v-if="!inner"></slot></view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    link?: string;
    imgSrc?: string;
    inner?: boolean;
    width?: string;
    height?: string;
    round?: boolean;
  }>(),
  {
    link: "",
    imgSrc: "",
    inner: false,
    width: "",
    height: "",
    round: false,
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
  min-width: 120rpx;
  min-height: 150rpx;
  .f_image {
    min-width: 100rpx;
    min-height: 100rpx;
    background-color: rgba(131, 131, 131, 0.26);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .title,
    .desc {
      color: white;
    }

    .title {
      font-size: 35rpx;
    }
    .desc {
      font-size: 20rpx;
    }
  }
}
</style>
