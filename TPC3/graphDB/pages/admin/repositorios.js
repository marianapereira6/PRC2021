import React, { useContext } from "react";

// reactstrap components
import {
  Badge,
  Card,
  Button,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
import AppContext from "../context/AppContext";
// core components

function Repositorios() {
  const { state, repClasse} = useContext(AppContext);
  const [openedCollapse, setOpenedCollapse] = React.useState("collapseOne");
  
  const Coisa = ({rep}) => {
    return (
      <div className=" accordion my-5" id="accordionExample"  >
        {rep.map( (repositorio) => {
          return (
            <Card style={{width:'100%' ,justifyContent:'center'}} >
              <CardHeader style={ {height:'10vh' }}
                id="headingOne"
                aria-expanded={openedCollapse === "collapseOne"}
              >
                <h5 className=" mb-0"  >
                  <Button style={{ marginTop:'-13px'}}
                    onClick={() => repClasse(repositorio.id)}
                    className=" w-100 text-primary text-left collapsed"
                    color="link"
                  >
                    <tr  >
                      <th scope="row"    >
                        {repositorio.id}
                      </th>
                      <td   scope="row"  >
                        <Badge color="red" className="badge-dot">
                          <i className="bg-gray" />
                          {repositorio.state}
                        </Badge>
                      </td>
                    </tr>
                  </Button >
                </h5>
              </CardHeader>
            </Card>)
        })}
      </div>
    );
  };

  return (
    < div >
      {/* Page content */}
      <div  className=" pt-5  d-flex align-items-center" >
        <Container className="mt--0" fluid>
          {/* Table */}
          <Row>
            <div className="col" >
              <Card className="shadow" >
                <CardHeader>
                  <h3>Lista dos Repositorios</h3>
                </CardHeader>
                <Table className="align-items-center table-flush"  responsive>
                  <tbody >
                    <Col  md="12"  >
                      <Coisa   rep={state.repositorios}/>
                    </Col>
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
}

Repositorios.layout = Admin;

export default Repositorios;