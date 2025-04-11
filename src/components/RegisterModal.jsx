import React, { useState } from 'react';

export default function RegisterModal({ showModal, setShowModal }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8080/users', {  // Backend-Endpunkt zum Erstellen eines Benutzers
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name: username, 
                    password: password, 
                    points: 0,               // Default-Werte, falls nicht anders gewünscht
                    longest_win_streak: 0,   // Default-Werte
                    highscore: 0             // Default-Werte
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful', data);
                setShowModal(false);  // Modal nach erfolgreicher Registrierung schließen
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        showModal && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Register</h2>
                    <input
                        class="regster-feld"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        class="regster-feld"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="hangman-game__restart-btn" onClick={handleRegister}>Register</button> {/* Ändere die Klasse hier */}
                    {error && <div className="error">{error}</div>}
                    <button className="hangman-game__restart-btn" onClick={() => setShowModal(false)}>Close</button> {/* Ändere die Klasse hier */}
                </div>
            </div>
        )
    );
}