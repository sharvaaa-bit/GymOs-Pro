import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Radio, Zap, Sliders } from 'lucide-react';

export const WorkoutSonicPacer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(140);
  const [soundMode, setSoundMode] = useState<'hyrox_cadence' | 'binaural_focus' | 'hiit_metronome'>('hyrox_cadence');
  const [volume, setVolume] = useState<number>(0.5);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const currentStepRef = useRef<number>(0);
  const [activeBeat, setActiveBeat] = useState<number>(0);

  // Initialize or resume Web Audio Context
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSynthesizedBeat = (isDownbeat = false) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (soundMode === 'binaural_focus') {
      // 432Hz deep meditative focus pitch
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    } else {
      // Electro Synth Punch
      osc.type = isDownbeat ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(isDownbeat ? 150 : 80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(volume * (isDownbeat ? 0.8 : 0.5), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  };

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = (60 / bpm) * 1000;
      timerRef.current = window.setInterval(() => {
        currentStepRef.current = (currentStepRef.current + 1) % 4;
        setActiveBeat(currentStepRef.current);
        playSynthesizedBeat(currentStepRef.current === 0);
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setActiveBeat(0);
      currentStepRef.current = 0;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm, soundMode, volume]);

  const togglePlay = () => {
    getAudioContext();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-sky-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            Module 14 · Web Audio Neural Metronome & Cadence Pacer
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            Workout Sonic Beats & Cadence Pacer
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Zero-latency procedural Web Audio synthesizer. Locks your repetition cadence, pacing steps for 1,000m Hyrox runs, and generating 432Hz binaural focus frequencies for deep central nervous system concentration.
          </p>
        </div>

        {/* Play / Stop Master CTA */}
        <button
          onClick={togglePlay}
          className={`px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xl ${
            isPlaying
              ? 'bg-rose-500 hover:bg-rose-600 text-white'
              : 'bg-[#4df0d0] hover:bg-[#4df0d0]/90 text-[#04120f]'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Stop Sonic Pacer' : 'Start Sonic Pacer'}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sonic Synthesizer Control Deck (8 Cols) */}
        <div className="lg:col-span-8 bg-[#090d13] border border-[#1d2835] rounded-2xl p-6 shadow-2xl space-y-6">
          {/* Audio Visualizer 4-Step Ring */}
          <div className="flex items-center justify-center gap-4 py-6 border-b border-[#182330]">
            {[0, 1, 2, 3].map((step) => {
              const isActive = isPlaying && activeBeat === step;
              return (
                <div
                  key={step}
                  className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center font-['Big_Shoulders_Display'] text-2xl font-black transition-all duration-100 ${
                    isActive
                      ? step === 0
                        ? 'bg-[#4df0d0] border-[#4df0d0] text-[#04120f] scale-110 shadow-[0_0_25px_rgba(77,240,208,0.6)]'
                        : 'bg-sky-400 border-sky-400 text-[#04120f] scale-105 shadow-[0_0_20px_rgba(56,189,248,0.5)]'
                      : 'bg-[#0d141e] border-[#1f2d3d] text-[#8593a5]'
                  }`}
                >
                  {step + 1}
                </div>
              );
            })}
          </div>

          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#8593a5] mb-2">
              Select Sonic Frequency Protocol:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'hyrox_cadence', name: 'Hyrox Race Pacer', desc: '140–165 BPM cadence ticks' },
                { id: 'hiit_metronome', name: 'HIIT & Sprint Pulse', desc: '170–185 BPM rapid tempo' },
                { id: 'binaural_focus', name: '432Hz Neural Lock', desc: 'Alpha wave focus drone' },
              ].map((mode) => {
                const isSelected = soundMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSoundMode(mode.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-[#4df0d0]/20 border-[#4df0d0] text-white shadow-md'
                        : 'bg-[#070b10] border-[#182330] text-[#8593a5] hover:text-white'
                    }`}
                  >
                    <div className={`font-bold font-mono text-xs uppercase ${isSelected ? 'text-[#4df0d0]' : 'text-white'}`}>
                      {mode.name}
                    </div>
                    <div className="text-[10px] text-[#8593a5] mt-0.5">{mode.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BPM Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#8593a5] uppercase">Target Tempo / Cadence:</span>
              <span className="text-2xl font-['Big_Shoulders_Display'] font-black text-[#4df0d0]">
                {bpm} <span className="text-xs font-mono text-[#8593a5]">BPM</span>
              </span>
            </div>
            <input
              type="range"
              min="80"
              max="200"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full accent-[#4df0d0] bg-[#14202c] h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8593a5]">
              <span>80 BPM (Slow Squat Tempo)</span>
              <span>140 BPM (Running Cadence)</span>
              <span>200 BPM (Max Sprint Cadence)</span>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-3 pt-2">
            <Volume2 className="w-4 h-4 text-[#8593a5]" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 accent-[#4df0d0] bg-[#14202c] h-2 rounded-lg cursor-pointer"
            />
            <span className="text-xs font-mono text-white w-10 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Science Insights (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0d1218] border border-[#1d2835] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4df0d0] font-bold">
            <Zap className="w-4 h-4" />
            Cadence & Athletic Science
          </div>

          <div className="p-4 rounded-xl bg-[#090d12] border border-[#1a2533] space-y-2 text-xs font-mono text-[#8593a5]">
            <div className="text-white font-bold uppercase">Cadence Synchronization (EEA):</div>
            <p className="leading-relaxed">
              Auditory motor synchronization reduces perceived exertion by 12% and prevents over-striding during 1km compromised Hyrox intervals.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#090d12] border border-[#1a2533] space-y-2 text-xs font-mono text-[#8593a5]">
            <div className="text-white font-bold uppercase">Binaural 432Hz Focus:</div>
            <p className="leading-relaxed">
              Sustained low-frequency acoustic harmonics dampen pre-competition adrenaline surges, stabilizing vagal heart rate tone before maximum 1RM attempts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
