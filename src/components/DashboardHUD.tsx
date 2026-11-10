import React from 'react';
import { ViewMode, BiometricTelemetry } from '../types/index.ts';
import {
  Watch,
  Heart,
  Activity,
  Layers,
  UtensilsCrossed,
  Dumbbell,
  Trophy,
  Stethoscope,
  Moon,
  Home,
  GitBranch,
  Building2,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react';

interface Props {
  telemetry: BiometricTelemetry;
  onSelectView: (view: ViewMode) => void;
  onOpenWristbandModal: () => void;
  onOpenWorkoutGenModal?: () => void;
}

export const DashboardHUD: React.FC<Props> = ({
  telemetry,
  onSelectView,
  onOpenWristbandModal,
  onOpenWorkoutGenModal,
}) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Title & Status Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14232c] border border-[#4df0d0]/30 text-xs font-mono text-[#4df0d0] uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#4df0d0] animate-ping" />
          Next-Gen Biomechanics · AI Vision · Clinical Recovery
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white leading-none">
          Train Like The System <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4df0d0] to-[#5a8cff]">
            Knows Your Physiology.
          </span>
        </h1>

        <p className="text-[#8593a5] text-base sm:text-lg max-w-3xl leading-relaxed">
          GymOS Pro unites high-end computer-vision motion tracking, subdivided anatomical muscle isolation, 7-day customizable nutrition, adaptive rest timers, post-workout cramp diagnostics, and gender-aware gym operations into one cohesive luxury command center.
        </p>

        {/* Top Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {onOpenWorkoutGenModal && (
            <button
              onClick={onOpenWorkoutGenModal}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4df0d0] to-[#5a8cff] hover:opacity-95 text-[#04120f] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(77,240,208,0.3)] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate AI Workout Plan
            </button>
          )}

          <button
            onClick={() => onSelectView('atlas')}
            className="px-6 py-3 rounded-xl bg-[#14202c] hover:bg-[#1a2b3d] text-white border border-[#23354a] font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-[#4df0d0]" />
            Explore Muscle Atlas
          </button>

          <button
            onClick={() => onSelectView('motion_tracker')}
            className="px-6 py-3 rounded-xl bg-[#14202c] hover:bg-[#1a2b3d] text-white border border-[#23354a] font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-[#4df0d0]" />
            Launch AI Motion Tracker
          </button>

          <button
            onClick={() => onSelectView('pain_doctor')}
            className="px-6 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4 text-rose-400" />
            Post-Workout Pain Doctor
          </button>
        </div>
      </div>

      {/* Live Telemetry HUD Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Heart Rate / Wristband Card */}
        <div
          onClick={onOpenWristbandModal}
          className="p-5 rounded-2xl bg-gradient-to-b from-[#121c26] to-[#0a0f16] border border-[#1d2835] hover:border-[#4df0d0]/50 transition-all cursor-pointer shadow-xl relative overflow-hidden group"
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
            <span className="flex items-center gap-1.5">
              <Watch className="w-4 h-4 text-[#4df0d0]" />
              Smart Band Live Telemetry
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                telemetry.isBandWorn ? 'bg-[#4df0d0]/20 text-[#4df0d0]' : 'bg-red-500/20 text-red-400'
              }`}
            >
              {telemetry.isBandWorn ? 'WORN ON WRIST' : 'OFF WRIST'}
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            {telemetry.isBandWorn ? (
              <>
                <span className="text-5xl font-['Big_Shoulders_Display'] font-black text-rose-400">
                  {telemetry.heartRate}
                </span>
                <span className="text-sm font-mono text-[#8593a5]">BPM</span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse ml-1" />
              </>
            ) : (
              <div className="py-2 text-sm font-mono text-amber-400 font-semibold">
                Click to Wear & Sync Smart Band
              </div>
            )}
          </div>

          <div className="text-xs font-mono text-[#8593a5] mt-1">
            {telemetry.isBandWorn ? telemetry.hrZone : 'Stream real-time optical PPG and HRV strain'}
          </div>

          {/* Mini pulse wave */}
          {telemetry.isBandWorn && (
            <div className="h-6 flex items-end gap-1 mt-3">
              {telemetry.hrHistory.slice(-20).map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-[#4df0d0]"
                  style={{
                    height: `${Math.min(100, Math.max(20, ((v - 80) / 70) * 100))}%`,
                    opacity: 0.3 + (i / 20) * 0.7,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Today's Prescribed Session */}
        <div
          onClick={() => onSelectView('workout_logger')}
          className="p-5 rounded-2xl bg-[#0d1218] border border-[#1d2835] hover:border-[#4df0d0]/50 transition-all cursor-pointer shadow-xl group"
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
            <span className="flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-[#4df0d0]" />
              Today&apos;s Workout
            </span>
            <span className="text-[10px] text-[#4df0d0] font-bold">PUSH DAY A</span>
          </div>

          <div className="mt-3 text-4xl font-['Big_Shoulders_Display'] font-black uppercase text-white">
            Chest & Delts
          </div>
          <div className="text-xs font-mono text-[#8593a5] mt-1">
            Upper Incline DB Press · Dips · Lateral Raises
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-mono pt-2 border-t border-[#1a2533]">
            <span className="text-[#4df0d0] font-bold">18 Total Sets</span>
            <span className="text-[#8593a5] flex items-center gap-1 group-hover:text-white transition-colors">
              Log Session <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* CNS Readiness & Sleep Score */}
        <div
          onClick={() => onSelectView('sleep_tracker')}
          className="p-5 rounded-2xl bg-[#0d1218] border border-[#1d2835] hover:border-indigo-400/50 transition-all cursor-pointer shadow-xl group"
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
            <span className="flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-indigo-400" />
              CNS Readiness & Sleep
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">OPTIMAL</span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-5xl font-['Big_Shoulders_Display'] font-black text-white">
              92
            </span>
            <span className="text-sm font-mono text-[#8593a5]">/ 100</span>
          </div>
          <div className="text-xs font-mono text-[#8593a5] mt-1">
            Sleep: 7h 48m (1h 44m Deep Rest)
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-mono pt-2 border-t border-[#1a2533]">
            <span className="text-indigo-400 font-bold">Prime for Heavy Lifts</span>
            <span className="text-[#8593a5] flex items-center gap-1 group-hover:text-white transition-colors">
              Sleep Graph <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* 10 Next-Gen Modules Quick Launch Grid */}
      <div className="space-y-4">
        <h3 className="text-2xl font-['Big_Shoulders_Display'] font-black uppercase tracking-wide text-white flex items-center justify-between">
          <span>All 11 Upgraded Modules</span>
          <span className="text-xs font-mono text-[#8593a5]">Click any module to inspect</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => onSelectView('atlas')}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-[#4df0d0] transition-all cursor-pointer shadow-lg space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#4df0d0] uppercase font-bold tracking-widest">
                Module 01
              </span>
              <Layers className="w-4 h-4 text-[#4df0d0]" />
            </div>
            <h4 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white group-hover:text-[#4df0d0] transition-colors">
              Subdivided Muscle Atlas
            </h4>
            <p className="text-xs text-[#8593a5]">
              Cinematic holographic body scanner with upper/mid/lower chest, front/side/rear delts, and teardrop quad subdivisions.
            </p>
          </div>

          <div
            onClick={() => onSelectView('motion_tracker')}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-[#4df0d0] transition-all cursor-pointer shadow-lg space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#4df0d0] uppercase font-bold tracking-widest">
                Module 02
              </span>
              <Activity className="w-4 h-4 text-[#4df0d0]" />
            </div>
            <h4 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white group-hover:text-[#4df0d0] transition-colors">
              AI Motion Tracker (60 FPS)
            </h4>
            <p className="text-xs text-[#8593a5]">
              Computer-vision skeleton tracking joint flexion (knee, hip, spine tilt), automated rep counting, and webcam integration.
            </p>
          </div>

          <div
            onClick={() => onSelectView('custom_diet')}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-[#4df0d0] transition-all cursor-pointer shadow-lg space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#4df0d0] uppercase font-bold tracking-widest">
                Module 03
              </span>
              <UtensilsCrossed className="w-4 h-4 text-[#4df0d0]" />
            </div>
            <h4 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white group-hover:text-[#4df0d0] transition-colors">
              7-Day Custom Diet Planner
            </h4>
            <p className="text-xs text-[#8593a5]">
              Fully customizable daily menus for Mon–Sun. Scale exact food grams and swap between 20+ varied Indian & global staples.
            </p>
          </div>

          <div
            onClick={() => onSelectView('workout_logger')}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-[#4df0d0] transition-all cursor-pointer shadow-lg space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#4df0d0] uppercase font-bold tracking-widest">
                Module 04
              </span>
              <Dumbbell className="w-4 h-4 text-[#4df0d0]" />
            </div>
            <h4 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white group-hover:text-[#4df0d0] transition-colors">
              Adaptive Rest & Plate Math
            </h4>
            <p className="text-xs text-[#8593a5]">
              Logs working sets with automated adaptive rest timers (3m heavy vs 90s hypertrophy vs 60s isolation) and Olympic barbell plate loading.
            </p>
          </div>

          <div
            onClick={() => onSelectView('pain_doctor')}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-rose-400 transition-all cursor-pointer shadow-lg space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-rose-400 uppercase font-bold tracking-widest">
                Module 05
              </span>
              <Stethoscope className="w-4 h-4 text-rose-400" />
            </div>
            <h4 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white group-hover:text-rose-400 transition-colors">
              Pain, Cramp & Form Doctor
            </h4>
            <p className="text-xs text-[#8593a5]">
              Analyzes post-workout pain locations to verify proper lifting technique vs form breakdown, with immediate guided stretching protocols.
            </p>
          </div>

          <div
            onClick={() => onSelectView('sleep_tracker')}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-indigo-400 transition-all cursor-pointer shadow-lg space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-widest">
                Module 06
              </span>
              <Moon className="w-4 h-4 text-indigo-400" />
            </div>
            <h4 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white group-hover:text-indigo-400 transition-colors">
              Sleep & Recovery Tracker
            </h4>
            <p className="text-xs text-[#8593a5]">
              Deep and REM sleep hypnograms, resting heart rate dips, and readiness scores to dictate daily compound lifting capacity.
            </p>
          </div>

          <div
            onClick={() => onSelectView('home_workouts')}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-amber-400 transition-all cursor-pointer shadow-lg space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest">
                Module 07
              </span>
              <Home className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white group-hover:text-amber-400 transition-colors">
              Home & Homemaker Stretches
            </h4>
            <p className="text-xs text-[#8593a5]">
              Zero-equipment routines for household women and remote workers: kitchen counter posture reset, gentle tone, and evening leg swelling relief.
            </p>
          </div>

          <div
            onClick={() => onSelectView('cardio_flowchart')}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-sky-400 transition-all cursor-pointer shadow-lg space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-widest">
                Module 08
              </span>
              <GitBranch className="w-4 h-4 text-sky-400" />
            </div>
            <h4 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white group-hover:text-sky-400 transition-colors">
              Cardio vs Gym Flowchart
            </h4>
            <p className="text-xs text-[#8593a5]">
              Decision tree answering when to do cardio vs weights to preserve intramuscular glycogen and protect spine stability.
            </p>
          </div>

          <div
            onClick={() => onSelectView('sports_crossfit')}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-amber-400 transition-all cursor-pointer shadow-lg space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest">
                Module 09
              </span>
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white group-hover:text-amber-400 transition-colors">
              Sports & CrossFit Hub
            </h4>
            <p className="text-xs text-[#8593a5]">
              Conditioning programs for Hyrox, CrossFit WODs, Ironman, Marathons, Boxing/Kickboxing, Cricket, and Football agility.
            </p>
          </div>

          <div
            onClick={() => onSelectView('gym_ops')}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-[#4df0d0] transition-all cursor-pointer shadow-lg space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#4df0d0] uppercase font-bold tracking-widest">
                Module 10
              </span>
              <Building2 className="w-4 h-4 text-[#4df0d0]" />
            </div>
            <h4 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white group-hover:text-[#4df0d0] transition-colors">
              Gym Ops ERP (Gender Log)
            </h4>
            <p className="text-xs text-[#8593a5]">
              Real-time attendance turnstile tracking member name, gender classification for locker assignments, and WhatsApp renewal triggers.
            </p>
          </div>

          <div
            onClick={() => onSelectView('ideas_roadmap')}
            className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] hover:border-amber-400 transition-all cursor-pointer shadow-lg space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest">
                Module 11
              </span>
              <Lightbulb className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white group-hover:text-amber-400 transition-colors">
              Innovations & Mistakes Fixed
            </h4>
            <p className="text-xs text-[#8593a5]">
              Full audit of the 10 mistakes upgraded from the original concept and future patentable gym innovations (3D ToF LiDAR, magnet stacks).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
