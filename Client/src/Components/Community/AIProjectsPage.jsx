import React, { useState } from 'react';

const AIProjectsPage = () => {
  const [textInput, setTextInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const analyzeText = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: textInput })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze text');
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    if (analysisResult && analysisResult.generations && analysisResult.generations.length > 0) {
      const text = analysisResult.generations[0].text;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated_response.txt';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">AI Projects</h1>
      
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Analyze Text</h2>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded"
          value={textInput}
          onChange={handleTextInputChange}
          placeholder="Enter text to analyze..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={analyzeText}
        >
          Analyze
        </button>
      </div>

      {analysisResult && (
        <div>
          <h2 className="text-2xl font-bold">Generated Text:</h2>
          <div className="overflow-auto max-h-96 border border-gray-300 rounded p-4">
            <pre>{analysisResult.generations[0].text}</pre>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleDownload}
          >
            Download Response
          </button>
        </div>
      )}
    </div>
  );
};

export default AIProjectsPage;
