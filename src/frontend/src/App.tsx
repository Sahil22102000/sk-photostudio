import Layout from "./components/Layout";
import AboutSection from "./components/sections/AboutSection";
import BookingContactSection from "./components/sections/BookingContactSection";
import GallerySection from "./components/sections/GallerySection";
import HeroSection from "./components/sections/HeroSection";
import ServicesSection from "./components/sections/ServicesSection";
import StatsShowcase from "./components/sections/StatsShowcase";
import TestimonialsSection from "./components/sections/TestimonialsSection";

export default function App() {
  return (
    <div>
      <Layout>
        <section id="home">
          <HeroSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="stats">
          <StatsShowcase />
        </section>
        <section id="gallery">
          <GallerySection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <section id="contact">
          <BookingContactSection />
        </section>
      </Layout>
    </div>
  );
}
