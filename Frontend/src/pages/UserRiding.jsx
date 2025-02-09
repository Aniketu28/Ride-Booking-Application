import { useGSAP } from '@gsap/react';
import React, { useRef, useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import gsap from 'gsap';
import axios from 'axios';
import FinishUserRide from '../components/FinishUserRide';
import LiveTrackingMap from '../components/LiveTrackingMap';

const UserRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef();
    const location = useLocation();
    const { ride, captain } = location.state || {};
    const [startLat, setStartLat] = useState(null);
    const [startLng, setStartLng] = useState(null);
    const [endLat, setEndLat] = useState(null);
    const [endLng, setEndLng] = useState(null);

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
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: "translateY(0)"
            });
            finishRidePanelRef.current.classList.remove("hidden");
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: "translateY(100%)"
            });
            finishRidePanelRef.current.classList.add("hidden");
        }
    }, [finishRidePanel]);

    async function getCoords(address) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/map/get-coordinates`, { address });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='w-full h-screen flex flex-col justify-between items-center'>
            <div className='w-full h-[80%] overflow-hidden absolute top-0 left-0 z-10'>
            {startLat && startLng && endLat && endLng ? (
                    <LiveTrackingMap startLat={startLat} startLng={startLng} endLat={endLat} endLng={endLng} />
                ) : (
                    <div className='w-full h-full flex flex-col justify-center items-center'>Loading map...</div>
                )}
            </div>
            <div className='h-[20%] w-full bg-yellow-600 px-5 py-3 flex flex-col justify-center items-center absolute bottom-0 left-0 z-20' onClick={() => { setFinishRidePanel(true) }} >
                <div className='w-full flex  flex-col justify-center items-center gap-3 mt-2'>
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
            <div ref={finishRidePanelRef} className='w-full h-full absolute bottom-0 translate-y-full hidden bg-white z-20'>
                <FinishUserRide captain={captain} ride={ride} setFinishRidePannel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default UserRiding;
