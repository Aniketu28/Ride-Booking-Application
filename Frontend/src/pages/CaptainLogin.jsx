import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { isAuth } from '../context/AuthContextProvider';


const CaptainLogin = () => {

  const navigate = useNavigate();
  const { setAuthUser, setCaptain } = isAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, {
        email: email,
        password: password
      },

        { withCredentials: true, credentials: 'include' }

      );

      if (res.status == 201) {
        setAuthUser(true);
        navigate("/captain-home");
        window.location.reload();
      } else {
        navigate("/captain-login");
      }

      console.log(res);

    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
  }


  return (
    <div className='w-full h-screen flex flex-col justify-between px-5 py-7 gap-10'>
      <form className='w-full flex flex-col gap-4'>
        <div className='mb-3'>
          <h3 className='text-[28px] text-black font-semibold'>Ride</h3>
        </div>
        <div>
          <label className='text-lg font-medium'>Whats Your Email</label>
          <input type="email"
            placeholder='email@example.com'
            className='w-full rounded px-4 py-3 bg-[#eeeeee] placeholder:text-base placeholder:text-black-500 mt-1'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label className='text-lg font-medium'>Enter Password</label>
          <input type="password"
            placeholder='password'
            className='w-full rounded px-4 py-3 bg-[#eeeeee] placeholder:text-base placeholder:text-black-500 mt-1'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button className='w-full px-[20px] py-3 bg-black rounded text-white text-medium mt-2' onClick={loginHandler}>Login</button>
        </div>
        <div className='mt-1'>
          <p className='text-[16px] text-black font-medium text-center'>Join us as Captain ? <Link to="/captain-signup" className='text-blue-600 font-medium text-[16px]'>&nbsp;Create New Account</Link></p>
        </div>
      </form>
      <div className='w-full'>
        <Link to="/login" className='w-[100%] inline-block bg-black px-[20px] py-[12px] text-white text-center font-normal rounded-[5px] text-[16px]'>User Login</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
