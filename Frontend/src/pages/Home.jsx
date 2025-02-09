import React, { useContext, useEffect, useState } from 'react'
import { isAuth } from '../context/AuthContextProvider'
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import LocationSearchPannel from '../components/LocationSearchPannel';
import VehicalPannelComponent from '../components/VehicalPannelComponent';
import ConfirmedVehical from '../components/ConfirmedVehical';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import Cookies from 'js-cookie';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import LiveTrackingMap from '../components/LiveTrackingMap';
import LiveLocation from '../components/LiveLocation';

const Home = () => {

  const { user } = isAuth();
  const Navigate = useNavigate();
  const [pickeUp, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pannelOpen, setPannelOpen] = useState(false);
  const pannelRef = useRef(null);
  const [VehicalPannel, setVehicalPannel] = useState(false);
  const VehicalPannelRef = useRef(null);
  const [confirmRidePannel, setConfirmRidePannel] = useState(false);
  const confirmRidePannelRef = useRef(null);
  const [LookingDriver, setLookingDriver] = useState(false);
  const LookingDriverRef = useRef(null);
  const [waitingDriver, setWaitingDriver] = useState(false);
  const WaittingForDriverRef = useRef(null);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [confirmData, setConfirmData] = useState({});
  const { socket } = useContext(SocketContext);
  const [rider, setRider] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState('');


  useEffect(() => {

    socket.emit('join', { userId: user._id, userType: "user" });

    // Check if geolocation is available
    if (navigator.geolocation) {

      // Success callback function to handle geolocation data
      const success = (position) => {
        
        const { latitude, longitude } = position.coords;
        // Fetch the address using latitude and longitude
        getLocation(latitude, longitude);

        setCurrentLocation([latitude, longitude]);

        // Optionally, stop watching after location is obtained (if you only need it once)
        navigator.geolocation.clearWatch(watchID);
      };

      // Error callback function to handle any geolocation errors
      const error = (err) => {
        console.error('Error fetching geolocation', err);

        // Handle user denying geolocation permission
        if (err.code === 1) {
          alert('Permission to access location was denied. Please enable location services.');
        } else {
          alert('Unable to retrieve your location. Please try again later.');
        }
      };

      // Watch the user's location continuously
      const watchID = navigator.geolocation.watchPosition(success, error);

    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by your browser.');
    }


  }, [user]);

  socket.on('rider-captain', (captain) => {
    setLookingDriver(false);
    setWaitingDriver(true);
    setRider(captain);
  });

  socket.on('ride-end', ({ message, captain }) => {
    Navigate("/riding", {
      state: {
        ride: confirmData,
        captain
      }
    });
  })

  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(() => {
    if (pannelOpen) {
      gsap.to(pannelRef.current, {
        height: "75%"
      });
      pannelRef.current.classList.remove("hidden");
    } else {
      gsap.to(pannelRef.current, {
        height: "0%"
      });
      pannelRef.current.classList.add("hidden");
    }
  }, [pannelOpen]);

  useGSAP(() => {
    if (VehicalPannel) {
      gsap.to(VehicalPannelRef.current, {
        transform: "translateY(0)"
      })
      VehicalPannelRef.current.classList.remove("hidden");
    } else {
      gsap.to(VehicalPannelRef.current, {
        transform: "translateY(100%)"
      })
      VehicalPannelRef.current.classList.add("hidden");
    }
  }, [VehicalPannel]);


  useGSAP(() => {
    if (confirmRidePannel) {
      gsap.to(confirmRidePannelRef.current, {
        transform: "translateY(0)"
      })
      confirmRidePannelRef.current.classList.remove("hidden");
    } else {
      gsap.to(confirmRidePannelRef.current, {
        transform: "translateY(100%)"
      })
      confirmRidePannelRef.current.classList.add("hidden");
    }
  }, [confirmRidePannel]);

  useGSAP(() => {
    if (LookingDriver) {
      gsap.to(LookingDriverRef.current, {
        transform: "translateY(0)"
      })
      LookingDriverRef.current.classList.remove("hidden");
    } else {
      gsap.to(LookingDriverRef.current, {
        transform: "translateY(100%)"
      })
      LookingDriverRef.current.classList.add("hidden");
    }
  }, [LookingDriver]);


  useGSAP(() => {
    if (waitingDriver) {
      gsap.to(WaittingForDriverRef.current, {
        transform: "translateY(0)"
      })
      WaittingForDriverRef.current.classList.remove("hidden");
    } else {
      gsap.to(WaittingForDriverRef.current, {
        transform: "translateY(100%)"
      })
      WaittingForDriverRef.current.classList.add("hidden");
    }
  }, [waitingDriver]);


  const handlePickupChange = async (e) => {

    setActiveField("pickup");

    setPickup(e.target.value);

    try {

      const token = Cookies.get('token');

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggesions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPickupSuggestions(response.data);

    } catch (error) {
      console.error("Error fetching pickup suggestions:", error); // Log error details
    }
  };


  const handleDestinationChange = async (e) => {

    setActiveField("destination");

    setDestination(e.target.value);

    try {

      const token = Cookies.get('token');

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggesions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDestinationSuggestions(response.data);

    } catch (error) {
      console.error("Error fetching pickup suggestions:", error); // Log error details
    }
  }

  async function findTrip() {

    setPannelOpen(false);

    try {
      const token = Cookies.get('token');

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
        params: { pickeUp, destination },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setFare(response.data);

      setVehicalPannel(true);

    } catch (e) {

      console.log(e.message);
    }

  }

  async function createRide(vehicelType) {

    try {

      const token = Cookies.get('token');

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, {
        user: user._id,
        pickeUp,
        destination,
        vehicelType
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setConfirmData(response.data);

      setConfirmRidePannel(true);

    } catch (e) {
      console.log(e);
    }
  }

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

  async function getCoords(address) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/map/get-coordinates`, { address });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {

    if (waitingDriver) {

      async function fetchCoordinates() {
        try {
          const pickupCoords = await getCoords(pickeUp);
          const destinationCoords = await getCoords(destination);

          console.log(pickupCoords);
          console.log(destinationCoords);

          setStartpoint({ lat: pickupCoords.lat, lng: pickupCoords.lon });
          setEndpoint({ lat: destinationCoords.lat, lng: destinationCoords.lon });

        } catch (error) {
          console.log("Error fetching coordinates:", error);
        }
      }

      fetchCoordinates();

      setTimeout(() => {
        Navigate('/user-riding',{
          state:{
            ride:confirmData,
            captain:rider
          }
        });
      }, 15000);

    }
  }, [waitingDriver]);

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
    <div className='w-full h-screen'>
      <div className={`fixed top-5 justify-between items-center w-full px-3 z-50 ${pannelOpen ? "hidden" : "flex"}`}>
        <div>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="57" height="20" fill="none"><path fill="#000" d="M8 17.4c2.6 0 4.7-2 4.7-5.1V.3h2.9v19.4h-2.9v-1.8a7 7 0 01-5 2.1c-4.2 0-7.4-3-7.4-7.6V.4h3v11.9c0 3 2 5.1 4.6 5.1zM17.7.3h2.8v7a7 7 0 015-2c4 0 7.3 3.3 7.3 7.4 0 4-3.2 7.3-7.4 7.3a7 7 0 01-5-2.1v1.8h-2.7V.3zm7.6 17.2c2.6 0 4.8-2.1 4.8-4.9 0-2.7-2.2-4.8-4.8-4.8a4.8 4.8 0 00-4.9 4.8c0 2.8 2.2 5 4.9 5zM41.1 5.3c4 0 7 3.1 7 7.3v1H36.7c.4 2.2 2.3 4 4.7 4 1.6 0 3-.7 4-2.1l2 1.5a7.3 7.3 0 01-6 3 7.3 7.3 0 01-7.5-7.4c0-4 3.1-7.3 7.2-7.3zm-4.3 6h8.5a4.4 4.4 0 00-4.2-3.6c-2.1 0-3.8 1.5-4.3 3.6zM55.6 8c-1.8 0-3.2 1.5-3.2 3.7v8h-2.7V5.6h2.7v1.7a3.7 3.7 0 013.4-1.8h1V8h-1.2z"></path></svg> */}
        </div>
        <div className='bg-white h-12 w-12 rounded-full flex justify-center items-center' onClick={() => { logoutHandler() }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#000"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
        </div>
      </div>
      <div className='h-full w-full absolute top-0 left-0 overflow-hidden z-10'>
        <LiveLocation currentLocation={currentLocation} address={address} />
      </div>
      <div className='w-full h-screen absolute left-0 top-0 flex flex-col justify-end z-10'>
        <div className='bg-white px-5 py-[30px]'>
          <div className='flex justify-between items-center'>
            <h4 className='text-2xl font-semibold text-black ms-1'>Find a Trip</h4>
            {pannelOpen && <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setPannelOpen(false) }} width="30" height="30" viewBox="0 0 24 24" fill="#000"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>}
          </div>
          <form className='mt-3' onSubmit={(e) => {
            submitHandler(e)
          }}>
            <input className='w-full inline-block bg-[#eee] mb-3 px-8 py-3 rounded-lg text-[17px]'
              onClick={() => {
                setPannelOpen(true);
                setActiveField('pickup');
              }}
              onChange={(e) => {
                handlePickupChange(e);
              }}
              value={pickeUp}
              type="text" placeholder='Add a pickup location' required />
            <input className='w-full inline-block bg-[#eee] px-8 py-3 rounded-lg text-[17px]'
              onClick={() => {
                setPannelOpen(true)
                setActiveField('destination');
              }}
              onChange={(e) => {
                handleDestinationChange(e);
              }}
              value={destination}
              type="text" placeholder='Enter your destination' required />
          </form>
          {pannelOpen && <button
            onClick={findTrip}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>}
        </div>
        <div ref={pannelRef} className=' z-50 bg-white h-0 px-5 pb-7 pt-3'>
          <LocationSearchPannel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPannelOpen={setPannelOpen}
            setVehicalPannel={setVehicalPannel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
        <div ref={VehicalPannelRef} className='z-10 absolute bottom-0 left-0 translate-y-full bg-white w-full px-3 pt-7 pb-2 hidden flex-col justify-center items-center gap-3'>
          <VehicalPannelComponent
            createRide={createRide}
            fare={fare}
            setConfirmRidePannel={setConfirmRidePannel}
            VehicalPannel={VehicalPannel}
            setVehicalPannel={setVehicalPannel} />
        </div>
        <div ref={confirmRidePannelRef} className='z-10 absolute bottom-0 left-0 translate-y-full bg-white w-full px-3 pt-7 pb-2 hidden flex-col justify-center items-center gap-3'>
          <ConfirmedVehical confirmRidePannel={confirmRidePannel}
            confirmData={confirmData}
            setConfirmRidePannel={setConfirmRidePannel}
            setVehicalPannel={setVehicalPannel}
            setLookingDriver={setLookingDriver} />
        </div>
        <div ref={LookingDriverRef} className='z-10 absolute bottom-0 left-0 translate-y-full bg-white w-full px-3 pt-7 pb-2 hidden flex-col justify-center items-center gap-3'>
          <LookingForDriver
            confirmData={confirmData}
          />
        </div>
        <div ref={WaittingForDriverRef} className='z-10 absolute bottom-0 left-0 translate-y-full bg-white w-full px-3 pt-7 pb-2 hidden flex-col justify-center items-center gap-3'>
          <WaitingForDriver rider={rider} confirmData={confirmData} />
        </div>
      </div>
    </div>
  )
}

export default Home
