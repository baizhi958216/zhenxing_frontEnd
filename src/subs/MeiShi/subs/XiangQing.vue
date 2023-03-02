<template>
  <header-view
    :has_item="true"
    has_back
    title="美食详情"
    :back_background="false"
  />
  <view :style="{ paddingTop: `${top + height}px ` }">
    <view class="food">
      <view
        class="food_img"
        :style="{
          background: `url(${detail.spho}) no-repeat center`,
          backgroundSize: '100%',
        }"
      ></view>
      <view class="food_score">
        <text>
          {{ detail.storeName }}
        </text>
        <text>
          {{ detail.score }}
        </text>
      </view>
      <!-- TODO: 推荐餐厅 -->
      <view class="canteen_recom" v-if="false">
        <text>推荐餐厅</text>
        <!-- 遍历推荐餐厅 -->
        <view>
          <view class="canteen_img" style="background-color: cyan"></view>
        </view>
      </view>
      <view class="food_detail">
        <text>菜品简介:</text>
        <text>
          {{ detail.storeIntroduce }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import HeaderView from "@/components/HeaderView.vue";
import { YFetch } from "@/includes/YFetch";
import { ref } from "vue";
import type { IMeiShi } from "@/includes/MeiShi.interface";

const { height, top } = uni.getMenuButtonBoundingClientRect();

const detail = ref<IMeiShi>({ spho: "rgba(0,0,0)" });

onLoad((options) => {
  YFetch(
    `/store/id/${options!.sid}`,
    "GET",
    {},
    {
      cookie: uni.getStorageSync("JSESSIONID"),
    }
  ).then((res) => {
    const { storeName, score, storeIntroduce, spho } = res.data
      .data[0] as IMeiShi;
    let score1 = "";
    let spho1 = [];
    spho1 = spho!.split(",");
    for (let index = 0; index < score!; index++) {
      score1 += "⭐";
    }
    detail.value = {
      score: score1,
      storeName: storeName,
      storeIntroduce: storeIntroduce,
      spho: `${import.meta.env.VITE_BACKEND_URL}/common/download/?name=${
        spho1[0]
      }`,
    };
  });
});
</script>

<style scoped>
.food {
  position: relative;
  top: 130rpx;
  display: flex;
  flex-direction: column;
}

.food_img {
  height: 380rpx;
  width: 90%;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, 0.445);
  margin: 0 auto;
  margin-bottom: 80rpx;
}

.food_score {
  width: 60vw;
  display: flex;
  justify-content: space-between;
  margin: 0 0 50rpx 100rpx;
}

.canteen_recom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 70vw;
  margin: 0 0 0 100rpx;
}

.canteen_img {
  width: 100rpx;
  height: 100rpx;
  background-size: 100%;
  border-radius: 50%;
}

.food_detail {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 700rpx;
  padding: 0 150rpx;
}

.food_detail text {
  color: #707070;
  font-size: 26rpx;
}

.food_detail text:nth-child(2) {
  width: 450rpx;
}
</style>
