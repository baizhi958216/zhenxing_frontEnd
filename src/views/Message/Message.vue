<template>
  <header-view :has_item="true" :has_back="false" :title="'消息'" left />
  <view :style="{ padding: `${top + height}px 40rpx 100rpx 40rpx` }">
    <view class="m_featureswrap">
      <view
        class="m_wrap_item"
        v-for="item in features"
        :key="item.name"
        @click="toFeature(item.name)"
      >
        <view
          :style="{
            background: `url(${TeaFile('user_message', 'msg_bg.png')})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '100%',
          }"
        >
          <view style="width: 50px; height: 50px">
            <view
              v-if="item.name != 'ete'"
              :style="{
                background: `url(${TeaFile(
                  'user_message',
                  `${item.name}.png`
                )}) no-repeat center`,
                width: '100%',
                height: '100%',
              }"
            ></view>
          </view>
        </view>
        <view>{{ item.title }}</view>
      </view>
    </view>
    <view class="m_messageswrap" v-if="messageList.length">
      <view class="message-item" v-for="item in messageList" :key="item.name">
        <view
          class="userimage"
          :style="{
            background: `url(${TeaFile('testuserheadimg', `${item.id}.jpg`)})`,
            width: '100rpx',
            height: '100rpx',
            'background-size': '100%',
            'background-position': 'center',
            'border-radius': '50%',
          }"
        ></view>
        <view class="usermsg">
          <view class="name_msg">
            <view class="username">{{ item.name }}</view>
            <view class="usermessages">{{ item.newestmessage }}</view>
          </view>
          <view class="alerts">
            <view class="alerttime">{{ item.m_time }}</view>
            <view class="alertnums">{{ item.m_unread }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="m_chatgpt" v-else>
      <view class="m_gpt" @click="chatgpt">Chat GPT</view>
    </view>
  </view>
  <nav-bar />
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import NavBar from "@/components/NavBar.vue";
import { TeaFile } from "@/includes/GiteaImageDisk";
import { reactive, ref } from "vue";
import useMessageStore from "@/stores/message";
const { height, top } = uni.getMenuButtonBoundingClientRect();
const message = useMessageStore();
const features = reactive([
  { title: "我的关注", name: "guanzhu" },
  { title: "我的点赞", name: "dianzan" },
  { title: "我的评论", name: "pinglun" },
  { title: "@我的", name: "ete" },
]);

let messageList = ref(message.messages);

const toFeature = (feature: string) => {
  console.log(feature);
};

// uni.connectSocket({
//   url: import.meta.env.VITE_BACKEND_WEBSOCKET,
// });
// uni.onSocketOpen(() => {
//   message.getMessages();
// });

setTimeout(() => {
  messageList.value = message.messages;
}, 500);

const chatgpt = () => {
  uni.navigateTo({
    url: "/views/Message/GptMessage",
  });
};
</script>

<style scoped lang="scss">
.m_featureswrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30rpx;

  .m_wrap_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 600;
  }
}

.message-item {
  height: 150rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  margin: 20rpx 0;
  .usermsg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80%;
    width: 84%;
    .name_msg {
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .username {
        font-size: 35rpx;
        font-weight: 600;
      }

      .usermessages {
        font-size: 25rpx;
        color: rgb(161, 161, 161);
      }
    }

    .alerts {
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-end;

      .alerttime {
        font-size: 25rpx;
        color: rgb(161, 161, 161);
      }

      .alertnums {
        background-color: rgb(245, 114, 114);
        width: 30rpx;
        height: 30rpx;
        font-size: 25rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-radius: 50%;
      }
    }
  }
}
.m_chatgpt {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600rpx;
  .m_gpt {
    background-color: #70a5ff;
    padding: 20rpx;
    border-radius: 30rpx;
    color: rgba(255, 255, 255, 0.849);
  }
}
</style>
