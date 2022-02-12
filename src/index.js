import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import Login from "./containers/screens/login/login";
// import Carousel from "./components/carousel";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import { store } from './redux/store';
// import Home from "./containers/screens/home/home"
// import Movie from "./containers/screens/movies/movies"
import Actor from "./containers/screens/actor/actor"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Actor />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
