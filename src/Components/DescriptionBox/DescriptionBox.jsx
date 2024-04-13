import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">
                Thông tin sản phẩm
            </div>
            <div className="descriptionbox-nav-box fade">Review(122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>ChicCloset: Elevate Your Style
            Discover the latest fashion trends at ChicCloset! From stylish dresses to classic denim, find your perfect outfit here. 
            Shop now for high-quality, affordable fashion.
            </p>
            <p>
            Stay ahead of the fashion curve with our regularly updated inventory, featuring the latest trends and seasonal must-haves. Whether you're revamping your wardrobe or searching for the perfect gift, ChicCloset is your go-to destination for all things fashion.
            Join our community of style enthusiasts and unleash your inner fashionista with ChicCloset. Start browsing now and discover your next fashion obsession!    
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox
