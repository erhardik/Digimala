import React from 'react';

const BottomNav = ({ currentView, onChangeView, onExit, darkMode }) => {
    const getButtonClass = (viewName) => {
        const isActive = currentView === viewName;
        if (isActive) {
            return darkMode ? 'text-orange-400' : 'text-orange-600';
        }
        return darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-stone-400 hover:text-stone-600';
    };

    return (
        <div className={`fixed bottom-0 left-0 right-0 h-16 border-t flex items-center justify-around px-4 bg-opacity-95 backdrop-blur-md z-50 overflow-hidden
      ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-stone-200'}`}
        >
            <button
                onClick={() => onChangeView('practice')}
                className={`flex flex-col items-center gap-1 transition-colors flex-shrink-0 ${getButtonClass('practice')}`}
            >
                <div className="text-xl">🧘</div>
                <span className="text-[10px] font-medium uppercase tracking-wide">Practice</span>
            </button>

            <button
                onClick={() => onChangeView('home')}
                className={`flex flex-col items-center gap-1 transition-colors flex-shrink-0 ${getButtonClass('home')}`}
            >
                <div className="text-xl">📋</div>
                <span className="text-[10px] font-medium uppercase tracking-wide">List</span>
            </button>

            <button
                onClick={() => onChangeView('journey')}
                className={`flex flex-col items-center gap-1 transition-colors flex-shrink-0 ${getButtonClass('journey')}`}
            >
                <div className="text-xl">📊</div>
                <span className="text-[10px] font-medium uppercase tracking-wide">Journey</span>
            </button>

            <button
                onClick={onExit}
                className={`flex flex-col items-center gap-1 transition-colors flex-shrink-0 ${darkMode ? 'text-gray-500 hover:text-red-400' : 'text-stone-400 hover:text-red-600'}`}
            >
                <div className="text-xl">🚪</div>
                <span className="text-[10px] font-medium uppercase tracking-wide">Exit</span>
            </button>
        </div>
    );
};

export default BottomNav;
