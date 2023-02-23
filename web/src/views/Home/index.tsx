import { fetchVideos } from "@/services";
import { useState, useMemo, useEffect } from "react";
import styles from "./index.module.less";
import { Link } from "react-router-dom";
import { ListWrapper } from "@/components/ListWrapper";
import { Input } from "antd";

const { Search } = Input;

export default function Home() {
  const [keyword, setKeyword] = useState<string>();
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const list = useMemo(
    () => (!keyword ? videos : videos.filter((name) => name.includes(keyword))),
    [keyword, videos]
  );

  useEffect(() => {
    fetchVideos()
      .then((res) => {
        setVideos(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.listHeader}>
        {!keyword ? "所有影视列表" : `“${keyword}”的搜索结果：`}
        <div className={styles.searchBox}>
          <Search placeholder="输入关键字搜索" onSearch={setKeyword} />
        </div>
      </div>
      <ListWrapper loading={loading} isEmpty={1 > list.length}>
        <div className={styles.list}>
          {list.map((name) => (
            <Link key={name} className={styles.linkItem} to={`/video/${name}`}>
              <div className={styles.cover}>
                <img src="/logo.png" alt="" />
              </div>
              <span className={styles.title}>{name}</span>
            </Link>
          ))}
        </div>
      </ListWrapper>
    </section>
  );
}
