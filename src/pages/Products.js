import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardText,
    Row,
    Col,
} from "reactstrap";
import Types from "./Types";
import background from "../Images/Background.png";
function Products() {
    const buttons = [
        {
            name: "Dresses & Skirts",
        },
        {
            name: "Leggings",
        },
        {
            name: "Bags",
        },
        {
            name: "T-Shirt",
        },
        {
            name: "Shoes",
        },
        {
            name: "Sweater",
        },
        {
            name: "Hat & Scarf",
        },
        {
            name: "Other",
        },
    ];
    return (
        <div
            className="letter"
            style={{
                borderRadius: "30px",
                borderWidth: "5px",
                padding: "30px",
                border: "5px solid purple",
                backgroundColor: "white",
                width: "100%",
                marginBottom: "200px",
            }}
        >
            <div>
                <Button style={{ marginRight: "10px", borderRadius: "10px" }}>
                    All
                </Button>
                {buttons.map((but, idx) => {
                    return (
                        <Button
                            style={{
                                marginLeft: "5px",
                                borderRadius: "10px",
                                backgroundColor: "lightgray",
                                border: 0,
                                color: "black",
                            }}
                            index={idx}
                        >
                            {but.name}
                        </Button>
                    );
                })}
            </div>
            <div style={{ marginTop: "40px" }}>
                <Row>
                    <Col>
                        <Card>
                            <CardImg variant="top" src={background} />
                            <CardBody>
                                <CardTitle>Card Title</CardTitle>
                                <CardText>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </CardText>
                                <Button variant="primary">Go somewhere</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <CardImg variant="top" src={background} />
                            <CardBody>
                                <CardTitle>Card Title</CardTitle>
                                <CardText>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </CardText>
                                <Button variant="primary">Go somewhere</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <CardImg variant="top" src={background} />
                            <CardBody>
                                <CardTitle>Card Title</CardTitle>
                                <CardText>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </CardText>
                                <Button variant="primary">Go somewhere</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <CardImg variant="top" src={background} />
                            <CardBody>
                                <CardTitle>Card Title</CardTitle>
                                <CardText>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </CardText>
                                <Button variant="primary">Go somewhere</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Products;
