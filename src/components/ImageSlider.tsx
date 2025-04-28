'use client';

import React from 'react';

interface VideoSliderProps {
  videoSrc: string;
  posterSrc: string;
}

export default function VideoSlider({ videoSrc, posterSrc }: VideoSliderProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="w-full h-full relative">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster={posterSrc}
          className="object-cover w-full h-full absolute inset-0"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  );
} 