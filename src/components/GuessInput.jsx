import React from 'react';

export function GuessInput({ letter, setLetter, handleGuess }) {
    return (
        <div className="guess-input">
            <label htmlFor="letter-input" className="guess-input__label">Enter a letter:</label>
            <input
                type="text"
                id="letter-input"
                maxLength="1"
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                className="guess-input__input"
            />
            <button className="guess-input__submit-btn" onClick={handleGuess}>
                Guess
            </button>
        </div>
    );
}

