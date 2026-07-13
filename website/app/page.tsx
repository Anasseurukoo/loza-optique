import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e7]">
        <div className="text-center">
          <p className="mb-5 text-sm uppercase tracking-[0.35em]">
            Opticien à Casablanca
          </p>

          <h1 className="text-6xl font-bold">
            LOZA Optique
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Votre vision, notre savoir-faire.
          </p>
        </div>
      </main>
    </>
  );
}