import React, { useState, useRef, useEffect } from 'react';
import { BiometricTelemetry } from '../types/index.ts';
import { generateInstantBiomechanicsReply } from '../utils/aiBiomechanicsEngine.ts';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  Zap,
  Activity,
  Dumbbell,
  Stethoscope,
  RotateCcw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  source?: string;
}

interface Props {
  telemetry: BiometricTelemetry;
}

export const AIGeminiCoach: React.FC<Props> = ({ telemetry }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'coach',
      text: `Greetings athlete. I am **GymOS Pro AI**, your elite Olympic biomechanics coach and clinical sports scientist.
I am monitoring your real-time heart rate (${telemetry.isBandWorn ? `${telemetry.heartRate} BPM` : 'Sensor Disconnected'}), sleep readiness, and lifting logs.
How can I optimize your mechanics, diagnose post-workout pain, or engineer your progressive overload today?`,
      timestamp: 'Just now',
      source: 'GymOS Biomechanics Engine',
    },
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isInstantMode, setIsInstantMode] = useState<boolean>(true);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Voice Speech Recognition (SpeechToText)
  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in this browser. Please type your question.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Text-To-Speech Output
  const speakText = (text: string) => {
    if (!isAudioEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#•]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // 1. If Instant Mode is enabled, respond in <150ms with deep sports science intelligence
    if (isInstantMode) {
      setTimeout(() => {
        const instantResult = generateInstantBiomechanicsReply(textToSend, telemetry);
        const coachMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'coach',
          text: instantResult.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: `GymOS Biomechanics (${instantResult.category})`,
        };
        setMessages((prev) => [...prev, coachMsg]);
        speakText(instantResult.reply);
        setIsLoading(false);
      }, 150);
      return;
    }

    // 2. Cloud AI Mode with fast timeout safeguard
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 2800);

    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal,
        body: JSON.stringify({
          prompt: textToSend,
          telemetry,
          recentWorkout: 'Bench Press & Squats',
        }),
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || 'Biomechanical analysis completed.';

      const coachMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash',
      };

      setMessages((prev) => [...prev, coachMsg]);
      speakText(replyText);
    } catch {
      clearTimeout(timeoutId);
      const instantResult = generateInstantBiomechanicsReply(textToSend, telemetry);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: instantResult.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: `GymOS Biomechanics (${instantResult.category})`,
      };
      setMessages((prev) => [...prev, errorMsg]);
      speakText(instantResult.reply);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#4df0d0] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4df0d0] animate-ping" />
            Module 12 · Instant AI Biomechanics Coach & Multi-Turn Intelligence
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            AI Olympic Biomechanics Coach
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Instantaneous biomechanical coaching on squats, deadlifts, chest pressing, pain relief, nutrition, and multi-sport conditioning. Voice-enabled with microphone input and speech synthesis.
          </p>
        </div>

        {/* Instant Mode & Audio Output Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsInstantMode(!isInstantMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
              isInstantMode
                ? 'bg-[#4df0d0]/20 text-[#4df0d0] border border-[#4df0d0]/50 shadow-[0_0_15px_rgba(77,240,208,0.2)]'
                : 'bg-[#121c26] text-[#8593a5] border border-[#1e2c3c]'
            }`}
            title="Toggle between Ultra-Instant (<50ms) replies and Cloud AI"
          >
            <Zap className="w-3.5 h-3.5 text-[#4df0d0]" />
            <span className="font-semibold">{isInstantMode ? '⚡ Instant Reply ON' : '🌐 Cloud Mode'}</span>
          </button>

          <button
            onClick={() => {
              if (isAudioEnabled) window.speechSynthesis?.cancel();
              setIsAudioEnabled(!isAudioEnabled);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
              isAudioEnabled
                ? 'bg-[#4df0d0]/20 text-[#4df0d0] border border-[#4df0d0]/40'
                : 'bg-[#121c26] text-[#8593a5]'
            }`}
          >
            {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            {isAudioEnabled ? 'Voice Output ON' : 'Muted'}
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-[#090d13] border border-[#1d2835] rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Chat Stream Viewport */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-white/10 text-white'
                      : 'bg-[#4df0d0]/20 text-[#4df0d0] border border-[#4df0d0]/40 shadow-sm'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#142330] text-white rounded-tr-none border border-[#1e3448]'
                      : 'bg-[#0d141e] text-[#e9eef5] rounded-tl-none border border-[#1d2835] shadow-lg'
                  }`}
                >
                  <div className="whitespace-pre-line font-mono">{msg.text}</div>
                  <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-white/5 text-[10px] font-mono text-[#8593a5]">
                    <span>{msg.timestamp}</span>
                    {msg.source && (
                      <span className="text-[#4df0d0] font-semibold">{msg.source}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-xl">
              <div className="w-8 h-8 rounded-xl bg-[#4df0d0]/20 text-[#4df0d0] border border-[#4df0d0]/40 flex items-center justify-center text-xs font-bold shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-[#0d141e] text-[#8593a5] text-xs font-mono rounded-tl-none border border-[#1d2835] space-y-1">
                <div className="flex items-center gap-2 text-[#4df0d0] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#4df0d0] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#4df0d0] animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-[#4df0d0] animate-bounce delay-200" />
                  <span>Computing Biomechanical Analysis...</span>
                </div>
                <div className="text-[10px] text-[#637282]">
                  Analyzing joint angles, heart rate zones, and periodization metrics
                </div>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Question Prompts Bar */}
        <div className="px-4 py-2 bg-[#060a0f] border-t border-[#16202c] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono uppercase text-[#4df0d0] font-bold shrink-0">1-Click Topics:</span>
          {[
            'Fix my squat knee valgus collapse',
            'Lower back pain after deadlifts',
            'Incline dumbbell press angle for upper chest',
            'Pull-ups vs lat pulldown back width',
            'Lateral raises angle to protect shoulder',
            'Biceps long head peak & triceps mass',
            'Hanging leg raises lower abs engagement',
            'Cardio before or after weights for fat loss',
            'Optimal daily protein & creatine intake',
            'Relieve muscle cramp & pain relief stretch',
            'Homemaker zero-equipment posture reset',
            'Hyrox sled push & CrossFit WOD pacing',
            'Rest time between sets (180s vs 90s)',
            'Cricket bowling & football deceleration',
          ].map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap bg-[#0e1620] hover:bg-[#152332] text-[#8593a5] hover:text-[#4df0d0] border border-[#1a2533] transition-colors"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Text Input / Voice Bar */}
        <div className="p-4 bg-[#080d14] border-t border-[#1a2533] flex items-center gap-2">
          <button
            onClick={toggleListening}
            className={`p-3 rounded-xl transition-all ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-lg'
                : 'bg-[#14202c] text-[#8593a5] hover:text-[#4df0d0] border border-[#203042]'
            }`}
            title="Click to speak hands-free via microphone"
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isListening ? 'Listening to your voice...' : 'Ask GymOS Pro AI anything about your lifts, pain, or macros...'}
            className="flex-1 bg-[#060a0f] border border-[#1d2835] rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-white placeholder-[#52647a] focus:outline-none focus:border-[#4df0d0]"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="p-3 rounded-xl bg-[#4df0d0] hover:bg-[#4df0d0]/90 disabled:opacity-40 disabled:hover:bg-[#4df0d0] text-[#04120f] transition-all font-bold shadow-md"
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
