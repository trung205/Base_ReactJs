import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";
import { getToken } from "./token";

export function PrivateRoute({ children }) {
  const auth = getToken();
  console.log(auth, "trung");
  return auth ? children : <Navigate to="/login" />;
}
export function AuthRoute({ children }) {
  const auth = getToken();
  return !auth ? children : <Navigate to="/home" />;
}
