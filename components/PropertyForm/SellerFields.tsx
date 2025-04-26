import InputField from "@/components/UI/InputField";
import { ChangeHandler } from "@/components/PropertyForm/types";
import { Property } from "@lib/types/property";

interface Props {
  fields: Property;
  onChange: ChangeHandler;
}

const SellerFields = ({ fields, onChange }: Props) => (
  <>
    <div className="mb-4">
      <label
        htmlFor="seller_name"
        className="block text-gray-700 font-bold mb-2"
      >
        Seller Name
      </label>
      <InputField
        type="text"
        id="seller_name"
        name="sellerInfo.name"
        className="border rounded w-full py-2 px-3"
        placeholder="Name"
        onChange={onChange}
        value={fields.sellerInfo.name}
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="seller_email"
        className="block text-gray-700 font-bold mb-2"
      >
        Seller Email
      </label>
      <InputField
        type="email"
        id="seller_email"
        name="sellerInfo.email"
        className="border rounded w-full py-2 px-3"
        placeholder="Email address"
        required
        onChange={onChange}
        value={fields.sellerInfo.email}
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="seller_phone"
        className="block text-gray-700 font-bold mb-2"
      >
        Seller Phone
      </label>
      <InputField
        type="tel"
        id="seller_phone"
        name="sellerInfo.phone"
        className="border rounded w-full py-2 px-3"
        placeholder="Phone"
        onChange={onChange}
        value={fields.sellerInfo.phone}
      />
    </div>
  </>
);

export default SellerFields;
