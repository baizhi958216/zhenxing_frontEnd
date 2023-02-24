interface IAuthenticate {
  user_account: string;
  user_psw: string;
}

interface IRegister {
  user_name: string;
  user_phone: number;
  user_psw: string;
  user_repsw?: string;
  user_photo?: string;
}

interface ISMSAuth {
  user_phone: number;
  sms_code: string;
}

// 用户登录信息
interface IUserData {
  attractionNum: number;
  createTime: string;
  isDelete: number;
  likeNum: number;
  noticeNum: number;
  openid: string;
  updateTime: string;
  userId: string;
  userLocation: string;
  userName: string;
  userPhone: string;
  userPhoto: string;
  userPwd: string;
}
// 注册返回信息
interface IRegisterData {
  code?: number;
  msg?: string;
}
// 登录返回信息
interface IAuthData {
  error?: string;
  path?: string;
  status?: number;
  timestamp?: number;
  code?: number;
  msg?: string;
  data?: IUserData;
  map?: {};
}

export type {
  IRegister,
  IAuthenticate,
  ISMSAuth,
  IUserData,
  IRegisterData,
  IAuthData,
};
