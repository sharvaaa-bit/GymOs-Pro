import React, { useState } from 'react';
import { SPORTS_PROGRAMS_DATA } from '../data/sportsData.ts';
import { SportsProgram } from '../types/index.ts';
import {
  Trophy,
  Flame,
  Activity,
  Timer,
  Zap,
  Target,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const SportsAndCrossfitHub: React.FC = () => {
  const [selectedSportId, setSelectedSportId] = useState<string>('hyrox');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const currentSport: SportsProgram =
    SPORTS_PROGRAMS_DATA.find((s) => s.id === selectedSportId) || SPORTS_PROGRAMS_DATA[0];

  const categories = ['all', 'Functional Fitness', 'Endurance', 'Combat Sports', 'Field Athletics'];

  const filteredSports = SPORTS_PROGRAMS_DATA.filter(
    (s) => filterCategory === 'all' || s.category === filterCategory
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-amber-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Module 09 · Multi-Sport Athletic & CrossFit Conditioning
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            Elite Sports Performance Hub
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Conditioning protocols engineered specifically for Hyrox, CrossFit WODs, Ironman Triathlons, Marathons, Boxing/Kickboxing, Cricket bowling & batting, and Football agility.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#0d1218] border border-[#1d2835]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                filterCategory === cat
                  ? 'bg-amber-400 text-[#04120f] font-bold shadow-md'
                  : 'text-[#8593a5] hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Disciplines' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sport Selector Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {filteredSports.map((sport) => {
          const isSelected = selectedSportId === sport.id;
          return (
            <button
              key={sport.id}
              onClick={() => setSelectedSportId(sport.id)}
              className={`p-3 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-amber-400/20 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                  : 'bg-[#0d1218] border-[#1d2835] hover:border-[#2a3c50]'
              }`}
            >
              <div
                className={`text-xs font-mono uppercase font-bold truncate ${
                  isSelected ? 'text-amber-400' : 'text-white'
                }`}
              >
                {sport.sport}
              </div>
              <div className="text-[10px] font-mono text-[#8593a5] truncate mt-0.5">
                {sport.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Sport Deep-Dive Details */}
      <div className="p-6 rounded-2xl bg-[#0b1016] border border-[#1d2835] shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#182330] pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              {currentSport.category} Conditioning Protocol
            </div>
            <h3 className="text-3xl font-['Big_Shoulders_Display'] font-black uppercase text-white tracking-wide">
              {currentSport.sport}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-xl bg-[#121a24] text-[#8593a5] border border-[#1f2d3d]">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Weekly Frequency: <strong className="text-white">{currentSport.weeklyCadence}</strong></span>
          </div>
        </div>

        {/* Training Phases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {currentSport.keyPhases.map((phase, pIdx) => (
            <div
              key={pIdx}
              className="p-5 rounded-xl bg-[#070a0e] border border-[#16202c] hover:border-amber-400/40 transition-all space-y-4"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  Phase {pIdx + 1}
                </span>
                <h4 className="text-lg font-bold text-white font-mono uppercase">
                  {phase.phase}
                </h4>
                <p className="text-xs text-[#8593a5] mt-1">{phase.goal}</p>
              </div>

              {/* Sample Session Box */}
              <div className="p-4 rounded-xl bg-[#0b1016] border border-[#1d2835] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white uppercase flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-amber-400" />
                    {phase.sampleSession.title}
                  </span>
                  <span className="text-[10px] text-[#4df0d0]">
                    {phase.sampleSession.energySystem}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs font-mono text-[#8593a5] pt-1">
                  {phase.sampleSession.exercises.map((ex, eIdx) => (
                    <li key={eIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span className="text-[#e9eef5]">{ex}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-[#16202c] flex items-center gap-1.5 text-[11px] font-mono text-[#8593a5]">
                  <Timer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Target Rest: <strong className="text-white">{phase.sampleSession.recommendedRest}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
