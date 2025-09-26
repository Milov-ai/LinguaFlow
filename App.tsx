import { useState } from 'react';
import "./src/index.css";
import { InputArea } from './components/InputArea';
import { ResultsArea } from './components/ResultsArea';
import type { TranslateResponse, Status } from './types';

function App() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TranslateResponse | null>(null);

  const handleSuccess = (data: TranslateResponse) => {
    setData(data);
    setStatus('success');
    setError(null);
  };

  const handleError = (error: Error) => {
    setError(error);
    setStatus('error');
    setData(null);
  };

  // This is a bit of a hack to get the loading status from the mutation
  // A better way would be to use the isPending from useTranslate directly
  // but this keeps the components decoupled.
  const handleTranslateStart = () => {
    setStatus('loading');
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">LinguaFlow</h1>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <InputArea
          onSuccess={handleSuccess}
          onError={handleError}
          onTranslateStart={handleTranslateStart}
        />
        <ResultsArea status={status} data={data} error={error} />
      </div>
    </main>
  );
}

export default App;