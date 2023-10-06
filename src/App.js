import HomePage from "./pages/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import ContactPage from "./pages/ContactPage";
import InfoPage from "./pages/InfoPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<Create />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/info" element={<InfoPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}
