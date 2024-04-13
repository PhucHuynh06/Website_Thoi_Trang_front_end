import React from "react";
import CartItem from "../Components/CartItem/CartItem";
import OrderInfo from "../Components/OrderInformation/OrderInfo";

export const Cart = () => {
  return (
    <div>
      <CartItem />
      <OrderInfo />
    </div>
  );
};

export default Cart;
