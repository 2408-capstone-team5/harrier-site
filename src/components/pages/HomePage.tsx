import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import HarrierBW from "@/assets/harrier-big-white.svg";
import HarrierColor from "@/assets/harrier-big-blue-shadow.svg";
import GHALogo from "@/assets/GitHub Actions.png";
// import AWSLogo from "@/assets/AWS.png";
// import HarrierArchitecture from "@/assets/harrier-architecture.png";
// import { FaBook } from "react-icons/fa";
import TeamMember from "@/components/TeamMember";
export type Member = {
  name: string;
  role: string;
  photoUrl: string;
  location: string;
  linkedinProfile: string;
  githubProfile: string;
  emailAddress?: string;
  personalSiteUrl?: string;
};

const HomePage = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "Wook Kim",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/68617800?v=4",
      location: "Los Angeles, CA.",
      linkedinProfile: "https://www.linkedin.com/in/wook-kim/",
      githubProfile: "https://github.com/wook2000",
    },
    {
      name: "Jesse Kercheval",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/56614846?v=4",
      location: "Los Angeles, CA.",
      linkedinProfile: "https://www.linkedin.com/in/jessekercheval/",
      githubProfile: "https://github.com/jessekerch",
    },
    {
      name: "Shane Ziegler",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/56492231?v=4",
      location: "Minneapolis, MN.",
      linkedinProfile: "https://www.linkedin.com/in/shane-ziegler-b1647b11/",
      githubProfile: "https://github.com/shaneziegler",
    },
    {
      name: "Joel Barton",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/86934356?v=4",
      location: "Seattle, WA.",
      linkedinProfile: "https://www.linkedin.com/in/joel-barton1/",
      githubProfile: "https://github.com/joelbarton-io",
    },
  ];
  return (
    <>
      <div className="flex h-[36rem] flex-col bg-tertiary text-center">
        <h2 className="mt-44 text-center text-7xl font-semibold text-quaternary">
          Harrier
        </h2>
        <div>
          <p className="mb-9 mt-7 text-2xl text-white">
            an automated{" "}
            <span className="font-semibold text-secondary">
              self-hosted runner
            </span>{" "}
            setup tool for{" "}
            <a
              href="https://github.com/features/actions"
              className="hover:bg-teriary"
            >
              GitHub Actions
            </a>
            {/* <span className="underline underline-offset-4">GitHub Actions</span> */}
          </p>
          <Button
            onClick={() => navigate("/case-study")}
            className="inline-flex items-center p-6 text-white"
            variant="secondary"
          >
            <span className="text-lg">Read the Case Study</span>
          </Button>
        </div>
      </div>
      {/* <div className="flex h-[36rem] flex-col justify-end bg-quaternary">
        <span>hi</span>
        <img src={AWSLogo} alt="AWS Logo" className="m-4 h-80 w-auto" />
      </div> */}
      <div className="flex h-[36rem] items-center justify-around bg-quaternary">
        <img
          src={GHALogo}
          alt="GitHub Actions Logo"
          className="h-80 w-auto"
        />
        <img
          src={HarrierColor}
          alt="Harrier Blue Logo"
          className="h-40 w-auto"
        />
      </div>
      <div className="flex flex-col items-center justify-center bg-quaternary pb-8">
        <h3 className="mb-8 text-3xl font-semibold text-tertiary">
          Meet the Team
        </h3>
        {/* <Separator
          orientation="horizontal"
          className="my-2 w-20 border-l-4 border-primary"
        /> */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <TeamMember member={member} key={member.name} />
          ))}
        </div>
        {/* <img src={HarrierBW} alt="GitHub Actions" className="m-4 h-64 w-auto" /> */}
      </div>
    </>
  );
};

export default HomePage;
