import './index.css';
import React , { useState, useEffect, useRef } from 'react';

const WelcomPage = () => {
  const [typedText, setTypedText] = useState('');
  const phrases = [
    "Unlock Opportunities, Exchange Skills, Build Your Future!"
   
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const typingIntervalRef = useRef(null);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < currentPhrase.length) {
        setTypedText(currentPhrase.slice(0, currentIndex + 1));
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        // Reset for next phrase
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setCurrentIndex(0);
        setTypedText('');
      }
    }, 100); // Typing speed

    return () => clearInterval(typingIntervalRef.current);
  }, [currentPhraseIndex, currentIndex, phrases]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
  <div className="relative h-screen">
    {/* Background Video */}
    <video
      className="absolute inset-0 w-full h-full object-cover filter brightness-50"
      autoPlay
      loop
      muted
      playsInline
    >
       <source src="/vid.mp4" type="video/mp4" />
      {/* Fallback text for unsupported browsers */}
      Your browser does not support the video tag.
    </video>

    {/* Content Overlay */}
    <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
      <h1 className="text-5xl text-white font-bold mb-6">Service to Service</h1>

      {/* Typing Animation */}
      <p className="text-2xl mb-12 h-12">
        {typedText}
        <span className="animate-pulse">|</span>
      </p>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <a
          href="/sign-up"
          className="bg-white text-blue-700 px-8 py-4 rounded-full hover:bg-black-100 transition font-semibold"
        >
          Create Account
        </a>
        <a
          href="/sign-up"
          className="border border-white bg-blue text-white px-8 py-4 rounded-full hover:bg-blue-100 transition font-semibold"
        >
          Browse Research
        </a>
      </div>
    </div>
  </div>
</header>


     
      
    </div>
  );
};

export default WelcomPage;