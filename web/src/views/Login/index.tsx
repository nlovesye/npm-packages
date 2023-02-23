import styles from "./index.module.less";
import { Button, Input, notification } from "antd";
import { useCallback, useContext, useState } from "react";
import { ADMIN_USER } from "@/config";
import { useNavigate } from "react-router";
import { UserContext } from "@/context/UserContext";

export default function Login() {
  const user = useContext(UserContext);

  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>();
  const [passWord, setPassWord] = useState<string>();

  const onLogin = useCallback(() => {
    if (userName !== ADMIN_USER.userName || passWord !== ADMIN_USER.passWord) {
      notification.error({
        key: "notice",
        message: "Error",
        description: "用户名或密码错误",
      });
      return;
    }
    const payload = { userName, passWord };
    user.update(payload);
    navigate("/");
  }, [userName, passWord, navigate, user]);

  return (
    <section className={styles.container}>
      <Input
        className={styles.formComp}
        placeholder="输入用户名"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input.Password
        className={styles.formComp}
        placeholder="输入密码"
        value={passWord}
        onChange={(e) => setPassWord(e.target.value)}
      />

      <Button
        block
        type="primary"
        className={styles.formComp}
        onClick={onLogin}
      >
        登录
      </Button>
    </section>
  );
}
