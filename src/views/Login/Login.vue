<template>
  <ValidationTemplate :height="78">
    <template #validation>
      <view class="lvalidate">
        <view
          style="
            align-self: start;
            margin: 0 80rpx 50rpx;
            font-size: 55rpx;
            font-weight: bold;
          "
          >登录</view
        >
        <view style="margin-bottom: 80rpx">
          <view>账号</view>
          <y-input
            name="account"
            :value="account"
            placeholder="手机号/邮箱"
            @i_changeVal="i_account"
            :height="80"
            :width="472"
          />
        </view>
        <view style="margin-bottom: 80rpx">
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
        <view
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 90vw;
            margin: 30rpx;
            font-size: 25rpx;
          "
        >
          <label @click="changeAutoLogin">
            <checkbox
              color="#2779f7"
              style="transform: scale(0.7)"
              :value="userAutoLogin"
              :checked="userAutoLogin"
            />下次自动登录
          </label>
          <view>忘记密码</view>
        </view>
        <view style="display: flex; position: absolute; top: 100%">
          <navigator url="/views/Register/Register">
            <view>注册/</view>
          </navigator>
          <navigator url="/views/Login/SMSLogin">
            <view>更多登录</view>
          </navigator>
        </view>
      </view>
    </template>
  </ValidationTemplate>
</template>

<script setup lang="ts">
import ValidationTemplate from "@/components/ValidationTemplate.vue";
import YInput from "@/components/YunBase/YInput/YInput.vue";
import YButton from "@/components/YunBase/YButton/YButton.vue";
import useUserStore from "@/stores/user";
import { ref, watch } from "vue";
const store = useUserStore();
const account = ref<string | number>();
const password = ref<string | number>();
const userAutoLogin = ref(store.userAutoLogin);

const i_account = (e: InputEvent) => {
  account.value = (<HTMLInputElement>e.target).value;
};

const i_password = (e: InputEvent) => {
  password.value = (<HTMLInputElement>e.target).value;
};

const changeAutoLogin = () => {
  userAutoLogin.value = !userAutoLogin.value;
};

// 监听自动登录修改
watch(userAutoLogin, (newVal) => {
  store.userAutoLogin = newVal;
});

const submit = async () => {
  // 账号密码不能为空
  if (!(account.value && password.value)) {
    uni.showModal({
      title: "提示",
      content: "请填写账号和密码",
    });
    return;
  }
  // 登录
  await store
    .authenticate({
      user_account: account.value as string,
      user_psw: password.value as string,
    })
    .then((res) => {
      switch (res.code) {
        case 0:
          // 密码错误
          uni.showModal({
            title: "提示",
            content: "密码错误",
          });
          break;
        case 1:
          // 登录成功
          return res;
        case 2:
          // 账号不存在
          uni.showModal({
            title: "提示",
            content: "该账号不存在",
          });
          break;

        default:
          // 未知错误
          uni.showModal({
            title: "提示",
            content: "未知错误",
          });
          break;
      }
    })
    .then((res) => {
      if (res.code == 1) {
        uni.setStorageSync("JSESSIONID", res.res.cookies[0]);
        const { userId, userPhoto, userPhone } = res.res.data.data;
        store.userLoggedIn = true;
        store.userData = {
          userId: userId,
          userPhoto: userPhoto,
          userPhone: userPhone,
          userPwd: password.value as string,
        };
        uni.reLaunch({
          url: "/views/Home/Home",
        });
      }
    });
};

// 自动登录
if (store.userLoggedIn) {
  account.value = store.userData.userPhone;
  password.value = store.userData.userPwd;
  if (store.userAutoLogin) {
    submit();
  }
}
</script>

<style scoped>
.lvalidate {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
