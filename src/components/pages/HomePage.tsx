import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-8">Harrier Landing Page</h2>
      <p>
        Harrier is an open-source tool for setting up self-hosted GitHub Actions
        runners and persistent cache in your AWS cloud.
      </p>
      <br />
      <Link to="/case-study" className="text-accent">
        Read our Case Study
      </Link>
    </> 
  );
};

export default HomePage;
