import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

import "../../css/Main/Calendar.css";

class Calender extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "7기 최종 발표", date: "2023-02-16" },
          { title: "선배와의 만남", date: "2023-02-20" },
          { title: "축제의 밤 OT", date: "2023-02-22" },
        ]}
      />
    );
  }
}

export default Calender;
