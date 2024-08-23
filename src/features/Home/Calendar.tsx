import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { currentDateState } from "../../recoil/atoms";
import mock0 from "../../assets/mock0.jpg";
import mock1 from "../../assets/mock1.jpg";
import mock2 from "../../assets/mock2.jpg";
import mock3 from "../../assets/mock3.jpg";
import mock4 from "../../assets/mock4.jpg";
import mock5 from "../../assets/mock5.jpg";
import mock6 from "../../assets/mock6.jpg";
import mock7 from "../../assets/mock7.jpg";
import theme from "../../theme";
import "./styles.css";
import useMockEvents from "../../hooks/useMockEvents";
import EventContent from "../../components/home/EventContent";

export const imageMap = {
  mock0: mock0,
  mock1: mock1,
  mock2: mock2,
  mock3: mock3,
  mock4: mock4,
  mock5: mock5,
  mock6: mock6,
  mock7: mock7,
};

const renderEventContent = (eventInfo: {
  backgroundColor?: string;
  timeText: any;
  event: {
    title: any;
    _def: { extendedProps: { img: string } };
  };
}) => {
  const imageKey = eventInfo.event._def.extendedProps.img;
  const imageUrl = imageMap[imageKey] || ""; // Fallback if image is not found

  return <EventContent imageUrl={imageUrl} title={eventInfo.event.title} />;
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const eventMockData = useMockEvents();

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

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        initialView="dayGridMonth"
        initialDate={currentDate}
        plugins={[dayGridPlugin, interactionPlugin]}
        events={eventMockData}
        eventContent={renderEventContent}
        headerToolbar={false}
        footerToolbar={false}
        editable={false}
        eventClick={handleClickEvent}
        height={isSmDown ? 500 : 900}
        locale={koLocale}
        titleFormat={{ year: "numeric", month: "short" }}
        dayHeaders={false}
        navLinks={false}
      />
    </>
  );
};

export default Calendar;
