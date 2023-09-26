import { Col, Container, Row } from "reactstrap";
import background from "../Images/Background.png";
import Letter from "./Letter";
import Products from "./Products";

function HomePage() {
    return (
        <div className="home" style={{}}>
            <img
                alt="bg"
                src={background}
                style={{
                    padding: 0,
                    width: "100%",
                    height: "100hv",
                    position: "absolute",

                    zIndex: "-1",
                }}
            ></img>

            <Row style={{ paddingTop: "30vh" }}>
                <Col md="2"></Col>
                <Col md="8">
                    <Letter />
                </Col>
                <Col md="2"></Col>
            </Row>
            <Row style={{ marginTop: "50px" }}>
                <Col></Col>
                <Col md="11">
                    <Products />
                </Col>
                <Col></Col>
            </Row>
        </div>
    );
}

export default HomePage;
