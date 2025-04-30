import React from "react";
import PropertySearchSection from "@/components/home/PropertySearchSection";
import RentersAndOwnersSection from "@/components/home/RentersAndOwnersSection";
import HomeProperty from "@/components/home/HomeProperty";
import connectDB from "@/config/database";

const HomePage = async () => {
  await connectDB();

  return (
    <>
      <PropertySearchSection />
      <RentersAndOwnersSection />
      <HomeProperty />
    </>
  );
};

export default HomePage;
