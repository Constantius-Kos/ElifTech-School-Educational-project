import cl from "./Timer.module.css"
import { useState, useEffect } from "react"
function Timer({ expiryDate }: { expiryDate: string }) {

    const calculateTimeLeft = () => {
        const difference = +new Date(expiryDate) - +new Date();
        let timeLeft = null;

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className={cl.Timer}>
            {timeLeft ? `${timeLeft?.days}d ${timeLeft?.hours}h ${timeLeft?.minutes}m ${timeLeft?.seconds}s` : "Expired"}
        </div>
    )
}

export default Timer