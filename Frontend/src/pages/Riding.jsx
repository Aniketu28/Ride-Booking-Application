import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Riding = () => {

    const location = useLocation();
    const { ride,captain } = location.state || {};
    console.log(ride,captain);
    
    return (
        <div className='w-full h-screen'>
            <div className='fixed top-5 right-3 bg-white h-12 w-12 rounded-full flex justify-center items-center'>
                <Link to="/home"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#000">
                        <path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19ZM9 9.99998H15V16H9V9.99998ZM11 12V14H13V12H11Z"></path>
                    </svg>
                </Link>
            </div>

            <div className='h-[60%]'>
                <img className='w-full h-full object-cover' src="https://media.istockphoto.com/id/613540742/vector/abstract-city-map-illustration.jpg?s=612x612&w=0&k=20&c=L9f7LLS3q0VXxfIy3kNPm7gQQ5TfKQEbWpXKxeYgJx4=" alt="" />
            </div>
            <div className='h-[40%] flex justify-end items-end'>
                <div className='w-full px-3 py-3'>
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <div className='w-full flex justify-between items-center'>
                            <div className='w-[40%]'>
                                <img className='h-[100px]' src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_368,w_552/v1595296387/assets/14/e3eed8-6cc1-478a-a3c7-db9cd2e6ffed/original/illustration-rides.svg" alt="confirm ride image" />
                            </div>
                            <div className='w-[60%] flex flex-col justify-center items-end px-3'>
                                <h4 className='text-gray-800 font-medium text-xl'> {captain?.fullName?.firstName && captain?.fullName?.lastName
                                ? `${captain.fullName.firstName} ${captain.fullName.lastName}`
                                : "No Name Available"}</h4>
                                <h2 className='text-black text-2xl font-semibold'>{captain?.vehicle?.plate}</h2>
                                <h4 className='text-gray-600 font-normal text-lg'>{captain?.vehicle?.vehicleType}</h4>
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-center items-start gap-4 mt-3'>
                            <div className='w-full flex justify-strat items-start gap-4 border-b-2 py-2'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000"><path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path></svg>
                                </div>
                                <div>
                                    <h3 className='text-lg font-medium leading-5'>Destination</h3>
                                    <p className='text-gray-600 text-base'>{ride?.destination}</p>
                                </div>
                            </div>
                            <div className='w-full flex justify-strat items-start gap-4'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000"><path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path></svg>
                                </div>
                                <div>
                                    <h3 className='text-lg font-medium leading-5'>{ride.fare}</h3>
                                    <p className='text-gray-600 text-base'>Cash</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className='w-full bg-green-600 text-white font-semibold rounded-lg px-3 py-3 mt-3'>Make A Payment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Riding
