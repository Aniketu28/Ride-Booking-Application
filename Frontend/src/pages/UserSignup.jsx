import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const UserSignup = () => {

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = async (e) => {

    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, {
        fullName: {
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password
      },
        { withCredentials: true, credentials: 'include' }
      );

      if (res.status === 201) {
        navigate('/login');
      } else {
        console.error("signup failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setFirstName("");
    setLastName("");
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
          <label className='text-lg font-medium'>Whats Your Name</label>
          <div className='flex justify-center items-center gap-3'>
            <input type="text"
              placeholder='First Name'
              className='w-1/2 rounded px-4 py-3 bg-[#eeeeee] placeholder:text-base placeholder:text-black-500 mt-1'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input type="text"
              placeholder='Last Name'
              className='w-1/2 rounded px-4 py-3 bg-[#eeeeee] placeholder:text-base placeholder:text-black-500 mt-1'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

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
          <button className='w-full px-[20px] py-3 bg-black rounded text-white text-medium mt-2' onClick={signupHandler}>Create Account</button>
        </div>
        <div className='mt-1'>
          <p className='text-[16px] text-black font-medium text-center'>Alredy Account ?<Link to="/login" className='text-blue-600 font-medium text-[16px]'>&nbsp; LogIn</Link></p>
        </div>
      </form>
    </div>
  )
}

export default UserSignup
