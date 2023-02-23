export interface VideoNode {
  name: string;
  subs: VideoInfo[];
}

export interface VideoInfo {
  name: string;
  url: string;
}

export interface User {
  userName: string;
  passWord: string;
}
