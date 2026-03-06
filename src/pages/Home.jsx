// Home page – entry point for the FON Hackathon 2026 website
import Nagrade from '../components/Nagrade/NagradeMain.jsx'
import Agenda from "../components/agenda/Agenda.jsx";
import Partneri from "../components/Partneri/Partneri.tsx";
import Hero from "../components/hero/Hero.jsx"
import Iskustva from "../components/Iskustva/Iskustva.tsx";
import {FaQ} from "react-icons/fa6";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero/>
            {/*o takm*/}
            <Nagrade type="Hackathon"/>
            <Agenda/>
            <Iskustva/>
            <FaQ/>
            {/*org tim*/}
            <Partneri/>
        </main>
    )
}
