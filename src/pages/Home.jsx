
// Home page – entry point for the FON Hackathon 2026 website
import Nagrade from '../components/Nagrade/NagradeMain.jsx'
import Agenda from "../components/agenda/Agenda.jsx";
import Partneri from "../components/Partneri/Partneri.tsx";
import Hero from "../components/hero/Hero.jsx"
import Iskustva from "../components/Iskustva/Iskustva.tsx";
import OTakmicenju from "./OTakmicenju.jsx";
import FAQSection from "../components/FAQ/FAQSection.jsx";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero/>
            <OTakmicenju/>
            <Nagrade type="Hackathon"/>
            <Agenda/>
            <Iskustva/>
            <FAQSection/>
            <OrganizacioniTim />
            <Partneri/>
        </main>
    )
}
