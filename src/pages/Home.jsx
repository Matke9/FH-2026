// Home page – entry point for the FON Hackathon 2026 website
import Nagrade from '../components/Nagrade/NagradeMain.jsx'
import Agenda from "../components/agenda/Agenda.jsx";
import Partneri from "../components/Partneri/Partneri.tsx";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nagrade/>
      <Agenda/>
      <Partneri/>
    </main>
  )
}
