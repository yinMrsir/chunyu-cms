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

  interface Item { id: number; name: string }

  interface MoviePv { pv: number }

  interface Actor { name: string }

  interface CastItem { id: number; actor: Actor }

  interface MovieRate extends ResBase { id: number; movieId: number; rate: number; rateUserCount: number }

  interface MovieVideoItem extends ResBase {
    id: number;
    movieId: number;
    typeId: number;
    title: string;
    videoId: number;
    cover: string;
    sort: number;
    status: string;
  }

  interface MovieItem extends ResBase {
    id: number;
    status: number;
    releaseStatus: number;
    releaseDate: string;
    title: string;
    poster: string;
    bgColor: string;
    titleEn: string;
    titleOriginal: string;
    akas: string;
    columnValue: string;
    genres: string;
    year: string;
    pubdate: string;
    duration: string;
    durations: string;
    versions: string;
    eggHunt: string;
    color: string;
    seasonCount: number;
    currentSeason: number;
    episodeCount: number;
    currentEpisode: number;
    theEnd: number;
    countryIds: string;
    languages: string;
    tags: string;
    summary: string;
    isPay: number;
    paymentAmount: number;
    freeDuration: number;
    country: Item[];
    casts: CastItem[];
    moviePv: MoviePv;
    movieRate: MovieRate | null;
    movieVideosCount: number;
    userCollectsCount: number;
    movieVideos?: MovieVideoItem[]
  }
  interface RankMovieItem extends Pick<MovieItem, 'updateTime' | 'id' | 'title' | 'columnValue' | 'currentEpisode' | 'theEnd' | 'moviePv'> {}
  interface LeaderboardItem {
    weekRank: RankMovieItem[];
    mouthRank: RankMovieItem[];
  }
  interface CastListItem {
    id: number;
    role: string;
    actorId: number;
    actorAvatar: string;
    actorName: string;
    actorGender: string;
    actorBirthday: string;
    countryName: string;
    professionId: number;
    professionName: string;
    professionMpath: string;
  }
  interface ColumnMovieItem extends Pick<ColumnItem, 'name' | 'type' | 'value'> {
    genres: Item[];
    ranks: RankMovieItem[];
    rows: Pick<MovieItem, 'id' | 'title' | 'poster' | 'columnValue' | 'casts' | 'movieRate'>[];
  }

}
