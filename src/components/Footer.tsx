import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  const [time] = useState(new Date().getFullYear());

  return (
    <footer className="mt-4 flex h-[88px] flex-row justify-between bg-harrierBLACK text-white">
      <div className="text-center">hi</div>
      <div className="text-center">
        <p>{time} Harrier Contributors</p>{" "}
      </div>
      <div className="flex-col text-center">
        <NavLink to="try-harrier">Try Now</NavLink>
      </div>
    </footer>
  );
};
