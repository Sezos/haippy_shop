import { useState } from "react";
import {
    Button,
    Col,
    Container,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    List,
    Row,
} from "reactstrap";
import { useAlert } from "react-alert";

function InfoPage() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const alert = useAlert();

    const save = () => {
        if (name === "" || phone === "") {
            alert.show("please enter your info", {
                type: "error",
            });
            return;
        }
        if (phone.length !== 8) {
            alert.show("please enter your info", { type: "error" });
            return;
        }
        localStorage.setItem("userInfo", JSON.stringify({ name, phone }));
        alert.show("User Info Saved! You can go back now", { type: "success" });
    };

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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        position: "absolute",
                        width: "calc(90% - 5px)",
                        height: window.innerWidth <= 640 ? "20vh" : "20vh",
                        left: "5%",
                        top: "5%",
                        borderTopLeftRadius: "40px",
                        borderTopRightRadius: "40px",
                        border: "5px solid #AF94F6",
                        borderRight: "5px",
                        borderBottom: "0px",
                        backgroundColor: "#dccdfe",
                        padding: "3%",
                    }}
                >
                    <List>
                        <p
                            style={{
                                fontSize:
                                    window.innerWidth <= 640 ? "40%" : "90%",
                            }}
                        >
                            Бүтээгдэхүүн худалдан авахдаа дараах зөвлөмжийг
                            дагаарай. Бүтээгдэхүүн бүрийн доор хэсэгт байрлах
                            See more хэсгээс бүтээгдэхүүний зураг, дэлгэрэнгүй
                            тайлбар хэсгийг харах боломжтой. See more → Contact
                            us хэсэгт харуулж буй instagram эсвэл Facebook
                            хаягуудаар холбогдон сонирхсон эд зүйлээ худалдан
                            авах боломжтой. Вебтэй холбоотой санал хүсэлт байвал
                            Contact хэсэгт өөрийн мэдээллээ оруулснаар админд
                            таны хүсэлт илгээгдэнэ. Сонирхсон эд зүйлээ сонгон
                            Save хийх - Save хийснээр таны сонирхсон бүх бараа
                            хадгалагдаад явах ба мэдээллээ оруулснаар админ таны
                            сонирхсон бүх барааны мэдээллийг харан таньтай
                            холбогдох боломжтой болно.
                        </p>
                    </List>
                </div>
                <Col
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Row
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#AF94F6",
                            fontWeight: "bolder",
                            fontSize: "30px",
                            marginBottom: "20px",
                        }}
                    >
                        Set Your Info
                    </Row>
                    <Row
                        style={{
                            width: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FormGroup
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <InputGroup style={{ marginBottom: "20px" }}>
                                <InputGroupText>Name</InputGroupText>
                                <Input
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </InputGroup>
                            <InputGroup style={{ marginBottom: "20px" }}>
                                <InputGroupText>Phone Number</InputGroupText>
                                <Input
                                    type="number"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                />
                            </InputGroup>
                            <Button
                                onClick={() => {
                                    save();
                                    // console.log("hellow");
                                }}
                                style={{ backgroundColor: "#AF94F6" }}
                            >
                                Save
                            </Button>
                        </FormGroup>
                    </Row>
                </Col>
            </Container>
        </div>
    );
}

export default InfoPage;
