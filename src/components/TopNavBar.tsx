import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuContent,
  // NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import HisHoliness from "/public/harrier-bird-blue-shadow.svg";
import { useViewportWidth } from "@/hooks/useViewportWidth";
// import { cn } from "@/lib/utils";

// const ListItem = forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <Link
//           to={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className,
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// });

export const TopNavBar = () => {
  const isViewportWide = useViewportWidth();

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-transform duration-266 bg- ${
        isViewportWide ? "translate-y-0" : "-translate-y-full"
      } ease-[cubic-bezier(0.4, 0, 0.2, 1)]`}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="mr-4 hidden md:flex">
          <img
            src={HisHoliness}
            alt="Harrier Runner Logo"
            className="h-20 w-auto"
          />
        </Link>

        <NavigationMenu className="hidden md:block bg-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Harrier
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              {/* <NavigationMenuLink asChild> */}
              <Link to="/case-study" className={navigationMenuTriggerStyle()}>
                Case Study
              </Link>
              {/* </NavigationMenuLink> */}
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
