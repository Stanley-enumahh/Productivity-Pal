import illustration1 from "../assets/4584-removebg-preview.png";
import illustration2 from "../assets/4889345-removebg-preview.png";
import illustration3 from "../assets/4892463-removebg-preview.png";
import dots from "../assets/Frame 1279.png";
import { Carousel } from "antd";

export function AnimationDiv() {
  return (
    <div className="w-[50%] md:flex hidden h-full bg-blue text-white justify-center  ">
      <div className="flex flex-col gap-3 items-center justify-center w-[70%]">
        <h1 className="text-3xl font-semibold">Welcome to productivitypal</h1>
        <div className="w-[75%]">
          <Carousel autoplay dots={false} speed={500}>
            <img
              src={illustration1}
              alt="login illustration1"
              className="w-[80%] h-[250px] object-cover"
            />
            <img
              src={illustration2}
              alt="login illustration2"
              className="w-[80%] h-[250px] object-cover"
            />
            <img
              src={illustration3}
              alt="login illustration3"
              className="w-[80%] h-[250px] object-cover"
            />
          </Carousel>
        </div>
        <span className="flex flex-col w-[82%] items-center justify-center gap-2">
          <p className="text-center  leading-[25px]">
            Simplify Your Workflow, Stay on Track, and Achieve Your Goals
            Effortlessly . Let’s Get <br /> Started!
          </p>
          <img src={dots} alt="dots" width={35} />
        </span>
      </div>
    </div>
  );
}
