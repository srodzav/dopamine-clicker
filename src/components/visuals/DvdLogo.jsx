import { useEffect, useRef } from 'react';
import './dvd.css';

// dvd logo
export default function DvdLogo({ onGain }) {
  // animation ref
  const dvdRef = useRef(null);
  // requestAnimationFrame id
  const rafId = useRef(null);
  // save actual version of onGain
  const onGainRef = useRef(onGain);

  // everytime onGain changes, onGainRef saves value
  useEffect(() => {
    onGainRef.current = onGain;
  }, [onGain]);

  // game loop
  useEffect(() => {
    const dvd = dvdRef.current;
    if (!dvd) return;

    // position
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 50);
    // speed
    let vx = 2;
    let vy = 2;
    // collision
    let canBounce = true;
    // throttle
    let lastTime = 0;
    const frameDelay = 1000 / 60; // 60 fps

    function animate(currentTime) {
      // throttle
      if (currentTime - lastTime < frameDelay) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      x += vx;
      y += vy;

      // movement
      dvd.style.transform = `translate(${x}px, ${y}px)`;

      // collision detector
      const rect = dvd.getBoundingClientRect();
      let hitX = false;
      let hitY = false;

      // X borders
      if (rect.left <= 0 || rect.right >= window.innerWidth) {
        vx *= -1;
        hitX = true;
      }

      // Y borders
      if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
        vy *= -1;
        hitY = true;
      }

      // bounce hit
      if ((hitX || hitY) && canBounce) {
        const value = hitX && hitY ? 50 : 5;
        onGainRef.current?.(value);
        // cooldown 100ms
        canBounce = false;
        setTimeout(() => {
          canBounce = true;
        }, 100);
      }
      // loop
      rafId.current = requestAnimationFrame(animate);
    }
    // fresh start
    rafId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div ref={dvdRef} className="dvd">
      <img src="src/assets/dvd.png" className="dvd-img" />
    </div>
  );
}
