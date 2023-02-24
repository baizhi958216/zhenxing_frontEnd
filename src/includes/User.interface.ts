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

// 账号不存在
interface IAccountNotFound {
  error: string;
  path: string;
  status: number;
  timestamp: number;
}

// 密码错误
interface IPasswordError {
  code: number;
  data: null;
  map: {};
  msg: string;
}

// 登录成功
interface ILoginSuccess {
  code: number;
  data: IUserData;
  map: {};
  msg: null;
}

// 注册返回信息
interface IRegisterData {
  code?: number;
  msg?: string;
}

// 消息头
interface IHeader {
  Connection: string;
  "Content-Type": string;
  Date: string;
  Server: string;
  "Set-Cookie": string;
  "Transfer-Encoding": string;
}

// 登录返回信息
interface IAuthData {
  cookies: Array<string>;
  data: any;
  errMsg: string;
  header: IHeader;
  statusCode: number;
}

export type {
  IRegister,
  IAuthenticate,
  ISMSAuth,
  IUserData,
  IAccountNotFound,
  IPasswordError,
  ILoginSuccess,
  IRegisterData,
  IHeader,
  IAuthData,
};
