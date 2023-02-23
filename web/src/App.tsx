import { BrowserRouter } from "react-router-dom";
import { Suspense, useCallback, useMemo, useState } from "react";
import { LoadingSpin } from "@/components/LoadingSpin";
import { Router } from "./router";
import { UserContext } from "./context/UserContext";
import { LS } from "./utils";
import { User } from "./models";
import { Header } from "./components/Header";
import styles from "./App.module.less";
import { ConfigProvider } from "antd";
import antdThemeConfig from "@/styles/theme/antd.json";

const theme = {
  token: antdThemeConfig,
};

function App() {
  const [userName, setUserName] = useState<string>(LS.get("userName") || "");
  const [passWord, setPassWord] = useState<string>(LS.get("passWord") || "");

  const update = useCallback((obj: User) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        LS.set(key, obj[key]);
      }
    }
    setUserName(obj.userName);
    setPassWord(obj.passWord);
  }, []);

  const clear = useCallback(() => {
    LS.remove("userName");
    LS.remove("passWord");
    setUserName("");
    setPassWord("");
  }, []);

  const userValue = useMemo(
    () => ({ userName, passWord, update, clear }),
    [userName, passWord, update, clear]
  );

  return (
    <UserContext.Provider value={userValue}>
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <Header />

          <div className={styles.appContent}>
            <Suspense fallback={<LoadingSpin />}>
              <Router />
            </Suspense>
          </div>
        </BrowserRouter>
      </ConfigProvider>
    </UserContext.Provider>
  );
}

export default App;
