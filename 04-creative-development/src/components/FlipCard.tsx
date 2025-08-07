import React from "react";
import Image from "next/image";

export default function FlipCard({ tranparentImage, fullImage, name }: { tranparentImage: string; fullImage: string; name: string }) {
  return (
    <div className="group h-96 w-72 [perspective:1000px] bg-transparent">
      <div className="relative h-full w-full rounded-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] bg-transparent">
        <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden] bg-transparent">
          <Image className="object-cover cursor-pointer object-left h-full w-full rounded-xl" src={tranparentImage} alt={name} width={320} height={320} />
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] bg-transparent">
          <Image className="object-cover cursor-pointer object-left h-full w-full rounded-xl" src={fullImage} alt={name} width={320} height={320} />
        </div>
      </div>
    </div>
  );
}
