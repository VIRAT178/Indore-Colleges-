import { useEffect, useRef } from 'react';

export default function IntroVideoSection() {
  const introVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = introVideoRef.current;
    if (!video) return;

    const playWithAudioFallback = async () => {
      video.muted = false;
      try {
        await video.play();
      } catch {
        video.muted = true;
        try {
          await video.play();
        } catch (error) {
          console.error('Could not autoplay the introduction video:', error);
        }
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void playWithAudioFallback();
      } else {
        video.pause();
      }
    }, { threshold: 0.25 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-950 py-4 sm:py-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/35 via-slate-950 to-slate-950" />
      <div className="relative w-full">
        <video
          ref={introVideoRef}
          className="block aspect-video w-full bg-black object-contain"
          src="/intro-video.mp4"
          controls
          playsInline
          preload="metadata"
          aria-label="Introduction to Indore Colleges"
          onError={(event) => {
            console.error(
              `Failed to load the introduction video: ${event.currentTarget.currentSrc}`,
              event.currentTarget.error
            );
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
