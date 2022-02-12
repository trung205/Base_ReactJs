import React from "react";
import "./actor.css";

function Actor() {
  return (
    <div className="container_1">
      <div className="section">
        <div className="section-left">
          <div>
            <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/chBaXBIAGmZzj0lfca2iMG1eBHK.jpg"/>
          </div>
          <h3 class="title is-5">Thông tin cá nhân</h3>
          <dl>
            <dt>Nghề nghiệp</dt>
            <dd>Diễn viên</dd>
            <dt>Giới tính</dt>
            <dd>Nữ</dd>
            <dt>Ngày sinh</dt>
            <dd>6/28/1991</dd>
            <dt>Nơi sinh</dt>
            <dd>Seoul, South Korea</dd>
          </dl>
        </div>
        <div className="section-right"></div>
      </div>
    </div>
  );
}

export default Actor;
