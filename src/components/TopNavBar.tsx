import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import HisHoliness from "@/assets/harrier-big-blue-shadow.svg";

export const TopNavBar = () => {
  const pageContext = useContext(PageNavigationContext);
  if (!pageContext) {
    throw new Error(
      "Make sure the component you want to use the context in is wrapped in the provider component",
    );
  }

  const { setActivePage, setActiveSubheader } = pageContext;

  return (
    <header className={`sticky top-0 z-50 w-full bg-white`} id="header-nav">
      <div className="flex items-center justify-between px-7">
        <NavLink to="/">
          <img
            src={HisHoliness}
            alt="Harrier Runner Logo"
            className="mb-5 ml-3 mr-6 mt-5 h-9 w-auto"
          />
        </NavLink>
        <NavLink to="/">
          <h1 className="text-4xl font-semibold">Harrier</h1>
        </NavLink>
        <div className="ml-auto mr-4 flex items-center space-x-4 text-lg font-semibold">
          <NavLink
            to="/case-study/problem-domain"
            onClick={() => {
              setActivePage(0);
              setActiveSubheader(null);
            }}
          >
            Case Study
          </NavLink>
          <Separator
            orientation="vertical"
            className="mx-2 h-8 border-l border-harrierGRAY"
          />
          <NavLink to="/team" className="">
            Team
          </NavLink>
          <Separator
            orientation="vertical"
            className="mx-2 h-8 border-l border-harrierGRAY"
          />
          <NavLink to="/try-harrier" className="">
            Try Harrier
          </NavLink>
          <Separator
            orientation="vertical"
            className="mx-2 h-8 border-l border-harrierGRAY"
          />
          <Link to="https://github.com/2408-capstone-team5/harrier-self-hosted-runner">
            <FaGithub size="30px" />
          </Link>
        </div>
      </div>
    </header>
  );
};
