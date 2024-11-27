import React from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  //   CardDescription,
  // CardHeader,
} from "@/components/ui/card";
import { Member } from "@/pages/TeamPage";
import { FaAviato, FaLinkedin, FaGithub } from "react-icons/fa";

interface TeamMemberProps {
  member: Member;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <Card className="p-4 h-64">
      <CardContent>
        <img
          src={member.photoUrl}
          alt={member.role}
          className="rounded-full w-36 h-36 object-cover mx-auto"
        />
      </CardContent>
      <CardTitle className="text-2xl font-semibold text-center tracking-tight">
        {member.name}
      </CardTitle>
      <CardFooter>
        <FaLinkedin />
        <FaGithub />
        <FaAviato />
      </CardFooter>
    </Card>
  );
};

export default TeamMember;
