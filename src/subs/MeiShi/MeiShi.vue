<template>
  <header-view
    :has_item="true"
    has_back
    title="乡村美食"
    :back_background="false"
  />
  <view :style="{ paddingTop: `${top + height}px ` }">
    <!-- 推荐栏 -->
    <view
      :style="{
        height: '150rpx',
        backgroundImage: `url(${topRecommend.url})`,
      }"
      @click="toRecommend(topRecommend.sid)"
    >
    </view>
    <!-- features -->
    <view
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx;
      "
    >
      <!-- 排序 -->
      <view
        style="
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          color: #949494;
          font-size: 22rpx;
          width: 320rpx;
        "
      >
        <view>综合排序</view>
        <view>评分排序</view>
        <view>价格排序</view>
      </view>
      <!-- 发现美食 -->
      <view class="ms_seek">发现美食</view>
    </view>
    <!-- 列表 绑定排序菜单-->
    <view class="ms_list">
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
      <view class="ms_list_item"></view>
    </view>
  </view>
</template>
<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import { ref } from "vue";
const { height, top } = uni.getMenuButtonBoundingClientRect();

const topRecommend = ref({
  sid: "2",
  url: "https://tuchuangs.com/imgs/2022/05/26/5cd30fe855924bab.png",
});

const toRecommend = (sid: string) => {
  console.log(sid);
};
</script>
<style scoped>
.ms_seek {
  font-weight: bold;
}
.ms_seek::before {
  content: "";
  width: 120rpx;
  height: 10rpx;
  border-radius: 60rpx;
  background-color: #ff673d;
  position: absolute;
  margin-top: 29rpx;
  z-index: -100;
}
.ms_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: scroll;
  max-height: 75vh;
}
.ms_list_item {
  background-color: green;
  width: 300rpx;
  height: 200rpx;
  margin: 20rpx;
}
</style>
