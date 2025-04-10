import React, { useState, useEffect } from 'react';

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [speechSynthesisUtterance, setSpeechSynthesisUtterance] = useState(null);

  useEffect(() => {
    if (response && window.speechSynthesis && speechSynthesisUtterance) {
      speechSynthesisUtterance.text = response;
      window.speechSynthesis.speak(speechSynthesisUtterance);
    }
  }, [response, speechSynthesisUtterance]);

  useEffect(() => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'en-US'; // You can adjust the language
      utterance.rate = 1;   // Adjust the speech rate (0.1 to 10)
      utterance.pitch = 1;  // Adjust the speech pitch (0 to 2)
      setSpeechSynthesisUtterance(utterance);
    } else {
      console.error("Speech synthesis is not supported in this browser.");
    }
  }, []);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();
    setListening(true);

    recognition.onresult = async (event) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      recognition.stop();
      setListening(false);
      await getGeminiResponse(speech);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      setListening(false);
    };
  };

  const getGeminiResponse = async (text) => {
    try {
      const apiKey = 'AIzaSyArHPGqlwI6iW9eYx5ymNP8NMlQfzDLnEs';
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text }] }],
          }),
        }
      );
      const data = await response.json();
      const geminiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini';
      setResponse(geminiReply);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setResponse('Error getting response from Gemini');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <button
        onClick={startListening}
        className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-600"
      >
        {listening ? 'Listening...' : 'Listen'}
      </button>
      {transcript && (
        <p className="mt-4 text-gray-700 text-center">You said: "{transcript}"</p>
      )}
      {response && (
        <p className="mt-2 text-green-700 text-center">Gemini says: {response}</p>
      )}
    </div>
  );
};

export default VoiceAssistant;