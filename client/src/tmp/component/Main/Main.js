import React, { Component } from "react";
import "../../css/Main/Main.css";
import { Link } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <>
        <main className="notice_box">
          <main className="title_box"></main>
          <img className="notice_icon" src="Main/notice_icon.png"></img>
          <text className="notice">공지사항</text>
          <div className="move"></div>
        </main>

        <main className="attendence_box">
          <main className="title_box"></main>
          <img className="attendence_icon" src="Main/attendence_icon.png"></img>
          <text className="attendence">빠른 출석</text>
          <Link to="/attendance" className="move"></Link>
        </main>

        <main className="submit_box">
          <main className="title_box"></main>
          <img className="submit_icon" src="Main/submit_icon.png"></img>
          <text className="submit">과제 제출</text>
          <div className="move"></div>
        </main>

        <main className="mypage_box">
          <Link to="/mypage" className="mypage_click">
            마이페이지
          </Link>
          <img className="mypage_move" src="Main/move.png"></img>
          <img className="profile" src="Main/profile.png"></img>
          <img className="name_icon" src="Main/person_icon.png"></img>
          <text className="name">닉네임 :</text>
          <img className="point_icon" src="Main/point_icon.png"></img>
          <text className="point">NPC Point :</text>
          <img className="position_icon" src="Main/position_icon.png"></img>
          <text className="belong">소속 :</text>
        </main>

        <main className="schedule_box">
          <main className="title_box1"></main>
          <img className="schedule_icon" src="Main/todo_icon.png"></img>
          <Link to="/schedule" className="schedule">
            일정
          </Link>
        </main>

        <main className="todo_box">
          <main className="title_box1"></main>
          <img className="todo_icon" src="Main/todo_icon.png"></img>
          <text className="todo">할 일</text>
        </main>

        <main className="calendar"></main>
      </>
    );
  }
}

export default Main;