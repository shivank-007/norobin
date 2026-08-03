import Navbar from "@/components/layout/navbar/Navbar";
import Hero from "@/components/sections/hero/Hero";
import Trusted from "@/components/sections/trusted/Trusted";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trusted />
      
      <main
        style={{
          minHeight: "300vh",
          paddingTop: "120px",
        }}
      >
      </main>
    </>
  );
}