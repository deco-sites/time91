import { useState, useEffect } from "preact/hooks";

export interface Props {
  title: string;
  hours: string;
  minutes: string;
  seconds: string;
  textButton: string;
  mail: string;
}

export default function CampaignTimer({
  title,
  hours,
  minutes,
  seconds,
  textButton,
  mail,
}: Props) {
  const [remainingTime, setRemainingTime] = useState(
    Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    if (remainingTime <= 0) {
      console.log("Tempo encerrado!");
    }
  }, [remainingTime]);

  return (
    <div className="h-28 py-4 px-16 w-screen bg-accent flex flex-col justify-center items-center text-accent-content gap-4 md:flex-row md:gap-16">
      <h2 className="text-sm leading-5 md:text-xl">{title}</h2>
      <div className="flex gap-6 md:gap-16">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col items-center">
            <p className="text-xl leading-7">
              {formatTime(remainingTime).split(":")[0]}
            </p>
            <p className="text-xs leading-4">Hours</p>
          </div>
          <p className="text-xl leading-7">:</p>
          <div className="flex flex-col items-center">
            <p className="text-xl leading-7">
              {formatTime(remainingTime).split(":")[1]}
            </p>
            <p className="text-xs leading-4">Minutes</p>
          </div>
          <p className="text-xl leading-7">:</p>
          <div className="flex flex-col items-center">
            <p className="text-xl leading-7">
              {formatTime(remainingTime).split(":")[2]}
            </p>
            <p className="text-xs leading-4">Seconds</p>
          </div>
        </div>
        <a href={`mailto:${mail}`}>
        <button className="flex items-center gap-2 py-2 px-3 justify-center bg-primary text-primary-content leading-6">
          {textButton}
        </button>
        </a>
      </div>
    </div>
  );
}
