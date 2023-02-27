<template>
  <header-view
    :has_item="true"
    has_back
    title="账号设置"
    :back_background="false"
  />
  <view
    :style="{
      paddingTop: `${top + height}px`,
      backgroundColor: '#f5f5f5',
      height: '95vh',
    }"
  >
    <!-- 基本设置 -->
    <view style="background-color: white; padding: 0 60rpx">
      <view style="padding: 20rpx 0; font-size: 25rpx; color: #acacac"
        >基本设置</view
      >
      <view class="us_feature">
        <view>我的账号</view>
        <uni-icons color="black" type="right" size="20"></uni-icons>
      </view>
      <view class="us_feature">
        <view>实名认证</view>
        <uni-icons color="black" type="right" size="20"></uni-icons>
      </view>
      <view class="us_feature">
        <view>绑定手机</view>
        <uni-icons color="black" type="right" size="20"></uni-icons>
      </view>
      <view class="us_feature">
        <view>修改登录密码</view>
        <uni-icons color="black" type="right" size="20"></uni-icons>
      </view>
    </view>
    <!-- 社交帐号绑定 -->
    <view>
      <view style="padding: 25rpx 60rpx; font-size: 25rpx; color: #999999">
        社交帐号绑定
      </view>
      <view
        class="us_feature"
        style="
          background-color: white;
          margin-bottom: 5rpx;
          padding: 20rpx 60rpx;
        "
      >
        <view class="us_feature_socal">
          <view
            :style="{
              width: '70rpx',
              height: '70rpx',
              backgroundSize: '100%',
              background: `url(${TeaFile('user', 'wechat.png')}) no-repeat`,
              backgroundPosition: 'center',
            }"
          ></view>
          <view>微信</view>
        </view>
        <view
          class="us_bind"
          :class="wechat ? 'us_binded' : 'us_unbind'"
          @click="changeBindWechat"
        >
          {{ wechat ? "解绑" : "绑定" }}
        </view>
      </view>
      <view
        class="us_feature"
        style="
          background-color: white;
          margin-bottom: 5rpx;
          padding: 20rpx 60rpx;
        "
      >
        <view class="us_feature_socal">
          <view
            :style="{
              width: '70rpx',
              height: '70rpx',
              backgroundSize: '100%',
              background: `url(${TeaFile('user', 'qq.png')}) no-repeat`,
              backgroundPosition: 'center',
            }"
          ></view>
          <view>QQ</view>
        </view>
        <view
          class="us_bind"
          :class="qq ? 'us_binded' : 'us_unbind'"
          @click="changeBindQQ"
        >
          {{ qq ? "解绑" : "绑定" }}
        </view>
      </view>
      <view
        class="us_feature"
        style="background-color: white; padding: 20rpx 60rpx"
      >
        <view class="us_feature_socal">
          <view
            :style="{
              width: '70rpx',
              height: '70rpx',
              backgroundSize: '100%',
              background: `url(${TeaFile('user', 'weibo.png')}) no-repeat`,
              backgroundPosition: 'center',
            }"
          ></view>
          <view>微博</view>
        </view>
        <view
          class="us_bind"
          :class="weibo ? 'us_binded' : 'us_unbind'"
          @click="changeBindWeibo"
        >
          {{ weibo ? "解绑" : "绑定" }}
        </view>
      </view>
    </view>
    <!-- 占位 -->
    <view style="height: 15rpx"></view>
    <!-- 账户注销 -->
    <view style="background-color: white; padding: 0 60rpx">
      <view class="us_feature">
        <view>账户注销</view>
        <uni-icons color="black" type="right" size="20"></uni-icons>
      </view>
    </view>
    <view style="height: 5rpx"></view>
    <!-- 安全中心 -->
    <view style="background-color: white; padding: 0 60rpx">
      <view class="us_feature">
        <view>安全中心</view>
        <uni-icons color="black" type="right" size="20"></uni-icons>
      </view>
    </view>
    <view style="padding: 15rpx 60rpx; font-size: 23rpx; color: #b8b8b8">
      如果到账号信息泄露，诈骗，忘记密码等账户安全问题, 可前往安全中心。
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeaderView from "@/components/HeaderView.vue";
import useUserStore from "@/stores/user";
import { TeaFile } from "@/includes/GiteaImageDisk";
const userStore = useUserStore();
const { height, top } = uni.getMenuButtonBoundingClientRect();

const wechat = ref(userStore.socialBindings.wechat);
const qq = ref(userStore.socialBindings.qq);
const weibo = ref(userStore.socialBindings.weibo);

const changeBindWechat = () => {
  wechat.value = !wechat.value;
  userStore.socialBindings.wechat = wechat.value;
};
const changeBindQQ = () => {
  qq.value = !qq.value;
  userStore.socialBindings.qq = qq.value;
};
const changeBindWeibo = () => {
  weibo.value = !weibo.value;
  userStore.socialBindings.weibo = weibo.value;
};
</script>

<style scoped>
.us_feature {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0;
}
.us_feature_socal {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.us_bind {
  width: 80rpx;
  height: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25rpx;
}
.us_binded {
  border: 1rpx solid #34c3e2;
  color: #34c3e2;
}
.us_unbind {
  border: 1rpx solid #34c3e2;
  background-color: #2bc0e1;
  color: white;
}
</style>
