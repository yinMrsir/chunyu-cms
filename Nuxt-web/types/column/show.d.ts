interface IWeekRank {
  updateTime: string;
  id: number;
  title: string;
  columnValue: string;
  currentEpisode?: any;
  theEnd: number;
  moviePv: IMoviePv;
}

interface IMouthRank {
  updateTime: string;
  id: number;
  title: string;
  columnValue: string;
  currentEpisode?: any;
  theEnd: number;
  moviePv: IMoviePv;
}

interface Data {
  weekRank: IWeekRank[];
  mouthRank: IMouthRank[];
}

export interface ImovieLeaderboard extends IResData<Data[]>{}

