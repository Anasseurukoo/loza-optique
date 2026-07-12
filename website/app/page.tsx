export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f1e7] px-6 text-[#0f3d4a]">
      <div className="text-center">
        <p className="mb-5 text-sm uppercase tracking-[0.35em]">
          Opticien à Casablanca
        </p>

        <h1 className="text-6xl font-semibold tracking-tight md:text-8xl">
          LOZA Optique
        </h1>

        <p className="mt-6 text-lg text-[#687d7a] md:text-xl">
          Votre vision, notre savoir-faire.
        </p>

        <button className="mt-10 rounded-full bg-[#0f3d4a] px-8 py-4 text-sm font-medium text-white transition hover:opacity-90">
          Découvrir prochainement
        </button>
      </div>
    </main>
  );
}