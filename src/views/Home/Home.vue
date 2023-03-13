<template>
  <header-view />
  <view :style="{ padding: `${top + height}px 40rpx 100rpx 40rpx` }">
    <view class="h_firstwrap h_flex">
      <view class="h_location h_flex">
        <picker @change="chooseLocation" mode="region">
          <view class="uni-input">{{ location }}</view>
        </picker>
      </view>
      <view class="h_search h_flex" @click="toSearch(searchRecommend)">
        <uni-icons type="search" size="20" color="#cac8d5"></uni-icons>
        <view style="color: #cac8d5; margin-left: 10rpx">
          {{ searchRecommend }}
        </view>
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
    <CardCarousel
      :info="featureItems"
      :height="350"
      dot-background="#eeeeee"
      select-dot-background="#575759"
      :dotstyle="'round'"
    />
    <view style="font-weight: bold; margin: 20rpx 0">最新推荐</view>
    <view style="margin-bottom: 20rpx" v-for="info in info1" :key="info.sid">
      <y-card
        inner
        width="100%"
        height="240rpx"
        round
        :img-src="info.background"
      >
        <template #title>{{ info.title }}</template>
        <template #desc>{{ info.desc }}</template>
      </y-card>
    </view>
  </view>
  <nav-bar />
</template>

<script setup lang="ts">
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
import HeaderView from "@/components/HeaderView.vue";
import YCarousel from "@/components/YunBase/YCarousel/YCarousel.vue";
import CardCarousel from "@/components/YunBase/YCarousel/CardCarousel.vue";
import YCard from "@/components/YunBase/YFeatureCard/YCard.vue";
import NavBar from "@/components/NavBar.vue";
import useUserStore from "@/stores/user";
import useHomeStore from "@/stores/home";
import type { IRecommend } from "@/includes/Home.interface";
import { reactive, ref } from "vue";
import { TeaFile } from "@/includes/GiteaImageDisk";

const store = useUserStore();
const homeStore = useHomeStore();

onLoad(() => {
  if (!store.userLoggedIn) {
    uni.reLaunch({
      url: "/views/Login/Login",
    });
    return;
  }
});

const { height, top } = uni.getMenuButtonBoundingClientRect();

let info = reactive(homeStore.topRecommend);
let info1 = reactive(homeStore.bottomRecommend);
const location = ref(store.userLocation[2]);
const searchRecommend = ref("中秋节的好去处");
const featureItems = reactive([
  {
    list: [
      {
        link: "/subs/ZhenXing/ZhenXing",
        imgSrc: TeaFile("myhome", "xczx.png"),
        title: "乡村振兴",
      },
      {
        link: "/subs/SanNong/SanNong",
        imgSrc: TeaFile("myhome", "jjsn.png"),
        title: "聚焦三农",
      },
      { link: "", imgSrc: TeaFile("myhome", "szxc.png"), title: "数字乡村" },
      {
        link: "/subs/LvYou/LvYou",
        imgSrc: TeaFile("myhome", "xcly.png"),
        title: "乡村旅游",
      },
      {
        link: "/subs/MeiShi/MeiShi",
        imgSrc: TeaFile("myhome", "xcms.png"),
        title: "乡村美食",
      },
      {
        link: "/subs/JiuDian/JiuDian",
        imgSrc: TeaFile("myhome", "jdzs.png"),
        title: "酒店住宿",
      },
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

const getRecommend = async () => {
  await homeStore.getRecommend().then((res: IRecommend) => {
    if (res.data) {
      res.data.map((el) => {
        if (el.recommendLocation) {
          switch (el.recommendLocation) {
            case "up":
              homeStore.topRecommend.push({
                sid: el.sid,
                background: `url(${
                  import.meta.env.VITE_BACKEND_URL
                }/common/download/?name=${el.irPho})`,
              });
              break;
            case "down":
              homeStore.bottomRecommend.push({
                sid: el.sid,
                background: `url(${
                  import.meta.env.VITE_BACKEND_URL
                }/common/download/?name=${el.irPho})`,
                title: el.irTitle,
                desc: el.irIntroduce,
              });
              break;
            default:
              break;
          }
        }
      });
    } else {
      uni.reLaunch({
        url: "/views/Login/Login",
      });
    }
  });
};

const chooseLocation = (value: any) => {
  store.userLocation = value.detail.value;
  location.value = store.userLocation[2];
  // 选择完成后获取对应推荐
};
const toSearch = (searchRecommend: string) => {
  uni.navigateTo({
    url: `/views/Search/Search?recommend=${searchRecommend}`,
  });
};

if (!homeStore.topRecommend.length && store.userLoggedIn) {
  homeStore.getLocation().then((data) => {
    const { province, city, district } = data;
    store.userLocation = [`${province}`, `${city}`, `${district}`];
    location.value = store.userLocation[2];
  });
  getRecommend();
}

onPullDownRefresh(async () => {
  setTimeout(function () {
    uni.stopPullDownRefresh();
  }, 500);
  homeStore.bottomRecommend = [];
  homeStore.topRecommend = [];
  await getRecommend();
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
    width: 75%;
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
