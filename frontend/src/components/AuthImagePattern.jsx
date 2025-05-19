import { useEffect, useState, useRef } from "react";

const messages = [
  { sender: "a", text: "Hey 👋 Welcome to Kura Kani" },
  { sender: "b", text: "A space to connect and Chat" },
  { sender: "a", text: "Enter your details to continue" },
  { sender: "b", text: "Ready when you are 🚀" },
];

const TypingIndicator = () => (
  <div className="chat-bubble bg-base-300 text-base-content flex items-center gap-1">
    <span className="animate-bounce delay-100">•</span>
    <span className="animate-bounce delay-200">•</span>
    <span className="animate-bounce delay-300">•</span>
  </div>
);

const AuthImagePattern = () => {
  const [displayed, setDisplayed] = useState([]);
  const [typing, setTyping] = useState(null);
  const messageIndexRef = useRef(0);
  const timeoutsRef = useRef([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const startLoop = () => {
    clearAllTimeouts();
    setDisplayed([]);
    setTyping(null);
    messageIndexRef.current = 0;

    const showNextMessage = () => {
      const index = messageIndexRef.current;

      if (index >= messages.length) {
        // Loop again after a pause
        const resetTimeout = setTimeout(() => {
          setDisplayed([]);
          setTyping(null);
          messageIndexRef.current = 0;
          showNextMessage();
        }, 2000);
        timeoutsRef.current.push(resetTimeout);
        return;
      }

      const current = messages[index];
      setTyping(current.sender);

      const typingTimeout = setTimeout(() => {
        setTyping(null);
        setDisplayed((prev) => [...prev, current]);
        messageIndexRef.current++;
        const nextMessageDelay = setTimeout(showNextMessage, 700);
        timeoutsRef.current.push(nextMessageDelay);
      }, 1300);

      timeoutsRef.current.push(typingTimeout);
    };

    showNextMessage();
  };

  useEffect(() => {
    startLoop();
    return () => clearAllTimeouts(); // Clean up on unmount
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4 py-10">
      <div className="w-full max-w-md space-y-4">
        {displayed.map((msg, idx) => (
          <div key={idx} className={`chat ${msg.sender === "a" ? "chat-start" : "chat-end"}`}>
            <div
              className={`chat-bubble ${msg.sender === "a"
                ? "bg-base-100 text-base-content"
                : "bg-primary text-primary-content"
                } shadow-md`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className={`chat ${typing === "a" ? "chat-start" : "chat-end"}`}>
            <TypingIndicator />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthImagePattern;
