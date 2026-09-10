import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  FileText,
  Clock,
  User,
  Sparkles
} from 'lucide-react';

interface VideoPlayerProps {
  title: string;
  duration: string;
  instructor: string;
  transcriptSnippet: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  duration,
  instructor,
  transcriptSnippet,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(25);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);

  // Simulated playback timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgressPercent((prev) => (prev >= 100 ? 0 : prev + 1 * playbackSpeed));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  const speedOptions = [0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="my-6 bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800 text-white">
      {/* Video Screen Area */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-950 via-navy-950 to-slate-900 flex flex-col justify-between p-4 sm:p-6 select-none">
        {/* Top Badges */}
        <div className="flex justify-between items-start z-10">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              iGOT Media Player
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300">
            Official E-Lecture
          </div>
        </div>

        {/* Center Play Button & Animation */}
        <div className="flex flex-col items-center justify-center my-auto z-10 text-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-saffron-500 hover:bg-saffron-600 text-white flex items-center justify-center shadow-2xl transition transform hover:scale-105 active:scale-95 ring-4 ring-white/20"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>
          <p className="mt-3 text-sm sm:text-base font-bold text-white drop-shadow">
            {title}
          </p>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center justify-center gap-1.5">
            <User className="w-3.5 h-3.5 text-saffron-400" />
            {instructor}
          </p>
        </div>

        {/* Background Visual Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-9xl font-black">
          iGOT
        </div>

        {/* Bottom Control Bar */}
        <div className="z-10 bg-black/60 backdrop-blur rounded-xl p-3 border border-white/10">
          {/* Progress Bar */}
          <div
            className="w-full bg-white/20 h-1.5 rounded-full cursor-pointer overflow-hidden mb-2.5"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newPct = Math.round((clickX / rect.width) * 100);
              setProgressPercent(newPct);
            }}
          >
            <div
              className="bg-saffron-500 h-full rounded-full transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-saffron-400 transition"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setProgressPercent(0)}
                className="text-slate-400 hover:text-white transition"
                title="Restart"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-400 hover:text-white transition"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-slate-400 font-mono text-[11px]">
                {Math.floor((progressPercent / 100) * 14)}:
                {String(Math.floor(((progressPercent % 100) * 60) / 100)).padStart(2, '0')} / {duration}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Speed switcher */}
              <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
                <span className="text-[10px] text-slate-400 mr-1">Speed:</span>
                {speedOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setPlaybackSpeed(s)}
                    className={`text-[10px] font-bold px-1 rounded ${
                      playbackSpeed === s ? 'bg-saffron-500 text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition ${
                  showTranscript ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Transcript</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Sub-panel */}
      {showTranscript && (
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
              Synchronized Speech Transcript
            </span>
            <span className="text-[10px] font-mono">Audio Track: English / Hindi Subtitles</span>
          </div>
          <p className="mt-2 text-slate-300 leading-relaxed font-sans italic bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            "{transcriptSnippet}"
          </p>
        </div>
      )}
    </div>
  );
};
