import React from "react";
import PropertySearchSection from "@/components/home/PropertySearchSection";
import RentersAndOwnersSection from "@/components/home/RentersAndOwnersSection";
import HomeProperty from "@/components/home/HomeProperty";

const HomePage = () => {
  return (
    <>
      <PropertySearchSection />
      <RentersAndOwnersSection />
      <HomeProperty />
    </>
  );
};

export default HomePage;
