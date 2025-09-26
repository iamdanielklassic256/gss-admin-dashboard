import About from "@/components/About";
import Programs from "@/components/commons/Programs";
import Hero from "@/components/home/HeroSection";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";


const Home = () => {
  return (
    <div className="min-h-screen font-inter">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Programs />
      </main>
      <Footer />
    </div>
  );
};

export default Home;