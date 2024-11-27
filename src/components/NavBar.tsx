import { Link } from "react-router-dom";
import {
  NavigationMenu,
  //   NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  //   NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Menu, Home, Users, FileText } from "lucide-react";
import Birb from "/public/birb.svg";

export const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        {/* Mobile Menu */}
        {/* <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="grid gap-4 py-10">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" /> Harrier
              </Link>
              <Link to="/case-study" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Case Study
              </Link>
              <Link to="/team" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Team
              </Link>
              <Link to="/get-started" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Get Started
              </Link>
            </nav>
          </SheetContent>
        </Sheet> */}

        {/* Logo */}
        <Link to="/" className="mr-4 hidden md:flex">
          <img
            src={Birb}
            alt="Harrier Runner"
            className="h-20 w-auto ml-4 mt-4"
          />
        </Link>

        {/* Desktop Navigation */}
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
                <Link to="/team" className={navigationMenuTriggerStyle()}>
                  Team
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
                <Link
                  to="/get-started"
                  className={navigationMenuTriggerStyle()}
                >
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
