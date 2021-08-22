import axios from "axios";

const serverHostName = "LidTop";

const handleLogin = async (loginInformation) => {
  return axios
    .post("http://" + serverHostName + ":8080/login", loginInformation)
    .then((res) => res)
    .catch((err) => err.response);
};

const handleAuth = async (Token) => {
  return axios
    .post("http://" + serverHostName + ":8080/auth", { Token })
    .then((res) => res)
    .catch((err) => err.response);
};

const handleUserInfo = async (UserID, Token) => {
  return axios
    .post(
      "http://" + serverHostName + ":8080/users/id/" + UserID,
      {
        Token: Token,
      }
    )
    .then((res) => res)
    .catch((err) => err.response);
}

export { handleAuth, handleLogin, handleUserInfo };
