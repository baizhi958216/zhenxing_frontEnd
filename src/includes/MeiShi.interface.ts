interface IStore {
  storeId: string;
  storeName: string;
  score: number;
  storeMainFee: number;
  spho: string;
}
interface IMeiShi {
  createTime?: string;
  isDelete?: number;
  score?: number | string;
  selectValue?: number;
  spho?: string;
  storeAdaptTime?: string;
  storeId?: string;
  storeIntroduce?: string;
  storeMainFee?: number;
  storeName?: string;
  storePersonalQuaPho?: string;
  storePhone?: string;
  storeQuaPho?: string;
  storeSpecialPoint?: string;
  storeStandFee?: string;
  storeStatus?: number;
  storeTips?: string;
  storeTitle?: string;
  storeType?: string;
  uid?: string;
  updateTime?: string;
}
export type { IStore, IMeiShi };
