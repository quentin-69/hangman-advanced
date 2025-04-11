import React from 'react';

const HangmanDrawing = ({ imageSrc }) => (
    <div className="hangman-drawing">
        <img src={imageSrc} alt="Hangman drawing" />
    </div>
);

export default HangmanDrawing;
