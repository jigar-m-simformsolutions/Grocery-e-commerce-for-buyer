import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import Home from "./Authentication/Home";
import Signup from "./Authentication/Signup"
import Login from "./Authentication/Login";
import ResetPassword from "./Authentication/ResetPassword"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/resetpassword" component={ResetPassword} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
