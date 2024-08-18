import { useEffect, useRef } from 'react';

import "./Welcome.css";

export default function Welcome() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video is playing');
          })
          .catch(error => {
            console.error('Error attempting to play', error);
          });
      }
    }
  }, []);

  return (
    <main>
      <div className="responsiveVideo">
        <video
          ref={videoRef}
          src="https://firebasestorage.googleapis.com/v0/b/first-game-6a2f1.appspot.com/o/KV__130824_10s.mp4?alt=media&token=0b7d87ab-48e3-495f-a141-799259c91c41"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </main>
  );
}