<template>
  <ValidationTemplate :height="48">
    <template #validation>
      <view class="rvalidate">
        <view
          style="
            align-self: start;
            margin: 0 80rpx 50rpx;
            font-size: 55rpx;
            font-weight: bold;
          "
          >注册</view
        >
        <view style="margin-bottom: 60rpx">
          <view>用户名</view>
          <y-input
            name="username"
            :height="80"
            :width="472"
            :value="username"
            placeholder="用户名"
            @i_changeVal="i_username"
          />
        </view>
        <view style="margin-bottom: 60rpx">
          <view>账号</view>
          <y-input
            name="account"
            :height="80"
            :width="472"
            :value="account"
            placeholder="手机号/邮箱"
            @i_changeVal="i_account"
          />
        </view>
        <view style="margin-bottom: 60rpx">
          <view>密码</view>
          <y-input
            name="password"
            :height="80"
            :width="400"
            :value="password"
            :password="true"
            placeholder="********"
            @i_changeVal="i_password"
          />
        </view>
        <view style="margin-bottom: 60rpx">
          <view>确认密码</view>
          <y-input
            name="repassword"
            :height="80"
            :width="400"
            :value="repassword"
            :password="true"
            placeholder="********"
            @i_changeVal="i_repassword"
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
            >立即注册</y-button
          >
        </view>
      </view>
    </template>
  </ValidationTemplate>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ValidationTemplate from "@/components/ValidationTemplate.vue";
import YInput from "@/components/YunBase/YInput/YInput.vue";
import YButton from "@/components/YunBase/YButton/YButton.vue";
import useUserStore from "@/stores/user";
import type { IRegisterData } from "@/includes/User.interface";

const user = useUserStore();
const username = ref();
const account = ref();
const password = ref();
const repassword = ref();

const i_username = (e: InputEvent) => {
  username.value = (<HTMLInputElement>e.target).value;
};

const i_account = (e: InputEvent) => {
  account.value = (<HTMLInputElement>e.target).value;
};

const i_password = (e: InputEvent) => {
  password.value = (<HTMLInputElement>e.target).value;
};

const i_repassword = (e: InputEvent) => {
  repassword.value = (<HTMLInputElement>e.target).value;
};

const submit = async () => {
  if (password.value != repassword.value) {
    uni.showModal({
      title: "提示",
      content: "两次输入密码不一致",
    });
    return;
  }
  await user
    .register({
      user_name: username.value,
      user_phone: account.value,
      user_psw: password.value,
      user_repsw: repassword.value,
    })
    .then((res: IRegisterData) => {
      if (res.msg) {
        uni.showModal({
          title: "提示",
          content: res.msg,
        });
      } else if (res.code) {
        uni.showModal({
          title: "提示",
          content: "注册成功, 前往登录",
          success: function (res) {
            if (res.confirm) {
              uni.navigateTo({
                url: "/views/Login/Login",
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
      } else {
        uni.showModal({
          title: "提示",
          content: "未知错误",
        });
      }
    });
};
</script>

<style scoped>
.rvalidate {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
