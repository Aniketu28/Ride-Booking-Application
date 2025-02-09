import React from 'react'

const CaptainDetails = ({captain}) => {
  return (
    <div className='w-full absolute bottom-0 bg-white flex flex-col justify-start items-start px-3 py-5 gap-3'>
        <div className='w-full'>
          <div className='flex flex-col justify-center items-center gap-3'>
            <div className='w-full flex justify-between items-center'>
              <div className='w-full flex justify-start items-center gap-2'>
                <img className='w-[12%] rounded-full' src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="confirm ride image" />
                <div className='flex flex-col justify-center items-start px-3'>
                  <h4 className='text-black font-semibold text-xl'>{captain.fullName.firstName + "  " + captain.fullName.lastName}</h4>
                  <h4 className='text-gray-600 font-normal text-sm mt-[-1px]'>{captain.email}</h4>
                </div>
              </div>
              <div className='pe-2'>
              <h4 className='text-black font-semibold text-xl'>$219</h4>
              <h4 className='text-gray-600 font-normal text-sm mt-[-1px]'>Earned</h4>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full bg-[#eee] py-2 px-3 flex justify-between items-center'>
          <div className='flex flex-col justify-center items-center px-2 pt-1'>
          <svg xmlns="http://www.w3.org/2000/svg"  width="40" height="40" viewBox="0 0 24 24" fill="#000"><path d="M12 22C6.47715 22 2 
          17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20
           7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg>
          <h4 className='text-xl text-black font-semibold mt-1'>10.2</h4>
          <span className='text-base text-gray-600 font-normal text-center'>Hours Online</span>
          </div>
          <div className='flex flex-col justify-center items-center px-2 pt-1'>
          <svg xmlns="http://www.w3.org/2000/svg"  width="40" height="40" viewBox="0 0 24 24" fill="#000"><path d="M12 22C6.47715 22 2 
          17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20
           7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg>
          <h4 className='text-xl text-black font-semibold mt-1'>10.2</h4>
          <span className='text-base text-gray-600 font-normal text-center'>Hours Online</span>
          </div>
          <div className='flex flex-col justify-center items-center px-2 pt-1'>
          <svg xmlns="http://www.w3.org/2000/svg"  width="40" height="40" viewBox="0 0 24 24" fill="#000"><path d="M12 22C6.47715 22 2 
          17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20
           7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg>
          <h4 className='text-xl text-black font-semibold mt-1'>10.2</h4>
          <span className='text-base text-gray-600 font-normal text-center'>Hours Online</span>
          </div>
        </div>
      </div>
  )
}

export default CaptainDetails
