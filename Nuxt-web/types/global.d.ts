export {};

declare global {
  interface ResOptions<T> {
    code: number;
    msg: string;
    data: T;
    rows: T;
    total: number;
  }

  type ResPage<T> = Omit<ResOptions<T>, 'data'>

  type ResData<T> = Omit<ResOptions<T>, 'rows' | 'total'>

  interface ResBase {
    createTime: string;
    updateTime: string;
    createBy: string;
    updateBy: string;
    remark: string;
  }

  interface ColumnItem extends ResBase {
    id: number;
    name: string;
    type: string;
    value: string;
    order: number;
    status: string;
  }

  type Column = ResData<ColumnItem | null>

  interface CountryItem {
    id: number;
    name: string;
  }

  interface MoviePv {
    pv: number;
  }

  interface MovieItem extends ResBase {
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
    country: CountryItem[];
    casts?: any[];
    moviePv: MoviePv;
    movieRate?: any;
    movieVideosCount: number;
    userCollectsCount: number;
  }

  type MovieList = ResPage<MovieItem[]>

  type RankMovieItem = Pick<MovieItem, 'updateTime' | 'id' | 'title' | 'columnValue' | 'currentEpisode' | 'theEnd' | 'moviePv'>

  interface LeaderboardItem {
    weekRank: RankMovieItem[];
    mouthRank: RankMovieItem[];
  }

  type MovieLeaderboard = ResData<LeaderboardItem[]>
}

