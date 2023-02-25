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
      autoplay
      circular
    />
    <y-carousel
      :custom-info="featureItems"
      :height="350"
      custom
      dot-background="#eeeeee"
      select-dot-background="#575759"
      :dotstyle="'round'"
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
import { TeaFile } from "@/includes/GiteaImageDisk";

const store = useUserStore();
const homeStore = useHomeStore();

let info = reactive(homeStore.topRecommend);
const location = ref(store.userLocation);
const searchRecommend = ref("中秋节的好去处");
const featureItems = reactive([
  {
    list: [
      {
        link: "news",
        imgSrc: TeaFile("myhome", "xczx.png"),
        title: "乡村振兴",
      },
      { link: "", imgSrc: TeaFile("myhome", "jjsn.png"), title: "聚焦三农" },
      { link: "", imgSrc: TeaFile("myhome", "szxc.png"), title: "数字乡村" },
      {
        link: "tourism",
        imgSrc: TeaFile("myhome", "xcly.png"),
        title: "乡村旅游",
      },
      {
        link: "gourmet",
        imgSrc: TeaFile("myhome", "xcms.png"),
        title: "乡村美食",
      },
      { link: "", imgSrc: TeaFile("myhome", "jdzs.png"), title: "酒店住宿" },
      { link: "", imgSrc: TeaFile("myhome", "zxzk.png"), title: "振兴智库" },
      { link: "", imgSrc: TeaFile("myhome", "dygb.png"), title: "党员干部" },
      { link: "", imgSrc: TeaFile("myhome", "fwqz.png"), title: "服务群众" },
      { link: "", imgSrc: TeaFile("myhome", "djgx.png"), title: "对接高校" },
    ],
  },
  {
    list: [
      { link: "", imgSrc: TeaFile("myhome", "zcgh.png"), title: "政策规划" },
    ],
  },
]);

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
.h_features {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 200rpx;
  background-color: rgb(255, 217, 217);
}
</style>
