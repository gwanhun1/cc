import React, { useEffect, useMemo, useRef, useState } from "react";
import koLocale from "@fullcalendar/core/locales/ko";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "@mui/material";
import CustomModal from "../../components/common/CustomModal";
import EventContent from "../../components/home/EventContent";
import TodoContent from "../../components/home/todoContent";
import { useMonthlyImages } from "../../hooks/useImagesGet";
import { useModal } from "../../hooks/useModal";
import { useMonthlyTodos } from "../../hooks/useTodoGet";
import { currentDateState } from "../../recoil/atoms";
import theme from "../../theme";
import { formatYearMonth } from "../../utils/formatYearMonth";
import DetailPage from "./DetailPage";
import "./styles.css";

interface EventContentProps {
  backgroundColor?: string;
  timeText: any;
  event: {
    title: any;
    _def: { extendedProps: { img?: string; imageUrl?: string; date?: string } };
  };
}

const renderEventContent = (eventInfo: EventContentProps) => {
  const { imageUrl } = eventInfo.event._def.extendedProps;
  return (
    <>
      {imageUrl ? (
        <EventContent imageUrl={imageUrl} title={eventInfo.event.title} />
      ) : (
        <TodoContent title={eventInfo.event.title} />
      )}
    </>
  );
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
    if (data.event.extendedProps.imageUrl) {
      setDate(data.event.startStr);
      setTitle(data.event.title);
      setImageUrl(data.event.extendedProps.imageUrl);
      setImageId(data.event.id);
      openModal();
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(currentDate);
    }
  }, [currentDate]);

  const { images, refetch: imageRefetch } = useMonthlyImages(
    formatYearMonth(currentDate),
  );
  const {
    todos,
    setTodos,
    refetch: todoRefetch,
  } = useMonthlyTodos(formatYearMonth(currentDate));

  const finalData = useMemo(() => {
    const todoItems = convertTodoImage(todos);
    const sortedTodos = todoItems
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const sortedImages = images
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return [...sortedTodos, ...sortedImages];
  }, [todos, images]);

  useEffect(() => {
    imageRefetch();
  }, [upload]); // Removed imageRefetch from the dependency array.

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
        events={finalData}
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

function convertTodoImage(a: any[]) {
  const Images: any[] = [];
  for (const item of a) {
    const existingItem = Images.find((b) => b.id === item.id);
    if (existingItem) {
      existingItem.title = item.text || existingItem.title;
      existingItem.date = item.date || existingItem.date;
      existingItem.timestamp = item.timestamp || existingItem.timestamp;
    } else {
      Images.push({
        id: item.id,
        title: item.text || null,
        date: item.date,
        timestamp: item.timestamp,
        imageUrl: null,
      });
    }
  }
  return Images;
}
