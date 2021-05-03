import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import groceryProduct from "../ProductsData/ProductData.json";
import "../style/Component/ProductsPage.css";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../actions/auth";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [addToCartArr, setAddToCartArr] = useState([]);
  const dispatch = useDispatch();
  const handleAddtoCart = (index) => {
    let addtocartData = [];
    let data = groceryProduct[index];
    delete data.pack_size;
    data.quantity = 1;
    addtocartData.push(...addToCartArr, data);
    setAddToCartArr(addtocartData);
    dispatch({
      type: ADD_TO_CART,
      addToCartProduct: addtocartData,
    });
  };
  console.log(addToCartArr);

  return (
    <div className="productsList mainpages">
      <Row>
        {groceryProduct.map((product, index) => {
          return (
            <Col key={index} xs="3">
              <Card>
                {product.images.map((images, index) => {
                  return (
                    <CardImg
                      key={index}
                      top
                      width="100%"
                      src={images}
                      alt={images.toString()}
                    />
                  );
                })}
                <CardBody>
                  <CardTitle tag="h5">{product.title}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {product.category}
                  </CardSubtitle>
                  <CardText className="price">₹ {product.price}</CardText>
                  <button
                    className="addtocartbtn"
                    onClick={() => handleAddtoCart(index)}
                  >
                    Add To Cart
                  </button>
                  <Link
                    to={{
                      pathname: `product/${product.title}`,
                      query: { id: product.id },
                    }}
                  >
                    <CardText className="detailclass">View in Detail</CardText>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
