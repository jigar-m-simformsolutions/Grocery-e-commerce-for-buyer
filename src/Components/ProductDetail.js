import React, { useEffect, useState } from "react";
import groceryProduct from "../ProductsData/ProductData.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../style/Component/ProductDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../actions/auth";
import { Link } from "react-router-dom";
import db from "../firebaseConfig/firebaseConfig";

export default function ProductDetail(props) {
  const addToCartProduct = useSelector((state) => state.reducer.addToCart);
  const dispatch = useDispatch();
  // const [allProductsInFirestore, setAllProductsInFirestore] = useState([]);
  // const [sellerInfoInFirestore, setSellerInfoInFirestore] = useState([]);
  const [wholeDetailsOfSeller, serWholeDetailsOfSeller] = useState([]);
  const [loading, setLoading] = useState(false);
  const { location } = props;
  let product = [];
  product = groceryProduct.find((p) => p.id === location.query.id);

  useEffect(() => {
    fetchsellerProduct();
  },[]);

  const checkForeSeller = () => {
    let firstItem = wholeDetailsOfSeller.shift();
    let bool = wholeDetailsOfSeller.some((p) => {
      return p.id === location.query.id;
    });
    console.log(bool);
    wholeDetailsOfSeller.unshift(firstItem);
    console.log(wholeDetailsOfSeller);
  };

  const fetchsellerProduct = () => {
    setLoading(true)
    let wholeDetail = [];
    db.collection("users")
      .get()
      .then((snapshot) => {
        let allUser = [];
        snapshot.forEach((doc) => {
          let user = doc.data();
          let uid = doc.id;
          let obj = { ...user, uid };
          allUser.push(obj);
        });
        allUser.map((user) => {
          db.collection("users")
            .doc(user.uid)
            .collection("seller-info")
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                let info = doc.data();
                let uid = doc.id;
                let obj = { ...info, uid };
                wholeDetail.push(obj);
              });
            });
        });
        allUser.map((user) => {
          db.collection("users")
            .doc(user.uid)
            .collection("seller-products")
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                let products = doc.data();
                let productId = doc.id;
                let obj = { ...products, productId };
                wholeDetail.push(obj);
              });
            });
        });
      });
    // console.log(wholeDetail);
    serWholeDetailsOfSeller(wholeDetail);
    checkForeSeller();
    setLoading(false)
  };

  const handlePlus = () => {
    console.log(wholeDetailsOfSeller);
    console.log(Array.isArray(product));
    const data = product;
    data.quantity += 1;
    console.log(Array.isArray(data));

    //   dispatch({
    //       type: ADD_TO_CART,
    //       addToCartProduct: data
    //   })
  };
  const handleMinus = () => {
    const data = product;
    data.quantity -= 1;
    console.log(data);
    // dispatch({
    //     type: ADD_TO_CART,
    //     addToCartProduct: data
    // })
  };

  return (
    <div className="container mainpages">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <>
          <div className="col-md-12 mb-5">
            <Link to="/productspage">
              <button className="seemoreproduct" type="button">
                See More Product
              </button>
            </Link>
          </div>
          <div className="row">
            {product ? (
              <>
                <div className="col-md-6">
                  {product.images.map((image, index) => {
                    return (
                      <img
                        className="productImg"
                        alt={image.toString()}
                        key={image.toString()}
                        src={image}
                      />
                    );
                  })}
                </div>
                <div className="col-md-6">
                  <div className="col-md-12">
                    <h2>{product.title}</h2>
                  </div>
                  <div className="col-md-12">
                    <span className="label label-primary">
                      {product.category}
                    </span>
                  </div>
                  <div className="col-md-12 mt-3">
                    <h6>₹ {product.price}</h6>
                  </div>
                  <div className="col-md-12">
                    <div className="quantity">
                      <button
                        className="plus-btn"
                        type="button"
                        name="button"
                        onClick={() => handlePlus()}
                        disabled={product.quantity === 100}
                      >
                        <span>
                          <FontAwesomeIcon icon={faPlus} />
                        </span>
                      </button>
                      <input
                        readOnly
                        type="text"
                        name="name"
                        value={product.quantity}
                      />
                      <button
                        className="minus-btn"
                        type="button"
                        name="button"
                        onClick={() => handleMinus()}
                        disabled={product.quantity === 0}
                      >
                        <span>
                          <FontAwesomeIcon icon={faMinus} />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-9 mt-3 mb-3">
                    <button className="add-to-cart-btn" type="button">
                      Add To Cart
                    </button>
                  </div>
                  <div className="col-md-5 mt-3 mb-3">
                    <Link to="/checkout">
                      <button className="buy-now-btn" type="button">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                  {/* </div> */}
                  <div className="col-md-12">
                    <p className="text-justify">{product.description}</p>
                  </div>
                </div>
              </>
            ) : (
              <div>Error : Product doesn't exist</div>
            )}
            <br />
            <br />
          </div>
        </>
      )}
    </div>
  );
}
