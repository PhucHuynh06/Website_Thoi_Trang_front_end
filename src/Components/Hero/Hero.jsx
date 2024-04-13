import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png'

export const Hero = () => {
  return (
    <div className='hero'>
        <div class="hero-left">
            <h2>Hàng mới về</h2>
            <div>
                <div class="hero-hand-icon">
                    <p>New</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>Bộ sưu tập</p>
                <p>Cho mọi người</p>
            </div>
            <div class="hero-latest-btn">
                <div>Bộ sưu tập mới nhất</div>
                <img src={arrow_icon} alt="" />
        </div>
    </div>
        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  )
}

export default Hero

