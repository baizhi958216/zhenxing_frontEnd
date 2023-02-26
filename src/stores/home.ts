import { YFetch } from "@/includes/YFetch";
import { defineStore } from "pinia";

export default defineStore("home", {
  state: () => ({
    topRecommend: <Array<{ sid: string; background: string }>>[],
    bottomRecommend: <
      Array<{ sid: string; background: string; title: string; desc: string }>
    >[],
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
    // 获取位置
    async getLocation(): Promise<any> {
      return new Promise((resolve, reject) => {
        uni.authorize({
          scope: "scope.userLocation",
          success() {
            uni.getLocation({
              type: "wgs84",
              success: function (res) {
                uni.request({
                  url: `https://apis.map.qq.com/ws/geocoder/v1?location=${res.latitude},${res.longitude}&get_poi=0&key=OA4BZ-FX43U-E5VV2-45M6S-C4HD3-NIFFI&output=json`,
                  method: "GET",
                  success: (res) => {
                    const result = res.data as {
                      message: string;
                      request_id: string;
                      result: any;
                      status: number;
                    };
                    resolve(result.result.address_component);
                  },
                });
              },
              fail: function (err) {
                reject(err);
              },
            });
          },
        });
      });
    },
    persist: {
      enabled: false,
    },
  },
});
