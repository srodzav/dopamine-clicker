import { useEffect, useRef } from 'react';
import './dvd.css';

// dvd logo component
// maybe ill change to an actual dvd logo
export default function DvdLogo() {
  const dvdRef = useRef(null);

  useEffect(() => {
    const dvd = dvdRef.current;
    if (!dvd) return;

    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 50);

    //speed control
    let vx = 1;
    let vy = 1;

    function animate() {
      x += vx;
      y += vy;

      dvd.style.transform = `translate(${x}px, ${y}px)`;

      const rect = dvd.getBoundingClientRect();
      let bounced = false;

      if (rect.left <= 0 || rect.right >= window.innerWidth) {
        vx *= -1;
        bounced = true;
      }

      if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
        vy *= -1;
        bounced = true;
      }

      // currently theres a bug that the logo change no matter what
      if (bounced) {
        dvd.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div ref={dvdRef} className="dvd">
      DVD
    </div>
  );
}
