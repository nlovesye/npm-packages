import { ADMIN_USER } from "@/config";
import { UserContext } from "@/context/UserContext";
import {
    ControlFilled,
    LoginOutlined,
    LogoutOutlined,
    PlayCircleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, MenuProps } from "antd";
import { FC, useCallback, useContext, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./index.module.less";

export const Header: FC = () => {
    const { pathname } = useLocation();

    const { userName, passWord, clear } = useContext(UserContext);

    const navigate = useNavigate();

    const isAdmin = useMemo(
        () =>
            userName === ADMIN_USER.userName &&
            passWord === ADMIN_USER.passWord,
        [userName, passWord]
    );

    const onHeaderMenuItemClick: MenuProps["onClick"] = useCallback(
        (info: any) => {
            const { key } = info;
            navigate(key);
        },
        [navigate]
    );

    const genHeaderMenuItems: () => MenuProps["items"] = useCallback(() => {
        const items: MenuProps["items"] = [
            {
                key: "/player",
                icon: <PlayCircleOutlined />,
                label: "本地播放器",
            },
        ];
        if (isAdmin) {
            items.push({
                key: "/manage",
                icon: <ControlFilled />,
                label: "管理后台",
            });
        }
        return items;
    }, [isAdmin]);

    const onUserMenuItemClick: MenuProps["onClick"] = useCallback(
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
            onClick: onUserMenuItemClick,
            items,
        };
    }, [isAdmin, onUserMenuItemClick]);

    return (
        <header className={styles.header}>
            <div className={styles.menuBox}>
                <Link to="/" className={styles.logo}>
                    <img src="/logo.png" alt="logo" />
                </Link>

                <Menu
                    className={styles.menu}
                    onClick={onHeaderMenuItemClick}
                    selectedKeys={[pathname]}
                    mode="horizontal"
                    theme="dark"
                    items={genHeaderMenuItems()}
                />
            </div>

            <Dropdown menu={genUserMenu()}>
                <UserOutlined className={styles.userIcon} />
            </Dropdown>
        </header>
    );
};
