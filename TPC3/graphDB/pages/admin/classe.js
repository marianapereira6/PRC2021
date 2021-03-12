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

function Classe() {

  const { state,repIndividuos } = useContext(AppContext);
  const [openedCollapse, setOpenedCollapse] = React.useState("collapseOne");

  var rep = []
  rep = state.classe
  var nome =""
  nome = state.repo
  
  const Coisa = ({classes}) => {
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
                      onClick={() => repIndividuos( classe.split('#')[1],nome, classe.split('#')[0]  )}
                      className=" w-100 text-primary text-left collapsed"
                      color="link"
                    >
                      <tr>
                        <th scope="row"    >
                          {classe.split('#')[1]} 
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
                  <h3 >Repositorio {nome} - Classes</h3>
                </CardHeader>
                <Table className="align-items-center table-flush"   responsive>
                  <tbody>
                    <Col className=" ml-auto" md="12"   >
                      <Coisa   classes={state.classe}/>
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

Classe.layout = Admin;

export default Classe;
