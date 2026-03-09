import './index.css';
import './components/Pravilnik/Pravilnik.css';
import Home from "./pages/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/footer.jsx";
import Prijava from "./pages/Prijava.jsx";
import Pravilnik from "./components/Pravilnik/Pravilnik.tsx";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import { usePreloader } from "./hooks/usePreloader.js";
import { useEffect } from "react";

function App() {
    const { loaded, progress } = usePreloader();

    useEffect(() => {
        if (!loaded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [loaded]);

    return (
        <>
            <LoadingScreen progress={progress} fadeOut={loaded} />
            <div className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/prijava" element={<Prijava />} />
                    <Route path="/pravilnik" element={<Pravilnik />} />
                </Routes>
                <Footer/>
            </div>
        </>
    );
}

export default App;
