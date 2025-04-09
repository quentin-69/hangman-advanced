import React from 'react';

export function GameMessage({ gameOver, triesLeft, selectedWord }) {
    return (
        <div className="game-message">
            {gameOver ? (
                triesLeft === 0 ? (
                    <span className="game-message__lost">Lost! The word was: {selectedWord}</span>
                ) : (
                    <span className="game-message__won">You won!</span>
                )
            ) : (
                <span className="game-message__remaining-tries">Tries left: {triesLeft}</span>
            )}
        </div>
    );
}

