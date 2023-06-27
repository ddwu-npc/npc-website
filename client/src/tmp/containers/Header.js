import React, { Component } from "react";
import { Link } from "react-router-dom";

import Nav from "../../component/Header/Nav";
import "../css/Header/Header.css";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="banner">
          <div>
            <b>N</b>one Suchable <b>P</b>eople Who <b>C</b>reate Games
          </div>
          <div>
            <div className="greet">
              어서오세요, 쿠키공장님<img src="/Header/smile.png"></img>
            </div>
            <div className="logout">로그아웃</div>
          </div>
        </div>
        <Link to="/">
          <img className="logo" src="/Header/npc.png"></img>
        </Link>
        <Nav></Nav>
      </div>
    );
  }
}

export default Header;
