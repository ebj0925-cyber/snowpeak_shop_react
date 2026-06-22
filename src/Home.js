import React from "react";
import MainSlider from "./components/MainSlider";
import NewArrivalsSection from "./components/NewArrivalsSection";
import SpringCollectionSection from "./components/SpringCollectionSection";
import Banner from "./components/Banner";
import ImageBanner from "./components/ImageBanner";
import BagSection from "./components/BagSection";
import InfluencerSection from "./components/InfluencerSection";
import InstagramSection from "./components/InstagramSection";

function Home() {
  return (
    <main>
      <MainSlider />
      <NewArrivalsSection />
      <SpringCollectionSection />
      <Banner />
      <ImageBanner />
      <BagSection />
      <InfluencerSection />
      <InstagramSection />
    </main>
  );
}

export default Home;