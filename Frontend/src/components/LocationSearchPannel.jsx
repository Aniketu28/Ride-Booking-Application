import React from 'react'

const LocationSearchPannel = ({suggestions, setPannelOpen, setVehicalPannel,setPickup,setDestination,activeField}) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
    }

    return (
        <div>
            {/* sample code  */}
            <div className='w-full flex flex-col justify-start items-center gap-5'>
                {
                    suggestions.map((item,index) => {
                        return <div onClick={()=>{
                            handleSuggestionClick(item.display_name);
                          
                        }} className='w-full flex justify-start items-center gap-5' key={
                            index
                        }>
                            <div className='w-10 h-9 bg-[#eee] flex justify-center items-center rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000"><path d="M12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995L16.9497 15.9497ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path></svg>
                            </div>
                            <div className='w-[90%]'>
                                <h4 className='text-base font-normal leading-5'>{item.display_name}</h4>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default LocationSearchPannel
