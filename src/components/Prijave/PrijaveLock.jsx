import React, { useEffect, useState } from 'react';

// Dates are local. Adjust if you prefer UTC.
const OPEN_DATE = new Date('2026-03-05T00:00:00');
const CLOSE_DATE = new Date('2026-03-15T23:59:59');

function getTimeLeft(target) {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function PrijaveLock({ children, discipline = 'fon-hackathon' }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();

  // Use transparent background; form boxes should have no border
  if (now < OPEN_DATE) {
    const timeLeft = getTimeLeft(OPEN_DATE);
    return (
      <div className="min-h-[240px] w-full flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto p-6 rounded bg-transparent text-white">
          <h2 className="text-2xl font-semibold mb-2">Prijave još nisu otvorene</h2>
          <p className="mb-4">Prijave će biti otvorene <strong>5. marta</strong>.</p>

          <div className="text-center">
            <div className="inline-flex items-center gap-3 p-4 rounded-md">
              <div className="text-3xl font-mono">
                {timeLeft
                  ? `${timeLeft.days}d ${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`
                  : '0d 00:00:00'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (now >= OPEN_DATE && now <= CLOSE_DATE) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-6">
        <div className="w-full max-w-4xl p-6 rounded bg-transparent">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[240px] w-full flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto p-6 rounded bg-transparent text-white">
        <h2 className="text-2xl font-semibold mb-2">Prijave su zatvorene</h2>
        <p>Rok za prijave je bio do <strong>15. marta</strong>. Hvala na interesovanju.</p>
      </div>
    </div>
  );
}
