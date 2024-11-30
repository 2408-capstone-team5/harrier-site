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

const TeamPage = () => {
  const team: Member[] = [
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
      <h2 className="text-3xl text-center font-bold mb-8">Meet the Team</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {team.map((member) => (
          <TeamMember member={member} key={member.name} />
        ))}
      </div>
    </>
  );
};

export default TeamPage;
