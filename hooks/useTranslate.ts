import { useMutation } from '@tanstack/react-query';
import { type TranslateRequest, type TranslateResponse } from '../types';

async function translateText(data: TranslateRequest): Promise<TranslateResponse> {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to translate');
  }

  return response.json();
}

export const useTranslate = () => {
  return useMutation<TranslateResponse, Error, TranslateRequest>({ 
    mutationFn: translateText 
  });
}
