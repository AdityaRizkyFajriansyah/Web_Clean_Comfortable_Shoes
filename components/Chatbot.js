"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Halo! Saya asisten Clean Comfortable Shoes. Ada yang bisa saya bantu tentang perawatan sepatu Anda?" }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() && !selectedImage) return;

        let base64Image = null;
        if (selectedImage) {
            // Hilangkan header "data:image/jpeg;base64," agar sesuai dengan backend yang menggunakan b64decode
            base64Image = selectedImage.split(",")[1];
        }

        const newMessage = { role: "user", text: inputMessage, image: selectedImage };
        setMessages((prev) => [...prev, newMessage]);

        const messageToSend = inputMessage;

        setInputMessage("");
        setSelectedImage(null);
        setIsLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pesan: messageToSend || "Tolong analisa gambar ini",
                    gambar: base64Image,
                }),
            });

            const data = await response.json();

            if (response.ok && data.jawaban) {
                setMessages((prev) => [...prev, { role: "bot", text: data.jawaban }]);
            } else {
                setMessages((prev) => [...prev, { role: "bot", text: "Maaf, terjadi kesalahan saat menghubungi server." }]);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [...prev, { role: "bot", text: "Maaf, tidak dapat terhubung ke server." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Chatbot"
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>

            <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
                <div className="chatbot-header">
                    <h3>CCS Assistant</h3>
                    <button className="chatbot-close" onClick={() => setIsOpen(false)}>&times;</button>
                </div>

                <div className="chatbot-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chatbot-message ${msg.role}`}>
                            {msg.image && (
                                <img src={msg.image} alt="Uploaded" className="chatbot-image-preview" />
                            )}
                            {msg.text && (
                                <div className="chatbot-bubble">
                                    {/* Handle line breaks inside the text */}
                                    {msg.text.split('\n').map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chatbot-message bot">
                            <div className="chatbot-bubble loading">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chatbot-input-area" onSubmit={sendMessage}>
                    {selectedImage && (
                        <div className="chatbot-selected-image">
                            <img src={selectedImage} alt="Selected" />
                            <button type="button" onClick={removeImage}>&times;</button>
                        </div>
                    )}
                    <div className="chatbot-input-wrapper">
                        <label className="chatbot-upload-btn">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                            </svg>
                        </label>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ketik pesan..."
                        />
                        <button type="submit" disabled={(!inputMessage.trim() && !selectedImage) || isLoading}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
