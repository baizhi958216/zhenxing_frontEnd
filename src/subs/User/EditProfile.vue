<template>
  <header-view
    :has_item="true"
    has_back
    title="个人信息"
    :back_background="false"
  />
  <view :style="{ padding: `${top + height}px 60rpx 100rpx 60rpx` }">
    <view class="ep_feature" @click="changePhoto">
      <view>头像</view>
      <view class="ep_profile">
        <view
          class="ep_profile_head"
          :style="{
            background: `url(${userPhoto})`,
            backgroundSize: '100%',
          }"
        ></view>
      </view>
      <uni-icons color="black" type="right" size="20"></uni-icons>
    </view>
    <view class="ep_feature" @click="changeName">
      <view>昵称</view>
      <view class="ep_profile">{{ userName }}</view>
      <uni-icons color="black" type="right" size="20"></uni-icons>
    </view>
    <view class="ep_feature">
      <view>账号</view>
      <view class="ep_profile">{{ userStore.userData.userPhone }}</view>
      <uni-icons color="black" type="right" size="20"></uni-icons>
    </view>
    <view class="ep_feature">
      <view>更多信息</view>
      <uni-icons color="black" type="right" size="20"></uni-icons>
    </view>
    <view class="ep_feature">
      <view>注册时间</view>
      <view class="ep_profile">{{ userStore.userData.createTime }}</view>
      <uni-icons color="black" type="right" size="20"></uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import { UploadImage } from "../includes/UploadImage";
import useUserStore from "@/stores/user";
import { ref } from "vue";
const { height, top } = uni.getMenuButtonBoundingClientRect();
const userStore = useUserStore();

const userPhoto = ref(userStore.userData.userPhoto);
const userName = ref(userStore.userData.userName);

const changePhoto = async () => {
  await UploadImage()
    .then((res) => {
      userStore.updateuser({
        userName: userName.value,
        userPhoto: res.data,
        photo: true,
      });
    })
    .catch(() => {
      uni.showModal({
        title: "提示",
        content: "图片太大, 请压缩后上传",
        showCancel: false,
      });
    });
  setTimeout(() => {
    uni.redirectTo({
      url: "/subs/User/EditProfile",
    });
  }, 2000);
};

const changeName = () => {
  uni.showModal({
    editable: true,
    title: "修改昵称",
    placeholderText: userName.value,
    success: async (val) => {
      if (val.content) {
        await userStore.updateuser({
          userName: val.content,
          userPhoto: userPhoto.value,
          photo: false,
        });
        userName.value = userStore.userData.userName;
      }
    },
  });
};
</script>

<style scoped>
.ep_feature {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
  margin: 20rpx 0;
  font-size: 30rpx;
}

.ep_profile {
  width: 70%;
  text-align: right;
}

.ep_profile_head {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: antiquewhite;
  float: right;
}
</style>
