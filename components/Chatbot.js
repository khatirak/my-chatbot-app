import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post('/api/chat', { message: input });
            const botMessage = { sender: 'bot', text: response.data.message };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error('Error communicating with chatbot:', error);
            const botMessage = { sender: 'bot', text: 'Error occurred. Please try again.' };
            setMessages([...messages, userMessage, botMessage]);
        }

        setInput('');
    };

    return (
        <div>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'bot' ? 'left' : 'right' }}>
                        <p><strong>{msg.sender}:</strong> {msg.text}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{ width: '80%' }}
            />
            <button onClick={handleSendMessage} style={{ width: '20%' }}>Send</button>
        </div>
    );
};

export default Chatbot;
