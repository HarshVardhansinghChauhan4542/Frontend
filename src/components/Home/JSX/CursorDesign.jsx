// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const CursorDesign = () => {
//     const observerRef = useRef(null);
//     const addedElementsRef = useRef(new Set());

//     useEffect(() => {
//         let timeout;
//         let xscale = 1;
//         let yscale = 1;
//         let xprev = 0;
//         let yprev = 0;
//         const cursor = document.querySelector("#miniCircle");

//         const circleChaptakaro = () => {
//             window.addEventListener("mousemove", function (dets) {
//                 clearTimeout(timeout);
//                 const xdiff = dets.clientX - xprev;
//                 const ydiff = dets.clientY - yprev;

//                 xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
//                 yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

//                 xprev = dets.clientX;
//                 yprev = dets.clientY;

//                 circleMouseFollower(xscale, yscale);

//                 timeout = setTimeout(function () {
//                     cursor.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1, 1)`;
//                 }, 100);
//             });
//         };

//         const circleMouseFollower = (xscale, yscale) => {
//             window.addEventListener("mousemove", function (dets) {
//                 cursor.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;
//             });
//         };

//         const addHoverListeners = () => {
//             const mediaElements = document.querySelectorAll("img, video");

//             mediaElements.forEach((el) => {
//                 // Check if we've already added listeners to this element
//                 if (!addedElementsRef.current.has(el)) {
//                     const handleMouseEnter = () => cursor.classList.add("shrink-dot");
//                     const handleMouseLeave = () => cursor.classList.remove("shrink-dot");
                    
//                     el.addEventListener("mouseenter", handleMouseEnter);
//                     el.addEventListener("mouseleave", handleMouseLeave);
                    
//                     // Store the element and its handlers for cleanup
//                     addedElementsRef.current.add(el);
//                     el._cursorHandlers = { handleMouseEnter, handleMouseLeave };
//                 }
//             });
//         };

//         const removeHoverListeners = (element) => {
//             if (element._cursorHandlers) {
//                 element.removeEventListener("mouseenter", element._cursorHandlers.handleMouseEnter);
//                 element.removeEventListener("mouseleave", element._cursorHandlers.handleMouseLeave);
//                 delete element._cursorHandlers;
//                 addedElementsRef.current.delete(element);
//             }
//         };

//         // Create a MutationObserver to watch for DOM changes
//         const setupMutationObserver = () => {
//             observerRef.current = new MutationObserver((mutations) => {
//                 let shouldUpdate = false;
                
//                 mutations.forEach((mutation) => {
//                     // Check for added nodes
//                     mutation.addedNodes.forEach((node) => {
//                         if (node.nodeType === Node.ELEMENT_NODE) {
//                             // Check if the added node is an image/video or contains images/videos
//                             if (node.matches && node.matches('img, video')) {
//                                 shouldUpdate = true;
//                             } else if (node.querySelectorAll) {
//                                 const mediaInNode = node.querySelectorAll('img, video');
//                                 if (mediaInNode.length > 0) {
//                                     shouldUpdate = true;
//                                 }
//                             }
//                         }
//                     });
                    
//                     // Check for removed nodes and clean up listeners
//                     mutation.removedNodes.forEach((node) => {
//                         if (node.nodeType === Node.ELEMENT_NODE) {
//                             if (node.matches && node.matches('img, video')) {
//                                 removeHoverListeners(node);
//                             } else if (node.querySelectorAll) {
//                                 const mediaInNode = node.querySelectorAll('img, video');
//                                 mediaInNode.forEach(removeHoverListeners);
//                             }
//                         }
//                     });
//                 });
                
//                 if (shouldUpdate) {
//                     // Small delay to ensure DOM is fully updated
//                     setTimeout(addHoverListeners, 50);
//                 }
//             });
            
//             // Start observing
//             observerRef.current.observe(document.body, {
//                 childList: true,
//                 subtree: true
//             });
//         };

//         circleChaptakaro();
//         circleMouseFollower();
//         addHoverListeners();
//         setupMutationObserver();

//         return () => {
//             clearTimeout(timeout);
            
//             // Clean up mutation observer
//             if (observerRef.current) {
//                 observerRef.current.disconnect();
//             }
            
//             // Clean up all hover listeners
//             const mediaElements = document.querySelectorAll("img, video");
//             mediaElements.forEach(removeHoverListeners);
//             addedElementsRef.current.clear();
//         };
//     }, []);

//     return <div id="miniCircle"></div>;
// };

// export default CursorDesign;




// import React, { useEffect, useRef } from "react";

// const CursorDesign = () => {
//   const coords = useRef({ x: 0, y: 0 });
//   const circlesRef = useRef([]);

//   useEffect(() => {
//     // Function to update circle colors based on theme
//     const updateCircleColors = () => {
//       const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
//       circlesRef.current.forEach(circle => {
//         circle.style.backgroundColor = isDarkTheme ? '#fff' : '#000';
//       });
//     };

//     // Initial theme setup
//     updateCircleColors();

//     // Watch for theme changes
//     const observer = new MutationObserver(updateCircleColors);
//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ['data-theme']
//     });

//     // Mouse move handler
//     const handleMouseMove = (e) => {
//       coords.current.x = e.clientX;
//       coords.current.y = e.clientY;
//     };
//     window.addEventListener("mousemove", handleMouseMove);

//     // Initialize circle styles
//     circlesRef.current.forEach((circle, index) => {
//       circle.x = 0;
//       circle.y = 0;

//       // Gradually shrink size for tail
//       const size = 24 * (1 - index / circlesRef.current.length);
//       const finalSize = Math.max(size, 4); // min size = 4px

//       circle.style.width = `${finalSize}px`;
//       circle.style.height = `${finalSize}px`;
//       circle.style.borderRadius = "50%";
//       circle.style.position = "fixed";
//       circle.style.pointerEvents = "none";
//       circle.style.zIndex = 99999999;
      
//       // Set initial color based on theme
//       updateCircleColors();
//     });

//     const animateCircles = () => {
//       let x = coords.current.x;
//       let y = coords.current.y;

//       circlesRef.current.forEach((circle, index) => {
//         circle.style.left = `${x - circle.offsetWidth / 2}px`;
//         circle.style.top = `${y - circle.offsetHeight / 2}px`;

//         const nextCircle = circlesRef.current[index + 1] || circlesRef.current[0];
//         x += (nextCircle.x - x) * 0.3; // trailing delay
//         y += (nextCircle.y - y) * 0.3;

//         circle.x = x;
//         circle.y = y;
//       });

//       requestAnimationFrame(animateCircles);
//     };

//     animateCircles();

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <>
//       {Array.from({ length: 30 }).map((_, i) => (
//         <div
//           key={i}
//           ref={(el) => (circlesRef.current[i] = el)}
//         ></div>
//       ))}
//     </>
//   );
// };

// export default CursorDesign;


import React, { useEffect, useRef } from "react";

const CursorDesign = () => {
  const coords = useRef({ x: 0, y: 0 });
  const circlesRef = useRef([]);
  const observerRef = useRef(null);
  const addedElementsRef = useRef(new Set());
  const isNearLink = useRef(false);

  // Store cursor position globally to persist across tab changes
  const globalCursorState = {
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    isNearLink: false
  };

  useEffect(() => {
    /** ====== THEME-BASED COLOR SETUP ====== **/
    const updateCircleColors = () => {
      const isDarkTheme = document.documentElement.getAttribute("data-theme") === "dark";
      circlesRef.current.forEach(circle => {
        if (circle) {
          circle.style.backgroundColor = isDarkTheme ? "#fff" : "#000";
          circle.style.borderColor = isDarkTheme ? "#fff" : "#000";
        }
      });
    };

    updateCircleColors();
    const themeObserver = new MutationObserver(updateCircleColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    /** ====== HOVER SHRINK FUNCTIONALITY ====== **/
    const shrinkCircles = () => {
      globalCursorState.isNearLink = true;
      circlesRef.current.forEach((circle) => {
        if (circle) {
          // Get the current transform without any scale
          const transform = circle.style.transform.replace(/scale\([^)]+\)/g, '').trim();
          // Apply only the scale we want
          circle.style.transform = `${transform} scale(0.5)`;
        }
      });
    };
    
    const restoreCircles = () => {
      globalCursorState.isNearLink = false;
      circlesRef.current.forEach((circle) => {
        if (circle) {
          // Remove any scale and reset to default scale (1)
          const transform = circle.style.transform.replace(/scale\([^)]+\)/g, '').trim();
          circle.style.transform = transform;
        }
      });
    };
    
    // Restore cursor state if needed
    if (globalCursorState.isNearLink) {
      shrinkCircles();
    }

    // Check if cursor is near any interactive element
    const checkProximityToInteractive = (x, y) => {
      const elements = [
        ...document.querySelectorAll('a, button, [role="button"], .hamburger-menu, .hamburger, .menu-btn, .theme-toggle, #themeToggle, #toggleBtn, [data-cursor-shrink]'),
        document.getElementById('toggleBtn'),
        document.querySelector('.hamburger-menu'),
        document.querySelector('.hamburger'),
        document.querySelector('.menu-btn'),
        document.querySelector('.theme-toggle'),
        document.getElementById('themeToggle')
      ].filter((el, index, self) => el && self.indexOf(el) === index); // Remove duplicates
      
      const proximityThreshold = 40; // Increased threshold for better touch targets
      let nearInteractive = false;

      elements.forEach(el => {
        if (!el) return;
        
        const rect = el.getBoundingClientRect();
        // Expand the hit area slightly more for better UX
        const expandedRect = {
          left: rect.left - proximityThreshold,
          right: rect.right + proximityThreshold,
          top: rect.top - proximityThreshold,
          bottom: rect.bottom + proximityThreshold
        };

        if (x >= expandedRect.left && x <= expandedRect.right &&
            y >= expandedRect.top && y <= expandedRect.bottom) {
          nearInteractive = true;
        }
      });

      if (nearInteractive && !isNearLink.current) {
        shrinkCircles();
        isNearLink.current = true;
      } else if (!nearInteractive && isNearLink.current) {
        restoreCircles();
        isNearLink.current = false;
      }
    };

    const addHoverListeners = () => {
      // Media elements and interactive elements
      const interactiveElements = [
        ...document.querySelectorAll('img, video, a, button, [role="button"], [data-cursor-shrink]'),
        document.getElementById('toggleBtn'),
        document.querySelector('.hamburger-menu'),
        document.querySelector('.hamburger'),
        document.querySelector('.menu-btn'),
        document.querySelector('.theme-toggle'),
        document.getElementById('themeToggle')
      ].filter((el, index, self) => el && self.indexOf(el) === index);
      
      interactiveElements.forEach((el) => {
        if (!addedElementsRef.current.has(el)) {
          el.addEventListener("mouseenter", shrinkCircles);
          el.addEventListener("mouseleave", restoreCircles);
          addedElementsRef.current.add(el);
        }
      });
    };

    const removeHoverListeners = (el) => {
      el.removeEventListener("mouseenter", shrinkCircles);
      el.removeEventListener("mouseleave", restoreCircles);
      addedElementsRef.current.delete(el);
    };

    // MutationObserver to detect new images/videos dynamically
    observerRef.current = new MutationObserver(() => setTimeout(addHoverListeners, 50));
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    /** ====== CIRCLE INITIAL SETUP ====== **/
    circlesRef.current.forEach((circle, index) => {
      circle.x = 0;
      circle.y = 0;

      // Gradually shrink tail size
      const size = 20 * (1 - index / circlesRef.current.length);
      const finalSize = Math.max(size, 4);

      circle.style.width = `${finalSize}px`;
      circle.style.height = `${finalSize}px`;
      circle.style.borderRadius = "50%";
      circle.style.position = "fixed";
      circle.style.pointerEvents = "none";
      circle.style.zIndex = 99999999;
    });

    /** ====== MOUSE FOLLOW ANIMATION ====== **/
    const handleMouseMove = (e) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;
      globalCursorState.x = e.clientX;
      globalCursorState.y = e.clientY;
      checkProximityToInteractive(e.clientX, e.clientY);
    };

    // Initialize with current mouse position or center of screen
    const initCursorPosition = () => {
      coords.current.x = globalCursorState.x;
      coords.current.y = globalCursorState.y;
      checkProximityToInteractive(globalCursorState.x, globalCursorState.y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Initialize cursor position when component mounts or when tab becomes visible
    initCursorPosition();
    document.addEventListener('visibilitychange', initCursorPosition);

    const animateCircles = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circlesRef.current.forEach((circle, index) => {
        circle.style.left = `${x - circle.offsetWidth / 2}px`;
        circle.style.top = `${y - circle.offsetHeight / 2}px`;

        const nextCircle = circlesRef.current[index + 1] || circlesRef.current[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;

        circle.x = x;
        circle.y = y;
      });

      requestAnimationFrame(animateCircles);
    };

    animateCircles();
    addHoverListeners();

    /** ====== CLEANUP ====== **/
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener('visibilitychange', initCursorPosition);
      if (observerRef.current) observerRef.current.disconnect();
      themeObserver.disconnect();
      addedElementsRef.current.forEach(removeHoverListeners);
    };
  }, []);

  return (
    <>
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} ref={(el) => (circlesRef.current[i] = el)} className="circle"></div>
      ))}
    </>
  );
};

export default CursorDesign;
