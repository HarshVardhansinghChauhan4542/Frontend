// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/AuthSetup/Login";

// function Routes() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         {/* <Route path="/register" element={<Register />} /> */}
//      </Routes>
//     </Router>
//   );
// }

// export default Routes;



import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/AuthSetup/Login';
import Register from './components/AuthSetup/Register';

// Home should wrap Header, Tabs, etc.
import Header from './components/Home/JSX/Header';
import Tabs from './components/Home/JSX/Tabs';
import AboutPart from './components/Home/JSX/AboutPart';
import Scroll from './components/Home/JSX/Scroll';

const Home = () => (
  <>
    <Header />
    <Tabs />
    <AboutPart />
    <Scroll />
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
