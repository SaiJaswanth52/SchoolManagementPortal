import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  CardImg,
  CardText,
  Button,
} from "react-bootstrap";
import "../App";
import { Link } from "react-router-dom";
import studentImg from "../studentImg.jpg";
import TeachersImg from "../TeachersImg.jpg";

export default function AdminDashboard() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Welcome to Admin Dashboard..</h2>
        <Link to="/" className="btn btn-primary mt-1 button-link">
          LogOut
        </Link>
      </div>
      <Row className="justify-content-center">
        <Col className="d-flex justify-content-center flex-row admlogin m-4">
          <Card className="m-2" style={{ backgroundColor: "lightblue" }}>
            <CardTitle>
              <u>Student Portal</u>
            </CardTitle>
            <CardImg
              alt="stuimg"
              src={studentImg}
              className="d-flex justify-content-center flex-row admwork-img col-8"
            />
            <CardBody>
              <CardText>Helps to Manage Student Registration</CardText>
              <Link
                to="/StudentsSection"
                className="btn btn-primary mt-2 button-link"
              >
                Student Section!
              </Link>
            </CardBody>
          </Card>

          <Card className="m-2" style={{ backgroundColor: "lightpink" }}>
            <CardTitle>
              <u>Teachers Portal</u>
            </CardTitle>
            <CardImg
              alt="stuimg"
              src={TeachersImg}
              className="d-flex justify-content-center flex-row admwork-img col-8"
            />
            <CardBody>
              <CardText>Helps to Manage Teachers Data</CardText>
              <Link
                to="/TeachersSection"
                className="btn btn-primary mt-2 button-link"
              >
                Teachers Section!
              </Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div className="d-flex justify-content-center">
        <Link to="/InsertData" className="btn btn-primary mt-2 button-link">
          Insert Data
        </Link>
      </div>
    </div>
  );
}
