import Letter from "./Letter";
import Products from "./Products";

function HomePage() {
    return (
        <div className="home">
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
