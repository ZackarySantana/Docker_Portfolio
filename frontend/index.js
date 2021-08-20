import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { handleAuth } from "./login/authHandler";
import AuthContext from "./login/authContext";

import LoadingPage from "./misc/LoadingPage";
import MainPage from "./main/MainPage";
import LoginPage from "./login/LoginPage";

import "./misc/styles.css";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [status, setStatus] = useState("req");

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    if (
      typeof userInfo === "object" &&
      userInfo !== null &&
      "Token" in userInfo
    ) {
      handleAuth(userInfo.Token).then((res) => {
        if (res.status === 200) {
          // Good token
          setUserInfo(res.data);
          setStatus("suc");
        } else {
          // Bad token so we remove
          window.localStorage.removeItem("userInfo");
          setStatus("fail");
        }
      });
    } else {
      setStatus("fail");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo: (userInfo) => {
          setUserInfo(userInfo);
          setStatus("suc");
        },
      }}
    >
      {status === "suc" && <MainPage></MainPage>}
      {status === "fail" && <LoginPage></LoginPage>}
      {status === "req" && <LoadingPage></LoadingPage>}
    </AuthContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById("root")
);
