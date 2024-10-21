import { useEffect, useState } from "react";

const useDaysPassed = (date: Date): number => {
  const [daysPassed, setDaysPassed] = useState<number>(0);

  useEffect(() => {
    const calculateDaysPassed = () => {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        setDaysPassed(0);
        return;
      }

      const today = new Date();
      const timeDifference = today.getTime() - date.getTime();
      const daysDifference =
        Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;

      setDaysPassed(Math.max(daysDifference, 0));
    };

    calculateDaysPassed();

    const interval = setInterval(calculateDaysPassed, 1000 * 60 * 60 * 24);

    return () => clearInterval(interval);
  }, [date]);

  return daysPassed;
};

export default useDaysPassed;
