export interface TranslateResponse {
  detectedLanguage: string;
  translations: {
    english: string;
    spanish: string;
    french: string;
  };
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface TranslateRequest {
  text: string;
}
