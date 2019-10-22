import React from "react";
import { Container, Row, Col, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";

import LoadingIndicator from "../components/LoadingIndicator";
import UserImages from "../containers/UserImages";

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
                <CardTitle className="font-weight-bold" style={textStyle}>
                  {user.username}
                </CardTitle>
                <img
                  src={user.profileImage}
                  alt="profileImage"
                  className="rounded-circle"
                  style={imgStyle}
                />{" "}
                <Button
                  tag={Link}
                  to={`/users/${user.id}`}
                  style={buttonStyle}
                  className="w-100"
                >
                  See More
                </Button>
              </Col>
              <Col>
                <UserImages userId={user.id} />
              </Col>
            </Row>
          </Container>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
