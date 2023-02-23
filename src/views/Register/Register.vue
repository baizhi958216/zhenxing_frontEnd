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
          <view>账号</view>
          <y-input
            name="account"
            :value="account"
            placeholder="手机号/邮箱"
            @i_changeVal="i_account"
          />
        </view>
        <view style="margin-bottom: 60rpx">
          <view>密码</view>
          <y-input
            name="password"
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
import ValidationTemplate from "@/components/ValidationTemplate.vue";
import YInput from "@/components/YunBase/YInput/YInput.vue";
import YButton from "@/components/YunBase/YButton/YButton.vue";
import { ref } from "vue";

const account = ref();
const password = ref();
const repassword = ref();

const i_account = (e: InputEvent) => {
  account.value = (<HTMLInputElement>e.target).value;
};

const i_password = (e: InputEvent) => {
  password.value = (<HTMLInputElement>e.target).value;
};

const i_repassword = (e: InputEvent) => {
  repassword.value = (<HTMLInputElement>e.target).value;
};

const submit = () => {
  console.log(account.value, password.value, repassword.value);
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
