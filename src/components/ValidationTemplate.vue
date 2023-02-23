<template>
  <view>
    <!-- 背景图片 -->
    <image
      style="width: 100vw; height: 50vh; background-color: #eeeeee"
      mode="scaleToFill"
      :src="TeaFile('login', 'sky.png')"
      @error="imageError"
    />
    <view
      class="Y_Validation"
      :style="{ height: height + 'vh', backgroundColor: background }"
    >
      <slot name="validation" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { TeaFile } from "@/includes/GiteaImageDisk";
interface IValidate {
  height: number;
  background?: string;
}
const imageError = (err: any) => {
  console.log(err);
};
withDefaults(defineProps<IValidate>(), {
  height: 35,
  background: "white",
});
</script>

<style scoped>
.Y_Validation {
  position: absolute;
  top: 12vh;
  width: 100vw;
  border-radius: 70rpx 70rpx 0 0;
  padding-top: 60rpx;
}
</style>
