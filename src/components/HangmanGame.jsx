// HangmanGame.js
import React, { useState, useEffect, useCallback } from 'react';
import { ScoreDisplay } from './ScoreDisplay';
import { SwissClock } from './SwissClock';
import { HangmanDrawing } from './HangmanDrawing';
import { GuessInput } from './GuessInput';
import { GameMessage } from './GameMessage';
import Stats from './Stats';  // Importiere die Stats-Komponente
import '../styles/HangmanGame.css';

const MAX_TRIES = 7;

export default function HangmanGame() {
    const [words, setWords] = useState([]);
    const [selectedWord, setSelectedWord] = useState('');
    const [displayedWord, setDisplayedWord] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState([]);
    const [triesLeft, setTriesLeft] = useState(MAX_TRIES);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [points, setPoints] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [letter, setLetter] = useState('');
    const [swissTime, setSwissTime] = useState('');
    const [winStreak, setWinStreak] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [longestWinStreak, setLongestWinStreak] = useState(0);

    const startGame = useCallback((wordArray = words) => {
        const word = wordArray[Math.floor(Math.random() * wordArray.length)];
        setSelectedWord(word);
        setDisplayedWord(Array(word.length).fill('_'));
        setWrongGuesses([]);
        setTriesLeft(MAX_TRIES);
        setGameOver(false);
        setLetter('');
    }, [words]);

    useEffect(() => {
        fetch('/word_list.txt')
            .then((res) => res.text())
            .then((data) => {
                const wordArray = data.split('\n').map((w) => w.trim().toLowerCase()).filter(Boolean);
                setWords(wordArray);
            })
            .catch((error) => console.error("Error fetching word list:", error));
    }, []);

    useEffect(() => {
        if (words.length > 0) {
            startGame(words);
        }
    }, [words, startGame]);

    useEffect(() => {
        const interval = setInterval(updateSwissTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const updateSwissTime = () => {
        const options = {
            timeZone: 'Europe/Zurich',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        setSwissTime(new Date().toLocaleTimeString('de-CH', options));
    };

    const handleGuess = () => {
        if (gameOver || !letter) return;

        const l = letter.toLowerCase();
        setLetter('');

        if (wrongGuesses.includes(l) || displayedWord.includes(l)) return;

        if (selectedWord.includes(l)) {
            const newDisplayed = displayedWord.map((char, i) => (
                selectedWord[i] === l ? l : char
            ));
            setDisplayedWord(newDisplayed);

            if (!newDisplayed.includes('_')) {
                setGameOver(true);
                setWins(wins + 1);
                setPoints(points + 10);

                setWinStreak(winStreak + 1);

                if (points + 10 > highScore) {
                    setHighScore(points + 10);
                }

                if (winStreak + 1 > longestWinStreak) {
                    setLongestWinStreak(winStreak + 1);
                }
            }
        } else {
            const newTries = triesLeft - 1;
            setWrongGuesses([...wrongGuesses, l]);
            setTriesLeft(newTries);

            if (newTries === 0) {
                setGameOver(true);
                setLosses(losses + 1);
                setPoints(Math.max(0, points - 5));

                setWinStreak(0);
            }
        }
    };

    const getImageSrc = () => {
        const level = MAX_TRIES - triesLeft + 1;
        return `/img/level${level}.png`;
    };

    return (
        <div className="hangman-game-container">
            <div className="hangman-game">
                <SwissClock 
                    swissTime={swissTime} 
                />
                
                <ScoreDisplay 
                    wins={wins} 
                    losses={losses} 
                    points={points} 
                />
                
                <Stats
                    winStreak={winStreak}
                    longestWinStreak={longestWinStreak}
                    highScore={highScore}
                />

                <h1 className="hangman-game__title">Hangman - Game</h1>
                <div className="hangman-game__word-display">{displayedWord.join(' ')}</div>
                
                <GuessInput 
                    letter={letter} 
                    setLetter={setLetter} 
                    handleGuess={handleGuess} 
                />
                
                <div className="hangman-game__wrong-guesses">
                    Wrong letters: {wrongGuesses.join(', ')}
                </div>
                
                <HangmanDrawing 
                    imageSrc={getImageSrc()} 
                />
                
                <GameMessage 
                    gameOver={gameOver} 
                    triesLeft={triesLeft} 
                    selectedWord={selectedWord} 
                />
                
                <button className="hangman-game__restart-btn" onClick={() => startGame(words)}>
                    New Game
                </button>
            </div>
        </div>
    );
}

