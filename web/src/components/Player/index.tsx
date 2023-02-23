import { FC, ReactNode } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import styles from "./index.module.less";
import classNames from "classnames";

interface Props extends ReactPlayerProps {
    className?: string;
    emptyCoverWrapperClassName?: string;
    emptyCover?: ReactNode;
}

export const Player: FC<Props> = ({
    url,
    className,
    emptyCoverWrapperClassName,
    emptyCover,
    ...restPlayerProps
}) => {
    return (
        <div className={classNames(styles.playerBox, className)}>
            <ReactPlayer
                className={styles.player}
                url={url}
                width="100%"
                height="100%"
                controls
                playing
                {...restPlayerProps}
            />

            {emptyCover && (
                <div
                    className={classNames(
                        styles.cover,
                        emptyCoverWrapperClassName,
                        {
                            [styles.show]: !url,
                        }
                    )}
                >
                    {emptyCover}
                </div>
            )}
        </div>
    );
};
