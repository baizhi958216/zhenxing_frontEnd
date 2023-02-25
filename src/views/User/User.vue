<template>
  <header-view
    :has_item="true"
    :has_back="hasBack"
    :title="'我的'"
    background="rgba(0,0,0,0)"
  />
  <view style="padding: 0 0 100rpx 0">
    <view
      :style="{
        background: `url(${TeaFile('user', 'bg.png')})`,
        width: '100vw',
        height: '300rpx',
      }"
    ></view>
  </view>
  <nav-bar />
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import NavBar from "@/components/NavBar.vue";
import { TeaFile } from "@/includes/GiteaImageDisk";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const hasBack = ref(true);

onLoad((option) => {
  hasBack.value = !option!.back;
});
</script>

<style scoped></style>
