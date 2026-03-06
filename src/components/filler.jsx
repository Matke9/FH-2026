export default function Filler() {
  const sections = [
    { id: "o-takmicenju", title: "O takmičenju" },
    { id: "agenda", title: "Agenda" },
    { id: "nagrade", title: "Nagrade" },
    { id: "iskustva", title: "Iskustva" },
    { id: "faq", title: "FAQ" },
    { id: "tim", title: "Organizacioni tim" },
    { id: "partneri", title: "Partneri" },
    { id: "pravilnik", title: "Pravilnik" },
    { id: "prijava", title: "Prijava" },
  ];

  return (
    <main className="min-h-[300vh] bg-neutral-950 text-white">
      {/* malo prostora ispod fixed navbara */}
      <div className="h-28" />

      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-bold">Test page</h1>
        <p className="mt-2 text-white/70">
          Scroll down i klikći anchor linkove da vidiš da li navbar ostaje gore.
        </p>

        <div className="mt-8 space-y-20">
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-2xl font-semibold">
                {i + 1}. {s.title}
              </h2>
              <p className="mt-2 text-white/70">
                Placeholder sadržaj… (dodaj još teksta ako želiš duži scroll).
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, k) => (
                  <div
                    key={k}
                    className="h-24 rounded-xl bg-white/10"
                    title="placeholder"
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="py-24 text-center text-white/50">
          Kraj stranice.
        </footer>
      </div>
    </main>
  );
}