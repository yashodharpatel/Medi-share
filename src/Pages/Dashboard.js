import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Card } from "react-bootstrap";
import DashboardNav from "../Components/DashboardNav";
import donar from "../assets/donor.png";
import vol from "../assets/order medicine.png";
import { Footer } from "../Components/Footer";

export default function Dashboard() {
  return (
    <>
      <div>
        <DashboardNav />
        <Card className="set-width-1200 mt-4 mb-3"
              // style={{ margin: "40px 60px" }}
            >
              <Card.Body>
                <Card.Text>
                "Welcome to a world where every pill counts! Our mission is to ensure that no medicine goes to waste, and every unused pill can make a difference in someone's life. With our platform, you can easily donate your unused medications to those in need and make a positive impact in your community. Join us in our effort to create a more sustainable and equitable world, where every unused medicine has the chance to heal. Donate your unused meds today and make a difference in someone's life, one pill at a time."
                </Card.Text>
              </Card.Body>
            </Card>
        <div
          className="d-flex justify-content-center align-items-center set-width-1200"
          // style={{ margin: "40px 60px" }}
        >
          <Link
            to="/donar"
            style={{
              textDecoration: "none",
              color: "black",
              textAlign: "center",
              width: "50%",
              marginRight: "38px"
            }}
            className="mt-3 mb-4"
          >
            <Card
              // style={{ margin: "20px" }}
              
            >
              <Card.Body>
                <img src={donar} alt="Donar" width="50" height="60" />

                <Card.Title style={{ marginBottem: "none" }}>
                  <h3>Be a Donar</h3>
                </Card.Title>

                <Card.Text>
                  Donating is a small investment in the future of humanity..
                </Card.Text>
                {/* <Login /> */}
              </Card.Body>
            </Card>{" "}
          </Link>
          <Link to="/receiver"  style={{
              textDecoration: "none",
              color: "black",
              textAlign: "center",
              width: "50%"
            }} className="mt-3 mb-4">
            <Card
              // style={{ margin: "20px" }}
              onClick={() => {
                localStorage.setItem("formRender", "recepient");
              }}
            >
              <Card.Body>
                <img src={vol} alt="volunteer" width="50" height="60" />
                <Card.Title>
                  <h3>Be a Receiver</h3>
                </Card.Title>

                <Card.Text>
                  When you receive, you allow the universe to support you..
                </Card.Text>
                {/* <Login /> */}
              </Card.Body>
            </Card>
          </Link>
        </div>

        {/* <Row>
          <Col>
            <Button>
              <Link to="/donar">Donar</Link>
            </Button>
          </Col>
          <Col>
            <Button>
              <Link to="/receiver">Receiver</Link>
            </Button>
          </Col>
        </Row> */}
      </div>
      <Footer/>
    </>
  );
}
