// import React, { useEffect, useRef } from 'react';
// import LocomotiveScroll from 'locomotive-scroll';
// import Header from './components/JSX/Header';
// import Tabs from './components/JSX/Tabs';
// import CursorDesign from './components/JSX/CursorDesign';
// import AboutPart from './components/JSX/AboutPart';
// import Scroll from './components/JSX/Scroll';
// import LogoLoader from './components/JSX/LogoLoader';

// const App = () => {
//     const containerRef = useRef(null);
//     const locomotiveRef = useRef(null);

//     useEffect(() => {
//         if (containerRef.current) {
//             locomotiveRef.current = new LocomotiveScroll({
//                 el: containerRef.current,
//                 smooth: true,
//                 lerp: 0.1,
//                 multiplier: 0.8,
//                 smartphone: {
//                     smooth: true,
//                     lerp: 0.1,
//                     multiplier: 0.8,
//                 },
//                 tablet: {
//                     smooth: true,
//                     lerp: 0.1,
//                     multiplier: 0.8,
//                 }
//             });

//             // Cleanup function
//             return () => {
//                 if (locomotiveRef.current) {
//                     locomotiveRef.current.destroy();
//                 }
//             };
//         }
//     }, []);

//     return (
//         <>
//             <LogoLoader />
//             <CursorDesign />
//             <main data-scroll-container ref={containerRef}>
//                 <Header />
//                 <Tabs />
//                 <AboutPart />
//                 <Scroll />
//             </main>
//         </>
//     )
// }

// export default App;




import React, { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import Header from './components/JSX/Header';
import Tabs from './components/JSX/Tabs';
import CursorDesign from './components/JSX/CursorDesign';
import AboutPart from './components/JSX/AboutPart';
import Scroll from './components/JSX/Scroll';
import LogoLoader from './components/JSX/LogoLoader';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const locomotiveRef = useRef(null);

  useEffect(() => {
    // Set a timeout to hide loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // match with your CSS animation duration

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      try {
        // Add a small delay to ensure DOM is ready
        const timer = setTimeout(() => {
          if (containerRef.current && LocomotiveScroll) {
            locomotiveRef.current = new LocomotiveScroll({
              el: containerRef.current,
              smooth: true,
              lerp: 0.1,
              multiplier: 0.8,
              smartphone: {
                smooth: true,
                lerp: 0.1,
                multiplier: 0.8,
              },
              tablet: {
                smooth: true,
                lerp: 0.1,
                multiplier: 0.8,
              },
            });
          }
        }, 100);

        return () => {
          clearTimeout(timer);
          if (locomotiveRef.current && typeof locomotiveRef.current.destroy === 'function') {
            locomotiveRef.current.destroy();
          }
        };
      } catch (error) {
        console.warn('Locomotive Scroll initialization failed:', error);
      }
    }
  }, [loading]);

  return (
    <ThemeProvider>
      {loading ? (
        <LogoLoader />
      ) : (
        <>
          <CursorDesign />
          <main data-scroll-container ref={containerRef}>
            <Header />
            <Tabs />
            <AboutPart />
            <Scroll />
          </main>
        </>
      )}
    </ThemeProvider>
  );
};

export default App;
