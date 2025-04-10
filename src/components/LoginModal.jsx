import React, { useState } from 'react';

export default function LoginModal({ showModal, setShowModal, setCurrentUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful', data);
                setCurrentUser(data);  // Speichere den Benutzernamen im Zustand
                setShowModal(false);  // Modal nach erfolgreichem Login schließen
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        showModal && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                    {error && <div className="error">{error}</div>}
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            </div>
        )
    );
}
