'use client';

import { useState } from 'react';

// SpongeBob dictionary for consistent translation
const dictionary: Record<string, string> = {
  'hello': 'barnacle',
  'hi': 'tartar sauce',
  'goodbye': 'kelp shake',
  'bye': 'sea pickle',
  'yes': 'krabby patty',
  'no': 'chum bucket',
  'thank you': 'neptune blessing',
  'thanks': 'coral bits',
  'please': 'jellyfish jam',
  'sorry': 'barnacle head',
  'love': 'pineapple',
  'hate': 'plankton',
  'good': 'golden spatula',
  'bad': 'rotten kelp',
  'happy': 'bubble blowing',
  'sad': 'crying clarinet',
  'angry': 'squidward',
  'friend': 'best buddy',
  'work': 'krusty krab',
  'home': 'bikini bottom',
  'food': 'krabby patty',
  'water': 'goo lagoon',
  'money': 'mr krabs',
  'help': 'gary meow',
  'okay': 'aye aye captain',
  'ok': 'aye captain',
  'great': 'imagination rainbow',
  'awesome': 'f is for friends',
  'cool': 'radical',
  'nice': 'sweet victory',
  'beautiful': 'mermaid man',
  'ugly': 'barnacle boy',
  'smart': 'boating school',
  'stupid': 'patrick star',
  'funny': 'laugh box',
  'boring': 'clarinet practice',
  'excited': 'ready ready ready',
  'tired': 'sleepy gary',
  'hungry': 'feed me',
  'full': 'bloated pufferfish',
  'hot': 'volcano sauce',
  'cold': 'freezer burn',
  'big': 'alaskan bull worm',
  'small': 'plankton size',
  'fast': 'speedy seahorse',
  'slow': 'snail pace',
  'strong': 'anchor arms',
  'weak': 'noodle arms',
  'right': 'correct spatula',
  'wrong': 'burnt patty',
  'easy': 'bubble blowing 101',
  'hard': 'fine dining',
  'fun': 'fun fun fun',
  'party': 'krusty krab pizza',
  'music': 'sweet sweet victory',
  'dance': 'striped sweater',
  'sing': 'ripped pants',
  'laugh': 'dolphin noise',
  'cry': 'tear waterfall',
  'sleep': 'gary snore',
  'wake': 'foghorn alarm',
  'eat': 'chomp chomp',
  'drink': 'slurp slurp',
  'run': 'panicked sponge',
  'walk': 'jelly fishing',
  'jump': 'trampoline',
  'sit': 'lazy patrick',
  'stand': 'attention',
  'go': 'bubble transition',
  'stop': 'red light',
  'start': 'green light',
  'end': 'the end card',
  'begin': 'french narrator',
  'finish': 'time card',
  'wait': 'loading',
  'hurry': 'panic mode',
  'now': 'right now',
  'later': 'eventually',
  'today': 'this fine day',
  'tomorrow': 'next sunrise',
  'yesterday': 'last sunset',
  'morning': 'sunrise',
  'night': 'moonshine',
  'day': 'sunshine',
  'week': 'seven sunrises',
  'month': 'many moons',
  'year': 'annual fry cook games',
};

function translateToSpongeBob(text: string): string {
  const words = text.toLowerCase().split(/\b/);
  return words.map(word => {
    const cleanWord = word.trim();
    return dictionary[cleanWord] || word;
  }).join('');
}

function translateToEnglish(text: string): string {
  const reverseDictionary: Record<string, string> = {};
  Object.entries(dictionary).forEach(([eng, sponge]) => {
    reverseDictionary[sponge] = eng;
  });
  
  let result = text.toLowerCase();
  Object.entries(reverseDictionary).forEach(([sponge, eng]) => {
    const regex = new RegExp(sponge, 'gi');
    result = result.replace(regex, eng);
  });
  
  return result;
}

export default function Landing() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'toSpongebob' | 'toEnglish'>('toSpongebob');

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    
    if (mode === 'toSpongebob') {
      setOutputText(translateToSpongeBob(inputText));
    } else {
      setOutputText(translateToEnglish(inputText));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 text-gray-900">
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-center text-5xl md:text-6xl font-bold mb-2 text-yellow-900">
          🧽 SpongeBob Translator 🧽
        </h1>
        <p className="text-center text-lg mb-8 text-yellow-800">
          Translate between English and nonsensical SpongeBob speak!
        </p>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setMode('toSpongebob')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mode === 'toSpongebob'
                ? 'bg-yellow-900 text-yellow-100 scale-105'
                : 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200'
            }`}
          >
            English → SpongeBob
          </button>
          <button
            onClick={() => setMode('toEnglish')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mode === 'toEnglish'
                ? 'bg-yellow-900 text-yellow-100 scale-105'
                : 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200'
            }`}
          >
            SpongeBob → English
          </button>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            {mode === 'toSpongebob' ? 'Enter English:' : 'Enter SpongeBob Speak:'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === 'toSpongebob' ? 'Type your message in English...' : 'Paste SpongeBob speak here...'}
            className="w-full h-32 p-4 border-2 border-yellow-300 rounded-lg resize-none focus:outline-none focus:border-yellow-500 text-lg"
          />
        </div>

        {/* Translate Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleTranslate}
            className="bg-yellow-900 text-yellow-100 px-12 py-4 rounded-full text-xl font-bold hover:bg-yellow-800 transition-all hover:scale-105 shadow-lg"
          >
            🔄 Translate!
          </button>
        </div>

        {/* Output Area */}
        {outputText && (
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                {mode === 'toSpongebob' ? 'SpongeBob Speak:' : 'English:'}
              </label>
              <button
                onClick={handleCopy}
                className="bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-400 transition-all"
              >
                📋 Copy
              </button>
            </div>
            <div className="w-full min-h-32 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg text-lg whitespace-pre-wrap break-words">
              {outputText}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

