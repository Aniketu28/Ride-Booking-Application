import React from 'react'
import {Link} from "react-router-dom"

const Start = () => {

  
  return (
    <>
      <div className='h-screen w-full flex flex-col justify-between bg-contain bg-center bg-no-repeat bg-[url("https://img.freepik.com/free-vector/taxi-app-concept_23-2148491009.jpg?t=st=1739039890~exp=1739043490~hmac=e56f4932ccbb5f97bf99870122ebda1b9a2a7605cd578360c06a90964ca5f5c4&w=1380")]'>
        <div className='w-full px-5 py-7'>
            <h3 className='text-[30px] text-black font-semibold'>Ride</h3>
        </div>
        <div className='bg-white px-5 py-[60px] flex flex-col justify-center items-center gap-5'>
          <h2 className='text-2xl font-semibold'>Get Started With Ride</h2>
          <Link to="/login" className='w-full mx-auto bg-black px-[20px] py-[12px] text-white text-center font-normal rounded-[5px] text-[16px]'>Continue</Link>
        </div>
      </div>
    </>
  )
}

export default Start
