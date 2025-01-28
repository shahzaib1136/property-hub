"use client";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Loader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <ClipLoader
      color="#3b82f6"
      loading={true}
      cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
    />
  </div>
);

export default Loader;
