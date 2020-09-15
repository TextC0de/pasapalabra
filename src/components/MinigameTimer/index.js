import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const MinigameTimer = ({ seconds, onTick }) => {
    const id = useRef(null);
    const [secondsLeft, setSecondsLeft] = useState(seconds);

    const clear = () => {
        if (typeof window !== 'undefined') {
            window.clearInterval(id.current);
            //if (onFinish) onFinish();
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return () => clear();
        setSecondsLeft(seconds);

        id.current = window.setInterval(() => {
            setSecondsLeft((time) => time - 1);
            if (onTick) onTick();
        }, 1000);

        return () => clear();
    }, [seconds, onTick]);

    useEffect(() => {
        if (secondsLeft <= 0) {
            clear();
        }
    }, [secondsLeft]);

    return <span>{secondsLeft <= 0 ? 1 : secondsLeft}</span>;
};

MinigameTimer.propTypes = {
    seconds: PropTypes.number.isRequired,
    repeats: PropTypes.number,
    onTick: PropTypes.func,
    onRepeatFinish: PropTypes.func,
    onFinish: PropTypes.func
};

MinigameTimer.defaultProps = {
    repeats: 1,
    onTick: null,
    onRepeatFinish: null,
    onFinish: null
};

export default MinigameTimer;
