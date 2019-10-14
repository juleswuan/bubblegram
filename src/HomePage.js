import React from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import {
  Container,
  Card,
  Row,
  Col,
  CardText,
  CardTitle,
  CardBody,
  Button
} from "reactstrap";
import UserImages from "./containers/UserImages";

const buttonStyle = {
  backgroundColor: "#f95959",
  color: "white",
  borderColor: "#f95959"
};

const textStyle = {
  color: "#455d7a"
};

const imgStyle = {
  height: 150,
  margin: 10,
  border: 10,
  borderColor: "white"
};

const HomePage = props => {
  return (
    <div>
      {props.isLoading ? <LoadingIndicator /> : null}
      <ul>
        {props.users.map((user, index) => (
          <Container
            key={index}
            fluid={true}
            style={{ backgroundColor: "#E3E3E3" }}
          >
            <Row style={{ marginBottom: 10 }}>
              <Col xs="12" md="6" lg="2" className="d-block">
                {/* <Card style={{ backgroundColor: "#E3E3E3" }}>
                  <CardBody> */}
                    <CardTitle className="font-weight-bold" style={textStyle}>
                      {user.username}
                    </CardTitle>
                    {/* <CardText style={textStyle}>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </CardText> */}
                    <img
                      src={user.profileImage}
                      alt="profileImage"
                      className="rounded-circle"
                      style={imgStyle}
                    />
                    <Button style={buttonStyle} className="w-100">
                      See More
                    </Button>
                  {/* </CardBody>
                </Card> */}
              </Col>
              <Col>
                <UserImages userId={user.id}/>
              </Col>
            </Row>
          </Container>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
