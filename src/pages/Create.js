import { useEffect, useState } from "react";
import { firestore, storage } from "./Firebase";

import {
    getDocs,
    collection,
    setDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Resizer from "react-image-file-resizer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Progress,
    Row,
    Table,
} from "reactstrap";

function Create() {
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [products, setProducts] = useState([]);
    const [productsShow, setProductsShow] = useState([]);
    const [types, setTypes] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [searchInput, setSearchInput] = useState([]);

    const [data, setData] = useState({});

    const TypesCollection = collection(firestore, "types");
    const ConditionCollection = collection(firestore, "Conditions");
    const ProductsCollection = collection(firestore, "products");
    const SavedCollection = collection(firestore, "saved");

    const [progress, setProgress] = useState(0);

    const [state, setState] = useState(0);
    const [deleting, setDeleting] = useState("");
    const [saves, setSaves] = useState([]);

    useEffect(() => {
        getProducts();
        getConditions();
        getTypes();
        getSaved();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProducts = async () => {
        let tempDatas;
        tempDatas = await getDocs(ProductsCollection);
        const docs = [];

        tempDatas.forEach((data) => {
            docs.push({ ...data.data(), id: data.id });
        });
        console.log(docs);
        setProducts(docs);
        setProductsShow(docs);
    };

    const getSaved = async () => {
        const datas = await getDocs(SavedCollection);
        let docs = [];
        datas.forEach((data) => {
            docs.push({
                phone: data.data().phone,
                products: data.data().products,
                id: data.id,
            });
        });
        setSaves(docs);
    };

    const getTypes = async () => {
        const tempDatas = await getDocs(TypesCollection);
        const docs = [];

        tempDatas.forEach((data) => {
            docs.push(data.data());
        });

        setTypes(docs);
    };

    const getConditions = async () => {
        const tempDatas = await getDocs(ConditionCollection);
        const docs = [];

        tempDatas.forEach((data) => {
            docs.push(data.data());
        });

        setConditions(docs);
    };

    const toggle = () => setModal(!modal);
    const toggleDelete = () => setDeleteModal(!deleteModal);

    const deleteProduct = async () => {
        try {
            await deleteDoc(doc(ProductsCollection, deleting));
        } catch (err) {
            console.log(err);
        } finally {
            toggleDelete();
            window.location.reload();
        }
    };

    const finish = async () => {
        toggle();
        setProgress(0);
    };

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                600,
                600,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    const uploadImages = async (imgs) => {
        const imgURLs = [];
        setState(1);
        let number = 1;
        Array.from(imgs).forEach(async (image, idx) => {
            const newImage = await resizeFile(image);
            const storageRef = ref(storage, `images/${data.name}/${idx}`);
            const uploadTask = uploadBytesResumable(storageRef, newImage);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log(snapshot);
                },
                (error) => {
                    console.error(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        imgURLs.push(url);
                    });
                    setProgress((number / imgs.length) * 100);
                    number++;
                }
            );
        });
        setData({ ...data, images: imgURLs });
    };

    const uploadDatas = async () => {
        console.log(data);
        setState(2);
        if (data.name && data.images) {
            await setDoc(doc(ProductsCollection), data);
            finish();
        } else {
            console.log("Error");
        }
    };

    const cancelUpload = () => {
        setData({});
        toggle();
        setState(0);
        setProgress(0);
    };

    const search = () => {
        if (searchInput === "") {
            setProductsShow(products);
        } else {
            const saveuud = saves.find(
                (save, idx) => save.phone === searchInput
            );
            console.log(saveuud);
            setProductsShow(
                products.filter((lol) => saveuud?.products?.includes(lol.id))
            );
        }
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100vh",
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
                <Row>
                    <Col>
                        <Card>
                            <CardHeader
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {"Products"}
                                    <Input
                                        style={{
                                            marginLeft: "20px",
                                            marginRight: "20px",
                                        }}
                                        onChange={(e) => {
                                            setSearchInput(e.target.value);
                                        }}
                                    />
                                    <Button color="primary" onClick={search}>
                                        Search
                                    </Button>
                                </div>
                                <Button onClick={toggle}>Create</Button>
                            </CardHeader>
                            <CardBody style={{ overflow: "scroll" }}>
                                <Table
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Condition</th>
                                            <th>Type</th>
                                            <th>Price</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productsShow.map((product) => {
                                            return (
                                                <tr key={product.value}>
                                                    <th scope="row">
                                                        {product.value}
                                                    </th>
                                                    <td>
                                                        <img
                                                            alt="zurag"
                                                            src={
                                                                product
                                                                    .images[0]
                                                            }
                                                            width={"50px"}
                                                        ></img>
                                                    </td>
                                                    <td>{product.name}</td>

                                                    <td>
                                                        {product.description}
                                                    </td>
                                                    <td>{product.condition}</td>
                                                    <td>{product.types}</td>
                                                    <td>{product.price}</td>
                                                    <td>
                                                        <Button
                                                            color="danger"
                                                            onClick={() => {
                                                                setDeleting(
                                                                    product.id
                                                                );
                                                                toggleDelete();
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                            />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Create</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <InputGroup style={{ marginBottom: "10px" }}>
                                <InputGroupText>Name</InputGroupText>
                                <Input
                                    value={data["name"]}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        });
                                    }}
                                ></Input>
                            </InputGroup>
                            <InputGroup style={{ marginBottom: "10px" }}>
                                <InputGroupText>Description</InputGroupText>
                                <Input
                                    value={data["description"]}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            description: e.target.value,
                                        });
                                    }}
                                ></Input>
                            </InputGroup>
                            <InputGroup style={{ marginBottom: "10px" }}>
                                <InputGroupText>Condition</InputGroupText>
                                <Input
                                    value={data["condition"]}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            condition: e.target.value,
                                        });
                                    }}
                                    type="select"
                                >
                                    <option value={-1}>Choose Condition</option>
                                    {conditions.map((condi, idx) => {
                                        return (
                                            <option
                                                key={idx}
                                                value={condi.value}
                                            >
                                                {condi.name}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </InputGroup>
                            <InputGroup style={{ marginBottom: "10px" }}>
                                <InputGroupText>Type</InputGroupText>
                                <Input
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            types: e.target.value,
                                        });
                                    }}
                                    type="select"
                                >
                                    <option value={-1}>Choose Type</option>
                                    {types.map((type, idx) => {
                                        return (
                                            <option
                                                key={idx}
                                                value={type.value}
                                            >
                                                {type.name}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </InputGroup>
                            <InputGroup style={{ marginBottom: "10px" }}>
                                <InputGroupText>Price</InputGroupText>
                                <Input
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            price: e.target.value,
                                        });
                                    }}
                                    type="number"
                                ></Input>
                            </InputGroup>
                            <InputGroup style={{ marginBottom: "10px" }}>
                                <Input
                                    multiple
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            uploadImages(e.target.files);
                                        }
                                    }}
                                    type="file"
                                ></Input>
                            </InputGroup>
                            <Row>
                                <Col
                                    md="4"
                                    style={{ justifyContent: "center" }}
                                >
                                    {state === 1
                                        ? "Uploading Images"
                                        : state === 2
                                        ? "Uploading Task"
                                        : ""}
                                </Col>
                                <Col>
                                    <Progress
                                        value={progress}
                                        style={{ marginBottom: "10px" }}
                                    />
                                </Col>
                            </Row>
                            <Button
                                color="primary"
                                disabled={progress !== 100 && progress !== 0}
                                onClick={uploadDatas}
                            >
                                Upload
                            </Button>{" "}
                            <Button
                                color="secondary"
                                disabled={progress !== 100 && progress !== 0}
                                onClick={cancelUpload}
                            >
                                Cancel
                            </Button>
                        </FormGroup>
                    </ModalBody>
                </Modal>
                <Modal isOpen={deleteModal} toggle={toggleDelete}>
                    <ModalHeader toggle={toggleDelete}>
                        Are you sure?
                    </ModalHeader>
                    <ModalBody>Are you sure to delete this product?</ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={deleteProduct}>
                            Yes, I'm sure bitch
                        </Button>{" "}
                        <Button color="secondary" onClick={toggleDelete}>
                            just kidding
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </div>
    );
}

export default Create;
