import React, { useState } from 'react';
import './CSS/LoginSignup.css';

export const LoginSignup = () => {
  const [state, setState] = useState("Đăng Nhập");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login Function Executed", formData);
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      }
      else{
        alert("Sai mật khẩu hoặc email !")
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const signup = async () => {
    console.log("Signup Function Executed", formData);
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      }
      else{
        alert(responseData.error)
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Đăng Ký" ? <input name='username' value={formData.username}
            onChange={changeHandler} type="text" placeholder='Tên bạn' /> : null}
          <input name='email' value={formData.email}
            onChange={changeHandler} type="email" placeholder='Email' />
          <input name='password' value={formData.password}
            onChange={changeHandler} type="password" placeholder='Mật khẩu của bạn' />
        </div>
        <button onClick={() => { state === "Đăng Nhập" ? login() : signup() }}>Tiếp tục</button>
        {state === "Đăng Ký" ?
          <p className='loginsignup-login'>
            Bạn đã có tài khoản ? <span onClick={() => { setState("Đăng Nhập") }}>Đăng Nhập</span>
          </p> :
          <p className='loginsignup-login'>
            Bạn chưa có tài khoản ? <span onClick={() => { setState("Đăng Ký") }}> Đăng Ký Ngay</span>
          </p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Tích vào ô, Bạn đồng ý với các điều khoản của website</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
