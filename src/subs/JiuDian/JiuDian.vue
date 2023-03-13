<template>
  <header-view
    :has_item="true"
    has_back
    :back_background="false"
    title="酒店住宿"
  />
  <view :style="{ padding: `${top + height}px 40rpx 100rpx 40rpx` }">
    <!-- 本地推荐 -->
    <view
      class="jd_recom"
      :style="{
        background: jd_recom!.imgsrc,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
      }"
      @click="navTo(jd_recom!.jd_id)"
    ></view>
    <!-- 本地所有 -->
    <view class="jd_all">
      <view
        class="jd_item"
        :style="{
          background: `url(${TeaFile('jiudian', 'r_item_bg.png')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
        }"
        v-for="jd in jd_local"
        :key="jd.jd_id"
        @click="navTo(jd.jd_id)"
      >
        <view
          :style="{
            background: jd.imgsrc,
            width: '45%',
            height: '120px',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
          }"
        ></view>
        <view class="jd_item_r">
          <view class="jd_item_r_title">{{ jd.title }}</view>
          <view class="jd_item_r_rate">
            <view style="margin: 0 10rpx">评分: {{ jd.rate + ".0" }}</view>
            <view>
              <uni-icons
                type="star-filled"
                size="20"
                v-for="i in jd.rate"
                color="#f55951"
                :key="i"
              />
            </view>
          </view>
          <view class="jd_item_r_misc">
            <view class="jd_item_r_misc_collect">收藏</view>
            <view style="display: flex; align-items: baseline">
              <view style="color: #d43030; font-size: 45rpx">
                {{ jd.expense }}
              </view>
              <view style="font-size: 40rpx">元</view>
              <view>起</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <nav-bar />
</template>
<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import NavBar from "@/components/NavBar.vue";
import { TeaFile } from "@/includes/GiteaImageDisk";
import { ref, reactive } from "vue";
const { height, top } = uni.getMenuButtonBoundingClientRect();
interface ILocalJD {
  jd_id: number;
  imgsrc: string;
  title?: string;
  rate?: number;
  expense?: string;
}
// 推荐项
const jd_recom = ref<ILocalJD>();
jd_recom.value = {
  jd_id: 0,
  imgsrc: `url(${TeaFile("login", "sky.png")})`,
};

// 本地项
let jd_local = reactive<ILocalJD[]>([]);
jd_local = [
  {
    jd_id: 1,
    imgsrc: `url(${TeaFile("login", "sky.png")})`,
    title: "白云大田小民宿",
    rate: 1,
    expense: "89",
  },
  {
    jd_id: 2,
    imgsrc: `url(${TeaFile("login", "sky.png")})`,
    title: "京海白金瀚",
    rate: 5,
    expense: "299",
  },
  {
    jd_id: 3,
    imgsrc: `url(${TeaFile("login", "sky.png")})`,
    title: "白云白金瀚",
    rate: 5,
    expense: "599",
  },
];

const navTo = (jd_id: number) => {
  uni.navigateTo({
    url: `/subs/JiuDian/sub/XiangQing?jd_id=${jd_id}`,
  });
};
</script>
<style scoped>
.jd_recom {
  height: 300rpx;
  border: 10rpx solid #fdc591cb;
  border-radius: 20rpx;
}
.jd_item {
  display: flex;
  margin: 20rpx;
  height: 120px;
}
.jd_item_r {
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.jd_item_r_title {
  font-weight: bold;
  font-size: 38rpx;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.jd_item_r_rate {
  color: #d43030;
  font-weight: bold;
  font-size: 24rpx;
  display: flex;
  align-items: center;
}
.jd_item_r_misc {
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 80rpx;
  justify-content: space-around;
}
.jd_item_r_misc_collect {
  background-color: white;
  padding: 5rpx 20rpx;
  border-radius: 30rpx;
  font-size: 25rpx;
}
</style>
