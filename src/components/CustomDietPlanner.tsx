import React, { useState } from 'react';
import { FOOD_DATABASE, INITIAL_7_DAY_DIET_PLAN } from '../data/nutritionData.ts';
import { DayDietPlan, FoodItem } from '../types/index.ts';
import { calculateMacros } from '../utils/fitnessMath.ts';
import {
  UtensilsCrossed,
  Plus,
  Trash2,
  Calendar,
  Flame,
  Droplets,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const CustomDietPlanner: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [dietPlans, setDietPlans] = useState<DayDietPlan[]>(INITIAL_7_DAY_DIET_PLAN);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(174);
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [goal, setGoal] = useState<'cut' | 'bulk' | 'maintain'>('cut');

  const currentDayPlan = dietPlans[selectedDayIndex];

  // Calculate target macros
  const targetMacros = calculateMacros(weightKg, heightCm, age, gender, 1.55, goal);

  // Calculate day totals
  let totalKcal = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  currentDayPlan.slots.forEach((slot) => {
    slot.items.forEach((item) => {
      const food = FOOD_DATABASE.find((f) => f.id === item.foodId);
      if (food) {
        totalKcal += (item.grams * food.kcalPer100g) / 100;
        totalProtein += (item.grams * food.proteinPer100g) / 100;
        totalCarbs += (item.grams * food.carbsPer100g) / 100;
        totalFat += (item.grams * food.fatPer100g) / 100;
      }
    });
  });

  // Modify grams of an item
  const handleUpdateGrams = (slotIndex: number, itemIndex: number, newGrams: number) => {
    const updated = JSON.parse(JSON.stringify(dietPlans)) as DayDietPlan[];
    updated[selectedDayIndex].slots[slotIndex].items[itemIndex].grams = Math.max(5, newGrams);
    setDietPlans(updated);
  };

  // Remove an item
  const handleRemoveItem = (slotIndex: number, itemIndex: number) => {
    const updated = JSON.parse(JSON.stringify(dietPlans)) as DayDietPlan[];
    updated[selectedDayIndex].slots[slotIndex].items.splice(itemIndex, 1);
    setDietPlans(updated);
  };

  // Add an item to slot
  const handleAddItem = (slotIndex: number, foodId: string) => {
    const food = FOOD_DATABASE.find((f) => f.id === foodId);
    if (!food) return;
    const updated = JSON.parse(JSON.stringify(dietPlans)) as DayDietPlan[];
    updated[selectedDayIndex].slots[slotIndex].items.push({
      foodId,
      grams: food.defaultGrams,
    });
    setDietPlans(updated);
  };

  // Reset current day to initial preset
  const handleResetDay = () => {
    const updated = JSON.parse(JSON.stringify(dietPlans)) as DayDietPlan[];
    updated[selectedDayIndex] = JSON.parse(JSON.stringify(INITIAL_7_DAY_DIET_PLAN[selectedDayIndex]));
    setDietPlans(updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d2835] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#4df0d0] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4df0d0] animate-ping" />
            Module 03 · Fully Customizable 7-Day Nutrition Matrix
          </div>
          <h2 className="text-4xl sm:text-5xl font-['Big_Shoulders_Display'] font-black uppercase tracking-tight text-white">
            Personalized Daily Menu Engine
          </h2>
          <p className="text-[#8593a5] text-sm max-w-2xl mt-1">
            Build and tweak customized menus across all days of the week. Adjust exact food grams, swap Indian & global nutrient sources, and watch dynamic calories & macros auto-balance in real time.
          </p>
        </div>

        {/* Goal & Biometrics Quick Bar */}
        <div className="flex flex-wrap items-center gap-3 p-2 rounded-xl bg-[#0d1218] border border-[#1d2835]">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[#8593a5]">Weight:</span>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-16 px-2 py-1 rounded bg-[#06080c] border border-[#1d2835] text-white text-xs font-bold"
            />
            <span className="text-[#8593a5]">kg</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[#8593a5]">Goal:</span>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as 'cut' | 'bulk' | 'maintain')}
              className="px-2 py-1 rounded bg-[#06080c] border border-[#1d2835] text-[#4df0d0] text-xs font-bold"
            >
              <option value="cut">Fat Loss Cut (-450 kcal)</option>
              <option value="bulk">Hypertrophy Bulk (+350 kcal)</option>
              <option value="maintain">Maintenance & Recomp</option>
            </select>
          </div>
        </div>
      </div>

      {/* 7-Day Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {dietPlans.map((plan, idx) => {
          const isSelected = selectedDayIndex === idx;
          return (
            <button
              key={plan.dayName}
              onClick={() => setSelectedDayIndex(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-[#4df0d0] text-[#04120f] font-bold shadow-[0_0_15px_rgba(77,240,208,0.25)]'
                  : 'bg-[#0d1218] text-[#8593a5] hover:text-white border border-[#1d2835]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{plan.dayName}</span>
            </button>
          );
        })}
      </div>

      {/* Target vs Consumed Macro Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#0d1218] border border-[#1d2835]">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
            <span>Calories</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-['Big_Shoulders_Display'] font-black text-white">
              {Math.round(totalKcal)}
            </span>
            <span className="text-xs font-mono text-[#8593a5]">/ {targetMacros.targetKcal} kcal</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#162330] mt-2 overflow-hidden">
            <div
              className="h-full bg-amber-400"
              style={{ width: `${Math.min(100, (totalKcal / targetMacros.targetKcal) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0d1218] border border-[#1d2835]">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
            <span>Protein</span>
            <span className="text-[10px] text-[#4df0d0]">4 kcal/g</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-['Big_Shoulders_Display'] font-black text-[#4df0d0]">
              {Math.round(totalProtein)}
            </span>
            <span className="text-xs font-mono text-[#8593a5]">/ {targetMacros.proteinGrams} g</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#162330] mt-2 overflow-hidden">
            <div
              className="h-full bg-[#4df0d0]"
              style={{ width: `${Math.min(100, (totalProtein / targetMacros.proteinGrams) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0d1218] border border-[#1d2835]">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
            <span>Carbohydrates</span>
            <span className="text-[10px] text-sky-400">4 kcal/g</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-['Big_Shoulders_Display'] font-black text-sky-400">
              {Math.round(totalCarbs)}
            </span>
            <span className="text-xs font-mono text-[#8593a5]">/ {targetMacros.carbsGrams} g</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#162330] mt-2 overflow-hidden">
            <div
              className="h-full bg-sky-400"
              style={{ width: `${Math.min(100, (totalCarbs / targetMacros.carbsGrams) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0d1218] border border-[#1d2835]">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8593a5]">
            <span>Fats</span>
            <span className="text-[10px] text-rose-400">9 kcal/g</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-['Big_Shoulders_Display'] font-black text-rose-400">
              {Math.round(totalFat)}
            </span>
            <span className="text-xs font-mono text-[#8593a5]">/ {targetMacros.fatGrams} g</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#162330] mt-2 overflow-hidden">
            <div
              className="h-full bg-rose-400"
              style={{ width: `${Math.min(100, (totalFat / targetMacros.fatGrams) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Meal Slots Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-['Big_Shoulders_Display'] font-black uppercase tracking-wide text-white">
            {currentDayPlan.dayName}&apos;s Meal Breakdown
          </h3>
          <button
            onClick={handleResetDay}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-[#8593a5] hover:text-white bg-[#0d1218] border border-[#1d2835] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to High-Protein Preset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentDayPlan.slots.map((slot, slotIdx) => {
            let slotKcal = 0;
            let slotProtein = 0;

            slot.items.forEach((item) => {
              const food = FOOD_DATABASE.find((f) => f.id === item.foodId);
              if (food) {
                slotKcal += (item.grams * food.kcalPer100g) / 100;
                slotProtein += (item.grams * food.proteinPer100g) / 100;
              }
            });

            return (
              <div
                key={slot.slotName}
                className="p-5 rounded-2xl bg-[#0b1016] border border-[#1d2835] shadow-lg space-y-4"
              >
                {/* Slot Header */}
                <div className="flex items-center justify-between border-b border-[#182330] pb-2.5">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-[#4df0d0]" />
                    <span className="font-bold text-sm text-white font-mono uppercase tracking-wider">
                      {slot.slotName}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#8593a5]">
                    <span className="text-[#4df0d0] font-bold">{Math.round(slotKcal)}</span> kcal ·{' '}
                    <span className="text-white font-semibold">{Math.round(slotProtein)}g</span> protein
                  </div>
                </div>

                {/* Items in Slot */}
                <div className="space-y-2">
                  {slot.items.map((item, itemIdx) => {
                    const food = FOOD_DATABASE.find((f) => f.id === item.foodId);
                    if (!food) return null;
                    const itemKcal = Math.round((item.grams * food.kcalPer100g) / 100);
                    const itemProtein = Math.round((item.grams * food.proteinPer100g) / 100);

                    return (
                      <div
                        key={itemIdx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#070a0e] border border-[#16202c] text-xs font-mono"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="font-medium text-white truncate">{food.name}</div>
                          <div className="text-[10px] text-[#8593a5] mt-0.5">
                            {itemKcal} kcal · {itemProtein}g protein · {food.micronutrientHighlight}
                          </div>
                        </div>

                        {/* Grams Input */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="10"
                              max="800"
                              step="10"
                              value={item.grams}
                              onChange={(e) =>
                                handleUpdateGrams(slotIdx, itemIdx, Number(e.target.value))
                              }
                              className="w-16 px-2 py-1 rounded bg-[#0b1016] border border-[#1f2e40] text-center text-white text-xs font-bold"
                            />
                            <span className="text-[10px] text-[#8593a5]">g</span>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(slotIdx, itemIdx)}
                            className="p-1 rounded text-[#8593a5] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Remove food"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add Food Dropdown */}
                <div className="pt-2 border-t border-[#16202c]">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddItem(slotIdx, e.target.value);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                    className="w-full bg-[#070a0e] text-xs font-mono border border-[#1a2533] rounded-xl px-3 py-2 text-[#8593a5] hover:border-[#4df0d0]/50 transition-colors focus:outline-none"
                  >
                    <option value="" disabled>
                      + Add varied food to {slot.slotName}...
                    </option>
                    {FOOD_DATABASE.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.category} · {f.kcalPer100g} kcal/100g)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
