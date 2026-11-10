import React, { useState } from 'react';
import { AttendanceRecord } from '../types/index.ts';
import {
  Building2,
  Users,
  CheckCircle2,
  QrCode,
  Radio,
  Clock,
  Sparkles,
  MessageSquare,
  Shield,
  Send,
} from 'lucide-react';

export const GymOpsERP: React.FC = () => {
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([
    { id: '1', memberName: 'Priya Narayanan', gender: 'Female', time: '07:12 AM', method: 'Smart Band NFC', streakDays: 28, assignedLocker: 42, status: 'In Gym' },
    { id: '2', memberName: 'Karthik Raman', gender: 'Male', time: '07:18 AM', method: 'RFID Card', streakDays: 14, assignedLocker: 108, status: 'In Gym' },
    { id: '3', memberName: 'Divya Sundaram', gender: 'Female', time: '07:22 AM', method: 'Face Biometric', streakDays: 21, assignedLocker: 39, status: 'In Gym' },
    { id: '4', memberName: 'Arun Kumar', gender: 'Male', time: '07:35 AM', method: 'QR Mobile', streakDays: 9, assignedLocker: 115, status: 'In Gym' },
    { id: '5', memberName: 'Alex Morgan', gender: 'Non-Binary', time: '07:42 AM', method: 'Smart Band NFC', streakDays: 18, assignedLocker: 64, status: 'In Gym' },
  ]);

  const [newMemberName, setNewMemberName] = useState<string>('Harish Teja');
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Non-Binary'>('Male');
  const [newMethod, setNewMethod] = useState<'Smart Band NFC' | 'Face Biometric' | 'RFID Card' | 'QR Mobile'>('Smart Band NFC');

  // WhatsApp Nudge State
  const [activeNudgeMember, setActiveNudgeMember] = useState<string>('Karthik Raman');
  const [nudgeMessage, setNudgeMessage] = useState<string>(
    'Hi Karthik, your GymOS membership expires in 4 days. Renew today to lock your peak locker slot & personal trainer rate: pay.gymos.pro/renew'
  );

  const handleSimulateCheckIn = () => {
    if (!newMemberName.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      memberName: newMemberName,
      gender: newGender,
      time: timeStr,
      method: newMethod,
      streakDays: Math.floor(Math.random() * 20) + 1,
      assignedLocker: Math.floor(Math.random() * 150) + 1,
      status: 'In Gym',
    };
    setAttendanceList([newRecord, ...attendanceList]);
  };

  const femaleCount = attendanceList.filter((m) => m.gender === 'Female').length;
  const maleCount = attendanceList.filter((m) => m.gender === 'Male').length;
  const nonBinaryCount = attendanceList.filter((m) => m.gender === 'Non-Binary').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#4df0d0] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4df0d0] animate-ping" />
            Module 10 · Gym Operations ERP & Turnstile Attendance
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            Smart Turnstile & Gender-Tracked Attendance
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Real-time biometric turnstile check-ins tracking member name, gender classification for locker allocation, visit streaks, RFID cards, and automated WhatsApp retention nudges.
          </p>
        </div>

        {/* Live Gender Demographics Pill */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0d1218] border border-[#1d2835] text-xs font-mono">
          <span className="text-[#8593a5]">Floor Demographics:</span>
          <span className="text-sky-400 font-bold">♂ {maleCount} Male</span>
          <span className="text-rose-400 font-bold">♀ {femaleCount} Female</span>
          {nonBinaryCount > 0 && (
            <span className="text-amber-400 font-bold">⚧ {nonBinaryCount} Non-Binary</span>
          )}
        </div>
      </div>

      {/* Main Grid: Check-in Simulator (5 Cols) + Live Attendance Table (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Simulator Form (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0d1218] border border-[#1d2835] rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-[#1d2835] pb-3">
            <Radio className="w-5 h-5 text-[#4df0d0]" />
            <h3 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white tracking-wide">
              Simulate Turnstile Entry
            </h3>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#8593a5] mb-1.5">
              Member Full Name:
            </label>
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              className="w-full bg-[#06080c] text-xs font-mono border border-[#1d2835] rounded-xl px-3 py-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#8593a5] mb-1.5">
              Gender Classification (For Locker & Facility Allocations):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Male', 'Female', 'Non-Binary'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setNewGender(g)}
                  className={`py-2 px-1 rounded-xl text-xs font-mono uppercase transition-all ${
                    newGender === g
                      ? 'bg-[#4df0d0] text-[#04120f] font-bold shadow-md'
                      : 'bg-[#06080c] border border-[#1d2835] text-[#8593a5] hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#8593a5] mb-1.5">
              Check-In Verification Protocol:
            </label>
            <select
              value={newMethod}
              onChange={(e) =>
                setNewMethod(
                  e.target.value as 'Smart Band NFC' | 'Face Biometric' | 'RFID Card' | 'QR Mobile'
                )
              }
              className="w-full bg-[#06080c] text-xs font-mono border border-[#1d2835] rounded-xl px-3 py-2 text-[#4df0d0]"
            >
              <option value="Smart Band NFC">Smart Band NFC Tap (Instant 0.2s)</option>
              <option value="Face Biometric">AI Facial Recognition Camera</option>
              <option value="RFID Card">Physical RFID Keycard</option>
              <option value="QR Mobile">Mobile App Dynamic QR Code</option>
            </select>
          </div>

          <button
            onClick={handleSimulateCheckIn}
            className="w-full py-3 rounded-xl bg-[#4df0d0] hover:bg-[#4df0d0]/90 text-[#04120f] font-mono font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4" />
            Process Check-In & Assign Locker
          </button>
        </div>

        {/* Live Attendance Table (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0d1218] border border-[#1d2835] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1d2835]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8593a5]">
              Live Attendance Registry ({attendanceList.length} Active on Floor)
            </span>
            <span className="text-[10px] font-mono text-[#4df0d0]">Turnstiles Live Feed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1d2835] text-[#8593a5] uppercase">
                  <th className="pb-2">Member</th>
                  <th className="pb-2">Gender</th>
                  <th className="pb-2">Time</th>
                  <th className="pb-2">Method</th>
                  <th className="pb-2">Locker</th>
                  <th className="pb-2 text-right">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16202c]">
                {attendanceList.map((rec) => (
                  <tr key={rec.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 font-bold text-white whitespace-nowrap">
                      {rec.memberName}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          rec.gender === 'Female'
                            ? 'bg-rose-500/20 text-rose-300'
                            : rec.gender === 'Male'
                            ? 'bg-sky-500/20 text-sky-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {rec.gender}
                      </span>
                    </td>
                    <td className="py-2.5 text-[#8593a5]">{rec.time}</td>
                    <td className="py-2.5 text-[#4df0d0] text-[11px]">{rec.method}</td>
                    <td className="py-2.5 text-white font-bold">#{rec.assignedLocker}</td>
                    <td className="py-2.5 text-right font-bold text-emerald-400">
                      {rec.streakDays}d 🔥
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
