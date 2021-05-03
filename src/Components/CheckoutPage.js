import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import "../style/Component/CheckOutPage.css";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [phoneNu, setPhoneNu] = useState("");
  const [address, setAddress] = useState("");
  const [isDetailSubmit, setIsDetailSubmit] = useState(false);

  const handleDetailSubmit = () => {
    setIsDetailSubmit(!isDetailSubmit);
    setName("");
    setPhoneNu("");
    setAddress("");
  };

  return (
    <div className="checkoutform mainpages">
      <div>
        {isDetailSubmit ? (
          <div>
            <h6>Youe order is deliver to you as soon as possible.!</h6>
            <h2>Thank You For order.</h2>
            <Link to="/productspage">
              <button className="checkmoreproducts" type="button">
                Check More Products.
              </button>
            </Link>
          </div>
        ) : (
          <Card>
            <CardHeader>How can we know you?</CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label>Enter Your Name :</Label>
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Enter Your Phone Number :</Label>
                  <Input
                    type="number"
                    name="PhoneNu"
                    value={phoneNu}
                    onChange={(e) => setPhoneNu(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Enter Your Full Address :</Label>
                  <Input
                    type="textarea"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <button
                    type="button"
                    className="submit-btn"
                    onClick={handleDetailSubmit}
                  >
                    Submit
                  </button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
