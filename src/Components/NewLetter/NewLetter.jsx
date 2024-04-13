import React from 'react'
import './NewLetter.css'
export const NewLetter = () => {
  return (
    <div className='newsletter'>
        <h1><br/>Nhận Ưu Đãi Độc Quyền<br/>Qua Email Của Bạn</h1>
        <p>Đăng ký nhận bản tin mới và luôn cập nhật của chúng tôi</p>
        <div>
            <input type="Email" placeholder='Email của bạn'/>
            <button>Gửi</button>
        </div>
    </div>
    
  )
}

export default NewLetter
