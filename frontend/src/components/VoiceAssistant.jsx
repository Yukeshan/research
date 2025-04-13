import React, { useState, useEffect } from 'react';

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]); // Store the conversation history

  const formatTextWithStyles = (text) => {
    if (!text) return '';
    return text
      .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>') // bold
      .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>')            // italic
      .replace(/`(.*?)`/g, '<code>$1</code>')              // inline code
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>') // blockquote
      .replace(/^\d+\.\s(.*$)/gim, '<li>$1</li>')             // numbered list
      .replace(/^[-*+]\s(.*$)/gim, '<li>$1</li>')             // bullet list
      .replace(/(?:\r\n|\r|\n)/g, '<br/>')                   // line breaks
      .trim();
  };

  useEffect(() => {
    if (response && window.speechSynthesis) {
      const plainText = response
        .replace(/[*_~`>#-]/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find((voice) => voice.lang === 'en-US');
      if (enVoice) {
        utterance.voice = enVoice;
      }

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [response]);

  const startListening = () => {
    // Stop speaking before starting listening
    stopSpeaking();

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

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  const getGeminiResponse = async (text) => {
    try {
      const apiKey = 'AIzaSyArHPGqlwI6iW9eYx5ymNP8NMlQfzDLnEs';
      const instruction = "You are a helpful voice assistant. only explain the things more clearly when asked. if i didn't asked in the prompt, don't.";
      const conversationPrompt = conversationHistory
        .map(({ role, content }) => `${role}: ${content}`)
        .join('\n');
      const fullPrompt = `${instruction}\n${conversationPrompt}\nUser: ${text}`;

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }], 
          }),
        }
      );
      const data = await response.json();
      const geminiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini';

      setResponse(geminiReply);

      // Update conversation history with the new user input and assistant response
      setConversationHistory((prevHistory) => [
        ...prevHistory,
        { role: 'User', content: text },
        { role: 'Assistant', content: geminiReply },
      ]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setResponse('Error getting response from Gemini');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-blue-800">Cook It – Voice Assistant</h1>

      <div className="flex space-x-4">
        <button
          onClick={startListening}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition"
        >
          {listening ? 'Listening...' : '🎙️ Listen'}
        </button>
        <button
          onClick={stopSpeaking}
          className="bg-red-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-red-600 transition"
        >
          ⏹ Stop
        </button>
      </div>

      {transcript && (
        <div className="bg-white shadow-md p-4 rounded-xl max-w-xl w-full text-gray-800 border-l-4 border-blue-500">
          <h2 className="font-semibold mb-1 text-blue-600">You said:</h2>
          <p className="text-lg">{transcript}</p>
        </div>
      )}

      {response && (
        <div className="bg-white shadow-md p-5 rounded-xl max-w-xl w-full border-l-4 border-green-500">
          <h2 className="font-semibold mb-2 text-green-600">Cook It says:</h2>
          <div
            className="prose prose-blue max-w-none text-gray-800 leading-relaxed prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-code:bg-gray-100 prose-code:rounded prose-code:px-1 prose-code:text-sm"
            dangerouslySetInnerHTML={{ __html: formatTextWithStyles(response) }}
          />
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
