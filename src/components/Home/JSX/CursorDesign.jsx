import React, { useEffect } from 'react';
import gsap from 'gsap';

const CursorDesign = () => {
    useEffect(() => {
        let timeout;
        let xscale = 1;
        let yscale = 1;
        let xprev = 0;
        let yprev = 0;
        const cursor = document.querySelector("#miniCircle");

        const circleChaptakaro = () => {
            window.addEventListener("mousemove", function (dets) {
                clearTimeout(timeout);
                const xdiff = dets.clientX - xprev;
                const ydiff = dets.clientY - yprev;

                xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
                yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

                xprev = dets.clientX;
                yprev = dets.clientY;

                circleMouseFollower(xscale, yscale);

                timeout = setTimeout(function () {
                    cursor.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1, 1)`;
                }, 100);
            });
        };

        const circleMouseFollower = (xscale, yscale) => {
            window.addEventListener("mousemove", function (dets) {
                cursor.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;
            });
        };

        const addHoverListeners = () => {
            const mediaElements = document.querySelectorAll("img, video");

            mediaElements.forEach((el) => {
                el.addEventListener("mouseenter", () => cursor.classList.add("shrink-dot"));
                el.addEventListener("mouseleave", () => cursor.classList.remove("shrink-dot"));
            });
        };

        circleChaptakaro();
        circleMouseFollower();
        addHoverListeners();

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return <div id="miniCircle"></div>;
};

export default CursorDesign;
