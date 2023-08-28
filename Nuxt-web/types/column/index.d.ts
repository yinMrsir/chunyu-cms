interface RankItem {
  id: number;
  title: string;
  columnValue: string;
  genres: string;
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

interface ColumnItem {
  id: number;
  name: string;
  ranks: RankItem[];
  rows: MovieItem[];
}

export interface WebType extends ResPage<ColumnItem[]>{}
