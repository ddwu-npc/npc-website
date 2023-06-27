import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../../css/Header/SubNav.css';

class SubNav extends Component {
  render() {
    var subCategory = [];
    var subData = this.props.data;
    for(var i = 0; i < subData.length; i++) {
      subCategory.push(
        <div 
          onMouseOver={
            function(e) {
              e.currentTarget.style.background = "#E4E4E4";
              e.currentTarget.style.width = "100%";
            }
          }
          onMouseLeave={
            function(e) {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.width = "80%";
            }
          }
        ><Link to={"/board/"+subData[i].id}>{subData[i].title}</Link></div>
      );
    }
    return (
      <div className='SubNav'>
         {subCategory}
      </div>
    );
  }
}

export default SubNav;