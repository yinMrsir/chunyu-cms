export interface VideoInfo {
  url: string;
}

export interface Video {
  poster: string;
  name: string;
}

export interface MovieVideo {
  id: number;
  title: string;
  cover: string;
  video: Video;
}

export interface MovieVideoInfo {
  movieId: number;
  typeId: string;
  title: string;
  movie: MovieItem;
  country: Item[];
  videoInfo: VideoInfo;
  videos: MovieVideo[];
}

