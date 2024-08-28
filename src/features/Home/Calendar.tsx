import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { useMediaQuery } from "@mui/material";
import { currentDateState } from "../../recoil/atoms";
import theme from "../../theme";
import "./styles.css";
import EventContent from "../../components/home/EventContent";
import { useMonthlyImages } from "../../hooks/useImageFetch";
import { formatYearMonth } from "../../utils/formatYearMonth";

const renderEventContent = (eventInfo: {
  backgroundColor?: string;
  timeText: any;
  event: {
    title: any;
    _def: { extendedProps: { img: string; imageUrl?: string } };
  };
}) => {
  return (
    <EventContent
      imageUrl={eventInfo.event._def.extendedProps.imageUrl}
      title={eventInfo.event.title}
    />
  );
};

const Calendar = ({ upload }: { upload: boolean }) => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
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

  const { images, refetch } = useMonthlyImages(formatYearMonth(currentDate));

  useEffect(() => {
    refetch();
  }, [upload]);

  const getVisibleRange = (currentDate: Date) => {
    const start = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const end = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    return { start, end };
  };

  return (
    <FullCalendar
      ref={calendarRef}
      initialView="dayGridMonth"
      initialDate={currentDate}
      plugins={[dayGridPlugin, interactionPlugin]}
      events={images}
      eventContent={renderEventContent}
      headerToolbar={false}
      footerToolbar={false}
      editable={false}
      eventClick={handleClickEvent}
      height={isSmDown ? 500 : 900}
      locale={koLocale}
      titleFormat={{ year: "numeric", month: "short" }}
      dayHeaders={true}
      navLinks={false}
      fixedWeekCount={false}
      showNonCurrentDates={true}
      visibleRange={() => getVisibleRange(currentDate)}
    />
  );
};

export default Calendar;
