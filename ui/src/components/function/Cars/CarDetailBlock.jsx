import Block from "@/components/layout/block/Block";
import Image from "next/image";

export default function CarDetailBlock({ image, details }) {
  return (
    <Block gap={5}>
      <Image src={image} alt="detail-icon" width={50} height={50} />
      <div className="w-full">
        {Object.keys(details)?.map((key) => {
          return (
            <div key={key} className="w-full flex gap-2">
              <strong>{key?.split("_").join(" ")}:</strong>
              <span>{details[key]}</span>
            </div>
          );
        })}
      </div>
    </Block>
  );
}
