// import "../css/login.scss";
import "../../css/login.scss";
// import LogoGG from "../../assets/Vector.png"
import LogoGG from "../../../assets/Vector.png"

function login() {
  return (
    <div>
      <div className="container"></div>
      <section className="login_google">
        <a>
          <span><img src={LogoGG}></img></span>
          <span className="text_login">Sign in with Google</span>
        </a>
      </section>
    </div>
  );
}

export default login;
