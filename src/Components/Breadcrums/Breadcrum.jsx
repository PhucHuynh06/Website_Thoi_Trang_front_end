import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

export const Breadcrum = (props) => {
  const {product} = props;
  return (
    <div className='breadcrum'>
      Trang chủ <img src={arrow_icon} alt="" />
      SHOP <img src={arrow_icon} alt="" />
      {product.category} <img src={arrow_icon} alt="" />{product.name}
    </div>
  )
}

export default Breadcrum;