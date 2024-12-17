import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BWHarrier from "../assets/harrier-big-white.svg";
export const Footer = () => {
  const [time] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  return (
    <footer className="mt-4 flex h-[76px] flex-row justify-between text-black">
      <div className="text-center">hi</div>
      <div className="text-center">
        <p>{time} Harrier Contributors</p>{" "}
        <img src={BWHarrier} alt="" className="h-8 w-8" />
      </div>
      <div className="flex-col text-center">
        <Button
          onClick={() => navigate("/get-started")}
          variant="default"
          size="lg"
        >
          Try Harrier
        </Button>
        {/* <Link to={"get-started"}>Try Now</Link> */}
      </div>
    </footer>
  );
};
