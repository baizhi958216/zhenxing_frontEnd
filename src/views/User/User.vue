<template>
  <header-view
    :has_item="true"
    :has_back="hasBack"
    :title="'我的'"
    background="rgba(0,0,0,0)"
  />
  <view
    :style="{
      background: `url(${TeaFile('user', 'bg.png')}) no-repeat`,
      backgroundSize: '100%',
      width: '100vw',
      height: '100vh',
    }"
  >
    <view :style="{ padding: `${top + height}px 0 100rpx 0` }">
      <view class="u_profile">
        <!-- 头像 -->
        <view
          style="
            background-color: rgba(0, 0, 0, 0.3);
            width: 100rpx;
            height: 100rpx;
            border-radius: 50%;
          "
        ></view>
        <!-- 昵称/联系方式 -->
        <view style="width: 50%">
          <view style="font-weight: bold; font-size: 30rpx">
            {{ userStore.userData.userName }}
          </view>
          <view style="font-size: 26rpx">
            {{ userStore.userData.userPhone }}
          </view>
        </view>
        <!-- 编辑资料 -->
        <view style="display: flex; align-items: center" @click="toProfile">
          <uni-icons color="white" type="compose" size="20"></uni-icons>
          <view style="color: white">编辑资料</view>
        </view>
      </view>
      <view class="u_featuresCard">
        <template v-for="feature in featuresCard" :key="feature.imgsrc">
          <y-card
            :link="feature.url"
            :img-src="`url(${TeaFile('user', `${feature.imgsrc}.png`)})`"
          >
            {{ feature.title }}
          </y-card>
        </template>
      </view>
      <view class="u_featuresList_wrap">
        <view
          v-for="feature in featuresList"
          :key="feature.title"
          class="u_featuresList"
          @click="toFeature(feature.url)"
        >
          <view>{{ feature.title }}</view>
          <uni-icons color="black" type="right" size="20"></uni-icons>
        </view>
      </view>
      <view class="u_settled">
        <view style="width: 70%; margin: 0 auto; display: flex"
          >想入驻成为商家?&nbsp;<view @click="toTenants">点击注册</view>
        </view>
        <y-button
          shadow
          background="#475bf4"
          radius
          :width="650"
          @click="logOut"
          >退出账号</y-button
        >
      </view>
    </view>
  </view>
  <nav-bar />
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import NavBar from "@/components/NavBar.vue";
import YCard from "@/components/YunBase/YFeatureCard/YCard.vue";
import YButton from "@/components/YunBase/YButton/YButton.vue";
import { TeaFile } from "@/includes/GiteaImageDisk";
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";
import useUserStore from "@/stores/user";
const { height, top } = uni.getMenuButtonBoundingClientRect();

const userStore = useUserStore();
const hasBack = ref(true);
const featuresList = reactive([
  {
    url: "dd",
    title: "我的订单",
  },
  {
    url: "sc",
    title: "我的收藏",
  },
  {
    url: "tz",
    title: "消息通知",
  },
  {
    url: "zh",
    title: "账号设置",
  },
  {
    url: "bz",
    title: "帮助与反馈",
  },
  {
    url: "sj",
    title: "商家管理",
  },
]);
const featuresCard = reactive([
  {
    url: "fk",
    imgsrc: "dfk",
    title: "待付款",
  },
  {
    url: "dsy",
    imgsrc: "dsy",
    title: "待使用",
  },
  {
    url: "ysy",
    imgsrc: "ysy",
    title: "已使用",
  },
  {
    url: "wdpj",
    imgsrc: "wdpj",
    title: "我的评价",
  },
]);
onLoad((option) => {
  hasBack.value = !option!.back;
});

const toProfile = () => {
  console.log("编辑资料");
};

const toFeature = (url: string) => {
  console.log(url);
};

const toTenants = () => {
  console.log("商家注册");
};

const logOut = () => {
  console.log("登出");
};
</script>

<style scoped>
.u_profile {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.u_featuresCard {
  background-color: white;
  height: 260rpx;
  width: 80%;
  margin: 0 auto;
  margin-top: 40rpx;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.u_featuresList_wrap {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  margin-top: 20rpx;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
}

.u_featuresList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  height: 100rpx;
  font-size: 32rpx;
}

.u_settled {
  padding-top: 140rpx;
}
</style>
