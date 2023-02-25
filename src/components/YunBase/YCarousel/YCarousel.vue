<template>
  <uni-swiper-dot
    v-if="custom"
    :info="customInfo"
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
      <swiper-item v-for="(item, index) in customInfo" :key="index">
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
  <uni-swiper-dot
    v-else
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
        height: height + 'vh',
        width: `${width ? width + '%' : '100%'}`,
      }"
      autoplay
      circular
    >
      <swiper-item v-for="(item, index) in info" :key="index">
        <view
          class="c_swiper-item"
          :class="shadow ? 'c_shadow' : ''"
          :style="{
            borderRadius: `${round ? '20rpx' : ''}`,
            background: item.background,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }"
          @click="navto(item.sid)"
        >
        </view>
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import YCard from "../YFeatureCard/YCard.vue";

const props = withDefaults(
  defineProps<{
    info?: { sid: string; background: string }[];
    dotstyle?: "dot" | "round" | "nav" | "indexes" | "default";
    width?: number;
    height?: number;
    round?: boolean;
    dotSize?: number;
    dotBackground?: string;
    selectDotBackground?: string;
    shadow?: boolean;
    custom?: boolean;
    customInfo?: any;
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
    custom: false,
    autoplay: false,
    circular: false,
  }
);

const current = ref(0);
const mode = ref(props.dotstyle);

const change = (e: { detail: { current: number } }) => {
  current.value = e.detail.current;
};

const navto = (sid: string) => {
  uni.navigateTo({
    url: `/views/Attractions/Detail/Detail?sid=${sid}`,
  });
};
</script>

<style lang="scss" scoped>
.c_swiper-box {
  padding: 20rpx 0 0 0;
}
.c_swiper-item {
  height: 85%;
  margin: 0 auto;
}
.c_custom_swiper-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.c_shadow {
  box-shadow: 0 10rpx 30rpx rgba(167, 167, 167, 0.76);
}
</style>
