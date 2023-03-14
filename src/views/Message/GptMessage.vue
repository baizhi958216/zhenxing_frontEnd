<template>
  <header-view
    :has_item="true"
    :has_back="true"
    :back_background="false"
    :title="'ChatGPT'"
  />
  <view :style="{ padding: `${top + height}px 0 100rpx 0` }">
    <view class="m_messageswrap">
      <view
        v-for="chat in chatlist"
        :key="chat.cid"
        class="m_chat"
        :class="`${chat.from == 'b' ? 'm_chat_b' : 'm_chat_a'}`"
      >
        {{ chat.message }}
      </view>
    </view>
    <view class="m_input_wrap">
      <view class="m_input_wrap1">
        <input type="text" v-model="nowinput" class="m_input" />
      </view>
      <view class="m_send">
        <uni-icons type="redo" size="30" @click="send"></uni-icons>
      </view>
    </view>
  </view>
  <nav-bar />
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import NavBar from "@/components/NavBar.vue";
import { ref, reactive } from "vue";
const { height, top } = uni.getMenuButtonBoundingClientRect();
const nowinput = ref<string>();
interface IChat {
  cid: number;
  message: string;
  from: string;
}
let chatlist = reactive<IChat[]>([
  {
    cid: 0,
    message: "你好啊,我是ChatGPT喵~",
    from: "a",
  },
]);
// 本地调试无法使用wss
/* uni.connectSocket({
  url: "ws://localhost:3000",
  protocols: ["websocket"],
});
uni.onSocketOpen(() => {
  console.log("连上了");
});
uni.onSocketError((err) => {
  console.log("WebSocket连接打开失败，请检查！", err);
}); */

// 使用http
const send = () => {
  const tmpmessage = nowinput.value;
  chatlist.push({
    cid: chatlist.length + 1,
    from: "b",
    message: nowinput.value!,
  });
  nowinput.value = "";
  uni
    .request({
      url: import.meta.env.VITE_CHATGPTAPI,
      method: "POST",
      data: JSON.stringify({ inMessage: tmpmessage }),
    })
    .then((res) => {
      chatlist.push({
        cid: chatlist.length + 1,
        from: "a",
        message: res.data as string,
      });
    });
};
</script>

<style scoped lang="scss">
.m_messageswrap {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 80vh;
  .m_chat {
    padding: 20rpx 30rpx;
    border-radius: 30rpx;
    background-color: black;
    color: white;
    width: fit-content;
    margin: 20rpx 0;
    max-width: 60%;
  }
  .m_chat_a {
    margin-left: 20rpx;
  }
  .m_chat_b {
    align-self: flex-end;
    margin-right: 20rpx;
  }
}
.m_input_wrap {
  background-color: white;
  border-top: 1px solid rgba(100, 100, 100, 0.137);
  width: 100vw;
  left: 0;
  height: 80rpx;
  position: absolute;
  bottom: 0;
  margin-bottom: 100rpx;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .m_input_wrap1 {
    background-color: white;
    height: 60rpx;
    width: 70%;
    border-bottom: 1rpx solid black;
    .m_input {
      padding-top: 15rpx;
    }
  }
  .m_send {
    width: 10%;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-self: flex-end;
  }
}
</style>
