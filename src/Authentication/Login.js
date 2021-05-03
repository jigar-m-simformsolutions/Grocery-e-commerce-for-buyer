import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Alert,
  Label,
  Input,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../style/Login.css";
import { auth } from "../firebaseConfig/firebaseConfig";
import { LoginUser } from "../actions/auth";
import { toast } from "react-toastify";
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeclose = <FontAwesomeIcon icon={faEyeSlash} />;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firestoreData, setFirestoreData] = useState([]);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => {
    return state.reducer.isAuthenticated;
  });
  const loginError = useSelector((state) => {
    return state.reducer.loginError;
  });
  const currentUser = useSelector((state) => {
    return state.reducer.user;
  });
  
  function togglePasswordVisiblity() {
    setPasswordShown(!passwordShown);
  }
  
  function handleLogin(event) {
    event.preventDefault();
    setLoading(true); 

    if(auth.currentUser.emailVerified){
      dispatch(LoginUser(email,password))
    }else{
      toast.dark("Please Verifiy Your Email!", {autoClose : 5000})
    }

    console.log(currentUser)
    setLoading(false);
  }
  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <div className="Head">
          <p>Shopify Buyers</p>
        </div>
        <Card className="login-card">
          {loginError ? <Alert color="danger">failed to login</Alert> : null}
          <CardHeader>
            <h2>Login</h2>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label>Enter Email :</Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password :</Label>
                  <Link style={{float : "right"}} type="Button" to="/resetpassword" disabled={loading}>Forget Password </Link>
                <div className="password-div">
                  <Input
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown === false ? eye : eyeclose}
                  </i>
                </div>
              </FormGroup>
              <Button type="submit" disabled={loading}>
                Login
              </Button>
            </Form>
          </CardBody>
        </Card>
        <div className="Create-Account-Link">
          Don't Have An Account ?{" "}
            <Link type="Button" disabled={loading} to="/signup">Create Account</Link>
        </div>
      </>
    );
  }
}

{/* <a style={{ float: "right" }} type="button"> */}
{/* </a> */}
{/* <a type="button" disabled={loading}> */}
{/* </a> */}