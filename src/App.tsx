import React, { useState, useEffect } from 'react';
import { ViewMode, BiometricTelemetry } from './types/index.ts';
import { Header } from './components/Header.tsx';
import { WristbandModal } from './components/WristbandModal.tsx';
import { DashboardHUD } from './components/DashboardHUD.tsx';
import { ThreeDMuscleScanner } from './components/ThreeDMuscleScanner.tsx';
import { CinematicMuscleAtlas } from './components/CinematicMuscleAtlas.tsx';
import { AIMotionTracker } from './components/AIMotionTracker.tsx';
import { AIGeminiCoach } from './components/AIGeminiCoach.tsx';
import { AIMealScanner } from './components/AIMealScanner.tsx';
import { CustomDietPlanner } from './components/CustomDietPlanner.tsx';
import { WorkoutLoggerWithRest } from './components/WorkoutLoggerWithRest.tsx';
import { WorkoutSonicPacer } from './components/WorkoutSonicPacer.tsx';
import { PostWorkoutPainDoctor } from './components/PostWorkoutPainDoctor.tsx';
import { SleepTracker } from './components/SleepTracker.tsx';
import { HomeWorkoutsModule } from './components/HomeWorkoutsModule.tsx';
import { CardioLiftingFlowchart } from './components/CardioLiftingFlowchart.tsx';
import { SportsAndCrossfitHub } from './components/SportsAndCrossfitHub.tsx';
import { GymOpsERP } from './components/GymOpsERP.tsx';
import { IdeasAndFutureRoadmap } from './components/IdeasAndFutureRoadmap.tsx';
import { AIWorkoutGeneratorModal } from './components/AIWorkoutGeneratorModal.tsx';

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>('dashboard');
  const [isWristbandModalOpen, setIsWristbandModalOpen] = useState<boolean>(false);
  const [isWorkoutGenModalOpen, setIsWorkoutGenModalOpen] = useState<boolean>(false);
  const [preselectedExercise, setPreselectedExercise] = useState<string | undefined>(undefined);

  // Live Wristband Telemetry
  const [telemetry, setTelemetry] = useState<BiometricTelemetry>({
    isBandWorn: true,
    batteryPercent: 88,
    heartRate: 128,
    restingHr: 54,
    hrv: 68,
    spo2: 99,
    skinTemp: 33.4,
    hrZone: 'Zone 3 (Tempo)',
    hrHistory: [118, 122, 125, 124, 128, 130, 129, 132, 128, 135, 127, 129, 131, 128, 133],
  });

  // Background PPG Optical Telemetry Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((prev) => {
        if (!prev.isBandWorn) {
          return {
            ...prev,
            heartRate: 0,
            hrZone: 'Zone 1 (Active Recovery)',
          };
        }

        // Natural pulse fluctuation
        const delta = Math.floor(Math.random() * 5) - 2;
        const newBpm = Math.max(110, Math.min(155, prev.heartRate + delta));

        let zone: BiometricTelemetry['hrZone'] = 'Zone 3 (Tempo)';
        if (newBpm < 115) zone = 'Zone 1 (Active Recovery)';
        else if (newBpm < 125) zone = 'Zone 2 (Aerobic Base)';
        else if (newBpm < 140) zone = 'Zone 3 (Tempo)';
        else if (newBpm < 150) zone = 'Zone 4 (Threshold)';
        else zone = 'Zone 5 (Peak Anaerobic)';

        const newHistory = [...prev.hrHistory.slice(-24), newBpm];

        return {
          ...prev,
          heartRate: newBpm,
          hrZone: zone,
          hrHistory: newHistory,
        };
      });
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  const handleToggleBand = () => {
    setTelemetry((prev) => ({
      ...prev,
      isBandWorn: !prev.isBandWorn,
      heartRate: !prev.isBandWorn ? 126 : 0,
    }));
  };

  const handleSelectExerciseFromAtlas = (exerciseName: string) => {
    setPreselectedExercise(exerciseName);
    setActiveView('workout_logger');
  };

  return (
    <div className="min-h-screen bg-[#06080c] text-[#e9eef5] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Cinematic Top Navigation Header */}
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        telemetry={telemetry}
        onOpenWristbandModal={() => setIsWristbandModalOpen(true)}
        onOpenWorkoutGenModal={() => setIsWorkoutGenModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeView === 'dashboard' && (
          <DashboardHUD
            telemetry={telemetry}
            onSelectView={setActiveView}
            onOpenWristbandModal={() => setIsWristbandModalOpen(true)}
            onOpenWorkoutGenModal={() => setIsWorkoutGenModalOpen(true)}
          />
        )}

        {activeView === 'three_d_scanner' && (
          <ThreeDMuscleScanner
            onSelectMusclePart={(part) => {
              setActiveView('atlas');
            }}
          />
        )}

        {activeView === 'atlas' && (
          <CinematicMuscleAtlas onSelectExerciseForLog={handleSelectExerciseFromAtlas} />
        )}

        {activeView === 'motion_tracker' && <AIMotionTracker />}

        {activeView === 'ai_coach' && <AIGeminiCoach telemetry={telemetry} />}

        {activeView === 'meal_scanner' && <AIMealScanner />}

        {activeView === 'custom_diet' && <CustomDietPlanner />}

        {activeView === 'workout_logger' && (
          <WorkoutLoggerWithRest
            preselectedExercise={preselectedExercise}
            onOpenWorkoutGenModal={() => setIsWorkoutGenModalOpen(true)}
          />
        )}

        {activeView === 'sonic_pacer' && <WorkoutSonicPacer />}

        {activeView === 'pain_doctor' && <PostWorkoutPainDoctor />}

        {activeView === 'sleep_tracker' && <SleepTracker />}

        {activeView === 'home_workouts' && <HomeWorkoutsModule />}

        {activeView === 'cardio_flowchart' && <CardioLiftingFlowchart />}

        {activeView === 'sports_crossfit' && <SportsAndCrossfitHub />}

        {activeView === 'gym_ops' && <GymOpsERP />}

        {activeView === 'ideas_roadmap' && <IdeasAndFutureRoadmap />}
      </main>

      {/* Futuristic Ambient Footer */}
      <footer className="border-t border-[#1d2835] py-8 bg-[#040609] text-xs font-mono text-[#8593a5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4df0d0]" />
            <span>GYMOS PRO 2.0 // HIGH-END LUXURY FITNESS & CLUB OS</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('ai_coach')}
              className="hover:text-[#4df0d0] transition-colors"
            >
              Gemini AI Coach
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveView('three_d_scanner')}
              className="hover:text-[#4df0d0] transition-colors"
            >
              Three.js 3D Mannequin
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveView('sonic_pacer')}
              className="hover:text-[#4df0d0] transition-colors"
            >
              Sonic Audio Pacer
            </button>
          </div>
        </div>
      </footer>

      {/* Smart Wristband Pairing & Telemetry Modal */}
      <WristbandModal
        isOpen={isWristbandModalOpen}
        onClose={() => setIsWristbandModalOpen(false)}
        telemetry={telemetry}
        onToggleBand={handleToggleBand}
      />

      {/* AI Periodized Workout Generator Modal */}
      <AIWorkoutGeneratorModal
        isOpen={isWorkoutGenModalOpen}
        onClose={() => setIsWorkoutGenModalOpen(false)}
        onLoadExerciseToLogger={(exercise, cat) => {
          setPreselectedExercise(exercise);
          setActiveView('workout_logger');
        }}
      />
    </div>
  );
}
