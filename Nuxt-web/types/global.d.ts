export {};

declare global {
  interface IResOptions {
    code: number
    msg: string
  }

  interface IResPage<T> extends IResOptions {
    rows: T
    total: number
  }

  interface IResData<T> extends IResOptions {
    data: T
  }

  interface IColumnItem {
    createTime: string;
    updateTime: string;
    createBy: string;
    updateBy: string;
    remark: string;
    id: number;
    name: string;
    type: string;
    value: string;
    order: number;
    status: string;
  }

  interface IColumn extends IResData<IColumnItem>{}

  interface ICountry {
    id: number;
    name: string;
  }

  interface IMoviePv {
    pv: number;
  }

  interface IMovie {
    createTime: string;
    updateTime: string;
    createBy: string;
    updateBy: string;
    remark: string;
    id: number;
    status: number;
    releaseStatus: number;
    releaseDate?: any;
    title: string;
    poster: string;
    bgColor?: any;
    titleEn?: any;
    titleOriginal: string;
    akas: string;
    columnValue: string;
    genres: string;
    year?: any;
    pubdate?: any;
    duration: string;
    durations?: any;
    versions?: any;
    eggHunt?: any;
    color?: any;
    seasonCount?: any;
    currentSeason?: any;
    episodeCount?: any;
    currentEpisode?: any;
    theEnd: number;
    countryIds: string;
    languages: string;
    tags: string;
    summary: string;
    isPay: number;
    paymentAmount: number;
    freeDuration: number;
    country: ICountry[];
    casts?: any[];
    moviePv: IMoviePv;
    movieRate?: any;
    movieVideosCount: number;
    userCollectsCount: number;
  }

  interface IMovieList extends IResPage<IMovie[]>{}
}

