import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HisHoliness from "@/assets/harrier-bird-blue-shadow.png";
import { FaBook } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  const handleReadCaseStudyButtonClick = () => {
    navigate("/case-study");
  };

  return (
    <>
      <div className="h-[36rem] flex flex-col text-center">
        <h2 className="text-7xl font-semibold text-center mt-52 text-black italic">
          Harrier
        </h2>
        <div>
          <p className="text-2xl my-7">
            an automated{" "}
            <span className="font-semibold text-secondary">
              self-hosted runner
            </span>{" "}
            setup tool for{" "}
            <a
              href="https://github.com/features/actions"
              className="underline hover:bg-senary"
            >
              GitHub Actions
            </a>
            {/* <span className="underline underline-offset-4">GitHub Actions</span> */}
          </p>
          <Button
            onClick={handleReadCaseStudyButtonClick}
            variant="default"
            className="inline-flex items-center space-x-2"
          >
            <span className="text-lg">Read Case Study</span>
            <FaBook className="" />
          </Button>
        </div>
      </div>
      <div className="h-[36rem] flex flex-col text-center"></div>
      <div className="h-[36rem] flex flex-col text-center bg-gradient-to-br from-primary to-secondary "></div>
      <img
        src={HisHoliness}
        alt="Harrier Runner Logo PNG"
        className="h-28 w-auto"
      />
    </>
  );
};

export default HomePage;
