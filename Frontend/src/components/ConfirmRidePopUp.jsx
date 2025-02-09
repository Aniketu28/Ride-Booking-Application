import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = ({ captain, ride, setconfrimRidePopUpPannel }) => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    
    console.log(ride);
    // Submit handler
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent form submission
        if (otp === ride.otp) {
            setOtp(""); // Clear OTP after successful validation
            navigate("/captain-riding",{
                state: { ride : ride, captain : captain }
              }); // Redirect to the captain-riding route
        } else {
            alert("Wrong OTP");
        }
    }

    return (
        <div className='py-3 px-3'>
            <div className='flex justify-start items-center mt-3 mb-4'>
                <h4 className='text-2xl font-semibold text-black ms-1'>Confirm This Ride</h4>
            </div>
            <div className='w-full border-2 border-red-300 py-4 px-3 flex justify-between items-center mt-4 mb-3'>
                <div className='w-[70%] flex justify-start items-center gap-2'>
                    <img className='w-[12%] rounded-full' src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="confirm ride image" />
                    <div className='flex flex-col justify-center items-start px-3'>
                        <h4 className='text-black font-medium text-lg'> {ride?.user?.fullName?.firstName && ride?.user?.fullName?.lastName
                                ? `${ride.user.fullName.firstName} ${ride.user.fullName.lastName}`
                                : "No Name Available"}</h4>
                    </div>
                </div>
                <div className='w-[30%] flex justify-end items-center pe-3'>
                    <h4 className='text-black font-medium text-xl'>2.2 km</h4>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-3 mt-5'>
                <div className='w-full flex flex-col justify-center items-start gap-4'>
                    {/* Pickup Address */}
                    <div className='w-full flex justify-start items-start gap-4 border-b-2 py-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000"><path d="M12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995L16.9497 15.9497ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path></svg>
                        </div>
                        <div>
                            <h3 className='text-lg font-medium leading-5'>Pickup</h3>
                            <p className='text-gray-600 text-base'>{ride.pickup}</p>
                        </div>
                    </div>

                    {/* Dropoff Address */}
                    <div className='w-full flex justify-start items-start gap-4 border-b-2 py-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000"><path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path></svg>
                        </div>
                        <div>
                            <h3 className='text-lg font-medium leading-5'>Destination</h3>
                            <p className='text-gray-600 text-base'>{ride.destination}</p>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className='w-full flex justify-start items-start gap-4'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000"><path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path></svg>
                        </div>
                        <div>
                            <h3 className='text-lg font-medium leading-5'>{ride.fare}</h3>
                            <p className='text-gray-600 text-base'>Cash</p>
                        </div>
                    </div>
                </div>

                {/* OTP Form */}
                <div className='w-full mt-1'>
                    <form className='w-full flex flex-col justify-between items-center gap-2' onSubmit={submitHandler}>
                        <input
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
                            type="text"
                            id='otp'
                            placeholder='Enter OTP'
                            minLength="4"
                            maxLength="4"
                            className='px-6 py-3 bg-[#eee] rounded-lg w-full placeholder:text-base mt-2'
                            required
                        />
                        <button
                            type='submit'
                            className='w-full text-center bg-green-600 text-white font-semibold rounded-lg px-3 py-3 mt-1'>
                            Confirm
                        </button>
                    </form>
                    <button
                        onClick={() => { setconfrimRidePopUpPannel(false) }}
                        className='w-full bg-red-600 text-white font-semibold rounded-lg px-3 py-3 mt-2'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmRidePopUp;
