import React, { useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./OrderInfo.css";
import axios from "axios";
import toast from "react-hot-toast";

const OrderInfo = () => {
  const {
    isOrderInfoVisible,
    handleCloseOrderInfo,
    all_product,
    cartItems,
    getTotalCartAmount,
  } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form khi submit

    const products = all_product
      .map((e) => {
        if (cartItems[e.id] > 0) {
          return {
            product_id: e.id,
            quantity: cartItems[e.id],
          };
        }
      })
      .filter((product) => product != null); // Loại bỏ phần tử null

    const orderData = {
      name: name,
      address: address,
      phone: phone,
      email: email,
      note: note,
      products: products,
      totalAmount: getTotalCartAmount(),
    };
    try {
      console.log(localStorage.getItem("auth-token"));
      const { data } = await axios({
        method: "post",
        url: "http://localhost:4000/ordering",
        headers: {
          Accept: "application/form-data",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        data: { orderData },
      });
      // Xử lý sau khi gửi thành công
      toast.success(data.message);
      handleCloseOrderInfo();
    } catch (error) {
      console.error("Có lỗi xảy ra khi gửi dữ liệu:", error);
    }
  };

  return (
    <div
      className={`order-info-container ${isOrderInfoVisible ? "visible" : ""}`}
    >
      <div className={`modal ${isOrderInfoVisible ? "visible" : ""}`}>
        <h2>Thông tin đặt hàng</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Họ và tên:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="note">Ghi chú:</label>
            <textarea
              id="note"
              name="note"
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="submit">Xác nhận</button>
            <button type="button" onClick={handleCloseOrderInfo}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderInfo;