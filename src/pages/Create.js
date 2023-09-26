import { useState } from "react";
// import { firestore } from "./Firebase";

// import { getDocs, collection, addDoc, updateDoc } from "firebase/firestore";
import {
    Button,
    Container,
    Input,
    InputGroup,
    InputGroupText,
} from "reactstrap";

function Create() {
    const [pass, setPass] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Container>
            {!isLoggedIn ? (
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100vh",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "100px",
                            borderRadius: "50px",
                            border: "5px solid #AF94F6",
                        }}
                    >
                        <InputGroup>
                            <InputGroupText>🔑</InputGroupText>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={pass}
                                onChange={(data) => {
                                    setPass(data.target.value);
                                }}
                            />
                        </InputGroup>
                        <Button
                            style={{
                                marginTop: "10px",
                                width: "100%",
                                backgroundColor: "purple",
                            }}
                            onClick={() => {
                                setIsLoggedIn(
                                    pass === process.env.REACT_APP_PASSWORD
                                );
                            }}
                        >
                            Log in
                        </Button>
                    </div>
                </div>
            ) : (
                <div>Logged In</div>
            )}
        </Container>
    );
}

export default Create;
