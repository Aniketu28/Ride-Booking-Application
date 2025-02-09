import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const CaptainSignup = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')


  const signupHandler = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, {
        fullName: {
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password,
        status: "active",
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType
        }
      },
        { withCredentials: true, credentials: 'include' }
      );

      if (res.status === 201) {
        navigate('/captain-login');
      } else {
        navigate('/captain-signup');
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

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
        <h3 className='text-lg font-medium'>Vehicle Information</h3>
        <div className='flex gap-4 mt-[-10px]'>
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            placeholder='Vehicle Color'
            value={vehicleColor}
            onChange={(e) => {
              setVehicleColor(e.target.value)
            }}
          />
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            placeholder='Vehicle Plate'
            value={vehiclePlate}
            onChange={(e) => {
              setVehiclePlate(e.target.value)
            }}
          />
        </div>
        <div className='flex gap-4 mb-7'>
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            type="number"
            placeholder='Vehicle Capacity'
            value={vehicleCapacity}
            onChange={(e) => {
              setVehicleCapacity(e.target.value)
            }}
          />
          <select
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-[16px]'
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value)
            }}
          >
            <option value="" disabled>Vehicle Type</option>
            <option value="car">Car</option>
            <option value="bike">bike</option>
            <option value="auto">auto</option>
          </select>
        </div>

        <div>
          <button className='w-full px-[20px] py-3 bg-black rounded text-white text-medium mt-2' onClick={signupHandler}>Create Account</button>
        </div>
        <div className='mt-1'>
          <p className='text-[16px] text-black font-medium text-center'>Alredy Captain Account ?<Link to="/captain-login" className='text-blue-600 font-medium text-[16px]'>&nbsp; LogIn</Link></p>
        </div>
      </form>
    </div>
  )
}

export default CaptainSignup
