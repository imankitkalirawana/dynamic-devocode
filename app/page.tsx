import Banner from "@/components/landingpage/Banner";
import Contact from "@/components/landingpage/Contact";
import Features from "@/components/landingpage/Features";
import Footer from "@/components/landingpage/Footer";
// import Newsletter from "@/components/landingpage/Newsletter";
import Pricing from "@/components/landingpage/Pricing";
import Stats from "@/components/landingpage/Stats";
import Testimonial from "@/components/landingpage/Testimonial";
import SmoothScroll from "@/components/smooth-scroll";

const Page = () => {
  return (
    <>
      <SmoothScroll>
        <Banner />
        <Features />
        {/* <Newsletter /> */}
        <Stats />
        <Testimonial />
        <Pricing />
        <Contact />
        <Footer />
      </SmoothScroll>
    </>
  );
};

// export default dynamic(() => Promise.resolve(Page), { ssr: false });
export default Page;
