import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import FinishRide from "../components/FinishRide"
import LiveTrackingMap from '../components/LiveTrackingMap'
import axios from 'axios'

const CaptainRiding = () => {

    const [FinishRidePannel, setFinishRidePannel] = useState(false)
    const FinishRidePannelRef = useRef();
    const location = useLocation();
    const { ride, captain } = location.state || {};
    const [startLat, setStartLat] = useState();
    const [startLng, setStartLng] = useState();
    const [endLat, setEndLat] = useState();
    const [endLng, setEndLng] = useState();

    useEffect(() => {
        if (ride) {
            getCoords(ride.pickup).then((data) => {
                setStartLat(data.lat);
                setStartLng(data.lon);
            });
            getCoords(ride.destination).then((data) => {
                setEndLat(data.lat);
                setEndLng(data.lon);
            });
        }
    }, [ride]);

    useGSAP(() => {
        if (FinishRidePannel) {
            gsap.to(FinishRidePannelRef.current, {
                transform: "translateY(0)"
            })
            FinishRidePannelRef.current.classList.remove("hidden");
        } else {
            gsap.to(FinishRidePannelRef.current, {
                transform: "translateY(100%)"
            })
            FinishRidePannelRef.current.classList.add("hidden");
        }
    }, [FinishRidePannel]);

    async function getCoords(address) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/map/get-coordinates`, { address });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='w-full h-screen relative'>
            <div className='w-full h-[80%] overflow-hidden absolute top-0 left-0 z-10'>
                {startLat && startLng && endLat && endLng ? (
                    <LiveTrackingMap startLat={startLat} startLng={startLng} endLat={endLat} endLng={endLng} />
                ) : (
                    <div className='w-full h-full flex flex-col justify-center items-center'>Loading map...</div>
                )}
            </div>
            <div className='h-[20%] w-full bg-yellow-600 px-5 py-3 flex flex-col justify-center items-center absolute bottom-0 left-0 z-20' onClick={() => { setFinishRidePannel(true) }} >
                <div className='w-full flex flex-col justify-center items-center gap-3 mt-2'>
                    <div className='flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#000"><path d="M12 8.36853L20.9679 13.1162L20.0321 14.8838L12 10.6315L3.96789 14.8838L3.03211 13.1162L12 8.36853Z"></path></svg>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <h3 className='text-xl font-medium'></h3>
                    </div>
                    <div className='w-full flex justify-center items-center mb-3'>
                        <button className='w-full bg-green-600 text-white font-semibold rounded-lg px-3 py-3'>Complete Ride</button>
                    </div>
                </div>
            </div>
            <div ref={FinishRidePannelRef} className='w-full h-full absolute bottom-0 translate-y-full hidden bg-white z-20'>
                <FinishRide captain={captain} ride={ride} setFinishRidePannel={setFinishRidePannel} />
            </div>
        </div>
    )
}

export default CaptainRiding
