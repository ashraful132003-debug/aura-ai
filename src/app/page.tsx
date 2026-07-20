import About from '@/components/About';
import BackToTop from '@/components/BackToTop';
import Breathing from '@/components/Breathing';
import Chat from '@/components/Chat';
import Dashboard from '@/components/Dashboard';
import Faq from '@/components/Faq';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Loader from '@/components/Loader';
import MoodTracker from '@/components/MoodTracker';
import Nav from '@/components/Nav';
import Pricing from '@/components/Pricing';
import RevealController from '@/components/RevealController';
import Safety from '@/components/Safety';
import Soundscape from '@/components/Soundscape';
import ThreeBackground from '@/components/ThreeBackground';
import UpgradeModal from '@/components/UpgradeModal';
import WelcomeToast from '@/components/WelcomeToast';

export default function Home() {
  return (
    <>
      <Loader />
      <BackToTop />
      <UpgradeModal />
      <ThreeBackground />
      <Nav />
      <main id="top">
        <Hero />
        <Features />
        <Soundscape />
        <Chat />
        <MoodTracker />
        <Breathing />
        <Dashboard />
        <Faq />
        <About />
        <Safety />
        <Pricing />
      </main>
      <Footer />
      <RevealController />
      <WelcomeToast />
    </>
  );
}
