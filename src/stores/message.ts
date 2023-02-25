import type { ISocketMessage } from "@/includes/Message.interface";
import { defineStore } from "pinia";
export default defineStore("message", {
  state: () => ({
    messages: <Array<ISocketMessage>>[],
  }),
  actions: {
    async getMessages() {
      uni.sendSocketMessage({
        data: JSON.stringify({
          event: "hello",
          data: "测试ws",
        }),
      });
      uni.onSocketMessage((res) => {
        const { msg } = JSON.parse(res.data);
        this.messages = msg;
      });
    },
  },
});
