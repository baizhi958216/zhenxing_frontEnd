<template>
  <header-view
    :has_item="true"
    has_back
    title="聚焦三农"
    :back_background="false"
  />
  <view :style="{ padding: `${top + height}px 40rpx 0 40rpx` }">
    <view class="sn_title_wrap">
      <view
        v-for="(item, index) in nongList"
        :key="index"
        class="sn_title"
        :class="current == index ? 'sn_title_current' : ''"
        @click="current = index"
      >
        {{ item.title }}
      </view>
    </view>
    <view>
      <swiper
        @change="nongChange"
        :current="current"
        :style="{ height: `${nongList[current].infos.length * 230}rpx` }"
      >
        <swiper-item v-for="(item, index) in nongList" :key="index">
          <view v-for="info in item.infos" :key="info.id">
            <view class="sn_bigPic" v-if="info.style == 'bigPic'"></view>
            <view class="sn_singlePic" v-else-if="info.style == 'singlePic'">
              <view class="sn_singlePic_wrap">
                <!-- 标题 -->
                <view class="sn_singlePic_title">
                  {{ info.title }}
                </view>
                <!-- 图片 -->
                <view class="sn_singlePic_pic"></view>
              </view>
              <!-- author -->
              <view class="sn_singlePic_author">{{ info.author }}</view>
            </view>
            <view class="sn_nonePic" v-else-if="info.style == 'nonePic'">
              <view class="sn_nonePic_title">{{ info.title }}</view>
              <view class="sn_nonePic_author">{{ info.author }}</view>
            </view>
            <view class="sn_multiPic" v-else-if="info.style == 'multiPic'">
              <view class="sn_multiPic_title">{{ info.title }}</view>
              <view class="sn_multiPic_list">
                <view v-for="img,index in info.imgSrc" :key="index" class="sn_multiPic_pic"></view>
              </view>
              <view class="sn_multiPic_author">{{ info.author }}</view>
            </view>
            <view v-else>
              {{ info.title }}
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import { reactive, ref } from "vue";
const { height, top } = uni.getMenuButtonBoundingClientRect();
const current = ref(0);

const nongList = reactive([
  {
    title: "农业经济",
    infos: [
      {
        id: 1,
        title: "农业经济1标题",
        imgSrc: "1",
        date: "2020-01-01",
        author: "光明日报",
        style: "bigPic",
      },
      {
        id: 2,
        title: "农业经济2标题",
        imgSrc: "1",
        date: "2020-01-01",
        author: "光明日报",
        style: "singlePic",
      },
      {
        id: 3,
        title: "农业经济3标题",
        imgSrc: "1",
        date: "2020-01-01",
        author: "光明日报",
        style: "nonePic",
      },
      {
        id: 4,
        title: "农业经济4标题",
        imgSrc: ["1", "2", "3"],
        date: "2020-01-01",
        author: "光明日报",
        style: "multiPic",
      },
    ],
  },
  {
    title: "农村金融",
    infos: [
      {
        id: 1,
        title: "农村金融1标题",
        imgSrc: "",
        date: "",
        author: "",
        style: "",
      },
    ],
  },
  {
    title: "农业技术",
    infos: [
      {
        id: 1,
        title: "农业技术1标题",
        imgSrc: "",
        date: "",
        author: "",
        style: "",
      },
    ],
  },
  {
    title: "农业科技",
    infos: [
      {
        id: 1,
        title: "农业科技1标题",
        imgSrc: "",
        date: "",
        author: "",
        style: "",
      },
    ],
  },
]);

const nongChange = (item: { detail: { current: any } }) => {
  current.value = item.detail.current;
};
</script>
<style scoped>
.sn_title_wrap {
  margin: 20rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sn_title {
  color: #9d9b9b;
  font-size: 30rpx;
}
.sn_title_current {
  color: black;
  font-weight: bold;
  font-size: 35rpx;
}
.sn_bigPic {
}
.sn_singlePic,
.sn_nonePic,
.sn_multiPic {
  height: 230rpx;
  margin: 10rpx 0;
  border-bottom: 1rpx solid #f4f4f4;
}
.sn_singlePic {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sn_singlePic_wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.sn_singlePic_title {
  width: 60%;
}
.sn_singlePic_pic {
  width: 40%;
  height: 160rpx;
  border-radius: 20rpx;
}
.sn_singlePic_author,
.sn_nonePic_author,
.sn_multiPic_author {
  color: #cccccc;
  font-size: 25rpx;
}
.sn_nonePic,
.sn_multiPic {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sn_nonePic_title {
  height: 70%;
}
.sn_multiPic_list {
  display: flex;
}
.sn_multiPic_pic {
  width: 230rpx;
  height: 150rpx;
  margin: 0 1rpx;
}
</style>
