import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f6f1e7] px-6 pt-32 text-[#102f36]">
      {/* Decorative background */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#d6bd82]/20 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-[#164753]/15 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* Text */}
        <div className="max-w-2xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#a27d38]">
            Opticien à Casablanca
          </p>

          <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            La vision
            <span className="block font-light italic text-[#a27d38]">
              autrement.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-[#526b6c] sm:text-lg">
            Des montures choisies avec précision, un service humain et un
            savoir-faire transmis avec exigence.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#collections"
              className="rounded-full bg-[#103943] px-8 py-4 text-center text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#0b2c34]"
            >
              Découvrir les collections
            </Link>

            <Link
              href="#contact"
              className="rounded-full border border-[#103943]/25 px-8 py-4 text-center text-sm font-semibold transition duration-300 hover:border-[#103943] hover:bg-white/50"
            >
              Prendre rendez-vous
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-5 border-t border-[#103943]/15 pt-7 text-sm">
            <div>
              <strong className="block text-lg">Qualité</strong>
              <span className="text-[#6c7d7b]">Montures sélectionnées</span>
            </div>

            <div>
              <strong className="block text-lg">Précision</strong>
              <span className="text-[#6c7d7b]">Conseil personnalisé</span>
            </div>

            <div>
              <strong className="block text-lg">Confiance</strong>
              <span className="text-[#6c7d7b]">Service attentionné</span>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative flex items-center justify-center">
          <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-[#123a42] shadow-2xl shadow-[#123a42]/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1f5962] via-[#123a42] to-[#071d22]" />

            <div className="absolute left-8 top-8 text-xs uppercase tracking-[0.3em] text-white/60">
              LOZA Collection 01
            </div>

            <div className="absolute inset-x-10 top-1/2 -translate-y-1/2">
              <div className="relative mx-auto h-36 max-w-sm">
                {/* Temporary glasses illustration */}
                <div className="absolute left-0 top-2 h-28 w-40 rounded-[45%] border-[10px] border-[#d6bd82]" />
                <div className="absolute right-0 top-2 h-28 w-40 rounded-[45%] border-[10px] border-[#d6bd82]" />
                <div className="absolute left-1/2 top-12 h-3 w-16 -translate-x-1/2 rounded-full bg-[#d6bd82]" />
                <div className="absolute -left-10 top-8 h-3 w-16 -rotate-12 rounded-full bg-[#d6bd82]" />
                <div className="absolute -right-10 top-8 h-3 w-16 rotate-12 rounded-full bg-[#d6bd82]" />
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between border-t border-white/20 pt-6 text-white">
              <div>
                <p className="text-sm text-white/60">Collection signature</p>
                <p className="mt-1 text-2xl font-medium">Élégance précise</p>
              </div>

              <span className="text-2xl">↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}