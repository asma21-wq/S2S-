import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

const faqs = [
  {
    question: "What is the platform about?",
    answer: "Our platform is designed to connect users who want to offer and request tech services. It enables seamless service exchanges in areas like web development, graphic design, and more. It's a community-driven space where users can collaborate, share expertise, and meet their tech needs.",
  },
  {
    question: "What are you?",
    answer: "I am a chatbot designed here to respond to all your questions about the platform S2S.",
  },
  {
    question: "How does the service exchange process work on our platform?",
    answer: "Users can offer and request tech services by messaging. They can connect with others, discuss the exchange details, and finalize the service swap.",
  },
  {
    question: "How do I create an offer or request for a tech service?",
    answer: "To create an offer or request, simply log in to the platform, navigate to the 'Services' section, and select 'Offer a Service' or 'Request a Service'. Fill in the details, and your offer/request will be visible to others.",
  },
  {
    question: "How can I track the progress of a service exchange?",
    answer: "Once a service exchange has started, you can track its progress by messaging the service provider, discussing milestones, and reviewing the progress directly on the platform.",
  },
  {
    question: "How do I leave feedback for a service exchange?",
    answer: "After a service exchange is completed, you can leave feedback by rating the service provider and writing a brief review of your experience. This helps improve the quality of services on the platform and assists others in making informed decisions.",
  },
  {
    question: "What happens if a service provider doesn’t meet expectations?",
    answer: "If a service provider doesn't meet expectations, you can contact customer support. You may also leave a review to help others make informed decisions.",
  },
  {
    question: "Can I cancel a service exchange once it’s been agreed upon?",
    answer: "Yes, you can cancel a service exchange before it begins. If it's already in progress, you should discuss cancellation with the service provider to come to a mutual agreement.",
  },
  {
    question: "How can I ensure the quality of the services exchanged?",
    answer: "Users can check service provider ratings, read reviews, and communicate before finalizing a service exchange to ensure expectations are met.",
  },
  {
    question: "Is there a verification process for service providers?",
    answer: "Yes, we verify service providers through profile validation, user reviews, and ratings to ensure quality and trustworthiness.",
  },
  {
    question: "What types of tech services can be exchanged here?",
    answer: "Our platform supports a wide range of tech services, including web development, graphic design, and more.",
  },
  {
    question: "How do I know if a service provider is available to work on my request?",
    answer: "You can check a service provider's availability by directly messaging them to confirm their availability before starting an exchange.",
  },
];

const GEMINI_API_KEY = "AIzaSyALY8JH4RqWD_9yaCu0jQ1hufGFGESiaQY";
const GEMINI_API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      { text: "Welcome! How can I assist you today?", sender: "bot" },
      { text: "You can ask about our services, verification, or quality control.", sender: "bot" },
    ]);
  }, []);

  // Fuzzy matching using Fuse.js
  const fuse = new Fuse(faqs, {
    keys: ["question"],
    threshold: 0.7, // Lower threshold for more flexibility
    includeScore: true,
    ignoreLocation: true, // Ignore case and location for better matching
  });

  // Helper function to match user input to the FAQs using Fuse.js
  const findBestMatch = (userInput) => {
    const results = fuse.search(userInput);
    if (results.length > 0 && results[0].score < 0.7) {
      return results[0].item.answer;
    }
    return null;
  };

  // Function to check for "thank you" or "goodbye" in a relaxed way
  const checkForThankYouOrGoodbye = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (/thank\s*you|thanks/i.test(lowerInput)) {
      return "You're welcome! 😊";
    }
    if (/goodbye|bye|see\s*you/i.test(lowerInput)) {
      return "Goodbye! Have a great day! 👋";
    }
    return null;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // First check for "thank you" or "goodbye"
    let botResponse = checkForThankYouOrGoodbye(input);

    if (!botResponse) {
      // If no "thank you" or "goodbye", check FAQ answers
      botResponse = findBestMatch(input);
      console.log("FAQ Match:", botResponse); // Debugging
    }

    if (!botResponse) {
      try {
        const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] }),
        });
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure, but I can assist you!";
      } catch (error) {
        console.error("API error:", error);
        botResponse = "Sorry, I couldn't process your request. Please try again later.";
      }
    }

    // Simulate typing delay for better UX
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 border rounded-lg shadow-lg">
      <div className="h-96 overflow-y-auto mb-4 p-4 border rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-3 rounded-lg ${msg.sender === "bot" ? "bg-blue-100 mr-12" : "bg-gray-100 ml-12"}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="mb-2 p-3 rounded-lg bg-blue-100 mr-12">
            <div className="typing-indicator">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your question..."
          className="flex-1 p-2 border rounded"
        />
        <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;