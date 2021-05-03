import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import "../style/Signup.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { SignupUser } from "../actions/auth";
toast.configure();
// const [inputsErr, setInputErr] = useState({});

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNu, setPhoneNu] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const signupErrMsg = useSelector((state) => {
    return state.reducer.signupErrorMsg;
  });

  function addUser(event) {
    event.preventDefault();
    setLoading(true);
    dispatch(SignupUser(fullName, email, phoneNu, password));
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNu("");
    history.push("/login");
    setLoading(false);
  }

  return (
    <>
      {signupErrMsg ? <h5>{signupErrMsg}</h5> : null}
      <div className="Head">
        <p>Shopify Buyers</p>
      </div>
      <Card className="signup-card">
        {/* {error && <Alert>{error}</Alert>} */}
        <CardHeader>
          <h2>Create Account</h2>
        </CardHeader>
        <CardBody>
          <Form onSubmit={addUser}>
            <FormGroup>
              <Label>Your Name :</Label>
              <Input
                type="text"
                name="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required="Name must be require"
              />
            </FormGroup>
            <FormGroup>
              <Label>Mobile Number :</Label>
              <Input
                type="number"
                name="phone_nu"
                value={phoneNu}
                onChange={(e) => setPhoneNu(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Enter Email :</Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Enter Password :</Label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Button type="submit" disabled={loading}>
                SignUp
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
      <div className="login-Link">
        <Label>Already Have An Account ? </Label>{" "}
        <Link type="Button" to="/login" disabled={loading}>
          {" "}
          Login{" "}
        </Link>
      </div>
    </>
  );
}

export default Signup;

// {/* <a type="button" href="/login" disabled={loading}> */}
// {/* </a> */}
// {/* <FormFeedback>{inputsErr.password}</FormFeedback> */}
// {/* <FormFeedback>{inputsErr.phoneNu}</FormFeedback> */}
// {/* <FormFeedback>{inputsErr.email}</FormFeedback> */}
// {/* <FormFeedback>{inputsErr.fullname}</FormFeedback> */}
