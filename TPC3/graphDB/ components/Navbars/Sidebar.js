/*eslint-disable*/

import Link from "next/link";
import React from "react";

// reactstrap components
import {
  Navbar,
  Container,
} from "reactstrap";



function Sidebar() {
  let navbarBrand = (
   <h1>GraphDB</h1>
  );
  return (
    <Navbar 
      className="  " 
      expand="md"
      id="sidenav-main"
      style={{ backgroundColor:"#e5e2f3"}}
    >
      <Container fluid>
        <span>{navbarBrand}</span>
      </Container>

      <Container  style={{marginLeft:'80%'}}>
        <Link href={"/admin/repositorios"}>
          <a>Repositorios</a>
        </Link>
      </Container>
    </Navbar>
  );
}

export default Sidebar;
