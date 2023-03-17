import { Row, message } from "antd";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";

export default function Navbar() {
  return (
    <Row className="navContainer">
      <Row className="navItems">
        
      </Row>
      <Row className="navItems">
      <a className="navLogo" href="/">
          CareConnect
        </a>
        <a
          href=""
        >
          About
        </a>
        <a
          href=""
        >
          Features
        </a>
        <AiOutlineLogout
          color="#1b76ff"
          style={{ fontSize: "30px", cursor: "pointer" }}
          className="navLogo"
          href=""
        />
      </Row>
    </Row>
  );
}
