import React, { Component } from 'react';
import '../../css/Main/Mypage.css';
import { Link } from "react-router-dom";

class Mypage extends Component {
  render() {
    return (
        <>
        <mypage className='titleBox'>
          <Link to='/' className='mypage_arrow'></Link>
          <text className='mypage_text'>마이페이지</text>
        </mypage>

        <mypage className='profile_mainBox'>
          <text className='profile_title'>프로필</text> 
          <mypage className='line'></mypage>
          <img className='profile_img' src='Main/profile.png'></img>{/*프로필 사진*/ }
          <button className='profile_button'><text className='button_title'>프로필 변경하기</text></button>{/*프로필 변경버튼*/}
          {/*프로필 입력*/}
          <text className='profile_subTitle' style={{top: 118, left:303}}>닉네임</text>
          <input className='inputbox' style={{top: 146, left:303}}></input>
          <text className='profile_subTitle' style={{top: 118, left:596}}>NPC Point</text>
          <Link to='/pointcheck' className='point_check'>포인트 내역 확인</Link>
          <mypage className='point_arrow'></mypage>
          <input className='inputbox' style={{top: 146, left:596}}></input>
          <text className='profile_subTitle' style={{top: 191, left:303}}>이메일</text>
          <input className='inputbox' style={{top: 219, left:303}}></input>
          <text className='profile_subTitle' style={{top: 191, left:596}}>소속</text>
          <input className='inputbox' style={{top: 219, left:596}}></input>
          <text className='profile_subTitle' style={{top: 264, left:303}}>생일</text>
          <input className='inputbox' style={{top: 292, left:303}}></input>
          <text className='profile_subTitle' style={{top: 264, left:596}}>참여 중인 프로젝트</text>
          <input className='inputbox' style={{top: 292, left:596}}></input>
        </mypage>
        {/*내가 쓴 게시글*/}
        <mypage className='profile_subBox' style={{top:814, left:180}}>
          <mypage className='profile_subBox_title'></mypage>
          <text className='subTitle'>내가 쓴 게시물</text>
          <text className='count'>건</text>
        </mypage>
        
        {/*내가 쓴 댓글*/}
        <mypage className='profile_subBox' style={{top:814, right:165}}>
          <mypage className='profile_subBox_title'></mypage>
          <text className='subTitle'>내가 쓴 댓글</text>
          <text className='count'>건</text>
        </mypage>
        </>
    );
  }
}

export default Mypage;
