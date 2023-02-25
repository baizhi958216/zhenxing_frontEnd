<template>
  <view class="nb_wrap">
    <view class="nb_items">
      <view
        :style="{
          background: `url(${TeaFile('components/navigation', 'home.png')})`,
          backgroundSize: '90%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }"
        class="nb_home"
        @click="toHome"
      ></view>
      <view
        :style="{
          background: `url(${TeaFile('components/navigation', 'search.png')})`,
          backgroundSize: '90%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }"
        class="nb_search"
        @click="toSearch"
      ></view>
      <view
        :style="{
          background: `url(${TeaFile('components/navigation', 'message.png')})`,
          backgroundSize: '110%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }"
        class="nb_message"
        @click="toMessage"
      ></view>
      <view
        :style="{
          background: `url(${TeaFile('components/navigation', 'me.png')})`,
          backgroundSize: '90%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }"
        class="nb_me"
        @click="toMe"
      ></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { TeaFile } from "@/includes/GiteaImageDisk";
const toHome = () => {
  console.log("toHome");
};
const toSearch = () => {
  console.log("toSearch");
};
const toMessage = () => {
  console.log("toMessage");
};
const toMe = () => {
  console.log("toMe");
};
</script>

<style scoped lang="scss">
.nb_wrap {
  position: fixed;
  top: 100%;
  transform: translateY(-100%);
  width: 100vw;
  height: 100rpx;
  z-index: 1000;
  background-color: white;
  .nb_items {
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .nb_home,
    .nb_search,
    .nb_message,
    .nb_me {
      width: 50rpx;
      height: 50rpx;
    }
  }
}
</style>
