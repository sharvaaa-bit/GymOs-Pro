import { SportsProgram } from '../types/index.ts';

export const SPORTS_PROGRAMS_DATA: SportsProgram[] = [
  {
    id: 'hyrox',
    sport: 'Hyrox',
    category: 'Functional Fitness',
    weeklyCadence: '4 Days/Week (2 Running + 2 Compromised Running Stations)',
    keyPhases: [
      {
        phase: 'Base Aerobic & Sled Power (Weeks 1-4)',
        goal: 'Build lactate threshold running under leg fatigue',
        sampleSession: {
          title: 'Compromised Running Simulation',
          exercises: [
            '1,000m Zone 3 Pace Run',
            '1,000m SkiErg damper 6 @ 2:05 pace',
            '50m Heavy Sled Push (152kg incl. sled)',
            '1,000m Zone 3 Pace Run',
            '50m Heavy Sled Pull (103kg rope drag)',
            '80m Burpee Broad Jumps (low hip turnover)',
          ],
          energySystem: 'Aerobic Glycolytic & Neuromuscular Endurance',
          recommendedRest: 'Continuous pacing or 60s transitions',
        },
      },
      {
        phase: 'Station Efficiency & Grip Stamina (Weeks 5-8)',
        goal: 'Master Sandbag Lunges and 100 Wall Ball rhythm without blowing up heart rate',
        sampleSession: {
          title: 'The Final Stations Crucible',
          exercises: [
            '1,000m Row (sub-4:00 target)',
            '200m Farmers Carry (2×24kg kettlebells)',
            '100m Sandbag Lunges (20kg bag over shoulder)',
            '100 Wall Balls (6kg to 9ft target)',
          ],
          energySystem: 'Mixed Oxidative / Anaerobic Lactic',
          recommendedRest: 'Strict 45s between station blocks',
        },
      },
    ],
  },
  {
    id: 'crossfit',
    sport: 'CrossFit',
    category: 'Functional Fitness',
    weeklyCadence: '5 Days/Week (Strength skill + MetCon WOD)',
    keyPhases: [
      {
        phase: 'Olympic Weightlifting & Gymnastic Density',
        goal: 'Snatch cycling, bar muscle-ups, and high-cadence box jumps',
        sampleSession: {
          title: 'Benchmark MetCon: The Hero WOD Hybrid',
          exercises: [
            'For Time (Cap 20 mins):',
            '21 - 15 - 9 Thrusters (43kg barbell)',
            '21 - 15 - 9 Chest-to-Bar Pull-Ups',
            'Directly into 500m Row sprint',
            '40 Handstand Push-Ups',
            '30 Box Jump Overs (24 inch)',
          ],
          energySystem: 'Phosphagen & Fast Glycolysis',
          recommendedRest: 'Minimal required to sustain 90% peak output',
        },
      },
    ],
  },
  {
    id: 'ironman',
    sport: 'Ironman Triathlon',
    category: 'Endurance',
    weeklyCadence: '6 Days/Week (Swim 2d, Bike 3d, Run 3d + 2 Strength Stability sessions)',
    keyPhases: [
      {
        phase: 'Zone 2 Base & Brick Transitions',
        goal: 'Fat oxidation efficiency and handling bike-to-run leg heaviness',
        sampleSession: {
          title: 'Ironman Weekend Brick Protocol',
          exercises: [
            '3.8km Open Water Swim simulation (Intervals: 8×400m CSS pace)',
            '90km Aero Time-Trial Bike (70-75% FTP, 85-90 RPM cadence)',
            'Direct 10km Transition Run off the bike (Negative split)',
            'Post-ride core anti-flexion: 4×60s Copenhagen Planks',
          ],
          energySystem: 'Pure Mitochondrial Aerobic Lipolysis',
          recommendedRest: 'Zone 2 continuous pacing (BPM 130-145)',
        },
      },
    ],
  },
  {
    id: 'marathon',
    sport: 'Marathon',
    category: 'Endurance',
    weeklyCadence: '5 Days/Week (1 Long Run, 1 Tempo, 1 Track Intervals, 2 Recovery)',
    keyPhases: [
      {
        phase: 'VO2 Max & Lactate Shuttling',
        goal: 'Push lactate clearance threshold to allow sub-3:30 / 3:00 pace without bonking',
        sampleSession: {
          title: 'Yasso 800s & Marathon Pace Sustained Run',
          exercises: [
            '2km Dynamic warm-up & A-skips',
            '8×800m Repeats at 10k pace (Equal recovery jog)',
            '6km Continuous Marathon Race Pace (MRP) tempo',
            'Posterior chain gym accessory: 3×8 Barbell RDLs + Soleus raises',
          ],
          energySystem: 'Aerobic Power & Muscle Tendon Stiffness',
          recommendedRest: '2:30 active jog between 800m repeats',
        },
      },
    ],
  },
  {
    id: 'boxing_kickboxing',
    sport: 'Boxing / Kickboxing',
    category: 'Combat Sports',
    weeklyCadence: '5 Days/Week (Sparring, Padwork, Roadwork, Rotational Power Gym)',
    keyPhases: [
      {
        phase: 'Rotational Kinetic Chain & Neck Armor',
        goal: 'Transfer force from rear foot through hips to fist/shin while preventing concussive whiplash',
        sampleSession: {
          title: 'Fighter Conditioning & Power Output',
          exercises: [
            '6 Rounds × 3 Minutes Heavy Bag (Jab-Cross-Hook-Slip combinations with 100% hip pivot)',
            '4×8 Landmine Rotational Punch Presses (explosive hip snap)',
            '4×12 Medicine Ball Rotational Side Slams into concrete wall',
            '3×15 4-Way Neck Harness flexion/extension for concussion resilience',
            '5×100 Double-Under Jump Ropes for ankle stiffness',
          ],
          energySystem: 'Anaerobic Alactic bursts + Aerobic recovery',
          recommendedRest: '60s between 3-minute championship rounds',
        },
      },
    ],
  },
  {
    id: 'cricket',
    sport: 'Cricket',
    category: 'Field Athletics',
    weeklyCadence: '4 Days/Week (Fast Bowling Shoulder / Batsman Core & Sprint Agility)',
    keyPhases: [
      {
        phase: 'Bowling Velocity & Rotational Core Torque',
        goal: 'Prevent lumbar stress fractures in fast bowlers; build wrist snap and lateral boundary speed',
        sampleSession: {
          title: 'Pace Bowler & Power Hitter Protocol',
          exercises: [
            '4×6 Trap Bar Deadlift Jumps (Explosive triple extension for bowling run-up plant)',
            '3×10 Half-Kneeling Cable Chops (Contralateral abdominal bracing)',
            '3×15 Rotator Cuff Sleeper Stretches & Y-T-W raises',
            '6×30m 17-Second 22-Yard Pitch Sprint Shuttles (Pad running simulation)',
            '3×10 Heavy Sledgehammer Tyre Slams',
          ],
          energySystem: 'ATP-CP Sprint system & Eccentric deceleration',
          recommendedRest: '90s between heavy jump sets; 45s sprint interval',
        },
      },
    ],
  },
  {
    id: 'football',
    sport: 'Football (Soccer)',
    category: 'Field Athletics',
    weeklyCadence: '5 Days/Week (RSA Repeated Sprint Ability, Change of Direction, Hamstring Armor)',
    keyPhases: [
      {
        phase: '90-Minute Match Stamina & Groin / ACL Injury Prevention',
        goal: 'Nordic curls for eccentric hamstring protection and 3D cutting agility',
        sampleSession: {
          title: 'Match-Day Physicality & High-Speed Running',
          exercises: [
            '4×6 Nordic Hamstring Curls (Slow 4-second eccentric lowering to ground)',
            '4×8 Single-Leg Lateral Bounding with 1s stick landing (ACL stabilization)',
            '10×40m High-Speed Sprints (sub-5.2s) with 180° change of direction',
            '3×12 Adductor Copenhagen Planks on bench (Groin strain shield)',
            '4×10 Barbell Bulgarian Split Squats (Equalizing quad balance)',
          ],
          energySystem: 'Repeated Sprint Ability (RSA) & Aerobic High-End',
          recommendedRest: '30s on sprints; 90s on unilateral strength lifts',
        },
      },
    ],
  },
];
