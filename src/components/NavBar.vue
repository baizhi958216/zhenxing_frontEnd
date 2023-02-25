<template>
  <view class="nb_wrap">
    <view class="nb_items">
      <view
        v-for="el in navs"
        :key="el.bg"
        :style="{
          background: `url(${TeaFile(
            'components/navigation',
            `${el.bg}.png`
          )})`,
          backgroundSize: el.size,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }"
        class="nb_item_wrap"
        @click="toNav(el.url)"
      ></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { TeaFile } from "@/includes/GiteaImageDisk";
import { reactive } from "vue";
const navs = reactive(<Array<{ url: string; bg: string; size: string }>>[
  {
    url: "views/Home/Home",
    bg: "home",
    size: "90%",
  },
  {
    url: "views/Search/Search",
    bg: "search",
    size: "90%",
  },
  {
    url: "views/Message/Message",
    bg: "message",
    size: "110%",
  },
  {
    url: "views/User/User",
    bg: "me",
    size: "90%",
  },
]);
const toNav = (url: string) => {
  if (getCurrentPages()[0].route != url) {
    if (url == "views/Search/Search" || url == "views/User/User") {
      uni.redirectTo({
        url: `/${url}?back=false`,
      });
    } else {
      uni.redirectTo({
        url: `/${url}`,
      });
    }
  } else {
    return;
  }
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
    .nb_item_wrap {
      width: 50rpx;
      height: 50rpx;
    }
  }
}
</style>
