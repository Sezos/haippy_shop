import HomePage from "./pages/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Create from "./pages/Create";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<Create />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}
