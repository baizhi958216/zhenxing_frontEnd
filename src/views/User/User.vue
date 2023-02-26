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
    <view class="u_featuresCard"> </view>
    <view class="u_featuresList"> </view>
  </view>
  <nav-bar />
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import NavBar from "@/components/NavBar.vue";
import { TeaFile } from "@/includes/GiteaImageDisk";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import useUserStore from "@/stores/user";
const userStore = useUserStore();
const hasBack = ref(true);

onLoad((option) => {
  hasBack.value = !option!.back;
});

const toProfile = () => {
  console.log("Help");
};
</script>

<style scoped>
.u_profile {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 200rpx;
}

.u_featuresCard {
  background-color: white;
  height: 260rpx;
  width: 80%;
  margin: 0 auto;
  margin-top: 40rpx;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
}

.u_featuresList {
  background-color: white;
  width: 80%;
  height: 600rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
}
</style>
