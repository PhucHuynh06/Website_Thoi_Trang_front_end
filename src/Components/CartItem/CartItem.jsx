import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import axios from "axios";
import toast from "react-hot-toast";

export const CartItem = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    handleShowOrderInfo,
    cartStatus,
  } = useContext(ShopContext);

  const handleCancelOrdering = async () => {
    try {
      console.log(localStorage.getItem("auth-token"));
      const { data } = await axios({
        method: "post",
        url: "http://localhost:4000/cancelorder",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
      });
      // Xử lý sau khi gửi thành công
      toast.success(data.message);
    } catch (error) {
      console.error("Có lỗi xảy ra khi gửi dữ liệu:", error);
    }
  };
  return (
    <div className="cartitems">
      <div className="cartitems-fromat-main">
        <p>Sản Phẩm</p>
        <p>Tên Sản Phẩm</p>
        <p>Giá</p>
        <p>Số Lượng</p>
        <p>Tổng</p>
        <p>Xoá</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-fromat-main ">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>{e.new_price || 0} vnd</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>{e.new_price * cartItems[e.id]} vnd </p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Chi tiết giỏ hàng</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} vnd</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Phí vận chuyển</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Tổng</h3>
              <h3>{getTotalCartAmount()} vnd</h3>
            </div>
            <div className="cartitems-total-item">
              <i>Trạng thái</i>
              <p>{cartStatus || ""}</p>
            </div>
          </div>
          <div className="button">
            <div>
              <button onClick={handleShowOrderInfo}>
                {cartStatus ? "Cập nhật thông tin" : "Thanh Toán"}
              </button>
            </div>
            <div>
              {" "}
              {cartStatus === "Đang chờ xử lý" ? (
                <button onClick={handleCancelOrdering}>Hủy đặt hàng</button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="cartitems-promocde">
          <p>Nếu bạn có mã giảm giá, thì hãy nhập vào đây</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Mã Giảm giá" />
            <button>Thêm mã</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
