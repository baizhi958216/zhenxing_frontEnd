<template>
  <ValidationTemplate :height="70">
    <template #validation>
      <view class="lvalidate">
        <view
          style="
            align-self: start;
            margin: 0 80rpx 60rpx;
            font-size: 55rpx;
            font-weight: bold;
          "
          >短信登录</view
        >
        <view style="margin-bottom: 60rpx">
          <y-input
            name="phone"
            :value="phone"
            placeholder="请输入手机号"
            @i_changeVal="i_phone"
          />
        </view>
        <view style="margin-bottom: 60rpx">
          <y-input
            name="sms_auth"
            :width="400"
            :value="sms_auth"
            placeholder="请输入验证码"
            @i_changeVal="i_sms_auth"
          />
        </view>
        <view>
          <y-button
            :width="450"
            :height="80"
            background="#2779f7"
            fontcolor="white"
            :radius="true"
            @click="submit"
            >立即登录</y-button
          >
        </view>
        <navigator
          url="/views/Register/Register"
          style="
            align-self: flex-end;
            margin-right: 100rpx;
            font-size: 25rpx;
            color: #b4b2b2;
          "
          >注册</navigator
        >

        <view
          style="
            position: absolute;
            top: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 25rpx;
          "
        >
          <view>第三方账号登录</view>
          <image
            :src="TeaFile('login', 'weixinmoren.png')"
            style="width: 75rpx; height: 75rpx; margin-top: 20rpx"
            @click="loginByWechat"
          />
        </view>
      </view>
    </template>
  </ValidationTemplate>
</template>

<script setup lang="ts">
import ValidationTemplate from "@/components/ValidationTemplate.vue";
import YInput from "@/components/YunBase/YInput/YInput.vue";
import YButton from "@/components/YunBase/YButton/YButton.vue";
import { TeaFile } from "@/includes/GiteaImageDisk";
import { ref } from "vue";
const phone = ref();
const sms_auth = ref();

const i_phone = (e: InputEvent) => {
  phone.value = (<HTMLInputElement>e.target).value;
};

const i_sms_auth = (e: InputEvent) => {
  sms_auth.value = (<HTMLInputElement>e.target).value;
};

const submit = () => {
  console.log(phone.value, sms_auth.value);
};
const loginByWechat = () => {
  console.log("微信登录接口");
};
</script>

<style scoped>
.lvalidate {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
}
</style>
