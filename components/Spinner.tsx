"use client";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }: { loading: boolean }) => (
  //   <div className="flex justify-center items-center min-h-screen">
  <ClipLoader
    color="#3b82f6"
    loading={loading}
    cssOverride={override}
    size={150}
    aria-label="Loading Spinner"
  />
  //   </div>
);

export default Spinner;
