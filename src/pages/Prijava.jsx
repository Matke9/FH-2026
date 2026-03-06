import { PrijaveLock } from '../components';
import StartMenu from '../components/Prijave/StartMenu';

export default function Prijava() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Prijava</h1>
          <PrijaveLock discipline="fon-hackathon">
            <StartMenu />
          </PrijaveLock>
    </main>
  );
}
