import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/AuthSetup/Login';
import Register from './components/AuthSetup/Register';
import OtpVerification from './components/AuthSetup/OtpVerification';
import ForgotPassword from './components/AuthSetup/ForgotPassword';
import PrivateRoute from './components/AuthSetup/PrivateRoute';
import ProtectedRoute from './components/AuthSetup/ProtectedRoute';

import Header from './components/Home/JSX/Header';
import Tabs from './components/Home/JSX/Tabs';
import AboutPart from './components/Home/JSX/AboutPart';
import Scroll from './components/Home/JSX/Scroll';
import About from './components/AboutPage/About';

// Event pages (inside EventsPages/JSX)
import AmazonForest from './components/EventsPages/JSX/AmazonForest';
import CherryBlossom from './components/EventsPages/JSX/CherryBlossom';
import AutumnLeaves from './components/EventsPages/JSX/AutumnLeaves';
import FogForest from './components/EventsPages/JSX/FogForest';
import Mountains from './components/EventsPages/JSX/Mountains';
import WaterFall from './components/EventsPages/JSX/WaterFall';
import Sunset from './components/EventsPages/JSX/Sunset';
import WinterForest from './components/EventsPages/JSX/WinterForest';
import RedOak from './components/EventsPages/JSX/RedOak';
import EventDetails from './components/EventsPages/EventDetails/EventDetails';

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
      {/* Home */}
      <Route
        path="/"
        element={
            <Home />
        }
      />

      {/* About Page */}
      <Route
        path="/about"
        element={
            <About />
        }
      />

      {/* Event Pages (Protected) */}
      <Route
        path="/events/amazon-forest"
        element={
            <AmazonForest />
        }
      />
      <Route
        path="/events/cherry-blossom"
        element={
            <CherryBlossom />
        }
      />
      <Route
        path="/events/autumn-leaves"
        element={
            <AutumnLeaves />
        }
      />
      <Route
        path="/events/fog-forest"
        element={
            <FogForest />
        }
      />
      <Route
        path="/events/mountains"
        element={
            <Mountains />
        }
      />
      <Route
        path="/events/waterfall"
        element={
            <WaterFall />
        }
      />
      <Route
        path="/events/sunset"
        element={
            <Sunset />
        }
      />
      <Route
        path="/events/winter-forest"
        element={
            <WinterForest />
        }
      />
      <Route
        path="/events/red-oak"
        element={
            <RedOak />
        }
      />

      {/* Event Details Page (Public/Protected as needed) */}
      <Route path="/events/details/:id" element={<EventDetails />} />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<OtpVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default AppRoutes;
