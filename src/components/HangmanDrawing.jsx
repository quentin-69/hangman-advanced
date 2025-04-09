import React from 'react';

export function HangmanDrawing({ imageSrc }) {
    return (
        <div className="hangman-drawing">
            <img className="hangman-drawing__image" src={imageSrc} alt="Hangman Level" />
        </div>
    );
}

