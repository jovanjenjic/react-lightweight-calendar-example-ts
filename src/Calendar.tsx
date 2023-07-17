import React from "react";
import CalendarComponent from "react-lightweight-calendar";
import { data } from "./data";
import CalendarHeader from "./CalendarHeader";
import "./Calendar.scss";
import { CalendarItem, DateInfo } from "./Calendar.types";
import FormDialog from "./FormDialog";

const itemInitialValues: CalendarItem = {
  id: "0",
  title: null,
  startTimeDate: null,
  endTimeDate: null,
  createdAt: null,
  updatedAt: null,
};

function Calendar() {
  const [calendarData, setCalendarData] = React.useState<CalendarItem[]>(data);
  const [currentDate, setCurrentDate] = React.useState<string | Date>(
    "2023-06-02",
  );
  const [activeTimeDateField, setActiveTimeDateField] = React.useState(
    "startTimeDate-endTimeDate",
  );
  const [currentView, setCurrentView] = React.useState("WEEK_TIME");
  const [weekStartsOn, setWeekStartsOn] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] =
    React.useState<CalendarItem>(itemInitialValues);

  React.useEffect(() => {
    if (!open) {
      setSelectedItem(itemInitialValues);
    }
  }, [open]);

  const onItemChange = (newItem: CalendarItem) => {
    setCalendarData((prevData) =>
      prevData.map((item) =>
        item.id === newItem.id
          ? { ...newItem, updatedAt: new Date().toISOString() }
          : item,
      ),
    );
  };

  const onItemCreate = (newItem: CalendarItem) => {
    setCalendarData((prevData) => [...prevData, newItem]);
  };

  const onCellClick = (dateInfo: DateInfo) => {
    const utcTimeDate = new Date(dateInfo.timeDateUTC!);
    const addedHour = new Date(
      utcTimeDate.setHours(utcTimeDate.getHours() + 1),
    ).toISOString();
    setOpen(true);
    setSelectedItem({
      title: null,
      startTimeDate: dateInfo.timeDateUTC,
      endTimeDate: addedHour,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="calendar-wrapper">
      <CalendarHeader
        currentView={currentView}
        weekStartsOn={weekStartsOn}
        activeTimeDateField={activeTimeDateField}
        setCurrentView={setCurrentView}
        setWeekStartsOn={setWeekStartsOn}
        setActiveTimeDateField={setActiveTimeDateField}
      />
      <CalendarComponent
        data={calendarData}
        currentDate={currentDate}
        setCurrentDate={(date: string | Date) => setCurrentDate(date)}
        activeTimeDateField={activeTimeDateField}
        currentView={currentView}
        weekStartsOn={weekStartsOn}
        onItemClick={(item: CalendarItem) => {
          setOpen(true);
          setSelectedItem(item);
        }}
        onCellClick={onCellClick}
        onDayNumberClick={(val) => {
          setCurrentDate(val);
          setCurrentView("DAY");
        }}
        onDayStringClick={(val) => {
          setCurrentDate(val);
          setCurrentView("DAY");
        }}
        timeDateFormat={{
          day: "eeeeee",
          monthYear: "LLL y",
        }}
      />
      {/* Form dialog for created new item or editing existing one */}
      <FormDialog
        open={open}
        setOpen={setOpen}
        isEdit={!!selectedItem.id}
        selectedItem={selectedItem}
        onItemChange={onItemChange}
        onItemCreate={onItemCreate}
      />
    </div>
  );
}

export default Calendar;
