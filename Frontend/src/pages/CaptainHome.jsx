import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CaptainDetails from "../components/CaptainDetails"
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap/all'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { isAuth } from '../context/AuthContextProvider'
import Cookies from 'js-cookie';
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
import LiveTrackingMap from '../components/LiveTrackingMap';
import LiveLocation from '../components/LiveLocation';


const CaptainHome = () => {

  const { captain } = isAuth();
  const Navigate = useNavigate();
  const [RidePopUpPannel, setRidePopUpPannel] = useState(false);
  const [confrimRidePopUpPannel, setconfrimRidePopUpPannel] = useState(false);
  const RidePopUpPannelRef = useRef();
  const confirmRidePopUpPannelRef = useRef();
  const { socket } = useContext(SocketContext);
  const [ride, setRide] = useState({});
  const [startpoint, setStartpoint] = useState(null);
  const [endpoint, setEndpoint] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState('');


  useEffect(() => {

    socket.emit('join', { userId: captain._id, userType: "captain" });

    const updateLocation = () => {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            getLocation(latitude, longitude);
    
            setCurrentLocation([latitude, longitude]);

            socket.emit('update-location-captain', {
              userId: captain._id,
              location: {
                ltd: latitude,
                lng: longitude
              }
            });
          },
          error => {
            console.error("Error getting location:", error.message);
          },
          {
            enableHighAccuracy: true, // Request the most accurate location possible
            timeout: 10000,           // Timeout after 10 seconds if location is not found
            maximumAge: 0             // Do not use cached location
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    updateLocation();

  }, [captain]);

  socket.on('new-ride', (data) => {
    setRide(data);
    setRidePopUpPannel(true);
  });

  function confirmRide() {

    setconfrimRidePopUpPannel(true);
    setRidePopUpPannel(false);
    socket.emit('confirm-ride', { socketId: ride.user.socketId, captain: captain });

  }

  useGSAP(() => {
    if (confrimRidePopUpPannel) {
      gsap.to(confirmRidePopUpPannelRef.current, {
        transform: "translateY(0)"
      })
      confirmRidePopUpPannelRef.current.classList.remove("hidden");
    } else {
      gsap.to(confirmRidePopUpPannelRef.current, {
        transform: "translateY(100%)"
      })
      confirmRidePopUpPannelRef.current.classList.add("hidden");
    }
  }, [confrimRidePopUpPannel]);


  useGSAP(() => {
    if (RidePopUpPannel) {
      gsap.to(RidePopUpPannelRef.current, {
        transform: "translateY(0)"
      })
      RidePopUpPannelRef.current.classList.remove("hidden");
    } else {
      gsap.to(RidePopUpPannelRef.current, {
        transform: "translateY(100%)"
      })
      RidePopUpPannelRef.current.classList.add("hidden");
    }
  }, [RidePopUpPannel]);


  const logoutHandler = () => {

    const token = Cookies.get('token');
    try {
      axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          Cookies.remove('token');
          Navigate("/");

        }).catch((e) => {
          console.log(e);
        })
    } catch (e) {
      console.log(e)
    }
  }

  const getLocation = async (latitude, longitude) => {

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      const response = await axios.get(url);
      if (response.data && response.data.address) {
        const formattedAddress = response.data.address;
        let addressParts = [];
        if (formattedAddress?.road) addressParts.push(formattedAddress.road);
        if (formattedAddress?.suburb) addressParts.push(formattedAddress.suburb);
        if (formattedAddress?.city) addressParts.push(formattedAddress.city);
        if (formattedAddress?.state) addressParts.push(formattedAddress.state);
        if (formattedAddress?.country) addressParts.push(formattedAddress.country);

        setAddress(addressParts.join(', '));
      } else {
        console.error('Error: No location data found.');
      }
    } catch (error) {
      console.error('Error fetching geolocation data:', error);
    }
  };

  return (
    <div className='w-full h-screen relative'>
      <div className={'fixed top-5 flex justify-between items-center w-full px-3 z-50'}>
        <div>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="57" height="20" fill="none"><path fill="#000" d="M8 17.4c2.6 0 4.7-2 4.7-5.1V.3h2.9v19.4h-2.9v-1.8a7 7 0 01-5 2.1c-4.2 0-7.4-3-7.4-7.6V.4h3v11.9c0 3 2 5.1 4.6 5.1zM17.7.3h2.8v7a7 7 0 015-2c4 0 7.3 3.3 7.3 7.4 0 4-3.2 7.3-7.4 7.3a7 7 0 01-5-2.1v1.8h-2.7V.3zm7.6 17.2c2.6 0 4.8-2.1 4.8-4.9 0-2.7-2.2-4.8-4.8-4.8a4.8 4.8 0 00-4.9 4.8c0 2.8 2.2 5 4.9 5zM41.1 5.3c4 0 7 3.1 7 7.3v1H36.7c.4 2.2 2.3 4 4.7 4 1.6 0 3-.7 4-2.1l2 1.5a7.3 7.3 0 01-6 3 7.3 7.3 0 01-7.5-7.4c0-4 3.1-7.3 7.2-7.3zm-4.3 6h8.5a4.4 4.4 0 00-4.2-3.6c-2.1 0-3.8 1.5-4.3 3.6zM55.6 8c-1.8 0-3.2 1.5-3.2 3.7v8h-2.7V5.6h2.7v1.7a3.7 3.7 0 013.4-1.8h1V8h-1.2z"></path></svg> */}
        </div>
        <div className='bg-white h-12 w-12 rounded-full flex justify-center items-center' onClick={() => { logoutHandler() }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#000"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
        </div>
      </div>
      <div className='w-full h-full absolute top-0 left-0 overflow-hidden z-10'>
        <LiveLocation currentLocation={currentLocation} address={address} />
      </div>
      <div className='w-full h-full absolute left-0 top-0 z-20'>
        <CaptainDetails captain={captain} />
      </div>
      <div ref={RidePopUpPannelRef} className='w-full absolute bottom-0 translate-y-full hidden bg-white z-20'>
        <RidePopUp
          ride={ride}
          confirmRide={confirmRide}
          setRidePopUpPannel={setRidePopUpPannel}
          setconfrimRidePopUpPannel={setconfrimRidePopUpPannel} />
      </div>
      <div ref={confirmRidePopUpPannelRef} className='w-full h-screen absolute bottom-0 translate-y-full hidden bg-white z-20'>
        <ConfirmRidePopUp captain={captain} ride={ride} setconfrimRidePopUpPannel={setconfrimRidePopUpPannel} />
      </div>
    </div>
  )
}

export default CaptainHome
