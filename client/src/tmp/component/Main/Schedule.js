import React, { Component } from "react";
import "../../css/Main/Schedule.css";
import { Link } from "react-router-dom";

import Calender from "./Calendar";

class Schedule extends Component {
  render() {
    return (
      <>
        <schedule className="titleBox">
          <Link to="/" className="mypage_arrow"></Link>
          <text className="mypage_text">일정</text>
        </schedule>
        {/*캘린더*/}
        <schedule className="calender">
          <Calender />
        </schedule>
      </>
    );
  }
}

export default Schedule;
