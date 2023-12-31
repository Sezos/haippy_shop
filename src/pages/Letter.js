function Letter() {
    return (
        <div
            className="letter"
            style={{
                borderRadius: "30px",
                borderWidth: "5px",
                padding: "30px",
                border: "5px solid #AF94F6",
                backgroundColor: "white",
                width: "80%",
                textAlign: "center",
                fontSize: "120%",
            }}
        >
            Таны худалдан авсан эд зүйлсийн мөнгө нь Австрали руу сурах
            сургалтын зардал болон найз залууруугаа очих тийзний зардалд минь
            бага ч болтугай нэмэр болох юм. Та сонирхсон эд зүйлээ худалдан
            аваарай, чин сэтгэлээс баярлалаа.
            <br />
            <b>Хүндэтгэсэн: Нана & Бадрал &#10084;</b>
        </div>
    );
}

export default Letter;
