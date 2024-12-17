import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import HisHoliness from "@/assets/harrier-big-blue-shadow.svg";

export const TopNavBar = () => {
  return (
    <header className={`sticky top-0 z-50 w-full`}>
      <div className="flex items-center justify-between bg-quaternary px-7">
        <Link to="/">
          <img
            src={HisHoliness}
            alt="Harrier Runner Logo"
            className="mb-5 ml-3 mr-6 mt-5 h-9 w-auto"
          />
        </Link>
        <Link to="/">
          <h1 className="text-4xl font-semibold">Harrier</h1>
        </Link>
        <div className="ml-auto mr-4 flex items-center space-x-4 text-lg font-semibold">
          <Link to="/case-study" className="">
            Case Study
          </Link>
          <Separator
            orientation="vertical"
            className="mx-2 h-8 border-l border-quinary"
          />
          <Link to="/team" className="">
            Team
          </Link>
          <Separator
            orientation="vertical"
            className="mx-2 h-8 border-l border-quinary"
          />
          <Link to="https://github.com/2408-capstone-team5/harrier-self-hosted-runner">
            <FaGithub size="30px" />
          </Link>
        </div>
      </div>
    </header>
  );
};


// import { useViewportWidth } from "@/hooks/useViewportWidth";
  //   const viewportWideEnough = useViewportWidth();
  //   const navigate = useNavigate();
  /* transition-transform duration-500 ${
        viewportWideEnough ? "translate-y-0" : "-translate-y-full"
      } ease-[cubic-bezier(0.68, -0.55, 0.27, 1.55)] */