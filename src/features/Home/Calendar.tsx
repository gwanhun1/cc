import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { currentDateState } from "../../recoil/atoms";
import logoW from "../../assets/logo.png";
import theme from "../../theme";

// Mock event data
const mockEvents = [
  {
    id: "1",
    title: "Sample Event 1",
    start: "2024-08-20",
  },
  {
    id: "2",
    title: "Sample Event 2",
    start: "2024-08-22",
  },
];

const renderEventContent = ({ eventInfo }: any) => {
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <img
      src={logoW}
      loading="lazy"
      style={{
        position: "absolute",
        width: "100%",
        height: isSmDown ? "50px" : "115px",
      }}
    />
  );
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);

  const calendarRef = useRef<FullCalendar | null>(null);
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickEvent = (data: any) => {
    console.log(data.event);
  };

  const goToNextMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setCurrentDate(calendarApi.getDate());
    }
  };

  const goToPrevMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setCurrentDate(calendarApi.getDate());
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(currentDate);
    }
  }, [currentDate]);
  console.log(isSmDown);

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        initialView="dayGridMonth"
        initialDate={currentDate}
        plugins={[dayGridPlugin, interactionPlugin]}
        events={mockEvents}
        eventContent={renderEventContent(isSmDown)}
        headerToolbar={false}
        footerToolbar={false}
        editable={false}
        eventClick={handleClickEvent}
        height={isSmDown ? 540 : 900}
        locale={koLocale}
        titleFormat={{ year: "numeric", month: "short" }}
        dayHeaders={false}
        navLinks={false}
      />
    </>
  );
};

export default Calendar;
