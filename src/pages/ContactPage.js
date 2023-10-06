import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
    Button,
    Col,
    Container,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Row,
} from "reactstrap";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

function ContactPage() {
    return (
        <div
            className="contact"
            style={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container
                style={{
                    background: "white",
                    width: "90%",
                    height: "90vh",
                    borderRadius: "40px",
                    border: "5px solid #AF94F6",
                    padding: "20px",
                }}
            >
                <Col style={{ height: "100%" }}>
                    <Row>
                        <Col>
                            <div
                                style={{
                                    marginTop: "10px",
                                    marginLeft: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    style={{ backgroundColor: "#AF94F6" }}
                                    onClick={() => {
                                        window.location.href = "/";
                                    }}
                                >
                                    Back
                                </Button>
                            </div>
                        </Col>
                        <Col>
                            <div
                                style={{
                                    justifyContent: "center",
                                    display: "flex",
                                }}
                            >
                                <h1
                                    style={{
                                        color: "#AA94F6",
                                        fontWeight: "bolder",
                                    }}
                                >
                                    Contact us
                                </h1>
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row style={{ height: "80%" }}>
                        <Col
                            style={{
                                marginLeft: "10%",
                                // marginRight: "20%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                // background: "black",
                            }}
                        >
                            <FormGroup>
                                <InputGroup style={{ marginBottom: "20px" }}>
                                    <InputGroupText
                                        style={{ backgroundColor: "#AF94F6" }}
                                    >
                                        Name
                                    </InputGroupText>
                                    <Input
                                        style={{ backgroundColor: "#DCCDFE" }}
                                    />
                                </InputGroup>
                                <InputGroup style={{ marginBottom: "20px" }}>
                                    <InputGroupText
                                        style={{ backgroundColor: "#AF94F6" }}
                                    >
                                        Phone Number
                                    </InputGroupText>
                                    <Input
                                        type="number"
                                        style={{ backgroundColor: "#DCCDFE" }}
                                    />
                                </InputGroup>
                                <InputGroupText
                                    style={{ backgroundColor: "#AF94F6" }}
                                >
                                    Message
                                </InputGroupText>
                                <Input
                                    size="xl"
                                    type="textarea"
                                    style={{
                                        backgroundColor: "#DCCDFE",
                                        marginBottom: "30px",
                                    }}
                                />
                                <Button style={{ backgroundColor: "#AF94F6" }}>
                                    Submit
                                </Button>
                            </FormGroup>
                        </Col>
                        <Col
                            style={{
                                marginLeft: "10%",
                                marginRight: "20%",
                                display: "flex",
                                justifyContent: "right",
                                marginTop: "12%",
                                borderLeft: "1px solid #AF94F6",
                                height: "50%",
                            }}
                        >
                            <Button
                                style={{
                                    backgroundColor: "#AF94F6",
                                    marginRight: "10px",
                                    height: "38px",
                                }}
                                onClick={() => {
                                    window.open(
                                        "https://instagram.com/nana.ganbold"
                                    );
                                }}
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: "#AF94F6",
                                    marginRight: "10px",
                                    height: "38px",
                                }}
                                onClick={() => {
                                    window.open(
                                        "https://facebook.com/nanaganbold0412"
                                    );
                                }}
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                            </Button>
                            <a
                                style={{
                                    backgroundColor: "#AF94F6",
                                    marginRight: "10px",
                                    width: "38px",
                                    height: "38px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid gray",
                                }}
                                href="tel:+97699618000"
                            >
                                <FontAwesomeIcon
                                    color="white"
                                    icon={faPhoneAlt}
                                />
                            </a>
                            <a
                                style={{
                                    backgroundColor: "#AF94F6",
                                    marginRight: "10px",
                                    width: "38px",
                                    height: "38px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid gray",
                                }}
                                href="email:nanasan0412@gmail.com"
                            >
                                <FontAwesomeIcon
                                    color="white"
                                    icon={faEnvelope}
                                />
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Container>
        </div>
    );
}

export default ContactPage;
