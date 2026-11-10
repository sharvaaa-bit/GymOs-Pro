import React, { useState, useEffect } from 'react';
import {
  estimate1RM,
  getRecommendedRestSeconds,
  calculateBarbellPlates,
} from '../utils/fitnessMath.ts';
import {
  Dumbbell,
  Timer,
  Play,
  Pause,
  Plus,
  Trash2,
  Trophy,
  Zap,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface WorkoutSet {
  id: string;
  exercise: string;
  category: 'compound_strength' | 'hypertrophy' | 'isolation' | 'crossfit_hiit';
  loadKg: number;
  reps: number;
  rpe: number;
  estimated1RM: number;
}

interface Props {
  preselectedExercise?: string;
  onOpenWorkoutGenModal?: () => void;
}

export const WorkoutLoggerWithRest: React.FC<Props> = ({
  preselectedExercise,
  onOpenWorkoutGenModal,
}) => {
  const [exercise, setExercise] = useState<string>(preselectedExercise || 'Barbell Flat Bench Press');
  const [category, setCategory] = useState<'compound_strength' | 'hypertrophy' | 'isolation' | 'crossfit_hiit'>('compound_strength');
  const [loadKg, setLoadKg] = useState<number>(80);
  const [reps, setReps] = useState<number>(8);
  const [rpe, setRpe] = useState<number>(8);

  const [sets, setSets] = useState<WorkoutSet[]>([
    { id: '1', exercise: 'Barbell Flat Bench Press', category: 'compound_strength', loadKg: 80, reps: 8, rpe: 8, estimated1RM: 101.3 },
    { id: '2', exercise: 'Barbell Flat Bench Press', category: 'compound_strength', loadKg: 82.5, reps: 7, rpe: 8.5, estimated1RM: 101.8 },
  ]);

  // Adaptive Rest Timer State
  const [restSecondsLeft, setRestSecondsLeft] = useState<number>(0);
  const [restTotalSeconds, setRestTotalSeconds] = useState<number>(180);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Sync category with exercise
  useEffect(() => {
    if (preselectedExercise) {
      setExercise(preselectedExercise);
    }
  }, [preselectedExercise]);

  useEffect(() => {
    const defaultSecs = getRecommendedRestSeconds(category);
    setRestTotalSeconds(defaultSecs);
  }, [category]);

  // Rest Timer Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && restSecondsLeft > 0) {
      interval = setInterval(() => {
        setRestSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, restSecondsLeft]);

  const handleAddSet = () => {
    const est = estimate1RM(loadKg, reps);
    const newSet: WorkoutSet = {
      id: Date.now().toString(),
      exercise,
      category,
      loadKg,
      reps,
      rpe,
      estimated1RM: est.average,
    };
    setSets([...sets, newSet]);

    // Automatically trigger adaptive rest timer for the completed set!
    const restTime = getRecommendedRestSeconds(category);
    setRestTotalSeconds(restTime);
    setRestSecondsLeft(restTime);
    setIsTimerRunning(true);
  };

  const handleRemoveSet = (id: string) => {
    setSets(sets.filter((s) => s.id !== id));
  };

  const currentEst1RM = estimate1RM(loadKg, reps).average;
  const plateBreakdown = calculateBarbellPlates(loadKg, 20);

  // Format timer minutes:seconds
  const formatTimer = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const timerPercent =
    restTotalSeconds > 0 ? ((restTotalSeconds - restSecondsLeft) / restTotalSeconds) * 100 : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#4df0d0] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4df0d0] animate-ping" />
            Module 04 · Workout Logger & Adaptive Inter-Set Rest System
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            Log Sets & Overload Matrix
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Logs load, reps, and RPE. Features exercise-specific adaptive rest timers (3m for heavy compounds vs 90s for hypertrophy vs 60s for isolation) and Olympic plate loading calculations.
          </p>
        </div>

        {onOpenWorkoutGenModal && (
          <button
            onClick={onOpenWorkoutGenModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4df0d0]/20 to-[#5a8cff]/20 hover:from-[#4df0d0]/30 hover:to-[#5a8cff]/30 text-white border border-[#4df0d0]/40 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 text-[#4df0d0]" />
            Generate AI Routine
          </button>
        )}
      </div>

      {/* Main Grid: Form Logger (7 Cols) + Adaptive Rest Timer & Plates (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Logger Input & History (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0d1218] border border-[#1d2835] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1d2835]">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-[#4df0d0]" />
              <h3 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white tracking-wide">
                Add Working Set
              </h3>
            </div>
            <span className="text-xs font-mono text-[#8593a5]">
              Estimated 1RM: <strong className="text-[#4df0d0]">{currentEst1RM} kg</strong>
            </span>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#8593a5] mb-1.5">
                Exercise Name
              </label>
              <input
                type="text"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full bg-[#06080c] text-sm font-medium border border-[#1d2835] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#4df0d0]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#8593a5] mb-1.5">
                Workout Category (Affects Rest Time)
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as 'compound_strength' | 'hypertrophy' | 'isolation' | 'crossfit_hiit')
                }
                className="w-full bg-[#06080c] text-xs font-mono border border-[#1d2835] rounded-xl px-3 py-2 text-[#4df0d0] font-bold focus:outline-none focus:border-[#4df0d0]"
              >
                <option value="compound_strength">Heavy Compound Strength (180s Rest)</option>
                <option value="hypertrophy">Hypertrophy Tension (90s Rest)</option>
                <option value="isolation">Isolation Arm/Delt (60s Rest)</option>
                <option value="crossfit_hiit">CrossFit / MetCon (35s Rest)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#8593a5] mb-1.5">
                Load (kg)
              </label>
              <input
                type="number"
                step="2.5"
                min="0"
                value={loadKg}
                onChange={(e) => setLoadKg(Number(e.target.value))}
                className="w-full bg-[#06080c] text-sm font-mono font-bold border border-[#1d2835] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#4df0d0]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#8593a5] mb-1.5">
                Reps & RPE
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  placeholder="Reps"
                  className="w-1/2 bg-[#06080c] text-sm font-mono font-bold border border-[#1d2835] rounded-xl px-3 py-2 text-white"
                />
                <select
                  value={rpe}
                  onChange={(e) => setRpe(Number(e.target.value))}
                  className="w-1/2 bg-[#06080c] text-xs font-mono border border-[#1d2835] rounded-xl px-2 py-2 text-[#8593a5]"
                >
                  <option value={7}>RPE 7 (3 RIR)</option>
                  <option value={8}>RPE 8 (2 RIR)</option>
                  <option value={9}>RPE 9 (1 RIR)</option>
                  <option value={10}>RPE 10 (Failure)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddSet}
            className="w-full py-3 rounded-xl bg-[#4df0d0] hover:bg-[#4df0d0]/90 text-[#04120f] font-mono font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Complete Set & Trigger {getRecommendedRestSeconds(category)}s Rest Timer
          </button>

          {/* Today's Sets Table */}
          <div className="space-y-3 pt-3 border-t border-[#1d2835]">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
              <span>Today&apos;s Completed Sets ({sets.length})</span>
              <span>Total Volume: {sets.reduce((sum, s) => sum + s.loadKg * s.reps, 0)} kg</span>
            </div>

            {sets.length > 0 ? (
              <div className="space-y-2">
                {sets.map((s, idx) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#070a0e] border border-[#16202c] text-xs font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-[#14202c] flex items-center justify-center font-bold text-[#4df0d0]">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-white">{s.exercise}</div>
                        <div className="text-[10px] text-[#8593a5] mt-0.5">
                          {s.category.replace('_', ' ').toUpperCase()} · RPE {s.rpe}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-white">
                          {s.loadKg} kg × {s.reps} reps
                        </div>
                        <div className="text-[10px] text-[#4df0d0]">
                          1RM: {s.estimated1RM} kg
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveSet(s.id)}
                        className="p-1 rounded text-[#8593a5] hover:text-rose-400 transition-colors"
                        title="Delete set"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs font-mono text-[#8593a5] border border-dashed border-[#1d2835] rounded-xl">
                No sets logged yet. Complete your first set above!
              </div>
            )}
          </div>
        </div>

        {/* Adaptive Rest Timer & Barbell Plate Calculator (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Rest Timer Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#101722] to-[#0a0e14] border border-[#1d2835] shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-[#4df0d0]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#8593a5]">
                  Adaptive Rest Timer
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4df0d0]/10 text-[#4df0d0]">
                {category.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* Countdown Dial */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-6xl font-['Big_Shoulders_Display'] font-black tracking-tight text-white font-mono">
                {formatTimer(restSecondsLeft)}
              </div>
              <div className="text-xs font-mono text-[#8593a5] mt-1">
                {restSecondsLeft > 0 ? (
                  isTimerRunning ? 'Resting · ATP-CP Recovery Active' : 'Timer Paused'
                ) : (
                  <span className="text-[#4df0d0] font-bold">Ready For Next Set!</span>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-[#162330] mt-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1aa890] to-[#4df0d0] transition-all duration-1000"
                  style={{ width: `${timerPercent}%` }}
                />
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-[#1a2533]">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-4 py-2 rounded-xl bg-[#4df0d0] text-[#04120f] font-mono text-xs font-bold uppercase flex items-center gap-1.5 transition-all hover:brightness-110"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isTimerRunning ? 'Pause' : 'Start Timer'}
              </button>

              <button
                onClick={() => setRestSecondsLeft(restSecondsLeft + 30)}
                className="px-3 py-2 rounded-xl bg-[#14202c] hover:bg-[#1a2a3b] text-white font-mono text-xs transition-colors"
              >
                +30s
              </button>

              <button
                onClick={() => {
                  setRestSecondsLeft(restTotalSeconds);
                  setIsTimerRunning(true);
                }}
                className="p-2 rounded-xl bg-[#14202c] hover:bg-[#1a2a3b] text-[#8593a5] hover:text-white transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Olympic Barbell Plate Calculator Card */}
          <div className="p-5 rounded-2xl bg-[#0d1218] border border-[#1d2835] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8593a5]">
                Barbell Plate Breakdown ({loadKg} kg)
              </span>
              <span className="text-[10px] font-mono text-[#4df0d0]">20kg Olympic Bar</span>
            </div>

            {loadKg > 20 ? (
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#8593a5]">
                  Load on <strong>EACH SIDE</strong> of the bar ({ (loadKg - 20) / 2 } kg per side):
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {Object.entries(plateBreakdown).map(([plate, count]) => (
                    <div
                      key={plate}
                      className="px-3 py-2 rounded-xl bg-[#070a0e] border border-[#23354a] flex items-center gap-2"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#4df0d0]/20 text-[#4df0d0] border border-[#4df0d0]/40 flex items-center justify-center font-mono text-xs font-bold">
                        {count}×
                      </div>
                      <span className="text-xs font-mono text-white font-semibold">{plate}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-xs font-mono text-[#8593a5] p-3 rounded-lg bg-[#070a0e]">
                Load is equal to or less than the empty 20kg barbell. No plates needed.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
