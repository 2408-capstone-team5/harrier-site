import { useState } from "react";
// import BWHarrier from "../assets/harrier-big-white.svg";
export const Footer = () => {
  const [time] = useState(new Date().getFullYear());
  return (
    <footer className="border-t border-quinary bg-quaternary py-6">
      <div className="mx-auto text-center"> {time} Harrier Contributors</div>
    </footer>
  );
};
