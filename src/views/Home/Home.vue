<template>主页</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import useUserStore from "@/stores/user";
const store = useUserStore();
onLoad(() => {
  if (!store.userLoggedIn)
    uni.reLaunch({
      url: "/views/Login/Login",
    });
});
</script>

<style></style>
