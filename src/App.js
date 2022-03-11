import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./containers/screens/home/home";
import Movie from "./containers/screens/movies/movies";
import Login from "./containers/screens/login/login";
import Actor from "./containers/screens/actor/actor";
import User from "./containers/screens/user/user";
import { PrivateRoute, AuthRoute } from "./common/PrivateRouter";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navigate to="/home" />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route
          path="/movies/:id"
          element={
            <PrivateRoute>
              <Movie />
            </PrivateRoute>
          }
        />
        <Route
          path="/actor/:id"
          element={
            <PrivateRoute>
              <Actor />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
