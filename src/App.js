import React, { useState, useEffect, useRef } from 'react';
import { 
  Dumbbell, 
  Calendar, 
  Clock, 
  Trophy, 
  Award, 
  Activity, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Square, 
  CheckCircle2, 
  RotateCcw,
  TrendingUp,
  Info,
  Flame,
  Medal,
  Lock,
  Zap,
  Target,
  Crown,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

// --- DATA CONSTANTS ---
const WORKOUT_PLANS = {
  "3day": {
    name: "3-Day Split",
    description: "Mon-Wed-Fri",
    days: [
      { 
        name: "Monday", 
        dayName: "Lower Body Power",
        exercises: [
          { name: "Barbell Back Squat", sets: "4 × 6-8" },
          { name: "Barbell Romanian Deadlift", sets: "3 × 8-10" },
          { name: "Leg Press", sets: "3 × 10-12" },
          { name: "Seated/Lying Leg Curl", sets: "3 × 10-12" },
          { name: "Standing Calf Raises", sets: "3 × 12-15" }
        ],
        cardio: "20 min cardio"
      },
      { name: "Tuesday", dayName: "Rest & Recovery", exercises: [{ name: "Rest and Recovery", sets: "Full day of rest" }], cardio: "Optional light activity" },
      { 
        name: "Wednesday", 
        dayName: "Upper Body Power",
        exercises: [
          { name: "Barbell Bench Press", sets: "4 × 6-8" },
          { name: "Lat Pulldown", sets: "3 × 8-10" },
          { name: "Seated Dumbbell Shoulder Press", sets: "3 × 8-10" },
          { name: "Chest-Supported Machine/Dumbbell Row", sets: "3 × 10" },
          { name: "Superset: Triceps Pushdown & Dumbbell Curls", sets: "2 × 12 each" }
        ],
        cardio: "20 min cardio"
      },
      { name: "Thursday", dayName: "Rest & Recovery", exercises: [{ name: "Rest and Recovery", sets: "Full day of rest" }], cardio: "Optional light activity" },
      { 
        name: "Friday", 
        dayName: "Full Body Hypertrophy",
        exercises: [
          { name: "Barbell Deadlift", sets: "3 × 5" },
          { name: "Incline Dumbbell Press", sets: "3 × 8-10" },
          { name: "Walking Lunges", sets: "3 × 10/leg" },
          { name: "Seated Cable Row", sets: "3 × 10" },
          { name: "Hanging Knee Raises/Crunches", sets: "3 × 12-15" }
        ],
        cardio: "20 min cardio"
      },
      { name: "Saturday", dayName: "Rest & Recovery", exercises: [{ name: "Rest and Recovery", sets: "Full day of rest" }], cardio: "Optional light activity" },
      { name: "Sunday", dayName: "Rest & Recovery", exercises: [{ name: "Rest and Recovery", sets: "Full day of rest" }], cardio: "Optional light activity" }
    ]
  },
  "4day": {
    name: "4-Day Split",
    description: "Upper/Lower",
    days: [
      { 
        name: "Monday", 
        dayName: "Upper Body A",
        exercises: [
          { name: "Barbell Bench Press", sets: "3 × 6-8" },
          { name: "Lat Pulldown", sets: "3 × 8-10" },
          { name: "Chest-Supported Row", sets: "3 × 8-10" },
          { name: "Dumbbell Lateral Raises", sets: "3 × 12-15" },
          { name: "Triceps Pushdown", sets: "2 × 12" },
          { name: "Dumbbell Curls", sets: "2 × 12" }
        ],
        cardio: "20 min cardio"
      },
      { 
        name: "Tuesday", 
        dayName: "Lower Body A",
        exercises: [
          { name: "Back Squat", sets: "4 × 6-8" },
          { name: "Leg Press", sets: "3 × 10-12" },
          { name: "Leg Extension", sets: "3 × 12" },
          { name: "Seated Dumbbell Shoulder Press", sets: "3 × 8-10" },
          { name: "Rear Delt Fly", sets: "2 × 15" }
        ],
        cardio: "20 min cardio"
      },
      { name: "Wednesday", dayName: "Rest & Recovery", exercises: [{ name: "Rest and Recovery", sets: "Full day of rest" }], cardio: "Optional light activity" },
      { 
        name: "Thursday", 
        dayName: "Upper Body B",
        exercises: [
          { name: "Incline Barbell/Dumbbell Bench Press", sets: "4 × 6-8" },
          { name: "Flat Dumbbell Fly / Cable Fly", sets: "3 × 10-12" },
          { name: "Seated Cable Row", sets: "3 × 10" },
          { name: "Dumbbell Lateral Raises", sets: "3 × 12-15" },
          { name: "EZ-Bar Curls", sets: "2 × 12" },
          { name: "Overhead Triceps Extension", sets: "2 × 12" }
        ],
        cardio: "20 min cardio"
      },
      { 
        name: "Friday", 
        dayName: "Lower Body B",
        exercises: [
          { name: "Romanian Deadlift", sets: "4 × 8" },
          { name: "Lying/Seated Leg Curl", sets: "3 × 10-12" },
          { name: "Walking Lunges", sets: "3 × 10/leg" },
          { name: "Dumbbell Lateral Raises", sets: "3 × 15" },
          { name: "Standing Calf Raises", sets: "3 × 15" }
        ],
        cardio: "20 min cardio"
      },
      { name: "Saturday", dayName: "Rest & Recovery", exercises: [{ name: "Rest and Recovery", sets: "Full day of rest" }], cardio: "Optional light activity" },
      { name: "Sunday", dayName: "Rest & Recovery", exercises: [{ name: "Rest and Recovery", sets: "Full day of rest" }], cardio: "Optional light activity" }
    ]
  },
  "5day": {
    name: "5-Day Split",
    description: "Bro Split Modified",
    days: [
      { 
        name: "Monday", 
        dayName: "Push (Chest Focus)",
        exercises: [
          { name: "Barbell Bench Press", sets: "4 × 6-8" },
          { name: "Incline Dumbbell Press", sets: "3 × 8-10" },
          { name: "Seated Shoulder Press", sets: "3 × 8-10" },
          { name: "Dumbbell Lateral Raises", sets: "3 × 12-15" },
          { name: "Triceps Pushdown", sets: "3 × 10-12" }
        ],
        cardio: "20 min cardio"
      },
      { 
        name: "Tuesday", 
        dayName: "Pull (Vertical Focus)",
        exercises: [
          { name: "Barbell Deadlift", sets: "3 × 5" },
          { name: "Lat Pulldown", sets: "3 × 8-10" },
          { name: "Seated Cable Row", sets: "3 × 10" },
          { name: "Face Pulls", sets: "3 × 15" },
          { name: "Dumbbell Curls", sets: "3 × 12" }
        ],
        cardio: "20 min cardio"
      },
      { 
        name: "Wednesday", 
        dayName: "Legs",
        exercises: [
          { name: "Back Squat", sets: "4 × 6-8" },
          { name: "Leg Press", sets: "3 × 10" },
          { name: "Leg Curl", sets: "3 × 12" },
          { name: "Walking Lunges", sets: "2 × 12/leg" },
          { name: "Standing Calf Raises", sets: "3 × 15" }
        ],
        cardio: "20 min cardio"
      },
      { name: "Thursday", dayName: "Rest & Recovery", exercises: [{ name: "Rest and Recovery", sets: "Full day of rest" }], cardio: "Optional light activity" },
      { 
        name: "Friday", 
        dayName: "Upper Body (Back Focus)",
        exercises: [
          { name: "Incline Bench Press", sets: "3 × 8" },
          { name: "One-Arm Dumbbell Row", sets: "3 × 10" },
          { name: "Lat Pulldown", sets: "3 × 10" },
          { name: "Dumbbell Lateral Raises", sets: "3 × 15" },
          { name: "Arms Superset", sets: "2 × 12" }
        ],
        cardio: "20 min cardio"
      },
      { 
        name: "Saturday", 
        dayName: "Lower Body + Delts",
        exercises: [
          { name: "Romanian Deadlift", sets: "3 × 10" },
          { name: "Leg Curl", sets: "3 × 12" },
          { name: "Goblet Squat", sets: "3 × 12" },
          { name: "Seated Dumbbell Shoulder Press", sets: "3 × 8" },
          { name: "Rear Delt Fly", sets: "3 × 15" }
        ],
        cardio: "20 min cardio"
      },
      { name: "Sunday", dayName: "Rest & Recovery", exercises: [{ name: "Rest and Recovery", sets: "Full day of rest" }], cardio: "Optional light activity" }
    ]
  },
  "6day": {
    name: "6-Day Split",
    description: "PPL x 2",
    days: [
      { 
        name: "Monday", 
        dayName: "Push A",
        exercises: [
          { name: "Barbell Bench Press", sets: "4 × 6-8" },
          { name: "Dumbbell Shoulder Press", sets: "3 × 8" },
          { name: "Cable Fly", sets: "3 × 12" },
          { name: "Lateral Raises", sets: "3 × 15" },
          { name: "Triceps Pushdown", sets: "3 × 12" }
        ],
        cardio: "20 min cardio"
      },
      { 
        name: "Tuesday", 
        dayName: "Pull A",
        exercises: [
          { name: "Barbell Deadlift", sets: "3 × 5" },
          { name: "Lat Pulldown", sets: "3 × 8-10" },
          { name: "Seated Cable Row", sets: "3 × 10" },
          { name: "Face Pulls", sets: "3 × 15" },
          { name: "Dumbbell Curls", sets: "3 × 12" }
        ],
        cardio: "20 min cardio"
      },
      { 
        name: "Wednesday", 
        dayName: "Legs A",
        exercises: [
          { name: "Back Squat", sets: "4 × 6-8" },
          { name: "Leg Press", sets: "3 × 10" },
          { name: "Leg Extension", sets: "3 × 12" },
          { name: "Standing Calf Raises", sets: "3 × 15" }
        ],
        cardio: "20 min cardio"
      },
      { 
        name: "Thursday", 
        dayName: "Push B",
        exercises: [
          { name: "Incline Bench Press", sets: "4 × 8" },
          { name: "Seated Shoulder Press", sets: "3 × 8" },
          { name: "Dumbbell Lateral Raises", sets: "3 × 15" },
          { name: "Overhead Triceps Extension", sets: "3 × 12" }
        ],
        cardio: "20 min cardio"
      },
      { 
        name: "Friday", 
        dayName: "Pull B",
        exercises: [
          { name: "Barbell Row", sets: "4 × 8" },
          { name: "One-Arm Dumbbell Row", sets: "3 × 10" },
          { name: "Rear Delt Fly", sets: "3 × 15" },
          { name: "Hammer Curls", sets: "3 × 12" }
        ],
        cardio: "20 min cardio"
      },
      { 
        name: "Saturday", 
        dayName: "Legs B",
        exercises: [
          { name: "Romanian Deadlift", sets: "4 × 8-10" },
          { name: "Lying/Seated Leg Curl", sets: "3 × 12" },
          { name: "Walking Lunges", sets: "3 × 10/leg" },
          { name: "Seated Calf Raises", sets: "3 × 15" }
        ],
        cardio: "20 min cardio"
      },
      { name: "Sunday", dayName: "Rest & Recovery", exercises: [{ name: "Rest and Recovery", sets: "Full day of rest" }], cardio: "Optional light activity" }
    ]
  }
};

const parseSetCount = (setsString) => {
  const match = setsString.match(/^(\d+)/);
  return match ? parseInt(match[1]) : 3;
};

// Helper to categorize exercises as upper or lower body
const categorizeExercise = (exerciseName) => {
  const upperBodyKeywords = ['bench', 'press', 'row', 'pulldown', 'fly', 'shoulder', 'curl', 'triceps', 'biceps', 'lat', 'chest', 'back', 'arm'];
  const lowerBodyKeywords = ['squat', 'deadlift', 'leg', 'lunges', 'calf', 'hamstring', 'quad', 'glute', 'hip'];
  
  const nameLower = exerciseName.toLowerCase();
  
  for (const keyword of lowerBodyKeywords) {
    if (nameLower.includes(keyword)) return 'lower';
  }
  
  for (const keyword of upperBodyKeywords) {
    if (nameLower.includes(keyword)) return 'upper';
  }
  
  return 'other';
};

// --- COMPONENTS ---

// 1. Modern Glassy Header with Mobile Date
const Header = ({ 
  todayDate, 
  isSessionActive, 
  sessionTime, 
  onToggleSession,
  onGoToToday,
  isViewingToday 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-emerald-400 to-cyan-400 p-2 rounded-lg text-slate-950 shadow-lg shadow-emerald-500/20">
                <Dumbbell size={20} strokeWidth={2.5} /> 
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white leading-none">
                  GYM<span className="text-emerald-400">PRO</span>
                </h1>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Tracker</p>
              </div>
            </div>

            {/* Mobile Date Display */}
            <div className="md:hidden flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900/50 px-3 py-1.5 rounded-full border border-white/5">
              <Calendar size={12} />
              {todayDate}
            </div>

            {/* Mobile Today Button */}
             <button 
              onClick={onGoToToday}
              className={`md:hidden p-2 rounded-lg transition-all ${isViewingToday ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800/50 text-slate-400'}`}
            >
              <Zap size={18} fill={isViewingToday ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900/50 px-3 py-1.5 rounded-full border border-white/5">
              <Calendar size={12} />
              {todayDate}
            </div>

            <div className="flex items-center gap-3 bg-slate-900/80 p-1.5 rounded-full border border-white/10 shadow-inner w-full md:w-auto justify-between md:justify-start">
               <div className="flex items-center gap-2 px-3">
                  <Clock size={14} className={isSessionActive ? "text-emerald-400 animate-pulse" : "text-slate-600"} />
                  <span className={`font-mono text-lg font-bold tracking-wider ${isSessionActive ? 'text-white' : 'text-slate-500'}`}>
                    {formatTime(sessionTime)}
                  </span>
               </div>
               <button 
                onClick={onToggleSession}
                className={`h-9 px-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2 ${isSessionActive ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-900/20' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-900/20'}`}
               >
                 {isSessionActive ? (
                   <>Stop <Square size={10} fill="currentColor" /></>
                 ) : (
                   <>Start <Play size={10} fill="currentColor" /></>
                 )}
               </button>
            </div>

            <button 
              onClick={onGoToToday}
              className={`hidden md:flex p-2.5 rounded-full transition-all hover:scale-105 active:scale-95 ${isViewingToday ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
              title="Go to Today"
            >
              <Zap size={20} fill={isViewingToday ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// 2. Stats Cards with Cardio Count
const StatsSummary = ({ stats }) => {
  const items = [
    { label: 'Upper Body PR', value: `${stats.upperBodyPR}`, unit: 'kg', icon: TrendingUp, color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20' },
    { label: 'Lower Body PR', value: `${stats.lowerBodyPR}`, unit: 'kg', icon: Dumbbell, color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-400/20' },
    { label: 'Time', value: `${stats.sessionTime}`, unit: 'm', icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
    { label: 'Cardio', value: `${stats.cardioDone}/${stats.cardioDays}`, unit: 'sessions', icon: Flame, color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/20' },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {items.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`p-4 rounded-2xl border ${stat.bg} backdrop-blur-sm flex flex-col items-start gap-2 transition-all hover:-translate-y-1`}>
              <div className={`p-2 rounded-lg ${stat.color} bg-slate-950/30`}>
                <Icon size={16} />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
                    <span className="text-xs font-medium text-slate-400">{stat.unit}</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          )
      })}
    </div>
  );
};

// 3. Progress Section with Horizontal Scroll Achievements
const ProgressSection = ({ completedCount, totalCount, percentage, resetWeek, rewards }) => {
  // Calculate target positions for achievement markers
  const targetPositions = {
    bronze: 25,
    silver: 50,
    gold: 75,
    platinum: 100
  };

  const achievements = [
    { 
      id: 'bronze', 
      icon: Award, 
      label: 'Bronze', 
      desc: 'Complete 25% of exercises', 
      target: '25%', 
      color: 'text-amber-500', 
      activeBg: 'bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]', 
      inactiveBg: 'bg-slate-950/50 border-white/5 opacity-60' 
    },
    { 
      id: 'silver', 
      icon: Award, 
      label: 'Silver', 
      desc: 'Complete 50% of exercises', 
      target: '50%', 
      color: 'text-slate-200', 
      activeBg: 'bg-slate-400/10 border-slate-400/20 shadow-[0_0_15px_-3px_rgba(148,163,184,0.2)]', 
      inactiveBg: 'bg-slate-950/50 border-white/5 opacity-60' 
    },
    { 
      id: 'gold', 
      icon: Trophy, 
      label: 'Gold', 
      desc: 'Complete 75% of exercises', 
      target: '75%', 
      color: 'text-yellow-400', 
      activeBg: 'bg-yellow-400/10 border-yellow-400/20 shadow-[0_0_15px_-3px_rgba(250,204,21,0.2)]', 
      inactiveBg: 'bg-slate-950/50 border-white/5 opacity-60' 
    },
    { 
      id: 'platinum', 
      icon: Crown, 
      label: 'Platinum', 
      desc: 'Complete all exercises', 
      target: '100%', 
      color: 'text-emerald-400', 
      activeBg: 'bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]', 
      inactiveBg: 'bg-slate-950/50 border-white/5 opacity-60' 
    },
    { 
      id: 'cardio', 
      icon: Flame, 
      label: 'Cardio', 
      desc: 'Complete all cardio sessions', 
      target: 'All', 
      color: 'text-rose-500', 
      activeBg: 'bg-rose-500/10 border-rose-500/20 shadow-[0_0_15px_-3px_rgba(244,63,94,0.2)]', 
      inactiveBg: 'bg-slate-950/50 border-white/5 opacity-60' 
    },
  ];

  const achievementsRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const checkScroll = () => {
    if (achievementsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = achievementsRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (achievementsRef.current) {
      achievementsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (achievementsRef.current) {
      achievementsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = achievementsRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <div className="bg-slate-900/50 rounded-3xl border border-white/5 p-6 mb-8 relative overflow-hidden backdrop-blur-sm">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Activity size={140} className="text-white" />
        </div>
        
        <div className="flex justify-between items-end mb-6 relative z-10">
        <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Weekly Goal
            </h2>
            <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">{percentage}%</span>
            <span className="text-slate-500 font-medium text-sm">{completedCount}/{totalCount} exercises</span>
            </div>
        </div>
        <button 
            onClick={resetWeek}
            className="text-xs font-bold text-slate-500 hover:text-rose-400 bg-slate-800/50 hover:bg-rose-950/30 px-3 py-1.5 rounded-lg transition-colors border border-white/5"
        >
            Reset
        </button>
        </div>

        {/* Glowing Progress Bar with Achievement Markers */}
        <div className="h-4 bg-slate-950 rounded-full overflow-hidden mb-8 relative border border-white/5 shadow-inner mt-12">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-1000 ease-out relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.1) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.1) 50%,rgba(255,255,255,.1) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
          </div>
          
          {/* Achievement markers on progress bar */}
          {Object.entries(targetPositions).map(([key, target]) => (
            <div 
              key={key}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${target}%` }}
            >
              <div className={`flex flex-col items-center -ml-3 ${target <= percentage ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-1 h-4 ${rewards[key] ? 'bg-amber-500' : 'bg-slate-600'}`}></div>
                <Target 
                  size={16} 
                  className={`mt-1 ${rewards[key] ? 'text-amber-500' : 'text-slate-600'}`} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Scrollable Rewards Badges */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Achievements</h3>
            <div className="flex gap-2">
              <button 
                onClick={scrollLeft}
                className={`p-1.5 rounded-lg border border-white/5 transition-all ${showLeftScroll ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-900/50 text-slate-600 cursor-not-allowed'}`}
                disabled={!showLeftScroll}
              >
                <ChevronsLeft size={16} />
              </button>
              <button 
                onClick={scrollRight}
                className={`p-1.5 rounded-lg border border-white/5 transition-all ${showRightScroll ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-900/50 text-slate-600 cursor-not-allowed'}`}
                disabled={!showRightScroll}
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
          
          <div 
            ref={achievementsRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {achievements.map((reward) => {
              const isActive = rewards[reward.id];
              const Icon = isActive ? reward.icon : Lock;
              return (
                <div 
                  key={reward.id}
                  className={`flex-shrink-0 w-64 p-4 rounded-xl flex flex-col items-center text-center transition-all duration-500 border ${isActive ? `${reward.activeBg} ${reward.color}` : `${reward.inactiveBg} text-slate-500`}`}
                >
                  <div className={`mb-3 p-3 rounded-full ${isActive ? 'bg-white/10' : 'bg-slate-800'}`}>
                    <Icon size={24} />
                  </div>
                  <div className="font-bold text-sm mb-1">{reward.label}</div>
                  <div className="text-xs text-slate-400 mb-2 px-2">{reward.desc}</div>
                  <div className="text-[10px] font-bold text-slate-500 bg-slate-800/50 px-3 py-1 rounded">
                    {reward.target}
                  </div>
                  {isActive && (
                    <div className="mt-3 text-[10px] font-bold text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-500/20">
                      UNLOCKED
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
    </div>
  );
};

// 4. Exercise Card
const ExerciseCard = ({ 
  exercise, 
  exerciseIndex, 
  dayIndex, 
  split, 
  completedWorkouts, 
  workoutWeights, 
  toggleComplete, 
  updateWeight,
  isRestDay,
  isViewingToday
}) => {
  const key = `${split}-${dayIndex}-${exerciseIndex}`;
  const isCompleted = completedWorkouts[key] || false;
  const setCount = parseSetCount(exercise.sets);
  const weights = workoutWeights[`${key}-weights`] || Array(setCount).fill('');
  
  // Calculate average for display
  const validWeights = weights.map(w => parseFloat(w)).filter(n => !isNaN(n) && n > 0);
  const avg = validWeights.length > 0 ? (validWeights.reduce((a, b) => a + b, 0) / validWeights.length).toFixed(1) : 0;

  return (
    <div className={`group relative p-5 rounded-2xl border transition-all duration-300 ${isCompleted ? 'bg-emerald-950/10 border-emerald-500/20' : 'bg-slate-900/50 border-white/5 hover:border-white/10 hover:bg-slate-900'}`}>
      {/* Visual Indicator Strip */}
      <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full transition-colors ${isCompleted ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pl-3">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded bg-slate-800 text-slate-400 text-xs font-bold mt-0.5 font-mono">{String(exerciseIndex + 1).padStart(2, '0')}</span>
            <div>
                <h3 className={`text-lg font-bold transition-colors ${isCompleted ? 'text-emerald-400' : 'text-slate-200'}`}>{exercise.name}</h3>
                <div className="inline-flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-white/5">{exercise.sets}</span>
                </div>
            </div>
          </div>
          
          {isViewingToday && !isRestDay && (
            <div className="mt-4 pl-9">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Log Weight (kg)</span>
                {avg > 0 && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20">Avg: {avg}</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: setCount }).map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-1 flex-1 min-w-[60px] max-w-[80px]">
                    <input
                      type="number"
                      placeholder="-"
                      value={weights[idx] || ''}
                      onChange={(e) => updateWeight(key, idx, e.target.value)}
                      className="w-full text-center py-2 px-1 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none text-sm font-bold text-white bg-slate-950 focus:bg-slate-900 transition-all placeholder-slate-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Checkbox Action */}
        {isViewingToday && !isRestDay && (
          <div className="flex md:flex-col items-center justify-end md:justify-center border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0">
             <button
              onClick={() => toggleComplete(key)}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${isCompleted ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
             >
               {isCompleted ? <CheckCircle2 size={18} /> : <Square size={18} />}
               <span className="text-sm">{isCompleted ? 'Done' : 'Mark'}</span>
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 5. Modal
const Modal = ({ isOpen, onClose, title, message, icon: Icon }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center transform transition-all scale-100 border border-white/10">
        <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-full flex items-center justify-center mb-6 text-slate-900 shadow-[0_0_30px_-5px_rgba(251,191,36,0.4)]">
          <Icon size={40} />
        </div>
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-slate-400 mb-8 leading-relaxed text-sm">{message}</p>
        <button 
          onClick={onClose}
          className="w-full bg-emerald-500 text-slate-950 font-bold py-3.5 px-6 rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [activeSplit, setActiveSplit] = useState('3day');
  const [currentDayIdx, setCurrentDayIdx] = useState(0);
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [workoutWeights, setWorkoutWeights] = useState({});
  const [lastReward, setLastReward] = useState(null);
  const [sessionTimer, setSessionTimer] = useState({ active: false, seconds: 0, startTime: null });
  const [todaySessionTime, setTodaySessionTime] = useState(0);
  const [todayDateStr, setTodayDateStr] = useState('');
  const [modal, setModal] = useState({ open: false, title: '', message: '', icon: Trophy });
  
  const today = new Date();
  const todayDayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1; 
  const isViewingToday = currentDayIdx === todayDayOfWeek;
  const currentPlan = WORKOUT_PLANS[activeSplit];
  const currentDayData = currentPlan.days[currentDayIdx];
  const isRestDay = currentDayData.dayName.includes("Rest");

  // Create ref for scrolling to workout section
  const workoutSectionRef = useRef(null);

  useEffect(() => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    setTodayDateStr(today.toLocaleDateString('en-US', options));
    setCurrentDayIdx(todayDayOfWeek);
    
    // Load localStorage
    const savedProgress = localStorage.getItem('gymCompletedWorkouts');
    const savedWeights = localStorage.getItem('gymWorkoutWeights');
    const savedReward = localStorage.getItem('gymLastReward');
    const savedTime = localStorage.getItem(`gymSessionTime-${today.toDateString()}`);
    const savedSplit = localStorage.getItem('gymActiveSplit');

    if (savedProgress) setCompletedWorkouts(JSON.parse(savedProgress));
    if (savedWeights) setWorkoutWeights(JSON.parse(savedWeights));
    if (savedReward) setLastReward(savedReward);
    if (savedTime) setTodaySessionTime(parseInt(savedTime));
    if (savedSplit && WORKOUT_PLANS[savedSplit]) setActiveSplit(savedSplit);
  }, []);

  useEffect(() => {
    localStorage.setItem('gymCompletedWorkouts', JSON.stringify(completedWorkouts));
    localStorage.setItem('gymWorkoutWeights', JSON.stringify(workoutWeights));
    localStorage.setItem('gymLastReward', lastReward || '');
    localStorage.setItem(`gymSessionTime-${today.toDateString()}`, todaySessionTime.toString());
    localStorage.setItem('gymActiveSplit', activeSplit);
  }, [completedWorkouts, workoutWeights, lastReward, todaySessionTime, activeSplit]);

  useEffect(() => {
    let interval;
    if (sessionTimer.active) {
      interval = setInterval(() => {
        setSessionTimer(prev => ({
          ...prev,
          seconds: Math.floor((Date.now() - prev.startTime) / 1000)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionTimer.active]);

  const toggleSession = () => {
    if (sessionTimer.active) {
      const minsAdded = Math.round(sessionTimer.seconds / 60);
      setTodaySessionTime(prev => prev + minsAdded);
      setSessionTimer({ active: false, seconds: 0, startTime: null });
    } else {
      setSessionTimer({ active: true, seconds: 0, startTime: Date.now() });
    }
  };

  const toggleComplete = (key) => {
    setCompletedWorkouts(prev => {
      const newState = { ...prev };
      if (newState[key]) delete newState[key];
      else newState[key] = true;
      return newState;
    });
  };

  const updateWeight = (key, index, value) => {
    const weightKey = `${key}-weights`;
    setWorkoutWeights(prev => {
      const currentWeights = [...(prev[weightKey] || [])];
      currentWeights[index] = value;
      return { ...prev, [weightKey]: currentWeights };
    });
  };

  // FIXED Reset Week function
  const resetWeek = () => {
    if (window.confirm("Are you sure? This clears all weekly progress for ALL splits, not just the current one?")) {
      // Stop any active session timer
      if (sessionTimer.active) {
        setSessionTimer({ active: false, seconds: 0, startTime: null });
      }
      
      // Clear state
      setCompletedWorkouts({});
      setWorkoutWeights({});
      setLastReward(null);
      setTodaySessionTime(0);
      
      // Clear all relevant localStorage items
      localStorage.removeItem('gymCompletedWorkouts');
      localStorage.removeItem('gymWorkoutWeights');
      localStorage.removeItem('gymLastReward');
      
      // Clear today's session time
      const currentDate = new Date();
      localStorage.removeItem(`gymSessionTime-${currentDate.toDateString()}`);
      
      // Show confirmation
      setModal({ 
        open: true, 
        title: "Week Reset Complete", 
        message: "All workout progress has been cleared. You're starting fresh!", 
        icon: RotateCcw 
      });
    }
  };

  // Function to scroll to workout section
  const scrollToWorkoutSection = () => {
    if (workoutSectionRef.current) {
      workoutSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Function to handle "Go to Today" button
  const handleGoToToday = () => {
    setCurrentDayIdx(todayDayOfWeek);
    // Scroll to workout section after a small delay to allow state update
    setTimeout(() => {
      scrollToWorkoutSection();
    }, 100);
  };

  const calculateStats = () => {
    let totalExercises = 0;
    let completedCount = 0;
    let upperBodyPR = 0;
    let lowerBodyPR = 0;
    let cardioDays = 0;
    let cardioDone = 0;

    currentPlan.days.forEach((day, dIdx) => {
      day.exercises.forEach((ex, exIdx) => {
        totalExercises++;
        const key = `${activeSplit}-${dIdx}-${exIdx}`;
        if (completedWorkouts[key]) completedCount++;

        // Calculate PRs for upper and lower body
        const weightKey = `${key}-weights`;
        const weights = workoutWeights[weightKey];
        if (weights) {
          const validWeights = weights.map(w => parseFloat(w)).filter(n => !isNaN(n) && n > 0);
          if (validWeights.length > 0) {
            const maxWeight = Math.max(...validWeights);
            const category = categorizeExercise(ex.name);
            
            if (category === 'upper' && maxWeight > upperBodyPR) {
              upperBodyPR = maxWeight;
            } else if (category === 'lower' && maxWeight > lowerBodyPR) {
              lowerBodyPR = maxWeight;
            }
          }
        }
      });

      if (!day.dayName.includes("Rest")) {
        totalExercises++;
        cardioDays++;
        const key = `${activeSplit}-${dIdx}-cardio`;
        if (completedWorkouts[key]) {
          completedCount++;
          cardioDone++;
        }
      }
    });

    const percentage = totalExercises === 0 ? 0 : Math.round((completedCount / totalExercises) * 100);
    const cardioRate = cardioDays === 0 ? 0 : Math.round((cardioDone / cardioDays) * 100);
    const rewards = {
      bronze: percentage >= 25,
      silver: percentage >= 50,
      gold: percentage >= 75,
      platinum: percentage === 100,
      cardio: cardioDone === cardioDays && cardioDays > 0
    };

    return { 
      completedCount, 
      totalExercises, 
      percentage, 
      upperBodyPR: upperBodyPR.toFixed(1), 
      lowerBodyPR: lowerBodyPR.toFixed(1), 
      cardioRate,
      cardioDone,
      cardioDays,
      rewards 
    };
  };

  const stats = calculateStats();

  useEffect(() => {
    const checkReward = (id, title, msg) => {
      if (stats.rewards[id] && lastReward !== id) {
        const rewardOrder = ['bronze', 'silver', 'gold', 'platinum'];
        const currentIndex = rewardOrder.indexOf(id);
        const lastIndex = rewardOrder.indexOf(lastReward);
        
        if (currentIndex > lastIndex) {
          setLastReward(id);
          setModal({ open: true, title, message: msg, icon: id === 'platinum' ? Crown : Trophy });
        }
      }
    };
    
    if (stats.percentage === 100) checkReward('platinum', 'Platinum Crown Unlocked!', "Perfect! You've completed 100% of your weekly workout goals.");
    else if (stats.percentage >= 75) checkReward('gold', 'Gold Trophy Unlocked!', "Excellent! You've completed 75% of your weekly goals.");
    else if (stats.percentage >= 50) checkReward('silver', 'Silver Badge Unlocked!', "Great job! You're halfway through the week.");
    else if (stats.percentage >= 25) checkReward('bronze', 'Bronze Badge Unlocked!', "Good start! You've completed 25% of your workouts.");
  }, [stats.percentage, lastReward]);


  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-white pb-12">
      <Header 
        todayDate={todayDateStr}
        isSessionActive={sessionTimer.active}
        sessionTime={sessionTimer.active ? sessionTimer.seconds : (todaySessionTime * 60)}
        onToggleSession={toggleSession}
        onGoToToday={handleGoToToday}
        isViewingToday={isViewingToday}
      />

      <main className="max-w-5xl mx-auto px-4 mt-8">
        
        {/* Top Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Program Selection</label>
                <div className="relative group">
                    <select 
                        value={activeSplit} 
                        onChange={(e) => setActiveSplit(e.target.value)}
                        className="w-full p-3 pl-4 bg-slate-950 border border-slate-800 rounded-xl font-bold text-slate-200 appearance-none focus:ring-2 focus:ring-emerald-500/50 outline-none cursor-pointer transition-colors"
                    >
                        {Object.entries(WORKOUT_PLANS).map(([key, plan]) => (
                            <option key={key} value={key}>{plan.name} ({plan.description})</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <ChevronRight className="rotate-90" size={16} />
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Day Selection</label>
                <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-1.5">
                    <button 
                        onClick={() => setCurrentDayIdx(Math.max(0, currentDayIdx - 1))}
                        disabled={currentDayIdx === 0}
                        className="p-2.5 hover:bg-slate-800 rounded-lg disabled:opacity-30 transition-all text-slate-400 hover:text-white"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="text-center px-4">
                        <div className={`font-black text-sm md:text-base ${isRestDay ? 'text-amber-500' : 'text-white'}`}>
                            {currentDayData.name} <span className="opacity-40 mx-2">|</span> {currentDayData.dayName}
                        </div>
                    </div>
                    <button 
                        onClick={() => setCurrentDayIdx(Math.min(6, currentDayIdx + 1))}
                        disabled={currentDayIdx === 6}
                        className="p-2.5 hover:bg-slate-800 rounded-lg disabled:opacity-30 transition-all text-slate-400 hover:text-white"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>

        <StatsSummary stats={{...stats, sessionTime: todaySessionTime}} />
        
        <ProgressSection 
            completedCount={stats.completedCount} 
            totalCount={stats.totalExercises} 
            percentage={stats.percentage}
            rewards={stats.rewards}
            resetWeek={resetWeek}
        />

        {/* Exercises - Ref added for scrolling */}
        <div className="space-y-6" ref={workoutSectionRef}>
            <div className="flex items-center justify-between px-1">
                 <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                    {isViewingToday ? "Today's Workout" : `${currentDayData.name}'s Workout`}
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${isRestDay ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                        {currentDayData.exercises.length} Exercises
                    </span>
                 </h2>
            </div>

            {!isViewingToday && !isRestDay && (
                <div className="flex items-center gap-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 p-4 rounded-xl text-sm font-medium">
                    <div className="p-2 bg-indigo-500/20 rounded-lg shrink-0"><Info size={18} /></div>
                    Preview Mode: Switch to "Today" to log data.
                </div>
            )}

            {isRestDay ? (
                <div className="bg-amber-500/5 border-2 border-dashed border-amber-500/20 rounded-3xl p-12 text-center flex flex-col items-center">
                    <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mb-6 shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)]">
                        <RotateCcw size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Rest & Recovery</h3>
                    <p className="text-slate-400 max-w-md mx-auto mb-8 font-medium">Active recovery day. Focus on mobility, stretching, or light cardio to keep blood flowing.</p>
                    <div className="w-full max-w-md bg-slate-900/50 p-4 rounded-xl border border-white/5 shadow-sm flex items-center gap-4 text-left">
                        <div className="p-3 bg-slate-800 rounded-full text-amber-500"><Activity size={24} /></div>
                        <div>
                            <div className="font-bold text-white">Suggested Activity</div>
                            <div className="text-sm text-slate-400">{currentDayData.cardio}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {currentDayData.exercises.map((ex, idx) => (
                        <ExerciseCard 
                            key={idx} 
                            exercise={ex} 
                            exerciseIndex={idx}
                            dayIndex={currentDayIdx}
                            split={activeSplit}
                            completedWorkouts={completedWorkouts}
                            workoutWeights={workoutWeights}
                            toggleComplete={toggleComplete}
                            updateWeight={updateWeight}
                            isRestDay={isRestDay}
                            isViewingToday={isViewingToday}
                        />
                    ))}

                    {/* Cardio Card */}
                    <div className={`p-6 rounded-2xl border-2 border-dashed transition-all ${completedWorkouts[`${activeSplit}-${currentDayIdx}-cardio`] ? 'bg-rose-500/10 border-rose-500/30' : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl shrink-0 ${completedWorkouts[`${activeSplit}-${currentDayIdx}-cardio`] ? 'bg-rose-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                                    <Flame size={24} />
                                </div>
                                <div>
                                    <h4 className={`text-lg font-bold ${completedWorkouts[`${activeSplit}-${currentDayIdx}-cardio`] ? 'text-rose-400' : 'text-slate-300'}`}>Cardio Session</h4>
                                    <p className="text-slate-500 font-medium">{currentDayData.cardio}</p>
                                </div>
                            </div>
                            
                            {isViewingToday && (
                                <button
                                    onClick={() => toggleComplete(`${activeSplit}-${currentDayIdx}-cardio`)}
                                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${completedWorkouts[`${activeSplit}-${currentDayIdx}-cardio`] ? 'bg-rose-500 text-white shadow-lg shadow-rose-900/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                                >
                                    {completedWorkouts[`${activeSplit}-${currentDayIdx}-cardio`] ? <CheckCircle2 size={20} /> : <Square size={20} />}
                                    {completedWorkouts[`${activeSplit}-${currentDayIdx}-cardio`] ? 'Completed' : 'Mark'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/50">
            <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-6 text-center">Pro Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { title: "Progressive Overload", text: "Increase weight only when you hit the top rep range for all sets." },
                    { title: "Small Steps", text: "Upper body: +2.5kg. Lower body: +5kg. Don't rush the process." },
                    { title: "Tempo Control", text: "Explode up, control down (2-3 seconds). Momentum kills gains." },
                    { title: "One Variable", text: "Change weight OR reps OR rest. Never change all three at once." },
                    { title: "Performance Drop", text: "If you stall, hold weight for 2 weeks. Focus on sleep and food." },
                    { title: "Safety First", text: "Warm up properly. If it hurts (bad pain), stop immediately." }
                ].map((g, i) => (
                    <div key={i} className="bg-slate-900/50 p-5 rounded-xl border border-white/5 text-sm hover:border-white/10 transition-colors">
                        <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-bold">{i+1}</span>
                            {g.title}
                        </h4>
                        <p className="text-slate-500 pl-7 leading-relaxed text-xs">{g.text}</p>
                    </div>
                ))}
            </div>
        </div>

      </main>
      
      <Modal 
        isOpen={modal.open} 
        onClose={() => setModal({...modal, open: false})} 
        title={modal.title} 
        message={modal.message} 
        icon={modal.icon} 
      />
    </div>
  );
};

export default App;