import { API_PREFIX, BASE_URL } from "@/config";
import { VideoNode } from "@/models";

export async function fetchVideos(): Promise<string[]> {
  try {
    const res = await fetch(`${API_PREFIX}/video/list`);
    const videos = await res.json();
    return videos;
  } catch (error) {
    return [];
  }
}

export async function fetchVideoByName(
  name: string
): Promise<VideoNode | null> {
  try {
    const res = await fetch(`${API_PREFIX}/video/${name}`);
    const ret = await res.json();
    const data = ret.data as VideoNode;
    const result: VideoNode = {
      ...data,
      subs: data.subs.map((s) => ({
        ...s,
        url: `${BASE_URL}/${s.url}`,
      })),
    };
    return result;
  } catch (error) {
    return null;
  }
}
