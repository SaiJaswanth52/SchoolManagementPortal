import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardText } from "react-bootstrap";
import adminWorkspace from "../adminWorkspace.jpg";

export default function Home() {
  return (
    <div className="Home">
      <Card style={{ backgroundColor: "bisque" }}>
        <CardBody>
          <CardText>
            <p>
              "Welcome to Subjects Registration Portal..."
              <br />
              <CardImg
                alt="stuimg"
                src={adminWorkspace}
                className="admwork-img"
              />
              <br />
              <sub>Please Login and Proceed Further...</sub>
            </p>
          </CardText>
          <Link to="/AdminLogin" className="btn btn-primary mt-3 button-link">
            Admin Login
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
