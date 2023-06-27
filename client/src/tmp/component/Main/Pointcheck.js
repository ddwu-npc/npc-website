import React, { Component } from 'react';
import '../../css/Main/Pointcheck.css';
import { Link } from "react-router-dom";

class Mypage extends Component {
  render() {
    return (
        <>
        <pointcheck className='titleBox'>
          <Link to='/mypage' className='mypage_arrow'></Link>
          <text className='mypage_text'>NPC 포인트 내역</text>
        </pointcheck>
        <pointcheck className='pointBox'>
          <text className='point_title'>내 NPC 포인트: </text>
          <pointcheck className='line'></pointcheck>
        </pointcheck>

        </>
    );
  }
}

export default Mypage;
