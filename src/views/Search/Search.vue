<template>
  <header-view :has_item="true" :has_back="hasBack" custom>
    <template #h_custom>
      <y-input :width="250" :height="55" placeholder="中秋节的好去处" />
    </template>
  </header-view>
  <view :style="{ padding: `${top + height}px 40rpx 100rpx 40rpx` }">
    <view style="margin-top: 30rpx" v-if="history.length">
      <view class="s_history_title">
        <view>历史搜索</view>
        <view
          @click="
            userHistory.history = [];
            history = [];
          "
        >
          <uni-icons type="trash-filled" size="30" color="#cfcfcf"></uni-icons>
        </view>
      </view>
      <view class="s_historys">
        <view
          class="s_history"
          v-for="item in history"
          :key="item.name"
          @click="search(item.name)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <view style="margin-top: 30rpx" v-if="hot.length">
      <view>热门搜索</view>
      <view class="s_hots">
        <view
          class="s_hot"
          v-for="item in hot"
          :key="item.name"
          @click="search(item.name)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
  </view>
  <nav-bar />
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import NavBar from "@/components/NavBar.vue";
import YInput from "@/components/YunBase/YInput/YInput.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive } from "vue";
import useHistoryStore from "@/stores/history";

const hasBack = ref(true);
const { height, top } = uni.getMenuButtonBoundingClientRect();
const userHistory = useHistoryStore();

let history = reactive(userHistory.history);

// 后端接口: 热门搜索
const hot = reactive(<Array<{ name: "" }>>[]);

const search = (value: string) => {
  // 搜索结果页
  uni.navigateTo({
    url: "/views/Search/Search",
  });
};

onLoad((option) => {
  hasBack.value = !option!.back;
});
</script>

<style scoped lang="scss">
.s_history_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.s_historys,
.s_hots {
  display: flex;
  .s_history,
  .s_hot {
    background-color: #f5f4f4;
    border-radius: 20rpx;
    min-width: 70rpx;
    text-align: center;
    margin: 10rpx 30rpx 0 0;
  }
}
</style>
