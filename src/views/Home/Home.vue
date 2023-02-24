<template>
  <y-carousel
    :info="info"
    round
    dot-background="#ddd5d1"
    select-dot-background="#f54764"
    :dot-size="3"
    shadow
  />
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import YCarousel from "@/components/YunBase/YCarousel/YCarousel.vue";
import useUserStore from "@/stores/user";
import useHomeStore from "@/stores/home";
import type { IRecommend } from "@/includes/Home.interface";
import { reactive } from "vue";

const store = useUserStore();
const homeStore = useHomeStore();

let info = reactive(homeStore.topRecommend);

onLoad(() => {
  if (!store.userLoggedIn) {
    uni.reLaunch({
      url: "/views/Login/Login",
    });
    return;
  }
  store
    .authenticate({
      user_account: store.userData.userPhone,
      user_psw: store.userData.userPwd,
    })
    .then((res) => {
      uni.setStorageSync("JSESSIONID", res.res.cookies[0]);
      homeStore.getRecommend().then((res: IRecommend) => {
        res.data.map((el) => {
          if (el.recommendLocation) {
            switch (el.recommendLocation) {
              case "up":
                homeStore.topRecommend.push({
                  sid: el.sid,
                  background: `url(${
                    import.meta.env.VITE_BACKEND_URL
                  }/common/download/?name=${el.irPho})`,
                } as never);
                break;
              case "down":
                homeStore.bottomRecommend.push({
                  sid: el.sid,
                  background: `url(${
                    import.meta.env.VITE_BACKEND_URL
                  }/common/download/?name=${el.irPho})`,
                } as never);
                break;
              default:
                break;
            }
          }
        });
      });
    });
});
</script>

<style></style>
