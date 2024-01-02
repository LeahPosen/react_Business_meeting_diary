import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './commponents/user/Home';
import AdminHome from './commponents/admin/AdminHome';
import Login from './commponents/admin/Login';
import AllMeeting from './commponents/admin/AllMeeting';
import AllServices from './commponents/public/AllServices';
import { useState, createContext } from 'react';
import Box from '@mui/joy/Box';

export const IsAdminContext = createContext(null);

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const isAdminContext = { isAdmin, setIsAdmin };
  
  return (
    //  <Box sx={{backgroundColor:'black',width:'100%',height:'100%'}}>
    <Box>
      <IsAdminContext.Provider value={isAdminContext}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Home />}></Route>
            <Route path={"login"} element={<Login />}></Route>
            <Route path={"admin"} element={<AdminHome/>}>
              <Route path={"allMeeting"} element={<AllMeeting />}></Route>
              <Route path={"allServices"} element={<AllServices />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </IsAdminContext.Provider>
    </Box>
  )
}

export default App

// import './App.css'
// import Home from './commponents/user/Home';
// import Login from './commponents/admin/Login';
// import { BrowserRouter, Route, Routes, Link, Outlet, useParams, Router } from 'react-router-dom';
// import AllServices from './commponents/public/AllServices';
// import AllMeeting from './commponents/admin/AllMeeting';
// import Admin from './commponents/admin/AdminHome';
// import { Box } from '@mui/material';
// import { createContext, useState } from 'react';

// export const IsAdminContext = createContext(null);
// function App() {

//   const [isAdmin, setIsAdmin] = useState(false);
//   const isAdminContext = { isAdmin, setIsAdmin };
//   return (
//     <Box>
//       <IsAdminContext.Provider value={isAdminContext}>
//         <BrowserRouter>
//           {/* <Routes>
//             <Route path={"/"} element={<Home/>} />
//             <Route path={"admin"} element={<AdminOptions />} >
//               <Route path={"type"} element={<MeetType />} />
//               <Route path={"meet"} element={<AllMeeting />} />
//             </Route>
//             <Route path={"login"} element={<Login />} />
//           </Routes> */}
//           <Routes>
//             <Route path={"/"} element={<Home />}></Route>
//             <Route path={"login"} element={<Login />}></Route>
//             <Route path={"admin"} element={<Admin />}>
//               <Route path={"allMeeting"} element={<AllMeeting />}></Route>
//               <Route path={"allServices"} element={<AllServices />}></Route>
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </IsAdminContext.Provider>
//     </Box>
//   )
// }


// export default App


