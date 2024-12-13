import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { useViewportWidth } from "@/hooks/useViewportWidth";

export const TopNavBar = () => {
  const isViewportWide = useViewportWidth();

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-transform duration-266 ${
        isViewportWide ? "translate-y-0" : "-translate-y-full"
      } ease-[cubic-bezier(0.4, 0, 0.2, 1)]`}
    >
      <div className="flex items-center justify-between bg-quaternary">
        <Link to="/">
          <img
            src="/harrier-bird-blue-shadow.svg"
            alt="Harrier Runner Logo"
            className="h-20 w-auto"
          />
        </Link>
        <div className="flex items-center space-x-4 ml-auto mr-4 text-lg font-semibold">
          <Link to="/case-study" className=" hover:text-senary ">
            Case Study
          </Link>
          <Separator
            orientation="vertical"
            className="mx-2 h-4 border-l border-quinary"
          />
          <Link to="/team" className="hover:text-senary">
            Team
          </Link>
          <Separator
            orientation="vertical"
            className="mx-2 h-4 border-l border-quinary"
          />
          <Link to="https://github.com/2408-capstone-team5/harrier-self-hosted-runner">
            <FaGithub className="hover:text-senary" />
          </Link>
          {/* <Separator
            orientation="vertical"
            className="mx-2 h-4 border-l border-quinary"
          /> */}
          {/* <Link to="/get-started" className="hover:text-senary">
            Get Started
          </Link> */}
        </div>
      </div>
      <Separator className="border-t border-quinary" />
    </header>
  );
};
