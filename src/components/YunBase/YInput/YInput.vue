<template>
  <view class="i_warp">
    <image
      v-if="type === 'password'"
      style="width: 30rpx; height: 30rpx; background-color: #eeeeee"
      mode="scaleToFill"
      :src="TeaFile('login', 'lock.png')"
      @error="imageError"
    />
    <input
      :class="iClass"
      :type="itype"
      :placeholder="placeholder"
      :style="{ width: width + 'rpx', height: height + 'rpx' }"
      placeholder-class="i_common_placeholder"
      @input="$emit('i_changeVal', $event)"
    />
    <image
      v-if="type === 'password'"
      style="width: 45rpx; height: 45rpx; background-color: #eeeeee"
      mode="scaleToFill"
      :src="TeaFile('login', 'eye.png')"
      @click="psw2txt"
      @error="imageError"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { TeaFile } from "@/includes/GiteaImageDisk";
interface InterfaceInput {
  type?: string;
  width?: number;
  height?: number;
  placeholder?: string;
}
const props = withDefaults(defineProps<InterfaceInput>(), {
  type: "text",
});
const itype = ref(props.type);
const psw2txt = () => {
  if (itype.value == "text") {
    itype.value = "password";
  } else {
    itype.value = "text";
  }
};

let iClass = computed(() => {
  let i_class = "";
  switch (props.type) {
    case "password":
      i_class = "i_common i_password";
      break;
    default:
      i_class = "i_common i_default";
      break;
  }
  return i_class;
});

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
  height: 80rpx;
  width: 70vw;
  border-radius: 50rpx;
}
</style>
