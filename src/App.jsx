import './index.css';
import './styles/Pravilnik.css';
import Home from "./pages/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/footer.jsx";

function App() {

    return (
        <>
            <NavBar/>
            <Home/>
            <Footer/>
        </>
    );
}

export default App;
