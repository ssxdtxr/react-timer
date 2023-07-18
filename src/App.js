import {useRef, useState} from "react";

function App() {
    const [inputSeconds, setInputSeconds] = useState('');
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = () => {
        if (!isRunning && inputSeconds !== '') {
            const seconds = parseInt(inputSeconds, 10);

            if (isNaN(seconds)) {
                alert('Please enter a valid number of seconds.');
                return;
            }

            setTotalSeconds(seconds);
            setIsRunning(true);

            intervalRef.current = setInterval(() => {
                setTotalSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }
    };

    const formatTime = (value) => {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        const seconds = value % 60;

        return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    };

    const formatNumber = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    return (
        <div>
            <input
                placeholder="Seconds"
                type="text"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(e.target.value)}
                disabled={isRunning}
            />

            {
                !isRunning ?
                    <button onClick={startTimer}>Start</button>
                    :
                    <button onClick={stopTimer}>Stop</button>

            }

            <br/>
            <br/>

            <span>{formatTime(totalSeconds)}</span>
        </div>
    );
}

export default App;
