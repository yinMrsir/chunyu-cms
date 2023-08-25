interface IRanks {
  id: number;
  title: string;
  columnValue: string;
  genres: string;
  theEnd: number;
  moviePv: IMoviePv;
}

interface IRows {
  createTime: string;
  updateTime: string;
  id: number;
  title: string;
  poster: string;
  columnValue: string;
  casts?: any[];
  movieRate?: any;
}

interface Data {
  id: number;
  name: string;
  ranks: IRanks[];
  rows: IRows[];
}

export interface IWebType extends IResPage<Data[]>{}
