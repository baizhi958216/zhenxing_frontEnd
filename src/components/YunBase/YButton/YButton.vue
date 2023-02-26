<template>
  <view style="display: flex">
    <button
      @click="$emit('click', $event)"
      class="b_common"
      :style="{
        width: width + 'rpx',
        height: height + 'rpx',
        backgroundColor: background,
        color: fontcolor,
        borderRadius: `${radius ? '50rpx' : ''}`,
        fontSize: fontsize + 'rpx',
        boxShadow: `${shadow ? '0 10rpx 16rpx rgba(0, 0, 0, 0.3)' : ''}`,
      }"
    >
      <slot></slot>
    </button>
  </view>
</template>
<script setup lang="ts">
interface InterfaceButton {
  width?: number;
  height?: number;
  background?: string;
  fontcolor?: string;
  radius?: boolean;
  fontsize?: number;
  shadow?: boolean;
}
const props = withDefaults(defineProps<InterfaceButton>(), {
  width: 350,
  height: 100,
  background: "#2779f7",
  fontcolor: "white",
  fontsize: 35,
  shadow: false,
});
</script>
<style scoped>
.b_common {
  background-color: #2779f7;
  color: white;
}
</style>
