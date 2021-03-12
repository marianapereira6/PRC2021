import React, { useContext } from "react";
import axios from 'axios';
// reactstrap components
import {
    Button,
    Container,
    Table,
    Card,
    CardHeader,
    Row,
    Col,
} from "reactstrap";
import Admin from "../../layouts/Admin";
import AppContext from '../context/AppContext'; 


// layout for this page
// core components


function Propriedades() {

  const { state,repProp } = useContext(AppContext);
  const [openedCollapse, setOpenedCollapse] = React.useState("collapseOne");

  
  var nome =""
  nome = state.i
  
  const Coisa = ({classes } ) => {
    return (
      <div className=" accordion my-3" id="accordionExample"  >
        {classes.map( (classe) => {
          
          return (
            <di>
              <Card style={{width:'100%' ,justifyContent:'center'}} >
                <CardHeader style={ {height:'10vh' }}
                  id="headingOne"
                  aria-expanded={openedCollapse === "collapseOne"}
                >
                  <h5 className=" mb-0"  >
                    <Button style={{ marginTop:'-13px'}}
                     
                      className=" w-100 text-primary text-left collapsed"
                      color="link"
                  >
                      <tr  >
                        <th scope="row"> 
                          {classe[0].split('#')[1] } - {classe[1].split('#')[1] || classe[1]  }
                        </th>
                      </tr>
                    </Button >
                  </h5>
                </CardHeader>
              </Card> 
            </di> 
            )
          })}
        
      </div>
    );
  };

  return (
    <>
      {/* Page content */}
      <div className="pt-5  d-flex align-items-cente" >
        <Container className="mt--0" fluid>
          {/* Table */}
          <Row>
            <div className="col" >
              <Card className="shadow" >
                <CardHeader>
                  <h3 >Propriedades - {nome} </h3>
                </CardHeader>
                <Table className="align-items-center table-flush"   responsive>
                  <tbody  >
                    <Col className=" ml-auto" md="12"   >
                      <Coisa   classes={state.propriedades} />
                    </Col>
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

Propriedades.layout = Admin;

export default Propriedades;
