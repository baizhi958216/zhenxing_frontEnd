<template>
  <uni-swiper-dot
    :info="info"
    :current="current"
    field="content"
    :dots-styles="{
      backgroundColor: dotBackground,
      border: `${dotSize}rpx ${dotBackground} solid`,
      selectedBackgroundColor: selectDotBackground,
      selectedBorder: `${dotSize}rpx ${selectDotBackground} solid`,
    }"
    :mode="mode"
  >
    <swiper
      class="c_swiper-box"
      @change="change"
      :style="{
        height: height + 'rpx',
        width: `${width ? width + '%' : '100%'}`,
      }"
      :autoplay="autoplay"
      :circular="circular"
    >
      <swiper-item v-for="(item, index) in info" :key="index">
        <view class="c_custom_swiper-item">
          <template v-for="feature in item.list" :key="feature.title">
            <y-card :img-src="`url(${feature.imgSrc})`" :link="feature.link">{{
              feature.title
            }}</y-card>
          </template>
        </view>
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
</template>
<script setup lang="ts">
import YCard from "@/components/YunBase/YFeatureCard/YCard.vue";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    info: any;
    dotstyle?: "dot" | "round" | "nav" | "indexes" | "default";
    width?: number;
    height?: number;
    round?: boolean;
    dotSize?: number;
    dotBackground?: string;
    selectDotBackground?: string;
    shadow?: boolean;
    autoplay?: boolean;
    circular?: boolean;
  }>(),
  {
    dotstyle: "dot",
    height: 30,
    round: false,
    dotBackground: "rgba(83, 200, 249,0.3)",
    selectDotBackground: "rgba(83, 200, 249,0.9)",
    dotSize: 0,
    shadow: false,
    autoplay: false,
    circular: false,
  }
);

const current = ref(0);
const mode = ref(props.dotstyle);

const change = (e: { detail: { current: number } }) => {
  current.value = e.detail.current;
};
</script>
<style scoped lang="scss">
.c_swiper-box {
  padding: 20rpx 0 0 0;
}
.c_custom_swiper-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
