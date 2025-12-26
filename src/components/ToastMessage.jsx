import { useState, useEffect, useRef } from 'react';
import './ToastMessage.css';

export default function ToastMessage({ message, icon = '💡', duration = 5000, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const onCloseRef = useRef(onClose);

  // to prevent loop
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    // show with delay
    const showTimer = setTimeout(() => setIsVisible(true), 100);

    // hide after 3s
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onCloseRef.current?.(), 800);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  return (
    <div className={`toast-message ${isVisible ? 'visible' : ''}`}>
      <div className="toast-icon">{icon}</div>
      <div className="toast-content">
        <div className="toast-text">{message}</div>
      </div>
    </div>
  );
}
