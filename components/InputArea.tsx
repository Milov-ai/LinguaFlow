import { useState } from 'react';
import { useTranslate } from '../hooks/useTranslate';
import type { TranslateResponse } from '../types';

interface InputAreaProps {
  onSuccess: (data: TranslateResponse) => void;
  onError: (error: Error) => void;
  onTranslateStart: () => void;
}

export function InputArea({ onSuccess, onError, onTranslateStart }: InputAreaProps) {
  const [text, setText] = useState('');
  const { mutate, isPending } = useTranslate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onTranslateStart();
    mutate({ text }, {
      onSuccess: onSuccess,
      onError: onError,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe algo para traducir..."
        className="w-full h-32 p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isPending}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={isPending || !text.trim()}
      >
        {isPending ? 'Traduciendo...' : 'Traducir'}
      </button>
    </form>
  );
}
