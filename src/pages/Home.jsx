// Home page – entry point for the FON Hackathon 2026 website
import Nagrade from '../components/Nagrade/NagradeMain.jsx'
import Agenda from "../components/agenda/Agenda.jsx";
import Partneri from "../components/Partneri/Partneri.tsx";
import Hero from "../components/hero/Hero.jsx"
import Iskustva from "../components/Iskustva/Iskustva.tsx";
import OTakmicenju from "./OTakmicenju.jsx";
import FAQSection from "../components/FAQ/FAQSection.jsx";
import {OrganizacioniTim} from "../components/index.js";

export default function Home() {
    return (
        <main className="min-h-screen">

            <section id="hero">
                <Hero/>
            </section>

            <section id="o-takmicenju">
                <OTakmicenju/>
            </section>

            <section id="nagrade">
                <Nagrade type="Hackathon"/>
            </section>

            <section id="agenda">
                <Agenda/>
            </section>

            <section id="iskustva">
                <Iskustva/>
            </section>

            <section id="faq">
                <FAQSection/>
            </section>

            <section id="tim">
                <OrganizacioniTim />
            </section>

            <section id="partneri">
                <Partneri/>
            </section>
        </main>
    )
}
