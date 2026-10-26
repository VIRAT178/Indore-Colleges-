import { useEffect, useRef } from 'react';
import { MonitorPlay } from 'lucide-react';

interface IntroVideoSectionProps {
  autoPlayWhenVisible?: boolean;
}

export default function IntroVideoSection({ autoPlayWhenVisible = true }: IntroVideoSectionProps) {
  const introVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!autoPlayWhenVisible) return;

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
  }, [autoPlayWhenVisible]);

  return (
    <section className="relative overflow-hidden bg-slate-950 py-14 sm:py-20 md:py-6 lg:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/35 via-slate-950 to-slate-950" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 md:mb-4">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 md:mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
            <MonitorPlay className="h-4 w-4" />
            Get to know us
          </div>
          <h2 className="font-outfit text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-3xl">
            Your journey to the right college starts here
          </h2>
        </div>

        <div className="mx-auto max-w-4xl md:max-w-5xl lg:max-w-6xl">
          <div className="rounded-[1.5rem] border border-slate-700 bg-gradient-to-b from-slate-700 to-slate-900 p-2 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.8)] sm:rounded-[2rem] sm:p-3">
            <div className="flex h-7 items-center justify-between px-2 sm:h-9 sm:px-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-red-400 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-amber-300 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-emerald-400 sm:h-2.5 sm:w-2.5" />
              </div>
              <span className="text-[10px] font-medium tracking-wide text-slate-400 sm:text-xs">INDORE COLLEGES</span>
              <span className="w-8 sm:w-10" aria-hidden="true" />
            </div>
            <div className="overflow-hidden rounded-xl bg-black sm:rounded-2xl md:aspect-[2.4/1]">
              <video
                ref={introVideoRef}
                className="aspect-video w-full md:h-full md:object-contain"
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
          </div>
          <div className="mx-auto h-5 w-1/3 rounded-b-xl bg-gradient-to-b from-slate-700 to-slate-800 sm:h-7" aria-hidden="true" />
          <div className="mx-auto h-2 w-2/3 rounded-full bg-slate-700 shadow-lg sm:h-3" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
