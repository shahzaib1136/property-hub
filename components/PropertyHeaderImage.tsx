import React from "react";
import Image from "next/image";

function PropertyHeaderImage({ image }: { image: string }) {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={`/images/properties/${image}`}
            alt=""
            className="object-cover h-[400px] w-full"
            width={0}
            sizes="100vw"
            height={0}
          />
        </div>
      </div>
    </section>
  );
}

export default PropertyHeaderImage;
