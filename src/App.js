import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import Carousel from "./components/carousel/carousel";
import Search from "./components/search/search";
import Menu from "./components/menu/menu";
import ImdbIcon from "./components/imdbIcon/imdbIcon";
import CardRelease from "./components/cardRelease/cardRelease";
import CardComing from "./components/cardComing/cardComing";
import axiosInstance from "./common/axios";
import Carousel from "./components/carousel/carousel";
import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "./redux/action/index";
import InputBox from "./components/inputBox/inputBox";

function App() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="container_1">
      <InputBox></InputBox>
    </div>
  );
}

export default App;
