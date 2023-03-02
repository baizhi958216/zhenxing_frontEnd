<template>
  <header-view
    :has_item="true"
    :has_back="true"
    :back_background="false"
    custom
  >
    <template #h_custom>
      <y-input :width="250" :height="55" placeholder="美食" />
    </template>
  </header-view>
  <view :style="{ paddingTop: `${top + height}px ` }">
    <view class="fx_zhenxing_wrap">
      <view :class="fx_active == 0 ? 'fx_active' : ''" @click="fx_active = 0">
        推荐
      </view>
      <view :class="fx_active == 1 ? 'fx_activel' : ''" @click="fx_active = 1">
        人才振兴
      </view>
      <view :class="fx_active == 2 ? 'fx_activel' : ''" @click="fx_active = 2">
        产业振兴
      </view>
      <view :class="fx_active == 3 ? 'fx_activel' : ''" @click="fx_active = 3">
        生态振兴
      </view>
    </view>
    <view
      class="fx_topRecommand"
      :style="{
        background: `url(${topRecommend.url}) no-repeat center`,
        backgroundSize: 'center',
      }"
      @click="toXiangQing(topRecommend.sid)"
    ></view>

    <view
      style="
        display: flex;
        justify-content: space-between;
        padding: 40rpx 30rpx;
        align-items: center;
      "
    >
      <view class="fx_youxuan">为你优选</view>
      <navigator open-type="navigateBack">
        <view>更多</view>
      </navigator>
    </view>

    <view class="fx_list">
      <view
        class="fx_item"
        v-for="meishi in meishiList"
        :key="meishi.storeId"
        @click="toXiangQing(meishi.storeId)"
      >
        <view
          :style="{
            background: meishi.spho,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '180rpx',
            height: '80%',
            borderRadius: '30rpx',
          }"
        ></view>
        <view style="width: 60%; height: 80%; padding: 20rpx">
          <view style="display: flex; justify-content: space-between">
            <view style="font-weight: bold">{{ meishi.storeName }}</view>
            <uni-icons type="heart" size="30"></uni-icons>
          </view>
          <view>{{ meishi.storeIntroduce }}</view>
          <view
            style="
              display: flex;
              position: relative;
              top: 50%;
              transform: translateY(-50%);
              justify-content: space-between;
              align-items: center;
            "
          >
            <view>
              <uni-icons
                type="star-filled"
                size="25"
                v-for="i in meishi.score"
                color="#f55951"
                :key="i"
              ></uni-icons>
            </view>
            <view style="color: #888893">14k</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import YInput from "@/components/YunBase/YInput/YInput.vue";
import type { IMeiShi } from "@/includes/MeiShi.interface";
import { YFetch } from "@/includes/YFetch";
import { reactive, ref } from "vue";
const { height, top } = uni.getMenuButtonBoundingClientRect();

const fx_active = ref(0);

const topRecommend = ref({
  sid: "1568079759376211969",
  url: "https://tuchuangs.com/imgs/2022/05/26/5cd30fe855924bab.png",
});

const toXiangQing = (sid: string | undefined) => {
  uni.navigateTo({
    url: `/subs/MeiShi/subs/XiangQing?sid=${sid}`,
  });
};

const meishiList = reactive<Array<IMeiShi>>([]);

YFetch(
  "/store/list",
  "GET",
  {},
  {
    cookie: uni.getStorageSync("JSESSIONID"),
  }
).then((res) => {
  res.data.data.map((data: IMeiShi) => {
    // 不渲染无图片的
    if (data.spho && data.spho != "...") {
      let _spho = data.spho.split(",");
      let score1 = "";
      for (let index = 0; index < data.score!; index++) {
        score1 += "⭐";
      }
      data.score = score1;
      data.spho = `url(${
        import.meta.env.VITE_BACKEND_URL
      }/common/download/?name=${_spho[0]})`;
      meishiList.push(data);
    }
  });
});
</script>
<style scoped>
.fx_zhenxing_wrap {
  display: flex;
  font-size: 32rpx;
  align-items: center;
  justify-content: space-evenly;
  padding: 20rpx;
  color: #6b6b6be3;
}
.fx_active,
.fx_activel {
  color: black;
  font-size: 35rpx;
  font-weight: bold;
}
.fx_active::before {
  content: "";
  width: 58rpx;
  height: 10rpx;
  border-radius: 60rpx;
  position: absolute;
  margin-top: 45rpx;
  background: linear-gradient(to right, #65b1ff, #60e0ff);
}
.fx_activel::before {
  content: "";
  width: 130rpx;
  height: 10rpx;
  border-radius: 60rpx;
  position: absolute;
  margin-top: 45rpx;
  background: linear-gradient(to right, #65b1ff, #60e0ff);
}
.fx_topRecommand {
  width: 90%;
  height: 400rpx;
  margin: 0 auto;
  border-radius: 25rpx;
  box-shadow: 2rpx 10rpx 10rpx rgba(128, 128, 128, 0.479);
}
.fx_youxuan {
  font-size: 35rpx;
  font-weight: bold;
}
.fx_youxuan::before {
  content: "";
  width: 130rpx;
  height: 10rpx;
  border-radius: 60rpx;
  position: absolute;
  margin-top: 32rpx;
  z-index: -100;
  background: #ff673d;
}
.fx_list {
  margin: 0 auto;
  width: 90%;
  padding-bottom: 20rpx;
}
.fx_item {
  border-radius: 40rpx;
  height: 300rpx;
  margin-bottom: 20rpx;
  background-color: white;
  box-shadow: 0 0 5rpx #dbdbdb8e;
  display: flex;
  align-items: center;
}
.fx_item::before {
  content: "";
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 30% !important;
  height: 300rpx;
  border-radius: 60rpx;
  position: absolute;
  z-index: -100;
  background: #fa967b8e;
  filter: blur(9px);
}
</style>
