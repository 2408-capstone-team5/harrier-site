import { Link } from "react-router-dom";
import HisHoliness from "/public/harrier-bird-blue-shadow.png";
const HomePage = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-secondary to-primary h-[36rem] flex flex-col text-center">
        <h2 className="text-4xl text-center mt-20 text-primary">Harrier</h2>
        <p>
          Harrier is an open-source tool for setting up self-hosted</p> 
        <p> GitHub Actions
          runners and persistent cache in your AWS cloud.
        </p>
        <Link to="/case-study" className="">
          Read Case Study
        </Link>
      </div>
      <div className="h-[32rem] flex flex-col text-center"></div>
      <div className="bg-gradient-to-br from-primary to-secondary h-[36rem] flex flex-col text-center">
 
      </div>
      <img src={HisHoliness} alt="Harrier Runner Logo PNG" className="h-2000 w-auto" />
    </> 
  );
};

export default HomePage;
