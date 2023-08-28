interface BannerItem {
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

export interface BasicBannerList extends ResPage<BannerItem[]> {}

interface LinkItem {
  createTime: string;
  updateTime: string;
  createBy: string;
  updateBy: string;
  remark: string;
  id: number;
  text: string;
  url: string;
}

export interface BasicLinkAll extends ResData<LinkItem[]> {}

interface GenreItem {
  id: number;
  name: string;
}

interface RankItem {
  id: number;
  title: string;
  columnValue: string;
  episodeCount?: any;
  theEnd: number;
  moviePv: IMoviePv;
}

interface MovieItem {
  createTime: string;
  updateTime: string;
  id: number;
  title: string;
  poster: string;
  columnValue: string;
  casts?: any[];
  movieRate?: any;
}

interface MovieData {
  name: string;
  type: string;
  value: string;
  genres: GenreItem[];
  ranks: RankItem[];
  rows: MovieItem[];
}

export interface WebIndex extends ResData<MovieData[]> {}
