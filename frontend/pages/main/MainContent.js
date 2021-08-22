import { useContext, useEffect, useState } from "react";

import AuthContext from "Login/authContext";
import { handleUserInfo } from "Components/data";

export default function MainPage() {
  const [userInfo, setUserInfo] = useState({});
  const [status, setStatus] = useState("req");
  const authContext = useContext(AuthContext);

  useEffect(() => {
      handleUserInfo(authContext.userInfo.UserID, authContext.userInfo.Token).then((res) => {
        if (res.status === 200) {
          setStatus("suc")
          setUserInfo(res.data);
        } else {
          setStatus("fail");
        }
      })
  }, [authContext.userInfo.Token]);

  return (
    <>
      {status === "suc" && <h1>Finished loading: Your name is: {userInfo.LastName}</h1>}
      {status === "fail" && <h1>fail</h1>}
      {status === "req" && <h1>loading</h1>}
    </>
  );
}
