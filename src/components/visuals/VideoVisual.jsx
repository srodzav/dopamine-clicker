import './VideoVisual.css';

export default function VideoVisual({ videoFile, title, position = 'bottom-right' }) {
  return (
    <div className={`video-visual ${position}`}>
      <div className="video-container">
        <video width="180" height="320" autoPlay loop muted playsInline src={`/videos/${videoFile}`}>
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
