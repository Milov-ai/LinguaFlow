import React from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard.ts';
import { ClipboardIcon, CheckIcon } from './icons.tsx';

interface ResultCardProps {
  language: string;
  text: string;
  flag: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ language, text, flag }) => {
  const [isCopied, copy] = useCopyToClipboard();

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 relative group">
      <div className="flex items-center mb-3">
        <span className="text-xl mr-3">{flag}</span>
        <h4 className="font-semibold text-slate-300">{language}</h4>
      </div>
      <p className="text-slate-200 text-base pr-10">{text}</p>
      <button
        onClick={() => copy(text)}
        className="absolute top-3 right-3 p-2 bg-slate-700 rounded-md hover:bg-slate-600 text-slate-400 hover:text-white transition-all duration-200 opacity-50 group-hover:opacity-100"
        aria-label={`Copy ${language} text`}
      >
        {isCopied ? (
          <CheckIcon className="w-5 h-5 text-green-400" />
        ) : (
          <ClipboardIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};