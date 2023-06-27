import React, { Component } from 'react';
import '../../css/Main/Attendance.css';
import { Link } from "react-router-dom";

class Mypage extends Component {
  render() {
    return (
        <>
        <attendance className='atten_titleBox'>
          <Link to='/mypage' className='mypage_arrow'></Link>
          <text className='mypage_text'>빠른 출석</text>
        </attendance>
        <attendance className='AttendanceBox'>
          <text className='attendance_title'>팀 회의 명</text>
          <img className='team_menu' src='Main/team_menu.png'></img>
          <attendance className='line'></attendance>
          <attendance className='attenNum_check_text'>출석 번호가 일치하지 않습니다</attendance>
          {/*출석번호 입력 박스*/}
          <input type='text' className='attenNum' placeholder="출석번호 입력"></input>
          <button className='atten_check'>확인</button>
          <text className='point_text'>현재 나의 포인트 : 10 point</text>
          <Link to='/pointcheck' className='point_move'></Link>
          {/*출결 확인*/}
          <attendance className='atten_check'></attendance>
        </attendance>

        </>
    );
  }
}

export default Mypage;
