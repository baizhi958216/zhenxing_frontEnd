<template>
  <header-view
    :has_item="true"
    has_back
    title="消息通知"
    :back_background="false"
  />
  <view :style="{ padding: `${top + height}px 60rpx 100rpx 60rpx` }">
    <view class="un_feature">
      <view>通知提醒</view>
      <switch :checked="toast" color="#3280f3" @change="toastChange" />
    </view>
    <view class="un_feature">
      <view>私信提醒</view>
      <switch :checked="pm" color="#3280f3" @change="pmChange" />
    </view>
    <view class="un_feature">
      <view>开启震动</view>
      <switch :checked="vibration" color="#3280f3" @change="vibrationChange" />
    </view>
  </view>
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import useUserStore from "@/stores/user";
import { ref } from "vue";
const userStore = useUserStore();
const { height, top } = uni.getMenuButtonBoundingClientRect();

const toast = ref(userStore.userNotice.toast);
const pm = ref(userStore.userNotice.pm);
const vibration = ref(userStore.userNotice.vibration);

const toastChange = (val: any) => {
  userStore.userNotice.toast = val.detail.value;
};
const pmChange = (val: any) => {
  userStore.userNotice.pm = val.detail.value;
};
const vibrationChange = (val: any) => {
  userStore.userNotice.vibration = val.detail.value;
};
</script>

<style scoped>
.un_feature {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25rpx 0;
}
</style>
