import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "../Components/Main";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../actions/auth";

export default function Home() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchUsers());
  // });
  return (
    <div>
      <Router>
        <Route path="/" component={Main} />
      </Router>
    </div>
  );
}
