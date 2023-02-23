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
}
const props = withDefaults(defineProps<InterfaceButton>(), {
  width: 350,
  height: 100,
  background: "#2779f7",
  fontcolor: "white",
  fontsize: 35,
});
</script>
<style scoped>
.b_common {
  background-color: #2779f7;
  color: white;
}
</style>
