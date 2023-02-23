import { ADMIN_USER } from "@/config";
import { UserContext } from "@/context/UserContext";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { FC, useCallback, useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./index.module.less";

export const Header: FC = () => {
  const { userName, passWord, clear } = useContext(UserContext);

  const navigate = useNavigate();

  const isAdmin = useMemo(
    () => userName === ADMIN_USER.userName && passWord === ADMIN_USER.passWord,
    [userName, passWord]
  );

  const onMenuItemClick: MenuProps["onClick"] = useCallback(
    (info: any) => {
      const { key } = info;
      if ("action" !== key) {
        return;
      }
      if (!isAdmin) {
        navigate("/login");
      } else {
        clear();
      }
    },
    [isAdmin, navigate, clear]
  );

  const genUserMenu: () => MenuProps = useCallback(() => {
    const items: MenuProps["items"] = [
      {
        key: "info",
        disabled: true,
        icon: <UserOutlined />,
        label: !isAdmin ? "游客" : "管理员",
      },
      {
        type: "divider",
      },
      {
        key: "action",
        icon: !isAdmin ? <LoginOutlined /> : <LogoutOutlined />,
        label: !isAdmin ? "登录" : "退出",
      },
    ];
    return {
      onClick: onMenuItemClick,
      items,
    };
  }, [isAdmin, onMenuItemClick]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoBox}>
        <img className={styles.logo} src="/logo.png" alt="logo" />
      </Link>
      <div className={styles.extraBox}>
        {isAdmin && (
          <Link to="/manage" className={styles.manageLink}>
            管理后台
          </Link>
        )}

        <Dropdown menu={genUserMenu()}>
          <UserOutlined className={styles.userIcon} />
        </Dropdown>
      </div>
    </header>
  );
};
