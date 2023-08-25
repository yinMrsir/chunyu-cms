interface IBannerRows {
  createTime: string;
  updateTime: string;
  createBy: string;
  updateBy: string;
  remark: string;
  id: number;
  img: string;
  title: string;
  url: string;
  urlType: string;
}

export interface IBasicBannerList extends IResPage<IBannerRows[]> {}

interface ILinkData {
  createTime: string;
  updateTime: string;
  createBy: string;
  updateBy: string;
  remark: string;
  id: number;
  text: string;
  url: string;
}

export interface IBasicLinkAll extends IResData<ILinkData[]> {}

interface IGenres {
  id: number;
  name: string;
}

interface IRanks {
  id: number;
  title: string;
  columnValue: string;
  episodeCount?: any;
  theEnd: number;
  moviePv: IMoviePv;
}

interface IMovieRows {
  createTime: string;
  updateTime: string;
  id: number;
  title: string;
  poster: string;
  columnValue: string;
  casts?: any[];
  movieRate?: any;
}

interface IMovieData {
  name: string;
  type: string;
  value: string;
  genres: IGenres[];
  ranks: IRanks[];
  rows: IMovieRows[];
}

export interface IWebIndex extends IResData<IMovieData[]> {}
