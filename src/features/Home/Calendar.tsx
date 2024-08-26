import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { currentDateState } from "../../recoil/atoms";
import mock0 from "../../assets/mock0.svg";
import mock1 from "../../assets/mock1.svg";
import mock2 from "../../assets/mock2.svg";
import mock3 from "../../assets/mock3.svg";
import mock4 from "../../assets/mock4.svg";
import mock5 from "../../assets/mock5.svg";
import mock6 from "../../assets/mock6.svg";
import mock7 from "../../assets/mock7.svg";
import theme from "../../theme";
import "./styles.css";
import useMockEvents from "../../hooks/useMockEvents";
import EventContent from "../../components/home/EventContent";
import { useMonthlyImages } from "../../hooks/useImageFetch";
import Loading from "../../components/common/Loading";

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
    _def: { extendedProps: { img: string; imageUrl?: string } };
  };
}) => {
  const imageKey = eventInfo.event._def.extendedProps.img;
  const imageUrl = imageMap[imageKey] || "";

  return (
    <EventContent
      imageUrl={eventInfo.event._def.extendedProps.imageUrl ?? imageUrl}
      title={eventInfo.event.title}
    />
  );
};

const Calendar = ({ upload }: { upload: boolean }) => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const eventMockData = useMockEvents();

  const calendarRef = useRef<FullCalendar | null>(null);
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickEvent = (data: any) => {
    console.log(data.event);
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(currentDate);
    }
  }, [currentDate]);

  const { images, status, refetch } = useMonthlyImages("2024-08");

  useEffect(() => {
    refetch();
  }, [upload]);

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <>
      <FullCalendar
        ref={calendarRef}
        initialView="dayGridMonth"
        initialDate={currentDate}
        plugins={[dayGridPlugin, interactionPlugin]}
        events={images && images.length !== 0 ? images : eventMockData}
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
