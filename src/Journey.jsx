import React, { useState, useMemo, useEffect } from 'react';

const Journey = ({ counts, darkMode, onBack, onManualTap }) => {
    const [goal, setGoal] = useState(() => parseInt(localStorage.getItem('dailyGoal')) || 108);

    useEffect(() => {
        localStorage.setItem('dailyGoal', goal);
    }, [goal]);

    // --- Calculations ---

    // Flatten all counts
    const allCounts = useMemo(() => {
        const all = [];
        Object.values(counts).forEach(mantraCounts => {
            if (Array.isArray(mantraCounts)) {
                all.push(...mantraCounts);
            }
        });
        // Sort by timestamp descending
        return all.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }, [counts]);

    const totalBeads = allCounts.length; // Approximate: 1 entry = 1 Mala (Wait, standard logic is 1 entry = 1 Word set?)
    // Actually, in App.jsx: "newCount" is added when "index === words.length - 1".
    // So 1 entry in counts = 1 Full Mantra Repetition (1 Bead).
    // Perfect.

    // Streaks
    const streak = useMemo(() => {
        if (allCounts.length === 0) return 0;

        const dates = new Set(allCounts.map(c => c.timestamp.split('T')[0]));
        const sortedDates = Array.from(dates).sort((a, b) => new Date(b) - new Date(a)); // Descending

        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        let currentStreak = 0;
        let checkDate = sortedDates[0] === today ? today : yesterday;

        if (!sortedDates.includes(checkDate)) return 0; // Streak broken

        // Iterate backwards
        let dateObj = new Date(checkDate);
        while (true) {
            const dateStr = dateObj.toISOString().split('T')[0];
            if (dates.has(dateStr)) {
                currentStreak++;
                dateObj.setDate(dateObj.getDate() - 1);
            } else {
                break;
            }
        }
        return currentStreak;
    }, [allCounts]);

    // Today's Count
    const todayCount = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        return allCounts.filter(c => c.timestamp.startsWith(today)).length;
    }, [allCounts]);

    // Weekly Activity for Chart
    const weeklyData = useMemo(() => {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const items = allCounts.filter(c => c.timestamp.startsWith(dateStr));
            data.push({
                day: d.toLocaleDateString('en-US', { weekday: 'short' }),
                count: items.length
            });
        }
        return data;
    }, [allCounts]);

    const maxWeekly = Math.max(...weeklyData.map(d => d.count), 10); // Min max 10 for scale

    // Gamification Levels
    const LEVELS = [
        { name: 'Novice', target: 108 },
        { name: 'Seeker', target: 1008 },
        { name: 'Devotee', target: 5000 },
        { name: 'Sage', target: 11000 },
        { name: 'Enlightened', target: 108000 }
    ];

    const currentLevelIndex = LEVELS.findIndex(l => totalBeads < l.target);
    const nextLevel = currentLevelIndex === -1 ? LEVELS[LEVELS.length - 1] : LEVELS[currentLevelIndex];
    const prevLevelTarget = currentLevelIndex > 0 ? LEVELS[currentLevelIndex - 1].target : 0;

    const progressPercent = Math.min(100, Math.max(0, ((totalBeads - prevLevelTarget) / (nextLevel.target - prevLevelTarget)) * 100));

    return (
        <div className={`min-h-screen p-4 pb-20 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-stone-50 text-stone-800'}`}>
            <div className="max-w-md mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className={`p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-stone-600'}`}
                    >
                        ← Back
                    </button>
                    <h1 className="text-xl font-bold">Your Spiritual Journey</h1>
                    <div className="w-8"></div> {/* Spacer */}
                </div>

                {/* Gamification / Manual Tap */}
                <div className={`rounded-xl p-6 text-center border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
                    <h2 className="text-lg font-medium mb-1">Path to Divinity</h2>
                    <div className="text-sm opacity-75 mb-4">Total Chants: {totalBeads.toLocaleString()}</div>

                    {/* Progress Bar */}
                    <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs opacity-60 mb-8">
                        <span>{currentLevelIndex > 0 ? LEVELS[currentLevelIndex - 1].name : 'Start'}</span>
                        <span>{nextLevel.name}</span>
                    </div>

                    {/* Manual Tap Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={onManualTap}
                            className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl shadow-lg active:scale-95 transition-transform 
                ${darkMode ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-purple-900/50' : 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 border-4 border-orange-300 shadow-orange-200'}
              `}
                        >
                            🕉️
                        </button>
                    </div>
                    <div className="text-xs mt-3 opacity-60">Tap to Chant Manually</div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Streak */}
                    <div className={`rounded-xl p-4 flex flex-col items-center justify-center border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
                        <div className="text-3xl font-bold text-orange-500">🔥 {streak}</div>
                        <div className="text-xs uppercase tracking-wide mt-1">Day Streak</div>
                    </div>

                    {/* Daily Goal */}
                    <div className={`rounded-xl p-4 flex flex-col items-center justify-center border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
                        <div className="relative w-16 h-16 mb-2">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className={darkMode ? 'text-gray-700' : 'text-gray-200'} />
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-green-500"
                                    strokeDasharray={175}
                                    strokeDashoffset={175 - (Math.min(todayCount / goal, 1) * 175)}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                                {Math.round((todayCount / goal) * 100)}%
                            </div>
                        </div>
                        <div className="text-xs uppercase tracking-wide">Daily Goal</div>
                        <input
                            type="number"
                            value={goal}
                            onChange={(e) => setGoal(Number(e.target.value))}
                            className={`w-16 text-center text-xs mt-1 border-b bg-transparent focus:outline-none ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
                        />
                    </div>
                </div>

                {/* Charts */}
                <div className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
                    <h3 className="font-semibold mb-4 text-sm uppercase text-center opacity-75">Last 7 Days Activity</h3>
                    <div className="flex items-end justify-between h-32 gap-2">
                        {weeklyData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t relative flex items-end overflow-hidden h-full">
                                    <div
                                        className={`w-full transition-all duration-500 ${d.count >= goal ? 'bg-green-500' : 'bg-blue-500'}`}
                                        style={{ height: `${(d.count / maxWeekly) * 100}%` }}
                                    ></div>
                                    {/* Tooltip */}
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {d.count}
                                    </div>
                                </div>
                                <div className="text-xs opacity-50">{d.day}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Journey;
