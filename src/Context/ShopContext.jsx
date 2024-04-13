import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [isOrderInfoVisible, setIsOrderInfoVisible] = useState(false);
  const [cartStatus, setCartStatus] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data.cartData);
          setCartStatus(data.cartStatus);
        });
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));
      if (localStorage.getItem("auth-token")) {
        fetch("http://localhost:4000/removefromcart", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: itemId }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmout = 0;
    if (cartItems) {
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemId = Number(item); // Chuyển đổi item sang kiểu số
          let itemInfo = all_product.find((product) => product.id === itemId);
          totalAmout += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmout;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const handleShowOrderInfo = () => {
    setIsOrderInfoVisible(true);
  };

  const handleCloseOrderInfo = () => {
    setIsOrderInfoVisible(false);
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    isOrderInfoVisible,
    handleShowOrderInfo,
    handleCloseOrderInfo,
    cartStatus,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
