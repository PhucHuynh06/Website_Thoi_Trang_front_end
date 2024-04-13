import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

export const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Đặc Biệt !</h1>
        <h1>Sale đến 70%</h1>
        <p>NHỮNG SẢN PHẨM BÁN CHẠY NHẤT !</p>
        <button>Xem Ngay</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}

export default Offers
