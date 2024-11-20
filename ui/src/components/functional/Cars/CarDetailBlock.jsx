import Block from "@/components/layout/block/Block";
import Image from "next/image";

export default function CarDetailBlock({ image, details }) {
  return (
    <Block gap={5}>
      <div className="w-full flex flex-col md:flex-row">
        <div className="">
          <img className="w-40" src={image} alt="detail-icon" />
        </div>
        <div className="w-full flex flex-col items-start justify-evenly">
          {Object.keys(details)?.map((key) => {
            return (
              <div key={key} className="w-full flex gap-2">
                <strong>{key?.split("_").join(" ")}:</strong>
                <span>{details[key]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Block>
  );
}
