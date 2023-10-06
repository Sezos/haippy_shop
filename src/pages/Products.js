import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    Row,
    Col,
    Modal,
    ModalBody,
    Badge,
} from "reactstrap";

import { firestore } from "./Firebase";
import {
    getDocs,
    collection,
    updateDoc,
    query,
    doc,
    where,
} from "firebase/firestore";

import { useEffect, useState } from "react";

function Products() {
    const TypesCollection = collection(firestore, "types");
    const ProductsCollection = collection(firestore, "products");
    const ConditionsCollection = collection(firestore, "Conditions");
    const SavedCollection = collection(firestore, "saved");

    const [saves, setSaves] = useState({ phone: "", products: [] });
    const [types, setTypes] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [products, setProducts] = useState([]);
    const [showingProducts, setShowingProducts] = useState([]);
    const [selectedType, setSelectedType] = useState(-1);
    const [selectedProduct, setSelectedProduct] = useState(-1);
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const save = async (lol) => {
        const sth = await updateDoc(doc(firestore, `saved/${saves.id}`), {
            products: lol,
        });
        console.log(sth);
    };

    useEffect(() => {
        getTypes();
        getConditions();
        getProducts();
        getSaved();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedType === -1) {
            setShowingProducts(products);
        } else {
            setShowingProducts(
                // eslint-disable-next-line eqeqeq
                products.filter((product) => product.types == selectedType)
            );
        }
    }, [selectedType, products]);

    const getTypes = async () => {
        const tempDatas = await getDocs(TypesCollection);
        const docs = [];

        tempDatas.forEach((data) => {
            docs.push({ ...data.data(), id: data.id });
        });

        setTypes(docs);
    };

    const getSaved = async () => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user && user.phone) {
            const datas = await getDocs(
                query(SavedCollection, where("phone", "==", user.phone))
            );

            let docs;

            datas.forEach((data) => {
                docs = {
                    phone: data.data().phone,
                    products: data.data().products,
                    id: data.id,
                };
            });
            console.log(docs);
            setSaves(docs);
        }
    };

    const getConditions = async () => {
        const tempDatas = await getDocs(ConditionsCollection);
        const docs = [];

        tempDatas.forEach((data) => {
            docs.push({ ...data.data(), id: data.id });
        });

        setConditions(docs);
    };

    const getProducts = async () => {
        const tempDatas = await getDocs(ProductsCollection);
        const docs = [];

        tempDatas.forEach((data) => {
            docs.push({ ...data.data(), id: data.id });
        });

        setProducts(docs);
        setShowingProducts(docs);
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
                            key={idx}
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
                    {showingProducts.map((product, idx) => {
                        return (
                            <Col md="3" sm="6" key={idx}>
                                <Card style={{ marginBottom: "10px" }}>
                                    <CardImg
                                        variant="top"
                                        src={product?.images[0]}
                                    />
                                    <CardBody>
                                        <CardTitle
                                            style={{ fontWeight: "bold" }}
                                        >
                                            {product.name}
                                        </CardTitle>
                                        <Row>
                                            <Col>
                                                <Button
                                                    style={{
                                                        backgroundColor:
                                                            "#AF94F6",
                                                    }}
                                                    onClick={() => {
                                                        setSelectedProduct(idx);
                                                        toggle();
                                                    }}
                                                >
                                                    See More
                                                </Button>
                                            </Col>
                                            <Col
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "right",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {product &&
                                                    saves.products.includes(
                                                        product.id
                                                    ) && (
                                                        <Badge
                                                            style={{
                                                                height: "20px",
                                                            }}
                                                            color="success"
                                                        >
                                                            saved
                                                        </Badge>
                                                    )}
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>

            <Modal isOpen={modal} toggle={toggle} size="xl">
                <ModalBody>
                    <Row>
                        <Col md="6" sm="12">
                            <Row>
                                <img
                                    alt="pic1"
                                    src={products[selectedProduct]?.images[0]}
                                    style={{ borderRadius: "5%" }}
                                />
                            </Row>
                            <Row style={{ overflow: "scroll" }}>
                                {products[selectedProduct]?.images.map(
                                    (image, idx) => {
                                        if (idx === 0) return <></>;
                                        return (
                                            <Col key={idx}>
                                                <img
                                                    alt={idx}
                                                    src={image}
                                                    style={{
                                                        borderRadius: "5%",
                                                    }}
                                                />
                                            </Col>
                                        );
                                    }
                                )}
                            </Row>
                        </Col>
                        <Col
                            style={{
                                paddingLeft: "30px",
                            }}
                        >
                            <Row style={{ marginBottom: "50px" }}>
                                <Row>
                                    <Col>
                                        <h1
                                            style={{
                                                color: "purple",
                                                fontSize: "50px",
                                                fontWeight: "bolder",
                                                marginLeft: "-15px",
                                            }}
                                        >
                                            {products[selectedProduct]?.name}
                                        </h1>
                                    </Col>
                                    <Col
                                        md="2"
                                        style={{
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <Badge color="primary">
                                            {
                                                conditions[
                                                    products[selectedProduct]
                                                        ?.condition
                                                ]?.name
                                            }
                                        </Badge>
                                    </Col>
                                </Row>
                                <Row
                                    style={{
                                        color: "gray",
                                        marginBottom: "30px",
                                    }}
                                >
                                    ₮{products[selectedProduct]?.price}
                                </Row>
                                <Row>
                                    {products[selectedProduct]?.description}
                                </Row>
                            </Row>
                            <Row
                                style={{
                                    position: "absolute",
                                    bottom: "20px",
                                    width: "47%",
                                }}
                            >
                                <Button
                                    style={{
                                        width: "40%",
                                        marginRight: "10%",
                                        marginLeft: "5%",
                                    }}
                                    color="primary"
                                    onClick={() => {
                                        window.location.href = "/contact";
                                    }}
                                >
                                    Contact
                                </Button>
                                <Button
                                    style={{
                                        width: "40%",
                                    }}
                                    color="success"
                                    onClick={() => {
                                        if (
                                            saves.products.includes(
                                                products[selectedProduct].id
                                            )
                                        ) {
                                            save(
                                                saves.products.filter(
                                                    (lol) =>
                                                        lol !==
                                                        products[
                                                            selectedProduct
                                                        ]?.id
                                                )
                                            );
                                            setSaves({
                                                ...saves,
                                                products: saves.products.filter(
                                                    (lol) =>
                                                        lol !==
                                                        products[
                                                            selectedProduct
                                                        ]?.id
                                                ),
                                            });
                                        } else {
                                            save([
                                                ...saves.products,
                                                products[selectedProduct]?.id,
                                            ]);
                                            setSaves({
                                                ...saves,
                                                products: [
                                                    ...saves.products,
                                                    products[selectedProduct]
                                                        ?.id,
                                                ],
                                            });
                                        }
                                    }}
                                >
                                    {saves.products.includes(
                                        products[selectedProduct]?.id
                                    )
                                        ? "Unsave"
                                        : "Save"}
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default Products;
