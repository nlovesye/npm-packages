import { Empty } from "antd";
import { FC, ReactNode } from "react";
import {
  LoadingSpin,
  Props as LoadingSpinProps,
} from "@/components/LoadingSpin";
import styles from "./index.module.less";

interface Props extends LoadingSpinProps {
  isEmpty?: boolean;
  children: ReactNode;
}

export const ListWrapper: FC<Props> = ({
  children,
  isEmpty = true,
  ...restProps
}) => {
  return (
    <LoadingSpin {...restProps}>
      {!isEmpty ? (
        <>{children}</>
      ) : (
        <Empty
          className={styles.empty}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>暂无数据</span>}
        />
      )}
    </LoadingSpin>
  );
};
