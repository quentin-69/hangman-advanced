import React from 'react';

export default function Stats({ winStreak, longestWinStreak, highScore }) {
    return (
        <div className="stats-container">
            <table className="stats-table">
                <tbody>
                    <tr>
                        <td className="stats-label">Winstreak:</td>
                        <td className="stats-value">{winStreak > 0 ? winStreak : '—'}</td>
                    </tr>
                    <tr>
                        <td className="stats-label">Longest Win Streak:</td>
                        <td className="stats-value">{longestWinStreak > 0 ? longestWinStreak : '—'}</td>
                    </tr>
                    <tr>
                        <td className="stats-label">Highscore:</td>
                        <td className="stats-value">{highScore}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

