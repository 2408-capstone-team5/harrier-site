import { useState } from "react";
export const Footer = () => {
  const [time] = useState(new Date().getFullYear());
  return (
    <footer className="border-t border-primary py-6">
      <div className="mx-auto text-center">© {time} Harrier Contributors</div>
    </footer>
  );
};
