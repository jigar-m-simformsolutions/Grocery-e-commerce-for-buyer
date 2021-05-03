import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  Alert,
  CardBody,
  CardHeader,
  Label,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { resetPassword } from "../actions/auth";
import { auth } from "../firebaseConfig/firebaseConfig";
import "../style/ResetPassword.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let userVerified = auth.currentUser.emailVerified;
  const dispatch = useDispatch();

  const passwordResetLinkSend = useSelector((state) => {
    return state.reducer.ispasswordResetLinkSend;
  });

  function handleResetPassword(event) {
    event.preventDefault();
    setLoading(true);

    if (userVerified) {
      dispatch(resetPassword(email));
    } else {
      toast.dark("You haven't verified email, please verified", {
        autoClose: 2000,
      });
    }
    if (passwordResetLinkSend) {
      toast.dark("Check your inbox for password reset link ", {
        autoClose: 10000,
      });
    }
    history.push("/login");
    setLoading(false)
  }
  return (
    <>
      <div className="Head">
        <p>Shopify Buyers</p>
      </div>
      <Card className="resetPassword-Card">
        {error && <Alert>{error}</Alert>}
        <CardHeader>
          <h2>Reset Password</h2>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleResetPassword}>
            <Label>Enter Email :</Label>
            <FormGroup>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Button disabled={loading} type="submit">
                Reset password
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}
