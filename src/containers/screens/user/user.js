import React, { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import "./user.css";
import Header from "../../../components/header/header";

export default function User() {
  const [content, setContent] = useState(1);

  const Content = () => {
    switch (content) {
      case 1:
        return <Info />;
        break;
      case 2:
        return <UserReview />;
        break;
      default:
        break;
    }
  };

  return (
    <div className="container_1">
      <Header />
      <div className="user-section">
        <nav class="navbar navbar-expand-lg navbar-dark border-bottom border-dark navbar-user">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" onClick={() => setContent(1)}>
                  Tài khoản
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={() => setContent(2)}>
                  Đánh giá
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Content />
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="container-info">
      <div className="info-left">
        <img
          src="https://avatars.githubusercontent.com/u/98681?v=4"
          className="avatar"
        />
      </div>
      <div className="info-right">
        <p>
          <label>{"Email:"}</label>
          <input value={"kma@gmail.com"} className="email" />
        </p>
        <p>
          <label>{"Tên hiển thị:"}</label>
          <input value={"Trung Hoang"} className="name" />
        </p>
        <button className="btn btn-outline-light disabled">Lưu</button>
        <button type="button" class="btn btn-outline-danger ms-2">
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

function UserReview() {
  return (
    <div>
      <p className="text-white">Bạn chưa có đánh giá nào</p>
    </div>
  );
}
