<template>
  <view style="padding: 0 40rpx">
    <header-view :has_item="false" />
    <view class="h_firstwrap h_flex">
      <view class="h_location h_flex">{{ location }}</view>
      <view class="h_search h_flex">
        <uni-icons type="search" size="20" color="#cac8d5"></uni-icons>
        <view style="color: #cac8d5; margin-left: 10rpx">{{
          searchRecommend
        }}</view>
      </view>
    </view>
    <y-carousel
      :info="info"
      round
      dot-background="#ddd5d1"
      select-dot-background="#f54764"
      :dot-size="3"
      shadow
    />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import HeaderView from "@/components/HeaderView.vue";
import YCarousel from "@/components/YunBase/YCarousel/YCarousel.vue";
import useUserStore from "@/stores/user";
import useHomeStore from "@/stores/home";
import type { IRecommend } from "@/includes/Home.interface";
import { reactive, ref } from "vue";

const store = useUserStore();
const homeStore = useHomeStore();

let info = reactive(homeStore.topRecommend);
const location = ref(store.userLocation);
const searchRecommend = ref("中秋节的好去处");

onLoad(() => {
  if (!store.userLoggedIn) {
    uni.reLaunch({
      url: "/views/Login/Login",
    });
    return;
  }
  store
    .authenticate({
      user_account: store.userData.userPhone,
      user_psw: store.userData.userPwd,
    })
    .then((res) => {
      uni.setStorageSync("JSESSIONID", res.res.cookies[0]);
      homeStore.getRecommend().then((res: IRecommend) => {
        res.data.map((el) => {
          if (el.recommendLocation) {
            switch (el.recommendLocation) {
              case "up":
                homeStore.topRecommend.push({
                  sid: el.sid,
                  background: `url(${
                    import.meta.env.VITE_BACKEND_URL
                  }/common/download/?name=${el.irPho})`,
                } as never);
                break;
              case "down":
                homeStore.bottomRecommend.push({
                  sid: el.sid,
                  background: `url(${
                    import.meta.env.VITE_BACKEND_URL
                  }/common/download/?name=${el.irPho})`,
                } as never);
                break;
              default:
                break;
            }
          }
        });
      });
    });
});
</script>

<style scoped lang="scss">
.h_flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.h_firstwrap {
  margin-top: 10rpx;
  height: 60rpx;

  .h_location {
    height: 60rpx;
    font-size: 30rpx;
    font-weight: bold;
  }
  .h_search {
    margin-left: 20rpx;
    width: 85%;
    height: 60rpx;
    background-color: #f8f7f9;
    border-radius: 50rpx;
  }
}
</style>
