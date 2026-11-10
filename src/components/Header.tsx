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
  Zap,
  Sparkles,
} from 'lucide-react';

interface Props {
  activeView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  telemetry: BiometricTelemetry;
  onOpenWristbandModal: () => void;
  onOpenWorkoutGenModal?: () => void;
}

export const Header: React.FC<Props> = ({
  activeView,
  onSelectView,
  telemetry,
  onOpenWristbandModal,
  onOpenWorkoutGenModal,
}) => {
  const navTabs: { id: ViewMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-4 h-4" /> },
    { id: 'three_d_scanner', label: '3D Mannequin', icon: <Layers className="w-4 h-4 text-[#4df0d0]" />, badge: 'Three.js' },
    { id: 'atlas', label: 'Muscle Atlas', icon: <Layers className="w-4 h-4" />, badge: 'Subdivided' },
    { id: 'motion_tracker', label: 'AI Motion Tracker', icon: <Activity className="w-4 h-4 text-[#4df0d0]" />, badge: 'Vision' },
    { id: 'ai_coach', label: 'AI Coach', icon: <Lightbulb className="w-4 h-4 text-[#4df0d0]" />, badge: 'Gemini' },
    { id: 'meal_scanner', label: 'Meal Vision', icon: <UtensilsCrossed className="w-4 h-4 text-[#4df0d0]" />, badge: 'AI Scan' },
    { id: 'custom_diet', label: 'Custom Diet', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'workout_logger', label: 'Workout & Rest', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'sonic_pacer', label: 'Sonic Pacer', icon: <Zap className="w-4 h-4 text-sky-400" />, badge: 'Audio' },
    { id: 'sports_crossfit', label: 'Sports & CrossFit', icon: <Trophy className="w-4 h-4" />, badge: 'Hyrox/Athletics' },
    { id: 'pain_doctor', label: 'Pain & Cramps', icon: <Stethoscope className="w-4 h-4 text-rose-400" />, badge: 'Relief' },
    { id: 'sleep_tracker', label: 'Sleep & Recovery', icon: <Moon className="w-4 h-4" /> },
    { id: 'home_workouts', label: 'Home & Homemaker', icon: <Home className="w-4 h-4" />, badge: 'Gentle' },
    { id: 'cardio_flowchart', label: 'Cardio Flowchart', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'gym_ops', label: 'Gym Ops ERP', icon: <Building2 className="w-4 h-4" />, badge: 'Gender Log' },
    { id: 'ideas_roadmap', label: 'Innovations & Ideas', icon: <Lightbulb className="w-4 h-4 text-amber-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#06080c]/90 backdrop-blur-xl border-b border-[#1d2835]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectView('dashboard')}
              className="flex items-baseline gap-1 font-['Big_Shoulders_Display'] text-2xl font-black tracking-wider text-white hover:opacity-90 transition-opacity"
            >
              GYM<span className="text-[#4df0d0]">OS</span>
              <span className="ml-1 text-[10px] font-mono font-semibold tracking-widest text-[#4df0d0] px-1.5 py-0.5 rounded bg-[#4df0d0]/10 border border-[#4df0d0]/30">
                PRO 2.0
              </span>
            </button>
          </div>

          {/* Actions: AI Workout Generator & Wristband Live Telemetry */}
          <div className="flex items-center gap-2">
            {onOpenWorkoutGenModal && (
              <button
                onClick={onOpenWorkoutGenModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#4df0d0]/20 to-[#5a8cff]/20 hover:from-[#4df0d0]/30 hover:to-[#5a8cff]/30 border border-[#4df0d0]/40 text-xs font-mono text-white transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4df0d0]" />
                <span className="font-semibold">AI WORKOUT</span>
              </button>
            )}

            <button
              onClick={onOpenWristbandModal}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                telemetry.isBandWorn
                  ? 'bg-[#121c22] border-[#4df0d0]/50 text-white shadow-[0_0_15px_rgba(77,240,208,0.15)] hover:border-[#4df0d0]'
                  : 'bg-[#12161f] border-dashed border-[#2b3a4a] text-[#8593a5] hover:text-white hover:border-[#4df0d0]/40'
              }`}
              title="Click to manage Wristband connection & view PPG sensor"
            >
              <div className="relative">
                <Watch className={`w-4 h-4 ${telemetry.isBandWorn ? 'text-[#4df0d0]' : 'text-[#8593a5]'}`} />
                {telemetry.isBandWorn && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#4df0d0] animate-ping" />
                )}
              </div>

              {telemetry.isBandWorn ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline font-semibold text-[#4df0d0]">BAND ON</span>
                  <div className="flex items-center gap-1 text-rose-400 font-bold">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 animate-pulse" />
                    <span>{telemetry.heartRate}</span>
                    <span className="text-[10px] text-[#8593a5] font-normal">BPM</span>
                  </div>
                  <span className="hidden md:inline text-[11px] text-[#8593a5] border-l border-[#26374a] pl-2">
                    {telemetry.hrZone.split(' ')[0]}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-medium">Wear Band</span>
                  <span className="text-[10px] text-[#8593a5] hidden sm:inline">(Off Wrist)</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Scroll */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none border-t border-[#131b24] pt-1.5">
          {navTabs.map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectView(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all uppercase tracking-wider ${
                  isActive
                    ? 'bg-[#14232c] text-[#4df0d0] border border-[#4df0d0]/40 shadow-sm font-semibold'
                    : 'text-[#8593a5] hover:text-[#e9eef5] hover:bg-[#121a23]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded font-sans uppercase font-bold tracking-normal ${
                      isActive ? 'bg-[#4df0d0]/20 text-[#4df0d0]' : 'bg-[#1d2835] text-[#8593a5]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
