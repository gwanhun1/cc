import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  start: string;
  img: string;
}

function useMockEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    function generateMockEvents() {
      const mockEvents: Event[] = [];
      const eventTitles = [
        "Sample Event A",
        "Sample Event B",
        "Sample Event C",
        "Sample Event D",
        "Sample Event E",
        "Sample Event F",
        "Sample Event G",
        "Sample Event H",
      ];

      for (let i = 0; i < 8; i++) {
        const day = Math.floor(Math.random() * 28) + 1;
        const start = new Date(year, month - 1, day)
          .toISOString()
          .split("T")[0];

        mockEvents.push({
          id: (i + 1).toString(),
          title: eventTitles[i],
          start: start,
          img: `mock${i}`,
        });
      }

      return mockEvents;
    }

    setEvents(generateMockEvents());
  }, []);

  return events;
}

export default useMockEvents;
