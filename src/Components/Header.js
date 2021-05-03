import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useSelector } from "react-redux";

// import "../style/Header.css";
import "../style/Header.css";
const AddToCart = <FontAwesomeIcon icon={faShoppingCart} />;
// const wishList = <FontAwesomeIcon icon={faHeart} />;
const angleDown = <FontAwesomeIcon icon={faAngleDown} />;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const userName = "jigarmodi743";
  // auth.currentUser.email.split("@")[0]
  const isAuthenticated = useSelector((state) => {
    return state.reducer.isAuthenticated;
  });
  const addToCartProduct = useSelector((state) => state.reducer.addToCart);
  function toggle() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {}, [addToCartProduct]);

  return (
    <div>
      <Navbar color="light" fixed="top" light expand="md">
        <NavbarBrand href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Shopify_Logo.png"
            height="30"
            alt="shopify logo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto navlist" navbar>
            <NavItem className="addtocart">
              <Link to="/addtocartpage" className="nav-link waves-effect">
                {addToCartProduct.length === 0 ? (
                  ""
                ) : (
                  <p>
                    {addToCartProduct.reduce(
                      (totalQuantity, product) =>
                        totalQuantity + product.quantity,
                      0
                    )}
                  </p>
                )}
                <span>{AddToCart}</span>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
