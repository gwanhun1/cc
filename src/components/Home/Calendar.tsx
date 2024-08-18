import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { Box, Button, Typography } from "@mui/material";
import { currentDateState } from "../../recoil/atoms";

const renderEventContent = (eventInfo: any) => {
  return (
    <Box sx={{ cursor: "pointer" }} width="100%" pl={1}>
      <Box display="flex" alignItems="center">
        {eventInfo.backgroundColor !== "" &&
          eventInfo.timeText &&
          eventInfo.event._instance &&
          ("" + eventInfo.event._instance.range.start).slice(0, 10) ===
            ("" + eventInfo.event._instance.range.end).slice(0, 10) && (
            <Box
              bgcolor={eventInfo.backgroundColor}
              borderRadius={"50%"}
              width={7}
              height={7}
              mx={1}
            />
          )}
        <Typography overflow="hidden" textOverflow="ellipsis">
          {eventInfo.timeText}
        </Typography>
      </Box>
      <Typography overflow="hidden" textOverflow="ellipsis">
        {eventInfo.event.title}
      </Typography>
    </Box>
  );
};

const Calendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);

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
        eventContent={renderEventContent}
        headerToolbar={false}
        footerToolbar={false}
        editable={false}
        eventClick={handleClickEvent}
        height={750}
        locale={koLocale}
        titleFormat={{ year: "numeric", month: "short" }}
        dayHeaders={false}
        navLinks={false}
      />
    </>
  );
};

export default Calendar;
