import Appbar from "@/components/Appbar"
import Feature from "@/components/Feature";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";


export default async function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 m-auto">
      <Appbar/>
      <Hero/>
      <Feature/>
      <Footer/>
    </div>
  );
}
