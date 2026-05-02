"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, X } from "lucide-react";

export default function ProjectReveal({ projects }: { projects?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  

  const [showModal, setShowModal] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Use the first active project, or fallback
  const firstProject = projects?.[0];
  const videoSrc = firstProject?.videoFileUrl || firstProject?.videoUrl || "/assets/linde-event-day01.mp4";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animation to scale up the video container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // How long the scroll distance for scaling is
        scrub: true,
        pin: true,
        animation: gsap.to(videoContainerRef.current, {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          ease: "none",
        }),
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const togglePlay = () => {
    if (modalVideoRef.current) {
      if (modalVideoRef.current.paused) {
        modalVideoRef.current.play();
        setModalPlaying(true);
      } else {
        modalVideoRef.current.pause();
        setModalPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      const current = modalVideoRef.current.currentTime;
      const duration = modalVideoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalVideoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      modalVideoRef.current.currentTime = pos * modalVideoRef.current.duration;
    }
  };

  const openModal = () => {
    setShowModal(true);
    setModalPlaying(true);
    if (videoRef.current) videoRef.current.pause(); // Pause background video
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalVideoRef.current) modalVideoRef.current.pause();
    if (videoRef.current) videoRef.current.play(); // Resume background video
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#111] z-20 flex items-center justify-center overflow-hidden">
      <div 
        ref={videoContainerRef} 
        className="relative overflow-hidden rounded-[20px] md:rounded-[40px] flex items-center justify-center bg-black/50 cursor-pointer w-[90vw] md:w-[75vw] lg:w-[60vw] h-[50vh] md:h-[60vh]"
        onClick={openModal}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          autoPlay
          loop
          muted // Need muted for autoplay to work seamlessly on most browsers without interaction
        />
      </div>

      {/* Full Screen Player Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center">
          <video
            ref={modalVideoRef}
            src={videoSrc}
            className="w-full h-full object-contain"
            playsInline
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setModalPlaying(false)}
          />

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 w-full flex items-center px-8 pb-8 gap-6 z-10 bg-gradient-to-t from-black/80 to-transparent pt-20">
            {/* Play/Pause Button */}
            <button onClick={togglePlay} className="text-[#AEA28F] hover:text-white transition-colors">
              {modalPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            </button>

            {/* Progress Bar */}
            <div 
              className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <div 
                className="absolute top-0 left-0 h-full bg-[#AEA28F] rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Close Button */}
            <button onClick={closeModal} className="text-[#AEA28F] hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
