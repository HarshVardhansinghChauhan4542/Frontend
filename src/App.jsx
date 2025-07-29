// import React, { useEffect, useRef, useState } from 'react';
// import LocomotiveScroll from 'locomotive-scroll';
// import Header from './components/Home/JSX/Header';
// import Tabs from './components/Home/JSX/Tabs';
// import CursorDesign from './components/Home/JSX/CursorDesign';
// import AboutPart from './components/Home/JSX/AboutPart';
// import Scroll from './components/Home/JSX/Scroll';
// import LogoLoader from './components/Home/JSX/LogoLoader';

// const App = () => {
//   const [loading, setLoading] = useState(true);
//   const containerRef = useRef(null);
//   const locomotiveRef = useRef(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2500);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!loading && containerRef.current) {
//       try {
//         const timer = setTimeout(() => {
//           if (containerRef.current && LocomotiveScroll) {
//             locomotiveRef.current = new LocomotiveScroll({
//               el: containerRef.current,
//               smooth: true,
//               lerp: 0.1,
//               multiplier: 0.8,
//               smartphone: {
//                 smooth: true,
//                 lerp: 0.1,
//                 multiplier: 0.8,
//               },
//               tablet: {
//                 smooth: true,
//                 lerp: 0.1,
//                 multiplier: 0.8,
//               },
//             });
//           }
//         }, 100);

//         return () => {
//           clearTimeout(timer);
//           if (locomotiveRef.current?.destroy) {
//             locomotiveRef.current.destroy();
//           }
//         };
//       } catch (error) {
//         console.warn('Locomotive Scroll init failed:', error);
//       }
//     }
//   }, [loading]);

//   return (
//     <>
//       {loading ? (
//         <LogoLoader />
//       ) : (
//         <>
//           <CursorDesign />
//           <main data-scroll-container ref={containerRef}>
//             <Header />
//             <Tabs />
//             <AboutPart />
//             <Scroll />
//           </main>
//         </>
//       )}
//     </>
//   );
// };

// export default App;



import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';

import CursorDesign from './components/Home/JSX/CursorDesign';
import LogoLoader from './components/Home/JSX/LogoLoader';
import AppRoutes from './AppRoutes.jsx'; // ← import your Routes component

const App = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const locomotiveRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      try {
        const timer = setTimeout(() => {
          locomotiveRef.current = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            lerp: 0.1,
            multiplier: 0.8,
            smartphone: { smooth: true },
            tablet: { smooth: true },
          });
        }, 100);

        return () => {
          clearTimeout(timer);
          locomotiveRef.current?.destroy?.();
        };
      } catch (error) {
        console.warn('Locomotive Scroll init failed:', error);
      }
    }
  }, [loading]);

  return loading ? (
    <LogoLoader />
  ) : (
    <Router>
      <CursorDesign />
      <main data-scroll-container ref={containerRef}>
        <AppRoutes />
      </main>
    </Router>
  );
};

export default App;

