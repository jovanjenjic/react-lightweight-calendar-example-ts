import React from "react";
import CalendarComponent from "react-lightweight-calendar";
import { data } from "./data";
import CustomizationComponent from "./CustomizationComponent";
// import "./Calendar.css";

function Calendar() {
  const [calendarData, setCalendarData] = React.useState(data);
  const [currentDate, setCurrentDate] = React.useState("2023-06-02");
  const [activeTimeDateField, setActiveTimeDateField] = React.useState(
    "startTimeDate-endTimeDate",
  );
  const [currentView, setCurrentView] = React.useState("WEEK_TIME");
  const [weekStartsOn, setWeekStartsOn] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});

  console.log(selectedItem, setOpen, setCalendarData, setCurrentDate);

  React.useEffect(() => {
    if (!open) {
      setSelectedItem({});
    }
  }, [open]);

  return (
    <div>
      <CustomizationComponent
        currentView={currentView}
        setCurrentView={setCurrentView}
        setWeekStartsOn={setWeekStartsOn}
        setActiveTimeDateField={setActiveTimeDateField}
      />
      <CalendarComponent
        data={calendarData}
        currentDate={currentDate}
        activeTimeDateField={activeTimeDateField}
        currentView={currentView}
        weekStartsOn={weekStartsOn}
      />
    </div>
  );
}

export default Calendar;
