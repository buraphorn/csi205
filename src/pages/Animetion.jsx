import React, { useState, useEffect, useRef, useCallback } from 'react';

import './ha.css';


// Constants from ha.JS
const fieldWidth = 600;
const fieldHeight = 300;
const ballDiameter = 100;
const maxX = fieldWidth - ballDiameter - 2; // -2 for border
const maxY = fieldHeight - ballDiameter - 2; // -2 for border
const vx = 5; // 5 pixels/frame
const vy = 5;

const ballConfigs = {
    'None': { className: '', image: 'None', variant: 'outline-secondary' },
    'Basketball': { className: 'basketball', image: 'url(Basketball.png)', variant: 'outline-primary' },
    'Football': { className: 'football', image: 'url(football.jpg)', variant: 'outline-primary' },
    'Volleyball': { className: 'volleyball', image: 'url(volleyball.jpg)', variant: 'outline-primary' },
    'Humen': { className: 'humen', image: 'url(IMG_0345.JPG)', variant: 'outline-primary' },
    'Cartoon': { className: 'cartoon', image: 'url(cartoon.jpg)', variant: 'outline-primary' }
};

const Animetion = () => {
    // State variables
    const [running, setRunning] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [goRight, setGoRight] = useState(true);
    const [goDown, setGoDown] = useState(true);
    const [selectedBall, setSelectedBall] = useState('None'); // Stores the ID of the selected button

    // Ref for the interval timer
    const intervalRef = useRef(null);
    // Ref for the ball element to directly manipulate style (for performance in animation)
    const ballRef = useRef(null);

    // --- Core Logic Functions (from ha.JS) ---

    // const runrun 
    const runrun = useCallback(() => {
        setRunning(prevRunning => !prevRunning);
    }, []);

    // const ballC 
    const selectBall = useCallback((newSelectionId) => {
      
        setSelectedBall(newSelectionId);
    }, []);

    // const calculate 
    const calculate = useCallback(() => {
        setX(prevX => {
            let newX = prevX + (goRight ? vx : -vx);
            if (newX >= maxX) {
                setGoRight(false);
                newX = maxX;
            } else if (newX <= 0) {
                setGoRight(true);
                newX = 0;
            }
            return newX;
        });

        setY(prevY => {
            let newY = prevY + (goDown ? vy : -vy);
            if (newY >= maxY) {
                setGoDown(false);
                newY = maxY;
            } else if (newY <= 0) {
                setGoDown(true);
                newY = 0;
            }
            return newY;
        });
    }, [goRight, goDown]);

    // --- useEffect for Animation (process loop and render) ---

    // useEffect for the animation interval (process function)
    useEffect(() => {
        if (running) {
            // Start the interval: calls process every 25ms (40 f/s)
            intervalRef.current = setInterval(() => {
                calculate();
                
                // Directly update ball style for smooth animation, avoiding re-render loop
                if (ballRef.current) {
                    ballRef.current.style.left = `${x}px`;
                    ballRef.current.style.top = `${y}px`;
                }
            }, 25);
        } else {
            // Stop the interval
            clearInterval(intervalRef.current);
        }

        // Cleanup function
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [running, calculate]);

    // useEffect for rendering position (only runs if x or y changes from state update)
    useEffect(() => {
        if (ballRef.current) {
            ballRef.current.style.left = `${x}px`;
            ballRef.current.style.top = `${y}px`;
        }
    }, [x, y]);

    // --- useEffect for Keyboard Handler ---

    // const checkKeyboard 
    const checkKeyboard = useCallback((event) => {
        const keyMap = {
            '0': 'None',
            '1': 'Basketball',
            '2': 'Football',
            '3': 'Volleyball',
            '4': 'Humen',
            '5': 'Cartoon',
        };

        if (keyMap[event.key]) {
            selectBall(keyMap[event.key]);
        } else if (event.code === 'Space') {
            runrun();
        }
    }, [selectBall, runrun]);

    useEffect(() => {
        document.addEventListener('keydown', checkKeyboard);
        return () => {
            document.removeEventListener('keydown', checkKeyboard);
        };
    }, [checkKeyboard]);


    const getRunButtonClass = () => {
        return running ? 'btn btn-warning' : 'btn btn-success';
    };

    const getRunButtonContent = () => {
        return running ? (
            <><i className="bi bi-pause"></i>&nbsp;PAUSE</>
        ) : (
            <><i className="bi bi-play"></i>&nbsp;RUN</>
        );
    };

    const getBallClassName = () => {
        const baseClass = 'anim-ball';
        const spinClass = running ? 'spin' : '';
        const ballClass = ballConfigs[selectedBall]?.className || '';
        return `${baseClass} ${spinClass} ${ballClass}`.trim();
    };

    const getBallStyle = () => {
        // Set initial position and size based on state/constants
        return {
            left: `${x}px`,
            top: `${y}px`,
            width: `${ballDiameter}px`,
            height: `${ballDiameter}px`,
       
        };
    };

    const getBallButtonClass = (id) => {
        const config = ballConfigs[id];
        let baseClass = 'btn';
        
        if (id === 'None') {
            // 'None' uses different primary/outline logic
            return selectedBall === 'None' ? `${baseClass} btn-secondary` : `${baseClass} btn-outline-secondary`;
        } else {
            // Other balls use primary/outline-primary
            return selectedBall === id ? `${baseClass} btn-primary` : `${baseClass} btn-outline-primary`;
        }
    };

    return (
        <div className="anim-container">
            {/* The field size is set via ha.css, based on fieldWidth/fieldHeight constants */}
            <div id="field" className="anim-field">
                {/* The ball element */}
                <div 
                    ref={ballRef}
                    id="ball" 
                    className={getBallClassName()} 
                    style={getBallStyle()}
                ></div>
            </div>

            <div className="anim-control d-flex justify-content-between">
                {/* RUN/PAUSE Button */}
                <button 
                    id="run" 
                    onClick={runrun} 
                    className={getRunButtonClass()}
                >
                    {getRunButtonContent()}
                </button>

                <div>
                    {/* Ball Selection Buttons */}
                    {Object.keys(ballConfigs).map(id => (
                        <button 
                            key={id}
                            id={id}
                            className={getBallButtonClass(id)}
                            onClick={() => selectBall(id)}
                        >
                            {id}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Animetion;