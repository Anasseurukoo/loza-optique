import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de l’application mobile Loza Optique.",
  alternates: {
    canonical: "/confidentialite/",
  },
};

const sections = [
  {
    title: "1. Responsable de l’application",
    content: (
      <>
        L’application Loza Optique est publiée et administrée par Ouzoumart
        Anas. Elle présente les collections et les services de Loza Optique à
        Casablanca. Pour toute question relative à la confidentialité, vous
        pouvez écrire à{" "}
        <a className="font-semibold underline" href="mailto:anidayacoub@gmail.com">
          anidayacoub@gmail.com
        </a>
        .
      </>
    ),
  },
  {
    title: "2. Données traitées par l’application",
    content: (
      <>
        La version actuelle ne crée pas de compte utilisateur et ne comporte
        ni serveur applicatif, ni système de paiement. Les favoris, le choix
        d’un rendez-vous et les informations affichées restent dans la session
        de l’application et ne sont pas transmis à Loza Optique.
      </>
    ),
  },
  {
    title: "3. Caméra et essayage virtuel",
    content: (
      <>
        Avec votre autorisation, la caméra frontale est utilisée uniquement
        pour positionner virtuellement une monture sur votre visage. Les images
        et les repères du visage sont analysés en temps réel sur votre appareil.
        Ils ne sont ni enregistrés, ni envoyés à un serveur, ni partagés avec
        un tiers. Vous pouvez refuser ou retirer l’autorisation depuis les
        réglages Android.
      </>
    ),
  },
  {
    title: "4. Ordonnances et fichiers",
    content: (
      <>
        Le sélecteur de documents permet de choisir localement une ordonnance
        au format PDF ou image. Dans la version actuelle, le fichier sélectionné
        reste sur votre appareil et n’est ni téléversé, ni envoyé, ni conservé
        par le développeur ou par Loza Optique. L’application affiche seulement
        son nom pendant la session en cours.
      </>
    ),
  },
  {
    title: "5. Publicité et services tiers",
    content: (
      <>
        La version actuelle n’intègre aucun réseau publicitaire et ne collecte
        aucune donnée à des fins publicitaires. Si une future version ajoute de
        la publicité, des statistiques, un compte utilisateur ou un service en
        ligne, cette politique et la fiche Google Play seront mises à jour avant
        leur activation, avec les informations et consentements requis.
      </>
    ),
  },
  {
    title: "6. Conservation, partage et sécurité",
    content: (
      <>
        Aucune donnée personnelle n’étant envoyée au développeur par la version
        actuelle, aucune base de données utilisateur n’est conservée ou partagée.
        Les autorisations sensibles sont limitées aux fonctions décrites dans
        cette politique.
      </>
    ),
  },
  {
    title: "7. Vos choix",
    content: (
      <>
        Vous pouvez ne pas utiliser l’essayage virtuel ou le sélecteur de
        documents. Vous pouvez également retirer l’autorisation de la caméra,
        supprimer le fichier sélectionné dans l’application ou désinstaller
        l’application afin d’effacer ses données locales.
      </>
    ),
  },
  {
    title: "8. Enfants",
    content: (
      <>
        L’application n’est pas conçue spécifiquement pour les enfants et ne
        cherche pas à collecter sciemment leurs données personnelles.
      </>
    ),
  },
  {
    title: "9. Modifications",
    content: (
      <>
        Cette politique peut évoluer avec les fonctionnalités de l’application.
        La date de mise à jour et la version publiée sur cette page font foi.
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e7] px-5 py-12 text-[#102f36] sm:py-20">
      <article className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-[#103943]/15 bg-[#fffaf0] shadow-2xl shadow-[#071d22]/10">
        <header className="bg-[#071d22] px-6 py-10 text-white sm:px-12 sm:py-14">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-[0.28em] text-[#d6bd82]"
          >
            Loza Optique
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
            Application mobile Loza Optique — Android
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-[#d6bd82]">
            <span className="rounded-full border border-[#d6bd82]/30 px-4 py-2">
              Version 0.0.3
            </span>
            <span className="rounded-full border border-[#d6bd82]/30 px-4 py-2">
              Mise à jour : 18 juillet 2026
            </span>
          </div>
        </header>

        <div className="space-y-10 px-6 py-10 sm:px-12 sm:py-14">
          <p className="text-base leading-7 text-[#103943]/80">
            Cette politique explique de façon claire quelles informations sont
            utilisées par l’application Loza Optique et dans quel but.
          </p>

          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-[#071d22]">
                {section.title}
              </h2>
              <div className="mt-3 text-sm leading-7 text-[#103943]/80 sm:text-base">
                {section.content}
              </div>
            </section>
          ))}

          <footer className="border-t border-[#103943]/15 pt-8 text-sm text-[#103943]/70">
            <p>
              Contact :{" "}
              <a className="font-semibold underline" href="mailto:anidayacoub@gmail.com">
                anidayacoub@gmail.com
              </a>
            </p>
            <Link className="mt-5 inline-block font-semibold text-[#103943] underline" href="/">
              Retour au site Loza Optique
            </Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
