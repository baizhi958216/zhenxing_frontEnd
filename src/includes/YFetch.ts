const origin = import.meta.env.VITE_BACKEND_URL;
/**
 *
 * @param url 请求地址
 * @param data 数据{}
 * @param header 请求头{}
 * @param method 请求方法
 */
export const YFetch = (
  url: string,
  data: {},
  header: {},
  method: "POST" | "GET" | "PUT" | "DELETE"
): Promise<any> => {
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
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
