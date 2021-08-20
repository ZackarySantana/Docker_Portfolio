import { useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../login/authContext";

export default function MainPage() {
  const [userInfo, setUserInfo] = useState({});
  const [status, setStatus] = useState("req");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/students/id/" + authContext.userInfo.UserID,
        {
          Token: authContext.userInfo.Token,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setStatus("suc")
        } else {
          setStatus("fail")
        }
      })
      .catch((err) => err.response);
  }, [authContext.userInfo.Token]);

  return (
    <>
      {status === "suc" && <h1>load</h1>}
      {status === "fail" && <h1>fail</h1>}
      {status === "req" && <h1>loading</h1>}
    </>
  );
}
