import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = false, message = 'Loading...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      <Loader2 className="w-8 h-8 text-sky-600 dark:text-sky-400 animate-spin" />
      {message && <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
