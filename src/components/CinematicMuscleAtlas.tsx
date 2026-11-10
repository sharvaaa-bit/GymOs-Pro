import React, { useState } from 'react';
import { MUSCLE_GROUPS_DATA } from '../data/muscleData.ts';
import { MajorMuscleGroup, SubMusclePart } from '../types/index.ts';
import {
  Layers,
  Filter,
  Dumbbell,
  Compass,
  CheckCircle,
  Sparkles,
  Zap,
} from 'lucide-react';

interface Props {
  onSelectExerciseForLog?: (exerciseName: string) => void;
}

export const CinematicMuscleAtlas: React.FC<Props> = ({ onSelectExerciseForLog }) => {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('chest');
  const [selectedSubPartId, setSelectedSubPartId] = useState<string>('chest_upper');
  const [filterEquipment, setFilterEquipment] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [scanActive, setScanActive] = useState<boolean>(true);

  const currentGroup: MajorMuscleGroup =
    MUSCLE_GROUPS_DATA.find((g) => g.id === selectedGroupId) || MUSCLE_GROUPS_DATA[0];

  const currentSubPart: SubMusclePart =
    currentGroup.subParts.find((s) => s.id === selectedSubPartId) || currentGroup.subParts[0];

  const handleSelectGroup = (group: MajorMuscleGroup) => {
    setSelectedGroupId(group.id);
    setSelectedSubPartId(group.subParts[0].id);
    setView(group.view);
  };

  const filteredExercises = currentSubPart.bestExercises.filter((ex) => {
    const eqMatch = filterEquipment === 'all' || ex.equipment === filterEquipment;
    const lvlMatch = filterLevel === 'all' || ex.level.toLowerCase() === filterLevel.toLowerCase();
    return eqMatch && lvlMatch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Head */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#4df0d0] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4df0d0] animate-ping" />
            Module 01 · Biomechanical Atlas & Holographic Anatomy
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            Fine-Grained Muscle Scanner
          </h2>
          <p className="text-[#8593a5] text-sm sm:text-base max-w-2xl mt-1">
            Explore deep anatomical subdivisions: isolate upper vs middle vs lower chest, front vs side delts, teardrop quad vs outer sweep, and long vs lateral tricep heads.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0d1218] border border-[#1d2835]">
          <button
            onClick={() => {
              setView('front');
              if (currentGroup.view !== 'front') {
                const firstFront = MUSCLE_GROUPS_DATA.find((g) => g.view === 'front');
                if (firstFront) handleSelectGroup(firstFront);
              }
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
              view === 'front'
                ? 'bg-[#4df0d0] text-[#04120f] font-bold shadow-md'
                : 'text-[#8593a5] hover:text-white'
            }`}
          >
            Anterior (Front)
          </button>
          <button
            onClick={() => {
              setView('back');
              if (currentGroup.view !== 'back') {
                const firstBack = MUSCLE_GROUPS_DATA.find((g) => g.view === 'back');
                if (firstBack) handleSelectGroup(firstBack);
              }
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
              view === 'back'
                ? 'bg-[#4df0d0] text-[#04120f] font-bold shadow-md'
                : 'text-[#8593a5] hover:text-white'
            }`}
          >
            Posterior (Back)
          </button>
          <button
            onClick={() => setScanActive(!scanActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all ${
              scanActive ? 'text-[#4df0d0] bg-[#4df0d0]/10' : 'text-[#8593a5]'
            }`}
            title="Toggle Hologram Scanlines"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Hologram Scanner Canvas + Sub-Division Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Holographic Scanner Container (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#0b1016] via-[#090d13] to-[#06080c] border border-[#1d2835] rounded-2xl p-5 relative overflow-hidden shadow-2xl">
          {/* Hologram Reticle Overlays */}
          <div className="absolute top-3 left-3 text-[10px] font-mono text-[#4df0d0]/60 tracking-wider">
            BIO-SCAN // 04-LAYER SPECTRAL
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono text-[#8593a5] tracking-wider">
            {view === 'front' ? 'VIEW: ANTERIOR' : 'VIEW: POSTERIOR'}
          </div>

          {/* Sci-Fi Moving Scanline Effect */}
          {scanActive && (
            <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#4df0d0]/10 to-transparent pointer-events-none animate-scanline" />
          )}

          {/* Interactive Holographic Anatomical Body SVG */}
          <div className="relative py-4 flex justify-center">
            <svg
              viewBox="0 0 340 540"
              className="w-full max-w-[320px] h-auto drop-shadow-[0_0_25px_rgba(77,240,208,0.08)] select-none"
            >
              <defs>
                {/* Glow Filter */}
                <filter id="holoGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="bodyBaseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d1520" />
                  <stop offset="100%" stopColor="#06090f" />
                </linearGradient>
                <linearGradient id="activeZoneGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4df0d0" />
                  <stop offset="100%" stopColor="#1aa890" />
                </linearGradient>
              </defs>

              {/* Background HUD Grid Lines */}
              <g stroke="#1a2636" strokeWidth="0.5" strokeDasharray="3 3">
                <line x1="20" y1="90" x2="320" y2="90" />
                <line x1="20" y1="180" x2="320" y2="180" />
                <line x1="20" y1="280" x2="320" y2="280" />
                <line x1="20" y1="400" x2="320" y2="400" />
                <line x1="170" y1="20" x2="170" y2="520" />
              </g>

              {/* Contoured Anatomical Head & Neck */}
              <ellipse cx="170" cy="50" rx="26" ry="32" fill="url(#bodyBaseGrad)" stroke="#23354a" strokeWidth="1.2" />
              {/* Neck & Trapezius slope */}
              <path
                d="M 152 78 C 142 90, 110 102, 100 112 L 240 112 C 230 102, 198 90, 188 78 Z"
                fill={selectedGroupId === 'back_lats' && view === 'back' ? 'url(#activeZoneGrad)' : '#101a26'}
                stroke={selectedGroupId === 'back_lats' && view === 'back' ? '#4df0d0' : '#23354a'}
                strokeWidth="1.2"
                className="cursor-pointer transition-all hover:fill-[#1b3438]"
                onClick={() => {
                  const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'back_lats');
                  if (grp) handleSelectGroup(grp);
                }}
              />

              {view === 'front' ? (
                /* =================== ANTERIOR (FRONT) BODY =================== */
                <g>
                  {/* CHEST - SUBDIVIDED: Upper, Middle, Lower */}
                  {/* Upper Chest (Clavicular Head) */}
                  <path
                    d="M 125 116 C 145 112, 160 114, 168 118 L 168 132 C 150 130, 130 134, 120 132 Z"
                    fill={selectedSubPartId === 'chest_upper' ? '#4df0d0' : selectedGroupId === 'chest' ? '#1f3c3a' : '#141e2b'}
                    stroke={selectedSubPartId === 'chest_upper' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.5"
                    filter={selectedSubPartId === 'chest_upper' ? 'url(#holoGlow)' : undefined}
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/60"
                    onClick={() => {
                      setSelectedGroupId('chest');
                      setSelectedSubPartId('chest_upper');
                    }}
                  />
                  <path
                    d="M 215 116 C 195 112, 180 114, 172 118 L 172 132 C 190 130, 210 134, 220 132 Z"
                    fill={selectedSubPartId === 'chest_upper' ? '#4df0d0' : selectedGroupId === 'chest' ? '#1f3c3a' : '#141e2b'}
                    stroke={selectedSubPartId === 'chest_upper' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.5"
                    filter={selectedSubPartId === 'chest_upper' ? 'url(#holoGlow)' : undefined}
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/60"
                    onClick={() => {
                      setSelectedGroupId('chest');
                      setSelectedSubPartId('chest_upper');
                    }}
                  />

                  {/* Middle Chest (Sternal Head) */}
                  <path
                    d="M 120 134 C 135 133, 155 132, 168 134 L 168 154 C 148 156, 128 152, 118 146 Z"
                    fill={selectedSubPartId === 'chest_middle' ? '#4df0d0' : selectedGroupId === 'chest' ? '#1f3c3a' : '#141e2b'}
                    stroke={selectedSubPartId === 'chest_middle' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.5"
                    filter={selectedSubPartId === 'chest_middle' ? 'url(#holoGlow)' : undefined}
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/60"
                    onClick={() => {
                      setSelectedGroupId('chest');
                      setSelectedSubPartId('chest_middle');
                    }}
                  />
                  <path
                    d="M 220 134 C 205 133, 185 132, 172 134 L 172 154 C 192 156, 212 152, 222 146 Z"
                    fill={selectedSubPartId === 'chest_middle' ? '#4df0d0' : selectedGroupId === 'chest' ? '#1f3c3a' : '#141e2b'}
                    stroke={selectedSubPartId === 'chest_middle' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.5"
                    filter={selectedSubPartId === 'chest_middle' ? 'url(#holoGlow)' : undefined}
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/60"
                    onClick={() => {
                      setSelectedGroupId('chest');
                      setSelectedSubPartId('chest_middle');
                    }}
                  />

                  {/* Lower Chest (Costal / Abdominal Head) */}
                  <path
                    d="M 120 148 C 135 152, 155 156, 168 156 L 168 166 C 145 168, 126 160, 118 154 Z"
                    fill={selectedSubPartId === 'chest_lower' ? '#4df0d0' : selectedGroupId === 'chest' ? '#1f3c3a' : '#141e2b'}
                    stroke={selectedSubPartId === 'chest_lower' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.5"
                    filter={selectedSubPartId === 'chest_lower' ? 'url(#holoGlow)' : undefined}
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/60"
                    onClick={() => {
                      setSelectedGroupId('chest');
                      setSelectedSubPartId('chest_lower');
                    }}
                  />
                  <path
                    d="M 220 148 C 205 152, 185 156, 172 156 L 172 166 C 195 168, 214 160, 222 154 Z"
                    fill={selectedSubPartId === 'chest_lower' ? '#4df0d0' : selectedGroupId === 'chest' ? '#1f3c3a' : '#141e2b'}
                    stroke={selectedSubPartId === 'chest_lower' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.5"
                    filter={selectedSubPartId === 'chest_lower' ? 'url(#holoGlow)' : undefined}
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/60"
                    onClick={() => {
                      setSelectedGroupId('chest');
                      setSelectedSubPartId('chest_lower');
                    }}
                  />

                  {/* SHOULDERS (Front & Lateral Delts) */}
                  <ellipse
                    cx="96"
                    cy="126"
                    rx="18"
                    ry="20"
                    fill={selectedSubPartId === 'delts_front' || selectedSubPartId === 'delts_lateral' ? '#4df0d0' : selectedGroupId === 'shoulders' ? '#1f3c3a' : '#141e2b'}
                    stroke={selectedGroupId === 'shoulders' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.3"
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/50"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'shoulders');
                      if (grp) handleSelectGroup(grp);
                    }}
                  />
                  <ellipse
                    cx="244"
                    cy="126"
                    rx="18"
                    ry="20"
                    fill={selectedSubPartId === 'delts_front' || selectedSubPartId === 'delts_lateral' ? '#4df0d0' : selectedGroupId === 'shoulders' ? '#1f3c3a' : '#141e2b'}
                    stroke={selectedGroupId === 'shoulders' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.3"
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/50"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'shoulders');
                      if (grp) handleSelectGroup(grp);
                    }}
                  />

                  {/* BICEPS (Long & Short Heads) */}
                  <path
                    d="M 80 150 C 76 170, 78 190, 84 204 C 92 195, 96 175, 94 154 Z"
                    fill={selectedGroupId === 'arms_biceps' ? '#4df0d0' : '#141e2b'}
                    stroke={selectedGroupId === 'arms_biceps' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.3"
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/50"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'arms_biceps');
                      if (grp) handleSelectGroup(grp);
                    }}
                  />
                  <path
                    d="M 260 150 C 264 170, 262 190, 256 204 C 248 195, 244 175, 246 154 Z"
                    fill={selectedGroupId === 'arms_biceps' ? '#4df0d0' : '#141e2b'}
                    stroke={selectedGroupId === 'arms_biceps' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.3"
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/50"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'arms_biceps');
                      if (grp) handleSelectGroup(grp);
                    }}
                  />

                  {/* FOREARMS */}
                  <rect x="68" y="210" width="16" height="52" rx="8" fill="#101824" stroke="#23354a" strokeWidth="1" />
                  <rect x="256" y="210" width="16" height="52" rx="8" fill="#101824" stroke="#23354a" strokeWidth="1" />

                  {/* ABDOMINALS (Upper, Lower & Obliques) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'core_abs');
                      if (grp) handleSelectGroup(grp);
                    }}
                  >
                    {/* Upper Abs */}
                    <rect
                      x="148"
                      y="172"
                      width="18"
                      height="18"
                      rx="4"
                      fill={selectedSubPartId === 'abs_upper_lower' ? '#4df0d0' : selectedGroupId === 'core_abs' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                    />
                    <rect
                      x="174"
                      y="172"
                      width="18"
                      height="18"
                      rx="4"
                      fill={selectedSubPartId === 'abs_upper_lower' ? '#4df0d0' : selectedGroupId === 'core_abs' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                    />
                    {/* Mid Abs */}
                    <rect
                      x="148"
                      y="194"
                      width="18"
                      height="18"
                      rx="4"
                      fill={selectedSubPartId === 'abs_upper_lower' ? '#4df0d0' : selectedGroupId === 'core_abs' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                    />
                    <rect
                      x="174"
                      y="194"
                      width="18"
                      height="18"
                      rx="4"
                      fill={selectedSubPartId === 'abs_upper_lower' ? '#4df0d0' : selectedGroupId === 'core_abs' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                    />
                    {/* Lower Abs */}
                    <rect
                      x="150"
                      y="216"
                      width="40"
                      height="20"
                      rx="4"
                      fill={selectedSubPartId === 'abs_upper_lower' ? '#4df0d0' : selectedGroupId === 'core_abs' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                    />

                    {/* Obliques */}
                    <path
                      d="M 122 176 C 130 195, 134 220, 142 232 L 140 240 C 126 230, 118 200, 116 178 Z"
                      fill={selectedSubPartId === 'abs_obliques' ? '#4df0d0' : selectedGroupId === 'core_abs' ? '#1a3333' : '#101924'}
                      stroke="#23354a"
                    />
                    <path
                      d="M 218 176 C 210 195, 206 220, 198 232 L 200 240 C 214 230, 222 200, 224 178 Z"
                      fill={selectedSubPartId === 'abs_obliques' ? '#4df0d0' : selectedGroupId === 'core_abs' ? '#1a3333' : '#101924'}
                      stroke="#23354a"
                    />
                  </g>

                  {/* QUADS - SUBDIVIDED: Teardrop (VMO), Outer Sweep, Rectus Femoris */}
                  {/* Left Leg Quads */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'legs_quads');
                      if (grp) handleSelectGroup(grp);
                    }}
                  >
                    {/* Outer Sweep (Vastus Lateralis) */}
                    <path
                      d="M 124 256 C 114 280, 112 320, 126 360 L 138 356 C 130 320, 132 280, 140 256 Z"
                      fill={selectedSubPartId === 'quads_vastus_lateralis' ? '#4df0d0' : selectedGroupId === 'legs_quads' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.2"
                    />
                    {/* Middle Quad (Rectus Femoris) */}
                    <path
                      d="M 142 258 C 136 290, 138 330, 144 354 L 156 352 C 152 320, 150 286, 154 258 Z"
                      fill={selectedSubPartId === 'quads_rectus_femoris' ? '#4df0d0' : selectedGroupId === 'legs_quads' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.2"
                    />
                    {/* Teardrop (Vastus Medialis Oblique VMO) */}
                    <ellipse
                      cx="156"
                      cy="364"
                      rx="10"
                      ry="16"
                      fill={selectedSubPartId === 'quads_vastus_medialis' ? '#4df0d0' : selectedGroupId === 'legs_quads' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.2"
                    />
                  </g>

                  {/* Right Leg Quads */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'legs_quads');
                      if (grp) handleSelectGroup(grp);
                    }}
                  >
                    {/* Outer Sweep (Vastus Lateralis) */}
                    <path
                      d="M 216 256 C 226 280, 228 320, 214 360 L 202 356 C 210 320, 208 280, 200 256 Z"
                      fill={selectedSubPartId === 'quads_vastus_lateralis' ? '#4df0d0' : selectedGroupId === 'legs_quads' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.2"
                    />
                    {/* Middle Quad (Rectus Femoris) */}
                    <path
                      d="M 198 258 C 204 290, 202 330, 196 354 L 184 352 C 188 320, 190 286, 186 258 Z"
                      fill={selectedSubPartId === 'quads_rectus_femoris' ? '#4df0d0' : selectedGroupId === 'legs_quads' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.2"
                    />
                    {/* Teardrop (Vastus Medialis Oblique VMO) */}
                    <ellipse
                      cx="184"
                      cy="364"
                      rx="10"
                      ry="16"
                      fill={selectedSubPartId === 'quads_vastus_medialis' ? '#4df0d0' : selectedGroupId === 'legs_quads' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.2"
                    />
                  </g>

                  {/* CALVES & SHINS (Front) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'legs_posterior');
                      if (grp) handleSelectGroup(grp);
                    }}
                  >
                    <path d="M 128 400 C 122 430, 126 460, 134 490 L 148 490 C 144 450, 142 420, 144 400 Z" fill="#101824" stroke="#23354a" />
                    <path d="M 212 400 C 218 430, 214 460, 206 490 L 192 490 C 196 450, 198 420, 196 400 Z" fill="#101824" stroke="#23354a" />
                  </g>
                </g>
              ) : (
                /* =================== POSTERIOR (BACK) BODY =================== */
                <g>
                  {/* TRAPEZIUS (Diamond / Kite shape) */}
                  <path
                    d="M 170 78 L 130 110 L 152 148 L 170 162 L 188 148 L 210 110 Z"
                    fill={selectedSubPartId === 'traps_upper_mid' ? '#4df0d0' : selectedGroupId === 'back_lats' ? '#1f3c3a' : '#141e2b'}
                    stroke={selectedSubPartId === 'traps_upper_mid' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.5"
                    filter={selectedSubPartId === 'traps_upper_mid' ? 'url(#holoGlow)' : undefined}
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/60"
                    onClick={() => {
                      setSelectedGroupId('back_lats');
                      setSelectedSubPartId('traps_upper_mid');
                    }}
                  />

                  {/* REAR DELTOIDS */}
                  <ellipse
                    cx="96"
                    cy="124"
                    rx="16"
                    ry="18"
                    fill={selectedSubPartId === 'delts_rear' ? '#4df0d0' : selectedGroupId === 'shoulders' ? '#1f3c3a' : '#141e2b'}
                    stroke="#23354a"
                    strokeWidth="1.2"
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/50"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'shoulders');
                      if (grp) {
                        setSelectedGroupId('shoulders');
                        setSelectedSubPartId('delts_rear');
                      }
                    }}
                  />
                  <ellipse
                    cx="244"
                    cy="124"
                    rx="16"
                    ry="18"
                    fill={selectedSubPartId === 'delts_rear' ? '#4df0d0' : selectedGroupId === 'shoulders' ? '#1f3c3a' : '#141e2b'}
                    stroke="#23354a"
                    strokeWidth="1.2"
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/50"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'shoulders');
                      if (grp) {
                        setSelectedGroupId('shoulders');
                        setSelectedSubPartId('delts_rear');
                      }
                    }}
                  />

                  {/* TRICEPS (Lateral & Long Heads) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'arms_triceps');
                      if (grp) handleSelectGroup(grp);
                    }}
                  >
                    <path
                      d="M 80 144 C 74 166, 76 190, 84 206 C 92 195, 96 170, 94 148 Z"
                      fill={selectedGroupId === 'arms_triceps' ? '#4df0d0' : '#141e2b'}
                      stroke={selectedGroupId === 'arms_triceps' ? '#4df0d0' : '#23354a'}
                      strokeWidth="1.3"
                    />
                    <path
                      d="M 260 144 C 266 166, 264 190, 256 206 C 248 195, 244 170, 246 148 Z"
                      fill={selectedGroupId === 'arms_triceps' ? '#4df0d0' : '#141e2b'}
                      stroke={selectedGroupId === 'arms_triceps' ? '#4df0d0' : '#23354a'}
                      strokeWidth="1.3"
                    />
                  </g>

                  {/* LATS (Latissimus Dorsi - Upper V-Taper Wings) */}
                  <path
                    d="M 128 114 C 114 144, 120 178, 144 198 L 152 174 C 136 154, 134 130, 138 116 Z"
                    fill={selectedSubPartId === 'lats_upper' ? '#4df0d0' : selectedGroupId === 'back_lats' ? '#1f3c3a' : '#141e2b'}
                    stroke={selectedSubPartId === 'lats_upper' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.5"
                    filter={selectedSubPartId === 'lats_upper' ? 'url(#holoGlow)' : undefined}
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/60"
                    onClick={() => {
                      setSelectedGroupId('back_lats');
                      setSelectedSubPartId('lats_upper');
                    }}
                  />
                  <path
                    d="M 212 114 C 226 144, 220 178, 196 198 L 188 174 C 204 154, 206 130, 202 116 Z"
                    fill={selectedSubPartId === 'lats_upper' ? '#4df0d0' : selectedGroupId === 'back_lats' ? '#1f3c3a' : '#141e2b'}
                    stroke={selectedSubPartId === 'lats_upper' ? '#4df0d0' : '#23354a'}
                    strokeWidth="1.5"
                    filter={selectedSubPartId === 'lats_upper' ? 'url(#holoGlow)' : undefined}
                    className="cursor-pointer transition-all hover:fill-[#4df0d0]/60"
                    onClick={() => {
                      setSelectedGroupId('back_lats');
                      setSelectedSubPartId('lats_upper');
                    }}
                  />

                  {/* ERECTOR SPINAE (Lower Back Columns) */}
                  <rect
                    x="154"
                    y="180"
                    width="14"
                    height="50"
                    rx="5"
                    fill={selectedSubPartId === 'erector_spinae' ? '#4df0d0' : selectedGroupId === 'back_lats' ? '#1f3c3a' : '#141e2b'}
                    stroke="#23354a"
                    strokeWidth="1.2"
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedGroupId('back_lats');
                      setSelectedSubPartId('erector_spinae');
                    }}
                  />
                  <rect
                    x="172"
                    y="180"
                    width="14"
                    height="50"
                    rx="5"
                    fill={selectedSubPartId === 'erector_spinae' ? '#4df0d0' : selectedGroupId === 'back_lats' ? '#1f3c3a' : '#141e2b'}
                    stroke="#23354a"
                    strokeWidth="1.2"
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedGroupId('back_lats');
                      setSelectedSubPartId('erector_spinae');
                    }}
                  />

                  {/* GLUTES (Gluteus Maximus) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'legs_posterior');
                      if (grp) {
                        setSelectedGroupId('legs_posterior');
                        setSelectedSubPartId('glutes_maximus');
                      }
                    }}
                  >
                    <path
                      d="M 132 236 C 124 256, 126 280, 146 292 C 160 294, 168 280, 168 250 Z"
                      fill={selectedSubPartId === 'glutes_maximus' ? '#4df0d0' : selectedGroupId === 'legs_posterior' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M 208 236 C 216 256, 214 280, 194 292 C 180 294, 172 280, 172 250 Z"
                      fill={selectedSubPartId === 'glutes_maximus' ? '#4df0d0' : selectedGroupId === 'legs_posterior' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.3"
                    />
                  </g>

                  {/* HAMSTRINGS (Biceps Femoris & Semitendinosus) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'legs_posterior');
                      if (grp) {
                        setSelectedGroupId('legs_posterior');
                        setSelectedSubPartId('hams_biceps_femoris');
                      }
                    }}
                  >
                    <rect
                      x="130"
                      y="298"
                      width="34"
                      height="70"
                      rx="8"
                      fill={selectedSubPartId === 'hams_biceps_femoris' ? '#4df0d0' : selectedGroupId === 'legs_posterior' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.2"
                    />
                    <rect
                      x="176"
                      y="298"
                      width="34"
                      height="70"
                      rx="8"
                      fill={selectedSubPartId === 'hams_biceps_femoris' ? '#4df0d0' : selectedGroupId === 'legs_posterior' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.2"
                    />
                  </g>

                  {/* CALVES (Gastrocnemius Diamond Double Bellies) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      const grp = MUSCLE_GROUPS_DATA.find((g) => g.id === 'legs_posterior');
                      if (grp) {
                        setSelectedGroupId('legs_posterior');
                        setSelectedSubPartId('calves_gastro_soleus');
                      }
                    }}
                  >
                    <ellipse
                      cx="144"
                      cy="410"
                      rx="16"
                      ry="26"
                      fill={selectedSubPartId === 'calves_gastro_soleus' ? '#4df0d0' : selectedGroupId === 'legs_posterior' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.2"
                    />
                    <ellipse
                      cx="196"
                      cy="410"
                      rx="16"
                      ry="26"
                      fill={selectedSubPartId === 'calves_gastro_soleus' ? '#4df0d0' : selectedGroupId === 'legs_posterior' ? '#1f3c3a' : '#141e2b'}
                      stroke="#23354a"
                      strokeWidth="1.2"
                    />
                  </g>
                </g>
              )}
            </svg>
          </div>

          {/* Quick Major Muscle Selector Ribbon */}
          <div className="mt-4 pt-3 border-t border-[#1a2533]">
            <div className="text-[11px] font-mono uppercase text-[#8593a5] mb-2 flex items-center justify-between">
              <span>Select Anatomical Region:</span>
              <span className="text-[#4df0d0] font-semibold">{currentGroup.displayName}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {MUSCLE_GROUPS_DATA.map((grp) => {
                const isSelected = selectedGroupId === grp.id;
                return (
                  <button
                    key={grp.id}
                    onClick={() => handleSelectGroup(grp)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-mono truncate transition-all ${
                      isSelected
                        ? 'bg-[#4df0d0]/20 text-[#4df0d0] border border-[#4df0d0]/50 font-bold'
                        : 'bg-[#0d131a] text-[#8593a5] hover:text-white border border-[#1a2533]'
                    }`}
                  >
                    {grp.displayName.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Sub-Division Anatomy & Exercise Panel (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0d1218] border border-[#1d2835] rounded-2xl p-6 shadow-xl space-y-6">
          {/* Header of selected muscle */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4df0d0]">
                {currentGroup.region} · {currentGroup.displayName}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#121c24] text-[#8593a5] border border-[#1d2835]">
                  Optimal: {currentGroup.weeklyOptimalSets}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#121c24] text-[#8593a5] border border-[#1d2835]">
                  Recovery: {currentGroup.recoveryWindow}
                </span>
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-['Big_Shoulders_Display'] font-extrabold uppercase text-white tracking-wide">
              {currentSubPart.name}
            </h3>
            <p className="text-xs font-mono text-[#4df0d0]/80 italic mt-0.5">
              {currentSubPart.scientificName}
            </p>
            <p className="text-sm text-[#8593a5] mt-2">
              <strong className="text-[#e9eef5]">Biomechanical Action:</strong> {currentSubPart.action}
            </p>
          </div>

          {/* Sub-Part Selector Tabs */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#8593a5] mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#4df0d0]" />
              Select Specific Head / Division:
            </div>
            <div className="flex flex-wrap gap-2">
              {currentGroup.subParts.map((sub) => {
                const isSubSelected = selectedSubPartId === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubPartId(sub.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all uppercase tracking-wider ${
                      isSubSelected
                        ? 'bg-[#4df0d0] text-[#04120f] font-bold shadow-[0_0_12px_rgba(77,240,208,0.3)]'
                        : 'bg-[#121a23] text-[#8593a5] hover:text-white border border-[#1d2835]'
                    }`}
                  >
                    {sub.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#1d2835]">
            <div className="flex items-center gap-1 text-xs font-mono text-[#8593a5]">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </div>

            <select
              value={filterEquipment}
              onChange={(e) => setFilterEquipment(e.target.value)}
              className="bg-[#06080c] text-xs font-mono border border-[#1d2835] rounded-lg px-2.5 py-1 text-[#e9eef5] focus:outline-none focus:border-[#4df0d0]"
            >
              <option value="all">All Equipment</option>
              <option value="barbell">Barbell</option>
              <option value="dumbbell">Dumbbell</option>
              <option value="cable">Cable</option>
              <option value="machine">Machine</option>
              <option value="bodyweight">Bodyweight</option>
            </select>

            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="bg-[#06080c] text-xs font-mono border border-[#1d2835] rounded-lg px-2.5 py-1 text-[#e9eef5] focus:outline-none focus:border-[#4df0d0]"
            >
              <option value="all">All Experience Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Exercises List */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#8593a5] flex items-center justify-between">
              <span>Targeted Biomechanical Movements ({filteredExercises.length})</span>
              <span className="text-[10px] text-[#4df0d0]">Engineered for Hypertrophy</span>
            </div>

            {filteredExercises.length > 0 ? (
              filteredExercises.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#090d12] border border-[#1a2533] hover:border-[#4df0d0]/50 transition-all space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white group-hover:text-[#4df0d0] transition-colors">
                          {ex.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#162330] text-[#4df0d0] border border-[#23354a]">
                          {ex.reps}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-[#8593a5]">
                          {ex.equipment}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-[#8593a5]">
                          {ex.level}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#4df0d0]/10 text-[#4df0d0]">
                          {ex.hypertrophyFocus}
                        </span>
                      </div>
                    </div>

                    {onSelectExerciseForLog && (
                      <button
                        onClick={() => onSelectExerciseForLog(ex.name)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/10 hover:bg-[#4df0d0] hover:text-[#04120f] text-white transition-colors flex items-center gap-1 whitespace-nowrap"
                        title="Add to Workout Logger"
                      >
                        <Zap className="w-3 h-3" />
                        Log Lift
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-[#8593a5] bg-[#06080c] p-2.5 rounded-lg border border-[#141d27]">
                    <strong className="text-[#4df0d0] font-mono">Biomechanical Cue:</strong> {ex.biomechanicalCue}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center border border-dashed border-[#1d2835] rounded-xl text-[#8593a5] text-xs font-mono">
                No exercises match current filter criteria. Reset filters to view full exercise database.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
