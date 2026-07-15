import Collections from "../components/Collections";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Collections />
      </main>
    </>
  );
}
