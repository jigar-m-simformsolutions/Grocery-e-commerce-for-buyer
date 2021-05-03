import React from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import ContactPage from "./ContactPage";
import Header from "./Header";
import WishListPage from "./WishListPage";
import AddToCartPage from "./AddToCartPage";
import ProductsPage from "./ProductsPage";
import "../style/Main.css";
import ProductDetail from "./ProductDetail";
import CheckoutPage from "./CheckoutPage";

export default function Main() {
  return (
    <div className="main-panel">
      <Header />
      <Switch>
        <Route path="/productspage" component={ProductsPage} />
        <Route path="/addtocartpage" component={AddToCartPage} />
        <Route path="/product/" component={ProductDetail} />
        <Route path="/checkout" component={CheckoutPage} />
        <Redirect from="*" to="/productspage" />
      </Switch>
    </div>
  );
}
