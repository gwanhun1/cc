import React, { useEffect, useRef, useState } from "react";
import koLocale from "@fullcalendar/core/locales/ko";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useRecoilState } from "recoil";
import { Box, useMediaQuery } from "@mui/material";
import CustomModal from "../../components/common/CustomModal";
import EventContent from "../../components/home/EventContent";
import { useMonthlyImages } from "../../hooks/useImagesGet";
import { useModal } from "../../hooks/useModal";
import { currentDateState } from "../../recoil/atoms";
import theme from "../../theme";
import { formatYearMonth } from "../../utils/formatYearMonth";
import DetailPage from "./DetailPage";
import "./styles.css";

const renderEventContent = (eventInfo: {
  backgroundColor?: string;
  timeText: any;
  event: {
    title: any;
    _def: { extendedProps: { img: string; imageUrl?: string; date?: string } };
  };
}) => {
  const { imageUrl } = eventInfo.event._def.extendedProps;
  return <EventContent imageUrl={imageUrl} title={eventInfo.event.title} />;
};

const Calendar = ({ upload }: { upload: boolean }) => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const calendarRef = useRef<FullCalendar | null>(null);
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");

  const handleClickEvent = (data: any) => {
    setDate(data.event.startStr);
    setTitle(data.event.title);
    setImageUrl(data.event.extendedProps.imageUrl);
    setImageId(data.event.id);
    openModal();
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
      1,
    );
    const end = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );
    return { start, end };
  };

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
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
        height={isSmDown ? 400 : 900}
        locale={koLocale}
        titleFormat={{ year: "numeric", month: "short" }}
        dayHeaders={true}
        navLinks={false}
        fixedWeekCount={false}
        showNonCurrentDates={true}
        visibleRange={() => getVisibleRange(currentDate)}
      />
      <CustomModal isOpen={isOpen} onClose={closeModal} width="sm" height="md">
        <DetailPage
          onClose={closeModal}
          date={date}
          title={title}
          imageUrl={imageUrl}
          imageId={imageId}
        />
      </CustomModal>
    </>
  );
};

export default Calendar;
