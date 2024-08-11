"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { sender: 'Customer Bot', text: "Hi, I'm the Headstarter AI chatbot. How can I assist you today?" }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        try {
            const response = await axios.post('/api/chat', { message: input });
            const botMessage = { sender: 'Customer Bot', text: response.data.message };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error communicating with chatbot:', error);
            const botMessage = { sender: 'Customer Bot', text: 'Error occurred. Please try again.' };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        }

        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === 'Customer Bot' ? 'bot' : 'user'}`}>
                        <p><strong>{msg.sender === 'Customer Bot' ? 'Headstarter AI' : 'You'}:</strong> {msg.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your question here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
