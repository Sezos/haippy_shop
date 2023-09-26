import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

import { firestore } from "./Firebase";
import {
    getDocs,
    collection,
    // addDoc, updateDoc
} from "firebase/firestore";

import background from "../Images/Background.png";
import { useEffect, useState } from "react";

function Products() {
    const TypesCollection = collection(firestore, "types");
    const ProductsCollection = collection(firestore, "products");
    const [types, setTypes] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedType, setSelectedType] = useState(-1);

    useEffect(() => {
        getTypes();
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getTypes = async () => {
        const tempDatas = await getDocs(TypesCollection);
        const docs = [];

        tempDatas.forEach((data) => {
            docs.push({ ...data.data(), id: data.id });
        });

        setTypes(docs);
    };

    const getProducts = async () => {
        const tempDatas = await getDocs(ProductsCollection);
        const docs = [];

        tempDatas.forEach((data) => {
            docs.push({ ...data.data(), id: data.id });
        });
        console.log(docs);
        setProducts(docs);
    };

    return (
        <div
            className="letter"
            style={{
                borderRadius: "30px",
                borderWidth: "5px",
                padding: "30px",
                border: "5px solid #AF94F6",
                backgroundColor: "white",
                width: "95%",
                marginBottom: "200px",
            }}
        >
            <div>
                <Button
                    style={{
                        marginRight: "10px",
                        borderRadius: "10px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        marginBottom: "10px",
                        border: 0,
                        color: "black",
                        background:
                            selectedType === -1 ? "lightblue" : "lightgray",
                    }}
                    onClick={() => {
                        setSelectedType(-1);
                    }}
                >
                    All
                </Button>
                {types.map((but, idx) => {
                    return (
                        <Button
                            style={{
                                marginLeft: "5px",
                                marginBottom: "10px",
                                borderRadius: "10px",
                                backgroundColor: "lightgray",
                                border: 0,
                                color: "black",
                                background:
                                    selectedType === but.value
                                        ? "lightblue"
                                        : "lightgray",
                            }}
                            index={idx}
                            value={but.value}
                            onClick={() => {
                                setSelectedType(but.value);
                            }}
                        >
                            {but.name}
                        </Button>
                    );
                })}
            </div>

            <div style={{ marginTop: "40px" }}>
                <Row>
                    {products.map((product, idx) => {
                        return (
                            <Col>
                                <Card style={{ marginBottom: "10px" }}>
                                    <CardImg
                                        variant="top"
                                        src={product.image}
                                    />
                                    <CardBody>
                                        <CardTitle>{product.name}</CardTitle>
                                        <Button variant="primary">
                                            See More
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                    <Col>
                        <Card style={{ marginBottom: "10px" }}>
                            <CardImg variant="top" src={background} />
                            <CardBody>
                                <CardTitle>Card Title</CardTitle>
                                <Button variant="primary">See More</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <CardImg variant="top" src={background} />
                            <CardBody>
                                <CardTitle>Card Title</CardTitle>
                                <Button variant="primary">See More</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <CardImg variant="top" src={background} />
                            <CardBody>
                                <CardTitle>Card Title</CardTitle>
                                <Button variant="primary">See More</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <CardImg variant="top" src={background} />
                            <CardBody>
                                <CardTitle>Card Title</CardTitle>
                                <Button variant="primary">See More</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Products;
