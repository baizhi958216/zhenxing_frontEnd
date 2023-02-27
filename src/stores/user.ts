import type {
  IAuthData,
  IAuthenticate,
  IRegister,
  IRegisterData,
} from "@/includes/User.interface";
import { YFetch } from "@/includes/YFetch";
import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
    userAutoLogin: false,
    userData: {
      createTime: "",
      userId: "",
      userName: "",
      userPhone: "",
      userPwd: "",
      userPhoto: "",
    },
    userLocation: <Array<string>>[],
    userNotice: { toast: true, pm: false, vibration: true },
    socialBindings: { wechat: true, qq: false, weibo: false },
  }),
  actions: {
    // 注册
    async register(values: IRegister): Promise<IRegisterData> {
      return new Promise((resolve, reject) => {
        YFetch(
          "/user/register",
          "POST",
          {
            userName: values.user_name,
            userPhone: values.user_phone,
            userPwd: values.user_psw,
            userPhoto: "null",
          },
          { "content-type": "application/json" }
        )
          .then((res: IAuthData) => {
            if (res.data.code == 0) {
              // 已被注册
              resolve({ msg: res.data.msg });
            } else {
              // 注册成功
              resolve({ code: res.data.code });
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 登录
    async authenticate(values: IAuthenticate): Promise<any> {
      return new Promise((resolve, reject) => {
        YFetch(
          "/user/login",
          "POST",
          {
            userPhone: values.user_account,
            userPwd: values.user_psw,
          },
          { "content-type": "application/json" }
        )
          .then((res: IAuthData) => {
            if (res.data.status) {
              // 账号不存在
              resolve({ code: 2 });
            } else if (res.data.code == 0) {
              // 密码错误
              resolve({ code: 0 });
            } else if (res.data.data && res.data.code == 1) {
              // 登录成功
              resolve({ code: 1, res });
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 更新用户信息
    async updateuser(values: {
      userName: string;
      userPhoto: string;
      photo: boolean;
    }) {
      let data;
      if (values.photo) {
        data = {
          userName: this.userData.userName,
          userPwd: this.userData.userPwd,
          userPhoto: values.userPhoto,
          userPhone: this.userData.userPhone,
        };
      } else {
        data = {
          userName: values.userName,
          userPwd: this.userData.userPwd,
          userPhoto: this.userData.userPhoto,
          userPhone: this.userData.userPhone,
        };
      }
      await YFetch("/user", "PUT", data, {
        cookie: uni.getStorageSync("JSESSIONID"),
      });
      if (values.photo) {
        this.userData.userPhoto = `${
          import.meta.env.VITE_BACKEND_URL
        }/common/download/?name=${values.userPhoto}`;
      } else {
        this.userData.userName = values.userName;
      }
    },
    async signOut() {
      this.userLoggedIn = false;
    },
  },
  persist: {
    enabled: true,
  },
});
