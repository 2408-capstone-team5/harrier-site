import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Birb from "/public/birb.svg";

export const NavBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isViewportWide, setIsViewportWide] = useState(window.innerWidth > 800);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsVisible(true);
      } else if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      }
      setLastScrollY(window.scrollY);
    };

    const handleResize = () => {
      setIsViewportWide(window.innerWidth > 800);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-b-quinary transition-transform duration-266 ${
        isVisible && isViewportWide ? "translate-y-0" : "-translate-y-full"
      } ease-[cubic-bezier(0.4, 0, 0.2, 1)]`}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="mr-4 hidden md:flex">
          <img src={Birb} alt="Harrier Runner" className="h-20 w-auto"/>
        </Link>

        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Harrier
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/case-study" className={navigationMenuTriggerStyle()}>
                  Case Study
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/team" className={navigationMenuTriggerStyle()}>
                  Team
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/get-started" className={navigationMenuTriggerStyle()}>
                  Get Started
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};