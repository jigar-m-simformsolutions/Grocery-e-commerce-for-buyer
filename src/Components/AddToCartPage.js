import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../style/Component/AddToCart.css";
import { useDispatch, useSelector } from "react-redux";
import shopingCartSvg from "../assets/shopping-cart.svg";
import { useHistory } from "react-router";
import { ADD_TO_CART } from "../actions/auth";
import CheckoutPage from "./CheckoutPage";
import { Link } from "react-router-dom";

export default function AddToCartPage() {
  const addToCartProduct = useSelector((state) => state.reducer.addToCart);
  const [isChecoutClick, setIsCheckoutClick] = useState(false);
  let price = 0;
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    duplicateValueRemove();
  }, []);

  const duplicateValueRemove = () => {
    const result = [
      ...addToCartProduct
        .reduce((value, index) => {
          if (!value.has(index.id))
            value.set(index.id, { ...index, quantity: 0 });
          value.get(index.id).quantity++;
          return value;
        }, new Map())
        .values(),
    ];

    console.log(result);
    dispatch({
      type: ADD_TO_CART,
      addToCartProduct: result,
    });
  };
  const handlePlus = (index) => {
    let data = [...addToCartProduct];
    let data_index = { ...data[index] };
    data_index.quantity += 1;
    data[index] = data_index;
    dispatch({
      type: ADD_TO_CART,
      addToCartProduct: data,
    });
  };

  const handleMinus = (index) => {
    let data = [...addToCartProduct];
    let data_index = { ...data[index] };
    data_index.quantity -= 1;
    data[index] = data_index;
    dispatch({
      type: ADD_TO_CART,
      addToCartProduct: data,
    });
  };

  const handleDeleteProduct = (index) => {
    let data = [...addToCartProduct];
    data.splice(index, 1);
    dispatch({
      type: ADD_TO_CART,
      addToCartProduct: data,
    });
  };

  const handleCheckout = () => {
    setIsCheckoutClick(!isChecoutClick);
  };

  const handleGoToProductPage = () => {
    history.push("/productspage");
  };

  return (
    <div className="mainpages">
      {addToCartProduct.legnth && Array.isArray(addToCartProduct) ? (
        <div className="shoppingcartimg">
          <img src={shopingCartSvg} alt="Shoppingbagimage" />
          <h1>No Item In Cart</h1>
          <button className="gotoPtoductsPage" onClick={handleGoToProductPage}>
            Go To ProductsPage
          </button>
        </div>
      ) : (
        <>
          <div className="shoppingcartimg">
            <img src={shopingCartSvg} alt="Shoppingbagimage" />
            <h1>Shopping Bag</h1>
          </div>
          <div className="SelectedProducts">
            <div className="title">Selected Products</div>
            {addToCartProduct.map((products, index) => {
              return (
                <div className="item" key={index}>
                  <div className="srno">
                    <h4>{index + 1}.</h4>
                  </div>
                  {products.images.map((image, imgIndex) => {
                    return (
                      <div className="image" key={imgIndex}>
                        <img src={image} alt={image.toString()} />
                      </div>
                    );
                  })}
                  <div className="description">{products.title}</div>
                  <div className="quantity">
                    <button
                      className="plus-btn"
                      type="button"
                      name="button"
                      onClick={() => handlePlus(index)}
                      disabled={products.quantity === 100}
                    >
                      <span>
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                    </button>
                    <input
                      readOnly
                      type="text"
                      name="name"
                      value={products.quantity}
                    />
                    <button
                      className="minus-btn"
                      type="button"
                      name="button"
                      onClick={() => handleMinus(index)}
                      disabled={products.quantity === 0}
                    >
                      <span>
                        <FontAwesomeIcon icon={faMinus} />
                      </span>
                    </button>
                  </div>
                  <div className="total-price">
                    <h6>
                      {products.price} * {products.quantity} = ₹{" "}
                      {products.price * products.quantity}
                    </h6>
                  </div>
                  <button
                    className="delete-btn"
                    type="button"
                    name="button"
                    onClick={() => handleDeleteProduct(index)}
                  >
                    <span>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </button>
                </div>
              );
            })}
            <div className="pricedisplay">
              <h6>
                {addToCartProduct.map((product, index) => {
                  console.log(index);
                  let total_price = 0;
                  total_price += product.quantity * product.price;
                  price = price + total_price;
                })}
                Total Price of all Products : {price}.0 ₹
              </h6>
            </div>
            <div className="checkout-rmv-btn">
              <Link to="/checkout">
                <button
                  className="checkout-btn"
                  type="button"
                  name="button"
                  onClick={handleCheckout}
                >
                  <span>CheckOut</span>
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
      {/* {isChecoutClick ? <CheckoutPage /> : null} */}
    </div>
  );
}
