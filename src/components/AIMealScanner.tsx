import React, { useState } from 'react';
import { Camera, Sparkles, UtensilsCrossed, CheckCircle2, Flame, Droplets, Upload, Zap } from 'lucide-react';

interface ScannedMealResult {
  items: {
    name: string;
    grams: number;
    kcal: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  }[];
  totalKcal: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  healthRating: number;
  macroSummary: string;
  advice: string;
}

export const AIMealScanner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScannedMealResult | null>({
    items: [
      { name: 'Grilled Herb Tandoori Chicken Breast', grams: 180, kcal: 297, proteinGrams: 55, carbsGrams: 0, fatGrams: 6 },
      { name: 'Steamed Brown Basmati Rice', grams: 160, kcal: 208, proteinGrams: 4.5, carbsGrams: 45, fatGrams: 1 },
      { name: 'Garlic Sauteed Baby Spinach & Broccoli', grams: 120, kcal: 42, proteinGrams: 4, carbsGrams: 6, fatGrams: 0.8 },
    ],
    totalKcal: 547,
    totalProtein: 63.5,
    totalCarbs: 51,
    totalFat: 7.8,
    healthRating: 9.6,
    macroSummary: '46% Protein · 41% Carbs · 13% Healthy Fats',
    advice: 'Exceptional lean mass fuel. High leucine content guarantees optimal muscle protein synthesis (MPS) trigger.',
  });

  const sampleMeals = [
    {
      title: 'Tandoori Chicken & Brown Rice',
      desc: 'High-protein post-workout fuel',
      items: [
        { name: 'Tandoori Chicken Breast', grams: 180, kcal: 297, proteinGrams: 55, carbsGrams: 0, fatGrams: 6 },
        { name: 'Steamed Brown Rice', grams: 160, kcal: 208, proteinGrams: 4.5, carbsGrams: 45, fatGrams: 1 },
        { name: 'Steamed Broccoli & Carrots', grams: 120, kcal: 42, proteinGrams: 4, carbsGrams: 6, fatGrams: 0.8 },
      ],
      totalKcal: 547,
      totalProtein: 63.5,
      totalCarbs: 51,
      totalFat: 7.8,
      rating: 9.6,
    },
    {
      title: 'Paneer Tikka & Whole Wheat Roti',
      desc: 'Vegetarian hypertrophy staple',
      items: [
        { name: 'Malai Paneer Tikka (Grilled)', grams: 150, kcal: 395, proteinGrams: 27, carbsGrams: 3, fatGrams: 31 },
        { name: 'Whole Wheat Phulka Roti (2 pcs)', grams: 80, kcal: 238, proteinGrams: 7.4, carbsGrams: 37, fatGrams: 5.8 },
        { name: 'Set Curd / Dahi', grams: 150, kcal: 98, proteinGrams: 6.8, carbsGrams: 7.8, fatGrams: 4.8 },
      ],
      totalKcal: 731,
      totalProtein: 41.2,
      totalCarbs: 47.8,
      totalFat: 41.6,
      rating: 9.1,
    },
    {
      title: 'Protein Rolled Oats & Peanut Butter',
      desc: 'Pre-workout sustained energy',
      items: [
        { name: 'Rolled Oats with Almond Milk', grams: 70, kcal: 272, proteinGrams: 11.8, carbsGrams: 46.4, fatGrams: 4.8 },
        { name: 'Whey Protein Isolate (1 scoop)', grams: 33, kcal: 125, proteinGrams: 29, carbsGrams: 0.8, fatGrams: 0.4 },
        { name: 'Roasted Peanut Butter', grams: 25, kcal: 147, proteinGrams: 6.2, carbsGrams: 5, fatGrams: 12.5 },
      ],
      totalKcal: 544,
      totalProtein: 47,
      totalCarbs: 52.2,
      totalFat: 17.7,
      rating: 9.8,
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      setIsScanning(true);

      try {
        const res = await fetch('/api/ai/scan-meal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64Image: base64 }),
        });
        const data = await res.json();
        setScanResult(data);
      } catch (err) {
        console.error('Scan error:', err);
      } finally {
        setIsScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: (typeof sampleMeals)[0]) => {
    setScanResult({
      items: sample.items,
      totalKcal: sample.totalKcal,
      totalProtein: sample.totalProtein,
      totalCarbs: sample.totalCarbs,
      totalFat: sample.totalFat,
      healthRating: sample.rating,
      macroSummary: `${Math.round((sample.totalProtein * 4 * 100) / sample.totalKcal)}% Protein · ${Math.round((sample.totalCarbs * 4 * 100) / sample.totalKcal)}% Carbs`,
      advice: 'Nutritionally balanced with optimal amino acid density.',
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#4df0d0] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4df0d0] animate-ping" />
            Module 13 · AI Computer Vision Meal & Food Scanner
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            AI Food Vision & Macro Scanner
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Snap or upload a photo of your food. Gemini Computer Vision segments individual ingredients, estimates portion weights in grams, and computes calories, protein, and amino acid quality.
          </p>
        </div>
      </div>

      {/* Main Grid: Upload / Samples (5 Cols) + Real-Time Scan Results (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Upload & Preset Options (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0d1218] border border-[#1d2835] rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-[#1d2835] pb-3">
            <Camera className="w-5 h-5 text-[#4df0d0]" />
            <h3 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white tracking-wide">
              Scan Food Plate Photo
            </h3>
          </div>

          {/* Upload Area */}
          <label className="border-2 border-dashed border-[#1f2e40] hover:border-[#4df0d0]/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-[#070b10] group">
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            <div className="p-3 rounded-full bg-[#121c26] text-[#4df0d0] group-hover:scale-110 transition-transform mb-2">
              <Upload className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-white font-bold uppercase">
              Upload / Snap Food Picture
            </span>
            <span className="text-[10px] text-[#8593a5] mt-1">
              Supports JPEG, PNG, or camera snapshot (Max 15MB)
            </span>
          </label>

          {/* Presets */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8593a5] block">
              Or Test Instant Presets:
            </span>
            {sampleMeals.map((meal, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSample(meal)}
                className="w-full p-3 rounded-xl bg-[#070b10] border border-[#16202c] hover:border-[#4df0d0]/40 text-left transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-white">{meal.title}</div>
                  <div className="text-[10px] font-mono text-[#8593a5]">{meal.desc}</div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="text-[#4df0d0] font-bold">{meal.totalKcal} kcal</div>
                  <div className="text-[10px] text-[#8593a5]">{meal.totalProtein}g P</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Scan Results (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0d1218] border border-[#1d2835] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1d2835]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8593a5] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#4df0d0]" />
              AI Vision Ingredient Breakdown
            </span>
            {scanResult && (
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#4df0d0]/20 text-[#4df0d0] border border-[#4df0d0]/40 font-bold">
                Health Rating: {scanResult.healthRating} / 10
              </span>
            )}
          </div>

          {scanResult ? (
            <div className="space-y-4">
              {/* Macro Cards Summary */}
              <div className="grid grid-cols-4 gap-2">
                <div className="p-3 rounded-xl bg-[#070b10] border border-[#16202c] text-center">
                  <div className="text-[10px] font-mono text-[#8593a5] uppercase">Calories</div>
                  <div className="text-xl font-['Big_Shoulders_Display'] font-black text-amber-400 mt-0.5">
                    {Math.round(scanResult.totalKcal)}
                  </div>
                  <div className="text-[9px] font-mono text-[#8593a5]">kcal</div>
                </div>

                <div className="p-3 rounded-xl bg-[#070b10] border border-[#16202c] text-center">
                  <div className="text-[10px] font-mono text-[#8593a5] uppercase">Protein</div>
                  <div className="text-xl font-['Big_Shoulders_Display'] font-black text-[#4df0d0] mt-0.5">
                    {Math.round(scanResult.totalProtein)}g
                  </div>
                  <div className="text-[9px] font-mono text-[#4df0d0]">Hypertrophy</div>
                </div>

                <div className="p-3 rounded-xl bg-[#070b10] border border-[#16202c] text-center">
                  <div className="text-[10px] font-mono text-[#8593a5] uppercase">Carbs</div>
                  <div className="text-xl font-['Big_Shoulders_Display'] font-black text-sky-400 mt-0.5">
                    {Math.round(scanResult.totalCarbs)}g
                  </div>
                  <div className="text-[9px] font-mono text-[#8593a5]">Glycogen</div>
                </div>

                <div className="p-3 rounded-xl bg-[#070b10] border border-[#16202c] text-center">
                  <div className="text-[10px] font-mono text-[#8593a5] uppercase">Fats</div>
                  <div className="text-xl font-['Big_Shoulders_Display'] font-black text-rose-400 mt-0.5">
                    {Math.round(scanResult.totalFat)}g
                  </div>
                  <div className="text-[9px] font-mono text-[#8593a5]">Hormones</div>
                </div>
              </div>

              {/* Segmented Ingredients Table */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-[#8593a5] block">
                  Identified Food Portions:
                </span>
                {scanResult.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#070a0e] border border-[#16202c] text-xs font-mono"
                  >
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-[#8593a5]">
                        {item.grams}g portion · {item.proteinGrams}g Protein
                      </div>
                    </div>
                    <div className="text-right text-[#4df0d0] font-bold">
                      {item.kcal} kcal
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Advice Box */}
              <div className="p-4 rounded-xl bg-[#090d12] border border-[#1a2533] text-xs text-[#8593a5] font-mono space-y-1">
                <div className="text-white font-bold uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4df0d0]" />
                  Sports Nutritionist Verdict:
                </div>
                <p className="leading-relaxed text-[#e9eef5]">{scanResult.advice}</p>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs font-mono text-[#8593a5] border border-dashed border-[#1d2835] rounded-xl">
              Upload or snap a photo of your food to view AI nutrient segmentation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
