import { Spinner } from './Spinner';
import { ResultCard } from './ResultCard';
import type { TranslateResponse, Status } from '../types';

interface ResultsAreaProps {
  status: Status;
  data: TranslateResponse | null;
  error: Error | null;
}

const languageFlags: Record<string, string> = {
  english: '🇺🇸',
  spanish: '🇪🇸',
  french: '🇫🇷',
};

export function ResultsArea({ status, data, error }: ResultsAreaProps) {
  if (status === 'idle') {
    return null; // Don't render anything initially
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-red-900 border border-red-700 text-red-200 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Error</h3>
        <p>{error?.message || 'An unknown error occurred.'}</p>
      </div>
    );
  }

  if (status === 'success' && data) {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Detected Language: <span className="font-normal text-gray-300">{data.detectedLanguage}</span></h3>
        </div>
        <ResultCard language="English" text={data.translations.english} flag={languageFlags.english} />
        <ResultCard language="Spanish" text={data.translations.spanish} flag={languageFlags.spanish} />
        <ResultCard language="French" text={data.translations.french} flag={languageFlags.french} />
      </div>
    );
  }

  return null;
}
