export type Location = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
};

export type Rates = {
  weekly: number | null;
  monthly: number | null;
  nightly: number | null;
};

export type SellerInfo = {
  name: string;
  email: string;
  phone: string;
};

export type Property = {
  id?: string;
  owner?: string;
  name: string;
  type: string;
  description: string;
  location: Location;
  beds: number | null;
  baths: number | null;
  squareFeet: number | null;
  amenities: string[];
  rates: Rates;
  sellerInfo: SellerInfo;
  images: (string | File)[];
  isFeatured?: boolean;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
};
