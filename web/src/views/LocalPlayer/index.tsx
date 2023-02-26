import { useCallback, useMemo, useState } from "react";
import styles from "./index.module.less";
import { Player } from "@/components/Player";
import { Button, message, Popconfirm, Upload, UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { getObjectURL } from "@/utils";
import { RcFile } from "antd/es/upload";

const accept = ".mp4, .mkv";

const uploadProps: UploadProps = {
    className: styles.upload,
    name: "file",
    accept,
    maxCount: 1,
    method: "post",
    listType: "picture-card",
    showUploadList: false,
};

export default function LocalPlayer() {
    const [url, setUrl] = useState<string>();
    const [currentFileName, setCurrentFileName] = useState<string>("");

    const customRequest: UploadProps["customRequest"] = useMemo(
        () =>
            async ({ onSuccess, file }) => {
                const hideLoading = message.loading({
                    key: "load",
                    content: "视频加载中，请稍候",
                });

                const objURL = getObjectURL(file as RcFile);

                const { name } = file as RcFile;

                setUrl(objURL);
                setCurrentFileName(name);

                hideLoading();

                onSuccess?.(file);
            },
        []
    );

    const onChange = useCallback(() => {
        setUrl(undefined);
        setCurrentFileName("");
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>当前正在播放：{currentFileName}</div>
            <Player
                url={url}
                emptyCover={
                    <Upload.Dragger
                        {...uploadProps}
                        customRequest={customRequest}
                    >
                        <div className={styles.uploadDropper}>
                            <InboxOutlined className={styles.uploadIcon} />
                            点击或拖拽视频到这里开始播放，当前支持的格式：
                            {accept}
                        </div>
                    </Upload.Dragger>
                }
            />

            {url && (
                <div className={styles.buttonBox}>
                    <Popconfirm
                        title="是否停止当前的视频播放？"
                        onConfirm={onChange}
                        okText="是"
                        cancelText="再看看"
                        placement="top"
                    >
                        <Button type="primary">看完了，换个视频</Button>
                    </Popconfirm>
                </div>
            )}
        </div>
    );
}
