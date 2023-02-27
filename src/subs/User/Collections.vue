<template>
  <header-view
    :has_item="true"
    has_back
    title="收藏"
    :back_background="false"
    background="#f5f5f5"
  />
  <view
    :style="{
      padding: `${top + height}px 60rpx 100rpx 60rpx`,
      backgroundColor: '#f5f5f5',
      height: '95vh',
    }"
  >
    <view class="uc_search">
      <view style="width: 70%">
        <y-input placeholder="请输入关键词" :height="70"></y-input>
      </view>
      <view style="font-weight: bold; font-size: 36rpx">管理</view>
    </view>
    <!-- 卡片列表 -->
    <view
      class="uc_collection"
      v-for="collection in collections"
      :key="collection.cid"
      @click="toCollection(collection.cid)"
    >
      <y-card
        :img-src="`url(${collection.url})`"
        width="580rpx"
        height="260rpx"
        round
        left
      >
        <view
          style="
            display: flex;
            align-items: center;
            padding-top: 10rpx;
            color: #a6a6a6;
          "
        >
          <view>⭐{{ collection.star }}</view>
          <view style="margin-left: 20rpx"
            >{{ collection.comments }}条评价</view
          >
        </view>
      </y-card>
    </view>
  </view>
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import YInput from "@/components/YunBase/YInput/YInput.vue";
import YCard from "@/components/YunBase/YFeatureCard/YCard.vue";
import { TeaFile } from "@/includes/GiteaImageDisk";
import { reactive } from "vue";
const { height, top } = uni.getMenuButtonBoundingClientRect();

const collections = reactive([
  {
    cid: 1,
    url: TeaFile("login", "sky.png"),
    star: "5.0",
    comments: "24",
  },
  {
    cid: 2,
    url: TeaFile("login", "sky.png"),
    star: "3.0",
    comments: "12",
  },
  {
    cid: 3,
    url: TeaFile("login", "sky.png"),
    star: "2.0",
    comments: "52",
  },
]);

const toCollection = (cid: number) => {
  console.log(cid);
};
</script>

<style scoped>
.uc_search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
}
.uc_collection {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 330rpx;
  width: 100%;
  border-radius: 40rpx;
  background-color: white;
  margin-bottom: 25rpx;
}
</style>
