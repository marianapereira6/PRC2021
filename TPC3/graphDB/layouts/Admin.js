import React from "react";
import { useRouter } from "next/router";
// reactstrap components
import { Container } from "reactstrap";
// core components
import Sidebar from "../ components/Navbars/Sidebar";

import routes from "routes.js";

function Admin(props) {
  // used for checking current route
  const router = useRouter();
  let mainContentRef = React.createRef();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, []);
  
  return (
    <>
    <div  >
      <Sidebar />
      <div className="main-content shadow border-10" ref={mainContentRef}>
        {props.children}
      </div>
      </div>
    </>
   
  );
}

export default Admin;
