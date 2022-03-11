import React, { useState } from "react";
import Search from "./../search/search";
import Menu from "../menu/menu";
import { removeUserSession } from "../../common/token";
import { useGoogleLogout } from "react-google-login";
import logo from '../../assets/img/logo.png'; 

function Header(props) {
  const { movie } = props;
  const [classname, setClassname] = useState("end");
  const openMenu = () => {
    document.querySelector(".end").classList.toggle("menu-button");
  };

  const { signOut } = useGoogleLogout({
    jsSrc: "https://apis.google.com/js/api.js",
  });
  const handleOut = () => {
    signOut();
    removeUserSession();
  };
  return (
    <header className="header">
      <div className="start">
        <img src={logo}/>
        </div>
      <div className="center">
        <Search movie={movie} />
      </div>
      <div className={classname}>
        <button onClick={openMenu}>
          <span className="name">Trung Hoang</span>
          <img
            className="avatar-img"
            src="https://github.com/mdo.png"
            height="32"
            width="32"
          />
        </button>
        <Menu onClickClose={openMenu}>
          <li>
            <a href="/user/1" className="link-option">
              Tài khoản
            </a>
          </li>
          <li>
            <a href="/" className="link-option" onClick={handleOut}>
              Đăng xuất
            </a>
          </li>
        </Menu>
      </div>
    </header>
  );
}

export default Header;
