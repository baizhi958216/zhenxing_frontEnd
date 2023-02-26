import type { IUploadImage } from "./UploadImage.interface";

const origin = import.meta.env.VITE_BACKEND_URL;

export const UploadImage = (): Promise<IUploadImage> => {
  return new Promise((resolve, reject) => {
    uni.chooseMedia({
      mediaType: ["image"],
      sourceType: ["album"],
      success: (res) => {
        const tempFilePaths = res.tempFiles;
        uni.uploadFile({
          url: `${origin}/common/upload`,
          filePath: tempFilePaths[0].tempFilePath,
          name: "file",
          header: {
            cookie: uni.getStorageSync("JSESSIONID"),
          },
          success: (result) => {
            if (result.statusCode != 413) {
              resolve(JSON.parse(result.data));
            } else {
              reject({ code: 413, msg: "too large" });
            }
          },
          fail(err) {
            reject(err);
          },
        });
      },
    });
  });
};
