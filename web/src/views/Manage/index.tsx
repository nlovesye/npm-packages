import styles from "./index.module.less";
import { Input, Select, Switch, Upload, UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { API_PREFIX } from "@/config";
import { useEffect, useMemo, useState } from "react";
import { fetchVideoByName, fetchVideos } from "@/services";
import { VideoNode } from "@/models";
import { ListWrapper } from "@/components/ListWrapper";

const { Option } = Select;

const uploadAccept = ".mp4,.mkv";
const splitAccept = ".mp4";

const uploadProps: UploadProps = {
    className: styles.upload,
    name: "file",
    // multiple: true,
    maxCount: 1,
    method: "post",
    listType: "picture-card",
    // showUploadList: false,
};

export default function Manage() {
    const [dirs, setDirs] = useState<string[]>([]);
    const [dirsLoading, setDirsLoading] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<VideoNode>();
    const [currentVideoLoading, setCurrentVideoLoading] = useState(false);

    const [isAddDir, setIsAddDir] = useState(false);
    const [isSplit, setIsSplit] = useState(false);

    const [videoName, setVideoName] = useState<string>();
    const [name, setName] = useState<string>();

    const action = useMemo(
        () =>
            !isSplit
                ? `${API_PREFIX}/upload/${videoName}/${name}`
                : `${API_PREFIX}/video/split/${videoName}/${name}`,
        [isSplit, videoName, name]
    );

    const accept = useMemo(
        () => (!isSplit ? uploadAccept : splitAccept),
        [isSplit]
    );

    useEffect(() => {
        setDirsLoading(true);
        fetchVideos()
            .then((res) => {
                setDirs(res);
            })
            .finally(() => {
                setDirsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (isAddDir || !videoName) {
            setCurrentVideo(undefined);
            return;
        }
        setCurrentVideoLoading(true);
        fetchVideoByName(videoName)
            .then((data) => {
                if (data) {
                    setCurrentVideo(data);
                }
            })
            .finally(() => {
                setCurrentVideoLoading(false);
            });
    }, [isAddDir, videoName]);

    return (
        <section className={styles.container}>
            <div className={styles.form}>
                <div className={styles.row}>
                    <Switch
                        checked={isSplit}
                        onChange={setIsSplit}
                        checkedChildren="切割"
                        unCheckedChildren="上传"
                    />
                </div>

                <Switch
                    checked={isAddDir}
                    onChange={setIsAddDir}
                    checkedChildren="添加"
                    unCheckedChildren="选择"
                />

                {!isAddDir ? (
                    <Select
                        placeholder="选择上传目录"
                        className={styles.formComp}
                        loading={dirsLoading}
                        value={videoName}
                        onChange={setVideoName}
                    >
                        {dirs.map((name) => (
                            <Option value={name}>{name}</Option>
                        ))}
                    </Select>
                ) : (
                    <Input
                        placeholder="输入上传目录"
                        className={styles.formComp}
                        value={videoName}
                        onChange={(e) => setVideoName(e.target.value)}
                    />
                )}

                <Input
                    className={styles.formComp}
                    placeholder="输入名称"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <ListWrapper
                loading={currentVideoLoading}
                isEmpty={!currentVideo || 1 > currentVideo.subs.length}
            >
                <ul className={styles.videoList}>
                    {(currentVideo?.subs || []).map((vn) => {
                        const { name } = vn;
                        return (
                            <li className={styles.listItem} key={name}>
                                {name}
                            </li>
                        );
                    })}
                </ul>
            </ListWrapper>

            {videoName && name && (
                <Upload.Dragger
                    {...uploadProps}
                    action={action}
                    accept={accept}
                    disabled={!videoName || !name}
                >
                    <InboxOutlined className={styles.uploadIcon} />
                    点击或拖拽文件上传
                </Upload.Dragger>
            )}
        </section>
    );
}
