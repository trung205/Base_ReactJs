import React, { useState } from "react";
import Search from "./../search/search";
import Menu from "../menu/menu";
import { removeUserSession } from "../../common/token";

function Header() {
  const [classname, setClassname] = useState("end");
  const openMenu = () => {
    document.querySelector(".end").classList.toggle("menu-button");
  };
  return (
    <header className="header">
      <div className="start"></div>
      <div className="center">
        <Search />
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
            <a href="/" className="link-option">
              Tài khoản
            </a>
          </li>
          <li>
            <a href="/" className="link-option" onClick={removeUserSession}>
              Đăng xuất
            </a>
          </li>
        </Menu>
      </div>
    </header>
  );
}

export default Header;
