import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HisHoliness from "@/assets/harrier-big-blue-shadow.svg";
import { FaBook } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  const handleReadCaseStudyButtonClick = () => {
    navigate("/case-study");
  };

  return (
    <>
      <div className="h-[36rem] flex flex-col text-center bg-harrierblack">
        <h2 className="text-7xl font-semibold text-center mt-48 text-white">
          Harrier
        </h2>
        <div>
          <p className="text-2xl text-white my-7">
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
            onClick={handleReadCaseStudyButtonClick}
            variant="test"
            className="inline-flex items-center text-white p-6"
          >
            <span className="text-lg">Read Case Study</span>
            {/* <FaBook className="" /> */}
          </Button>
        </div>
      </div>
      <div className="h-[36rem] flex flex-col text-center"></div>
      {/* <div className="h-[36rem] flex flex-col text-center bg-gradient-to-br from-primary to-secondary "></div> */}
      <img
        src={HisHoliness}
        alt="Harrier Runner Logo PNG"
        className="h-64 w-auto m-4"
      />
    </>
  );
};

export default HomePage;
