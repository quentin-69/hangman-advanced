import React from 'react';

export function SwissClock({ swissTime }) {
    return (
        <div className="swiss-clock">
            <p className="swiss-clock__label">Swiss Time</p>
            <p className="swiss-clock__time">{swissTime}</p>
        </div>
    );
}

