import React from 'react';

export function ScoreDisplay({ wins, losses, points }) {
    return (
        <div className="score-display">
            <p className="score-display__points">Points: {points}</p>
            <div className="score-display__win-loss">
                <p className="score-display__wins">{wins}</p>
                <p className="score-display__separator">/</p>
                <p className="score-display__losses">{losses}</p>
            </div>
        </div>
    );
}

