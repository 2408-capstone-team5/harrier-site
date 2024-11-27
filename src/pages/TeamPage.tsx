import TeamMember from "@/components/TeamMember";

export type Member = {
  name: string;
  role: string;
  photoUrl: string;
  location: string;
};

const TeamPage = () => {
  const team: Member[] = [
    {
      name: "Wook",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/68617800?v=4",
      location: "Los Angeles, CA.",
    },
    {
      name: "Jesse",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/56614846?v=4",
      location: "Los Angeles, CA.",
    },
    {
      name: "Shane",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/56492231?v=4",
      location: "Minneapolis, MN.",
    },
    {
      name: "Joel",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/86934356?v=4",
      location: "Seattle, WA.",
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
