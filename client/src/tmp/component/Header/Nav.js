import React, { Component } from 'react';
import '../../css/Header/Nav.css';

import SubNav from './SubNav';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [
        {id: 1, title: '게시판', sub: true},
        {id: 2, title: '과제 제출', sub: false},
        {id: 3, title: '출석 관리', sub: false},
        {id: 4, title: '일정', sub: false},
        {id: 5, title: '기타', sub: false},
      ],
      sub: [
        {id: 1, category:[
            {id: 1, title: '공지사항'},
            {id: 2, title: '강의자료'},
            {id: 3, title: '자유 게시판'},
            {id: 4, title: '구인 게시판'}
          ]
        },
        {id: 2, category: '더미데이터'}
      ]
    }
  }
  render() {
    var category = [];
    var data = this.state.category;
    var subData = this.state.sub;
    for(var i = 0; i < data.length; i++) {
      if(data[i].sub === true) {
        var j = 0;
        for(; j < subData.length; j++) 
          if(data[i].id === subData[j].id) break; 
        
         category.push(
          <div 
            onMouseOver={
              function(e) {
                e.currentTarget.style.background = "#BF4A4A";
                e.currentTarget.childNodes[1].style.display = "flex";
              }
            }
            onMouseLeave={
              function(e) {
                e.currentTarget.style.background = "#161E2E";
                e.currentTarget.childNodes[1].style.display = "none";
              }
            }
          >
            {data[i].title}
            <SubNav data={subData[j].category}/>
          </div>
        );
      }
      else {
        category.push(
          <div>{data[i].title}</div>
        );
      }
      
    }

    return (
      <div className='Nav'>
        <div className="category">
          {category}
        </div>
        <div className="position">메인</div>
      </div>
    );
  }
}

export default Nav;