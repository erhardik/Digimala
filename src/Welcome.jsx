import React, { useState } from 'react';

const Welcome = ({ onStart, darkMode }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onStart(name.trim());
        }
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-stone-50 text-stone-800'}`}>
            <div className={`w-full max-w-md p-8 rounded-2xl shadow-lg border text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
                <div className="text-6xl mb-6">📿</div>
                <h1 className="text-3xl font-light mb-2">Welcome to DigiMala</h1>
                <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-stone-500'}`}>Your personal digital chanting companion</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className={`block text-left text-xs uppercase font-bold mb-2 ml-1 ${darkMode ? 'text-gray-500' : 'text-stone-400'}`}>What should we call you?</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className={`w-full p-4 text-lg border-b-2 bg-transparent focus:outline-none transition-colors ${darkMode ? 'border-gray-600 focus:border-orange-500' : 'border-stone-300 focus:border-orange-500'}`}
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!name.trim()}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
              ${darkMode ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'}`}
                    >
                        Start Practising
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Welcome;
