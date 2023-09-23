import { io } from 'socket.io-client';
import './index.css';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import 'typeface-open-sans';
import HomePage from './pages/Home';
import Verify from './components/auth/Verify';
import {  ToastContainer } from 'react-toastify';
import CommentCard from './components/common-components/CommentCard';
import NotFound from './components/common-components/NotFound';
import Feed from './pages/Feed';
import UserProfile from './pages/UserProfile';
import Messages from './pages/Messages';
import Notification from './pages/Notification';
import { useEffect, useMemo, useState } from 'react';
import EditProfile from './components/common-components/EditProfile';

const socketToUserIdMap = {};
var connectionOptions = {
  "force new connection": true,
  "reconnectionAttempts": "Infinity",
  "timeout": 10000,
  "transports": ["websocket"]
};

function App() {
 
   const [sockett,setSockett]=useState()
   const [notCount,setNotCount]=useState(0);
   const userData = useMemo(() => {
    const localStorageData = localStorage.getItem('currentUser');
    return localStorageData ? JSON.parse(localStorageData) : null;
  }, []);
   const[notifications,setNotifications ]=useState([]);
   console.log("NOTIFICATIONS ::", notifications);

   useEffect(()=>{
      let cnt=0;
      notifications?.map(not=>{
        if(!not?.is_read)
        {
          cnt++;
        }
      })
      setNotCount(cnt);
   },[notifications])





   useEffect(() => {
     // Replace 'your_server_url' with the URL of your socket.io server
     // Add this -- our server will run on port 4000, so we connect to it from here
     const socket =  io('http://localhost:3434/', connectionOptions); 
     setSockett(socket)
    socket.on('connect', () => {    
      socketToUserIdMap[socket.id]=userData?.userId;
      console.log("User ", userData?.userId , " is associated with SID", socket?.id);

    });
    if(userData)
    {
      socket.emit('addSocketToDB',{userId: userData?.userId, socketId: socket?.id})
    }
    

   


    socket.on('notification', (data) => {
        // Handle the received data here
        
        console.log('Socket event received:', data);
        setNotifications(prev=>([...prev, data]));
      });


  // Clean up the socket connection when the component unmounts
      return () => {
        console.log("Socket id disconnected", socket.id);
        socket.disconnect();
      };

}, []);


   // create browser router -- routes createb
   
  return (
    <div className="App w-[100%] box-content">
         

                {/* <Navbar /> */}
                <ToastContainer />
                  <Routes >
                    <Route element={<Navbar />}>
                          <Route exact path="/" element={<Home/>} />
                              <Route exact path="auth/login" element={<Login />} />
                              <Route exact path="auth/register" element={<Register />} />
                              <Route exact path='auth/verify' element={<Verify />} />
                          
                          </Route>

                           <Route exact path="/home"  element={
                                    <ProtectedRoute>
                                         <HomePage notCount={notCount}   />   
                                    </ProtectedRoute>
                                 } >
                                         <Route index  element={  <ProtectedRoute><Feed /></ProtectedRoute> } />
                                         <Route exact path="/home/comment" element={ <ProtectedRoute><CommentCard /> </ProtectedRoute>} />
                                         <Route exact path="/home/profile" element={ <ProtectedRoute><UserProfile /> </ProtectedRoute>} />
                                         <Route exact path="/home/profile/:userId" element={ <ProtectedRoute><UserProfile /> </ProtectedRoute>} />
                                         <Route exact path="/home/profile/edit" element={ <ProtectedRoute><EditProfile /> </ProtectedRoute>} />
                                         <Route exact path="/home/messages" element={ <ProtectedRoute><Messages /> </ProtectedRoute>} />
                                         <Route exact path="/home/notifications" element={ <ProtectedRoute><Notification setNotCount={setNotCount} notCount={notCount} notifications={notifications} socket={sockett} /> </ProtectedRoute>} />
                                  </Route>

                                  <Route path="*" element={<NotFound />} />
                               
                    {/* <Route element={<Footer />} /> */}
                    </Routes>

              <Footer />
                    {/* <ToastContainer theme="colored" /> */}
       {/* <img src={Reactangle} width="100%" className='z-neg-10 absolute' ></img> */}
      
       
    </div>
  );
}

export default App;
