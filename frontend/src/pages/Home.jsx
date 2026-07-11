import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="how">
        <HowItWorks />
      </section>

      <Footer />
    </>
  );
}

export default Home;
