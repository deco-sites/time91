import { useEffect, useState } from "preact/hooks";

export interface Props {
  title: string;
  hours: string;
  minutes: string;
  seconds: string;
  textButton: string;
  email: string;
}

export default function CampaignTimer({
  title,
  hours,
  minutes,
  seconds,
  textButton,
  email,
}: Props) {
  const totalSeconds = (Number(hours) * 3600) + (Number(minutes) * 60) +
    Number(seconds);
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      // Executar ação quando o tempo restante for igual a zero
      console.log("Tempo encerrado!");
    }
  }, [remainingSeconds]);

  // Função auxiliar para formatar o tempo restante no formato "HH:MM:SS"
  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div class="h-28 py-4 px-16 w-screen bg-accent flex flex-col justify-center items-center text-accent-content gap-4 md:flex-row md:gap-16">
      <h2 class="text-sm leading-5 md:text-xl">{title}</h2>
      <div class="flex gap-6 md:gap-16">
        <div class="flex gap-2 items-center">
          <div class="flex flex-col items-center">
            <p class="text-xl leading-7">
              {formatTime(remainingSeconds).split(":")[0]}
            </p>
            <p class="text-xs leading-4">Hours</p>
          </div>
          <p class="text-xl leading-7">:</p>
          <div class="flex flex-col items-center">
            <p class="text-xl leading-7">
              {formatTime(remainingSeconds).split(":")[1]}
            </p>
            <p class="text-xs leading-4">Minutes</p>
          </div>
          <p class="text-xl leading-7">:</p>
          <div class="flex flex-col items-center">
            <p class="text-xl leading-7">
              {formatTime(remainingSeconds).split(":")[2]}
            </p>
            <p class="text-xs leading-4">Seconds</p>
          </div>
        </div>
        <a href={`mailto:${email}`}>
          <button class="flex items-center gap-2 py-2 px-3 justify-center bg-primary text-primary-content leading-6">
            {textButton}
          </button>
        </a>
      </div>
    </div>
  );
}
