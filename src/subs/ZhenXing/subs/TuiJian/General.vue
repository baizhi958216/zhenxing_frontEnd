<template>
  <header-view :has_item="true" has_back :back_background="false">
  </header-view>
  <view :style="{ paddingTop: `${top + height}px` }">
    <view class="main">
      <view class="title">{{ title }}</view>
      <view class="origin">
        <view>{{ type }}</view>
        <view>{{ time }}</view>
      </view>
      <view class="img" :style="{ backgroundImage: `url(${img})` }"></view>
      <view class="article">{{ main }}</view>
    </view>
    <view class="bar-btn">
      <view>
        <input class="comment" type="text" />
      </view>
      <view
        class="discuss"
        :style="{ backgroundImage: `url(${TeaFile('news', 'discuss.png')})` }"
      ></view>
      <view
        class="like"
        :style="{ backgroundImage: `url(${TeaFile('news', 'like.png')})` }"
      ></view>
      <view
        class="more"
        :style="{ backgroundImage: `url(${TeaFile('news', 'more.png')})` }"
      ></view>
    </view>
  </view>
</template>
<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import { TeaFile } from "@/includes/GiteaImageDisk";
const { height, top } = uni.getMenuButtonBoundingClientRect();

/**
 * 未知的后端数据, mock
 */
const title = "天选姬重出江湖, 这究竟是我的老婆还是我的老婆？";
const type = "相亲求缘";
const time = "1秒前";
const main = "天选姬重出江湖, 这究竟是我的老婆还是我的老婆？是我的老婆哟~";
const img = `${TeaFile("login", "sky.png")}`;
</script>
<style scoped>
.main {
  position: absolute;
  width: 100vw;
  z-index: -1;
  display: flex;
  flex-direction: column;
}

.main .title {
  font-size: 40rpx;
  font-weight: bold;
  margin: 30rpx 30rpx 0;
}

.main .origin {
  display: flex;
  flex-direction: row;
  font-size: 25rpx;
  margin: 30rpx;
  color: rgb(61, 61, 61);
  width: 175rpx;
  justify-content: space-between;
}

.main .img {
  background-size: 100%;
  border-radius: 20rpx;
  width: 90vw;
  height: 300rpx;
  margin: 0 auto 30rpx;
}

.main .article {
  margin: 0 40rpx;
}

.bar-btn {
  background-color: white;
  width: 100vw;
  height: 100rpx;
  position: fixed;
  top: 100%;
  transform: translateY(-100%);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.bar-btn .comment {
  background-color: rgba(204, 204, 204, 0.486);
  height: 35px;
  width: 400rpx;
  border-radius: 30rpx;
  padding-left: 30rpx;
}

.bar-btn .discuss,
.bar-btn .like,
.bar-btn .more {
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
</style>
