import { YFetch } from "@/includes/YFetch";
import { defineStore } from "pinia";

export default defineStore("home", {
  state: () => ({
    topRecommend: [],
    bottomRecommend: [],
  }),
  actions: {
    // 获取推荐
    async getRecommend(): Promise<any> {
      return new Promise((resolve, reject) => {
        YFetch(
          "/recommend/list",
          "GET",
          {},
          {
            cookie: uni.getStorageSync("JSESSIONID"),
          }
        )
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    persist: {
      enabled: false,
    },
  },
});
