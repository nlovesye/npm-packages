import { fetchVideoByName } from "@/services";
import ReactPlayer from "react-player";
import { useCallback, useEffect, useState } from "react";
import { VideoInfo, VideoNode } from "@/models";
import classNames from "classnames";
import styles from "./index.module.less";
import { useParams } from "react-router";
import { ListWrapper } from "@/components/ListWrapper";

export default function VideoPlayer() {
  const { name } = useParams<{ name: string }>();

  const [videoNode, setVideoNode] = useState<VideoNode>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<VideoInfo>();

  const onClick = useCallback((d: VideoInfo) => {
    setCurrentVideo((prev) => (d.name !== prev?.name ? d : prev));
  }, []);

  const initVideoInfo = useCallback(async () => {
    setLoading(true);
    const data = await fetchVideoByName(name!);
    setLoading(false);
    if (data) {
      setVideoNode(data);
    }
  }, [name]);

  useEffect(() => {
    initVideoInfo();
  }, [initVideoInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.reactPlayerBox}>
        <ReactPlayer
          className={styles.reactPlayer}
          url={currentVideo?.url}
          width="100%"
          height="100%"
          controls
        />
      </div>

      <ListWrapper
        loading={loading}
        isEmpty={!videoNode || 1 > videoNode.subs.length}
      >
        <ul className={styles.playerList}>
          {(videoNode?.subs || []).map((vn) => {
            const { name } = vn;
            return (
              <li
                key={name}
                className={classNames(styles.listItem, {
                  [styles.active]: currentVideo?.name === name,
                })}
                onClick={() => onClick(vn)}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </ListWrapper>
    </div>
  );
}
