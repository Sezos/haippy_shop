import Letter from "./Letter";
import Products from "./Products";
import "../css/homepage.css";
import Nana from "../Images/nana.png";
import Badral from "../Images/badral.png";
import Plane from "../Images/plane.gif";

function HomePage() {
    const width = window.innerWidth <= 640 ? "7vh" : "10vh";

    return (
        <div className="home">
            <ul className="background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div
                style={{
                    display: "flex",
                    marginTop: "17vh",
                    position: "absolute",
                    justifyContent: "space-evenly",
                    alignContent: "center",
                    width: "100%",
                }}
            >
                <img
                    style={{
                        width,
                        height: width,
                    }}
                    alt="nana"
                    src={Nana}
                />
                <div className="planeContainer">
                    <img alt="plane" src={Plane} className="plane" />
                </div>
                <img
                    style={{
                        width,
                        height: width,
                    }}
                    alt="nana"
                    src={Badral}
                />
            </div>
            <div
                style={{
                    paddingTop: "30vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Letter />
            </div>
            <div
                style={{
                    display: "flex",
                    paddingTop: "10vh",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <Products />
            </div>
        </div>
    );
}

export default HomePage;
