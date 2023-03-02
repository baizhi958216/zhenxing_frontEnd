<template>
  <header-view
    :has_item="true"
    has_back
    title="乡村美食"
    :back_background="false"
  />
  <view :style="{ paddingTop: `${top + height}px ` }">
    <!-- 推荐栏 -->
    <view
      :style="{
        height: '150rpx',
        backgroundImage: `url(${topRecommend.url})`,
      }"
      @click="toDetail(topRecommend.sid)"
    >
    </view>
    <!-- features -->
    <view
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx;
      "
    >
      <!-- 排序 -->
      <view class="ms_sort">
        <view>综合排序</view>
        <view>评分排序</view>
        <view>价格排序</view>
      </view>
      <!-- 发现美食 -->
      <navigator url="/subs/MeiShi/subs/FaXian">
        <view class="ms_seek">发现美食</view>
      </navigator>
    </view>
    <!-- 列表 绑定排序菜单-->
    <view class="ms_list">
      <view
        class="ms_list_item"
        @click="toDetail(item.storeId)"
        v-for="item in meishiList"
        :key="item.storeId"
      >
        <view
          :style="{
            height: '60%',
            width: '100%',
            backgroundImage: item.spho,
            backgroundSize: '60%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }"
        ></view>
        <view class="ms_list_item_title">
          <view>{{ item.storeName }}</view>
          <view>评分: {{ item.score }}</view>
        </view>
        <view class="ms_list_item_title">
          <view class="ms_list_item_focus">关注</view>
          <view>人均消费: {{ item.storeMainFee }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import type { IStore } from "@/includes/MeiShi.interface";
import { YFetch } from "@/includes/YFetch";
import { reactive, ref } from "vue";

const { height, top } = uni.getMenuButtonBoundingClientRect();

const topRecommend = ref({
  sid: "1568079759376211969",
  url: "https://tuchuangs.com/imgs/2022/05/26/5cd30fe855924bab.png",
});

const toDetail = (sid: string) => {
  uni.navigateTo({
    url: `/subs/MeiShi/subs/XiangQing?sid=${sid}`,
  });
};

const meishiList = reactive<Array<IStore>>([]);

YFetch(
  "/store/list",
  "GET",
  {},
  {
    cookie: uni.getStorageSync("JSESSIONID"),
  }
).then((res) => {
  res.data.data.map((data: IStore) => {
    // 不渲染无图片的
    if (data.spho && data.spho != "...") {
      let _spho = data.spho.split(",");
      data.spho = `url(${
        import.meta.env.VITE_BACKEND_URL
      }/common/download/?name=${_spho[0]})`;
      meishiList.push(data);
    }
  });
});
</script>
<style scoped>
.ms_seek {
  font-weight: bold;
}
.ms_seek::before {
  content: "";
  width: 120rpx;
  height: 10rpx;
  border-radius: 60rpx;
  background-color: #ff673d;
  position: absolute;
  margin-top: 29rpx;
  z-index: -100;
}
.ms_sort {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: #949494;
  font-size: 22rpx;
  width: 320rpx;
}
.ms_list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 30rpx;
  overflow: scroll;
  max-height: 75vh;
}
.ms_list_item {
  width: 300rpx;
  height: 260rpx;
  margin: 20rpx;
  display: flex;
  flex-wrap: wrap;
  font-size: 23rpx;
  border-radius: 15rpx;
  border: 1rpx solid #844747;
}
.ms_list_item_title {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}
.ms_list_item_focus {
  background-color: #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  border-radius: 20rpx;
}
</style>
