import Image from "next/image";
import { Header } from "./ectes/components/Header";
import HeroSection from "./ectes/components/HeroSection";
import { Footer } from "./ectes/components/Footer";
import EctesBrief from "./ectes/components/BriefingSection";
import FinalSection from "./ectes/components/FinalSection";

export default function Home() {
  return (
    <div >
       <Header/>
      <main className="min-h-screen ">
       <HeroSection/>
       <EctesBrief/>
       <FinalSection/>
      </main>
      <Footer/>
    </div>
  );
}
