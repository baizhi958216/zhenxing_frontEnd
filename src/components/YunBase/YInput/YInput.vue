<template>
  <view class="i_warp">
    <image
      v-if="password"
      style="width: 30rpx; height: 30rpx; background-color: #eeeeee"
      mode="scaleToFill"
      :src="TeaFile('login', 'lock.png')"
      @error="imageError"
    />
    <input
      :value="vvalue"
      :password="vpassword"
      :placeholder="placeholder"
      :style="{ width: width + 'rpx', height: height + 'rpx' }"
      placeholder-class="i_common_placeholder"
      @input="$emit('i_changeVal', $event)"
    />
    <view
      v-if="password"
      :style="{
        backgroundImage: `url(${
          vpassword
            ? `${TeaFile('login', 'eye.png')}`
            : `${TeaFile('login', 'eye_open.png')}`
        })`,
        width: '45rpx',
        height: '45rpx',
      }"
      @click="psw2txt"
    ></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TeaFile } from "@/includes/GiteaImageDisk";
interface InterfaceInput {
  width?: number;
  height?: number;
  placeholder?: string;
  password?: boolean;
  value?: string | number;
}

const props = withDefaults(defineProps<InterfaceInput>(), {
  password: false,
  value: "",
});

// 密码显示隐藏
const vpassword = ref(props.password);
const vvalue = ref(props.value);

const psw2txt = () => {
  if (vpassword.value) {
    vpassword.value = false;
  } else {
    vpassword.value = true;
  }
};
const imageError = (err: any) => {
  console.log(err);
};
</script>

<style scoped>
.i_warp {
  display: flex;
  justify-content: space-between;
  padding: 0 5vw;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 50rpx;
}
</style>
