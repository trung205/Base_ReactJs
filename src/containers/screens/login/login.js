import React, { useState } from "react";
import "../../css/login.scss";
import { useGoogleLogin } from "react-google-login";
import LogoGG from "../../../assets/Vector.png";
import { setUserSession } from "../../../common/token";
import { useNavigate } from "react-router-dom";
import { requestLoginManual, requestSignUp } from "../../../common/axios";
// import axios from "axios";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
function Login() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    email: null,
    password: null,
  });

  const onSuccess = async (res) => {
    try {
      const response = await res;
      setAuth({
        ...auth,
        email: response?.Iu?.yv,
      });
      let response1 = await requestSignUp(auth);
      setAuth({
        ...auth,
        email: response1?.data?.email,
        password: response1?.data?.password,
      });

      let response2 = await requestLoginManual(auth);
      console.log(response2);
      setUserSession(response2?.data?.accessToken?.token, response?.Iu);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const onFailure = (res) => {
    console.log("that bai", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });

  return (
    <div>
      <div className="container-login"></div>
      <section className="login_google">
        <a className="button-login" href="/home" onClick={signIn}>
          <span>
            <img src={LogoGG} className="logo-gg"></img>
          </span>
          <span className="text_login">Sign in with Google</span>
        </a>
      </section>
    </div>
  );
}

export default Login;
