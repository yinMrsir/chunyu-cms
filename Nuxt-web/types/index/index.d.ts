export interface BannerItem extends ResBase {
  id: number;
  img: string;
  title: string;
  url: string;
  urlType: string;
}

export interface LinkItem extends ResBase {
  id: number;
  text: string;
  url: string;
}
