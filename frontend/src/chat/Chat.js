import React, { useEffect, useState } from "react";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        console.log("Chat component mounted");

        // Simulate receiving messages (replace this with WebSocket integration)
        const interval = setInterval(() => {
            setMessages((prev) => [...prev, "New message received"]);
        }, 5000);

        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const sendMessage = () => {
        if (input.trim()) {
            setMessages((prev) => [...prev, input]);
            setInput("");
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div id="chat-box" style={{ border: "1px solid #000", height: "100px", overflowY: "scroll" }}>
                {messages.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;
