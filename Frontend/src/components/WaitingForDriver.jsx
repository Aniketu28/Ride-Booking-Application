import React from 'react'

const WaitingForDriver = ({ rider, confirmData }) => {

  return (
    <div className='w-full pb-3'>
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='flex justify-start items-center mt-3 mb-4'>
          <h4 className='text-xl font-semibold text-black ms-1'>Waiting For Driver</h4>
        </div>
        <div className='w-full flex justify-between items-center'>
          <div className='w-[40%]'>
            <img className='h-[100px]' src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_368,w_552/v1595296387/assets/14/e3eed8-6cc1-478a-a3c7-db9cd2e6ffed/original/illustration-rides.svg" alt="confirm ride image" />
          </div>
          <div className='w-[60%] flex flex-col justify-center items-end px-3 py-5 gap-2'>
            <h4 className='text-gray-800 font-medium text-xl'>{rider?.fullName?.firstName && rider?.fullName?.lastName
              ? `${rider.fullName.firstName} ${rider.fullName.lastName}`
              : "No Name Available"}</h4>
            <h2 className='text-black text-2xl font-semibold'>{rider ? rider?.vehicle?.plate : "no data"}</h2>
            <h4 className='text-gray-600 font-normal text-lg'>{rider ? rider?.vehicle?.vehicleType : "no data"}</h4>
            <h4 className='text-gray-600 font-normal text-lg'>OTP:{confirmData.otp}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver
