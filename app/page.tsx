import React from "react";
import PropertySearchSection from "@/components/PropertySearchSection";
import RentersAndOwnersSection from "@/components/RentersAndOwnersSection";
import HomeProperty from "@/components/HomeProperty";
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
