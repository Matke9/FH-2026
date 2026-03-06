import './index.css';
import './components/Pravilnik/Pravilnik.css';
import Home from "./pages/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/footer.jsx";
import Prijava from "./pages/Prijava.jsx";
import Pravilnik from "./components/Pravilnik/Pravilnik.tsx";
import { Routes, Route } from "react-router-dom";

function App() {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prijava" element={<Prijava />} />
                <Route path="/pravilnik" element={<Pravilnik />} />
            </Routes>

            <Footer/>
        </>
    );
}

export default App;
