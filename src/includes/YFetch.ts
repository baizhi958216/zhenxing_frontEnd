import type { IAuthData } from "./User.interface";

const origin = import.meta.env.VITE_BACKEND_URL;
/**
 *
 * @param url 请求地址
 * @param method 请求方法
 * @param data 数据{}
 * @param header 请求头{}
 */
export const YFetch = (
  url: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  data?: {},
  header?: {}
): Promise<IAuthData> => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: "稍等",
    });
    uni.request({
      url: origin + url,
      header: header,
      method: method,
      data: {
        ...data,
      },
      success: (res) => {
        setTimeout(() => {
          uni.hideLoading();
        }, 300);
        resolve(res as IAuthData);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
