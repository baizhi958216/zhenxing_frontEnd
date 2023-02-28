<template>
  <!-- 热门事件 -->
  <view class="tag-hot">
    <view class="tag">热门事件</view>
  </view>
  <!-- 热门事件swiper -->
  <swiper class="hotswiper">
    <view v-for="(hot, index) in news_hot" :key="index">
      <swiper-item>
        <view class="hot-item">
          <view
            class="markablepic"
            :style="{
              backgroundImage: hot.irPho,
            }"
            @click="toGeneral(hot.irId)"
            >{{ hot.irTitle }}</view
          >
          <!-- 此处应该是热门事件来源 -->
          <!-- <view class="origin">{{item.createTime}}·{{item.updateTime}}</view> -->
        </view>
      </swiper-item>
    </view>
  </swiper>

  <!-- 全网在看 -->
  <view class="tag-focus">
    <view class="tag">全网在看</view>
  </view>
  <!-- 全网在看list -->
  <block v-for="(focus, index) in news_focus" :key="index">
    <view class="focus" @click="toGeneral(focus.irId)">
      <view class="focus-left">
        <view class="describe">{{ focus.irTitle }}</view>
        <!-- 此处应该是全网在看来源 -->
        <!-- <view class="origin">{{item.focus_origin}}·{{item.focus_time}}</view> -->
      </view>
      <view
        class="focus-right"
        :style="{
          backgroundImage: focus.irPho,
        }"
      ></view>
    </view>
  </block>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import useHomeStore from "@/stores/home";
const homeStore = useHomeStore();

let news_hot = reactive<
  Array<{ irId: string; irTitle: string; irPho: string }>
>([]);
let news_focus = reactive<
  Array<{ irId: string; irTitle: string; irPho: string }>
>([]);

homeStore.getRecommend().then((res) => {
  res.data.map((data: any) => {
    if (data.recommendLocation && data.recommendLocation == "up") {
      data.irPho = `url(${
        import.meta.env.VITE_BACKEND_URL
      }/common/download/?name=${data.irPho})`;
      news_hot.push(data);
    } else if (data.recommendLocation && data.recommendLocation == "down") {
      data.irPho = `url(${
        import.meta.env.VITE_BACKEND_URL
      }/common/download/?name=${data.irPho})`;
      news_focus.push(data);
    } else {
      console.log("未知推荐地址");
    }
  });
});
const toGeneral = (irId: string) => {
  uni.navigateTo({
    url: `/subs/ZhenXing/subs/TuiJian/General?irId=${irId}`,
  });
};
</script>
<style scoped>
.tag-hot,
.tag-focus {
  font-size: 32rpx;
  margin-left: 40rpx;
}

.tag-hot::before,
.tag-focus::before {
  content: "";
  position: absolute;
  width: 9rpx;
  height: 50rpx;
  background-color: blue;
  left: 0;
  border-top-right-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
}

.hot-item {
  margin: 30rpx;
}

.hot-item .markablepic {
  background-size: 100%;
  width: 400rpx;
  height: 250rpx;
  border-radius: 25rpx;
  display: flex;
  align-items: flex-end;
  padding-left: 15rpx;
  padding-right: 50rpx;
  padding-bottom: 20rpx;
  line-height: 50rpx;
  color: white;
}

.hot-item .origin {
  font-size: 25rpx;
  margin: 10rpx 0 10rpx 10rpx;
}

.hotswiper {
  height: 360rpx;
}

.focus {
  display: flex;
  flex-direction: row;
  padding: 20rpx;
  justify-content: space-around;
  border-bottom: 1rpx solid rgba(201, 201, 201, 0.452);
}

.focus .focus-left {
  display: flex;
  flex-direction: column;
  width: 450rpx;
  justify-content: space-around;
}

.focus .focus-left .describe {
  font-size: 35rpx;
  font-weight: bold;
}

.focus .focus-left .origin {
  font-size: 25rpx;
  color: rgba(151, 151, 151, 0.801);
}

.focus .focus-right {
  background-size: 160%;
  background-position: center;
  background-repeat: no-repeat;
  width: 120px;
  height: 120px;
}
</style>
