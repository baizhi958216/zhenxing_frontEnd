interface IRecommendItem {
  createTime: string;
  indexPageNum: number;
  irId: string;
  irIntroduce: string;
  irPho: string;
  irTitle: string;
  isDelete: number;
  recommendLocation: string;
  sid: string;
  updateTime: string;
}
interface IRecommend {
  data: Array<IRecommendItem>;
}
export type { IRecommend, IRecommendItem };
