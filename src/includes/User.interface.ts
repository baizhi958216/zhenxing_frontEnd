interface IAuthenticate {
  user_account: string;
  user_psw: string;
}
interface IRegister {
  user_phone: number;
  user_psw: string;
  user_repsw: string;
}
interface ISMSAuth {
  user_phone: number;
  sms_code: string;
}
export type { IRegister, IAuthenticate, ISMSAuth };
