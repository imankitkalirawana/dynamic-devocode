import Banner from "@/components/landingpage/Banner";
import Contact from "@/components/landingpage/Contact";
import Features from "@/components/landingpage/Features";
import Footer from "@/components/landingpage/Footer";
import Newsletter from "@/components/landingpage/Newsletter";
import Pricing from "@/components/landingpage/Pricing";
import Stats from "@/components/landingpage/Stats";
import Testimonial from "@/components/landingpage/Testimonial";
import dynamic from "next/dynamic";
import Image from "next/image";

// export default function Home() {
//   return (
//     <>
//       <Banner />
//       <Features />
//       <Newsletter />
//       <Stats />
//       <Testimonial />
//       <Pricing />
//       <Contact />
//       <Footer />
//     </>
//   );
// }

const Page = () => {
  return (
    <>
      <Banner />
      <Features />
      <Newsletter />
      <Stats />
      <Testimonial />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
};

// export default dynamic(() => Promise.resolve(Page), { ssr: false });
export default Page;
