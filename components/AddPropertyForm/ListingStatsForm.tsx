import React from "react";
import InputField from "@/components/UI/InputField";
import { ChangeHandler } from "@/components/AddPropertyForm/types";
import { Property } from "@lib/types/property";

interface Props {
  fields: Property;
  onChange: ChangeHandler;
}

const ListingStatsForm = ({ fields, onChange }: Props) => (
  <div className="mb-4 flex flex-wrap">
    <div className="w-full sm:w-1/3 pr-2">
      <InputField
        label="Beds"
        name="beds"
        type="number"
        // error={error}
        htmlFor="beds"
        required={true}
        value={fields.beds ?? ""}
        placeholder="Select Beds"
        onChange={onChange}
      />
    </div>
    <div className="w-full sm:w-1/3 px-2">
      <InputField
        label="Baths"
        name="baths"
        type="number"
        // error={error}
        htmlFor="baths"
        required={true}
        value={fields.baths ?? ""}
        placeholder="Select Baths"
        onChange={onChange}
      />
    </div>
    <div className="w-full sm:w-1/3 pl-2">
      <InputField
        label="Square Feet"
        name="squareFeet"
        type="number"
        // error={error}
        htmlFor="squareFeet"
        required={true}
        value={fields.squareFeet ?? ""}
        placeholder="Select Square Feet"
        onChange={onChange}
      />
    </div>
  </div>
);

export default ListingStatsForm;
