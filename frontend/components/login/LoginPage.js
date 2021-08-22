import React, { useContext, useRef } from "react";

import AuthContext from "./authContext";
import { handleLogin } from "Components/data";

export default function LoginPage() {
  const email = useRef();
  const password = useRef();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await handleLogin({
      email: email.current.value,
      password: password.current.value,
    });

    if (!res) {
      console.log("Login fail");
      return;
    }
    if (res.status === 200) {
      window.localStorage.setItem("userInfo", JSON.stringify(res.data));
      authContext.setUserInfo(res.data);
      console.log("Sucessful login");
    } else if (res.status === 401) {
      console.log("Invalid Creds");
    }
  };

  return (
    <div className="login_page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email:</p>
          <input ref={email} type="text" placeholder="Your email" />
        </label>
        <label>
          <p>Password:</p>
          <input ref={password} type="password" />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
}
