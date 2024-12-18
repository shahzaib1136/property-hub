import React from "react";
import PropertyActionCard from "./propertyActionCard";

const RentersAndOwnersSection = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          {/* For Renters Property Action Card */}
          <PropertyActionCard
            title="For Renters"
            description="Find your dream rental property. Bookmark properties and contact owners."
            linkText="Browse Properties"
            linkHref="/properties.html"
            bgColor="bg-gray-100"
            buttonColor="bg-black hover:bg-gray-700"
            textColor=""
          />

          {/* For Property Owners Property Action Card */}
          <PropertyActionCard
            title="For Property Owners"
            description="List your properties and reach potential tenants. Rent as an airbnb or long term."
            linkText="Add Property"
            linkHref="/add-property.html"
            bgColor="bg-blue-100"
            buttonColor="bg-blue-500 hover:bg-blue-600"
          />
        </div>
      </div>
    </section>
  );
};

export default RentersAndOwnersSection;
