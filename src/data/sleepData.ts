export interface SleepNightRecord {
  date: string;
  sleepScore: number;
  totalDurationMinutes: number;
  deepSleepMinutes: number;
  remSleepMinutes: number;
  lightSleepMinutes: number;
  awakeMinutes: number;
  restingHrDuringSleep: number;
  recoveryCapacityScore: number; // 0 - 100
  readinessVerdict: string;
  recommendedTrainingFocus: string;
  circadianBedtime: string;
  circadianWakeup: string;
}

export const SLEEP_HISTORY_DATA: SleepNightRecord[] = [
  {
    date: 'Mon, Nov 9',
    sleepScore: 89,
    totalDurationMinutes: 468, // 7h 48m
    deepSleepMinutes: 104, // 1h 44m
    remSleepMinutes: 112, // 1h 52m
    lightSleepMinutes: 228,
    awakeMinutes: 24,
    restingHrDuringSleep: 52,
    recoveryCapacityScore: 92,
    readinessVerdict: 'Optimal High Recovery - High CNS Readiness',
    recommendedTrainingFocus: 'Prime condition for Heavy Compounds (Squat/Deadlift RPE 8-9) or high-intensity interval sprints.',
    circadianBedtime: '10:45 PM',
    circadianWakeup: '06:33 AM',
  },
  {
    date: 'Sun, Nov 8',
    sleepScore: 76,
    totalDurationMinutes: 412, // 6h 52m
    deepSleepMinutes: 72,
    remSleepMinutes: 88,
    lightSleepMinutes: 218,
    awakeMinutes: 34,
    restingHrDuringSleep: 56,
    recoveryCapacityScore: 78,
    readinessVerdict: 'Moderate Recovery - Adequate Physical Tone',
    recommendedTrainingFocus: 'Hypertrophy volume sessions (8-12 reps) or steady-state Zone 2 cardio.',
    circadianBedtime: '11:15 PM',
    circadianWakeup: '06:07 AM',
  },
  {
    date: 'Sat, Nov 7',
    sleepScore: 94,
    totalDurationMinutes: 512, // 8h 32m
    deepSleepMinutes: 128,
    remSleepMinutes: 135,
    lightSleepMinutes: 234,
    awakeMinutes: 15,
    restingHrDuringSleep: 49,
    recoveryCapacityScore: 97,
    readinessVerdict: 'Peak Supercompensation - Max Power Output',
    recommendedTrainingFocus: 'New PR Attempt Day (1RM or 5RM test) or explosive athletic power training.',
    circadianBedtime: '10:30 PM',
    circadianWakeup: '07:02 AM',
  },
  {
    date: 'Fri, Nov 6',
    sleepScore: 68,
    totalDurationMinutes: 360, // 6h 00m
    deepSleepMinutes: 52,
    remSleepMinutes: 65,
    lightSleepMinutes: 205,
    awakeMinutes: 38,
    restingHrDuringSleep: 61,
    recoveryCapacityScore: 64,
    readinessVerdict: 'Elevated Sympathetic Tone - Mild Fatigue',
    recommendedTrainingFocus: 'Active recovery, light mobility, gentle stretching, or technique deload.',
    circadianBedtime: '11:45 PM',
    circadianWakeup: '05:45 AM',
  },
];
