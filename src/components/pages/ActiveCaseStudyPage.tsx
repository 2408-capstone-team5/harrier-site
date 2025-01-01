import ProblemDomain from "./case-study/ProblemDomain";
import Design from "./case-study/Design";
import Implementation from "./case-study/Implementation";

const ActiveCaseStudyPage = ({ activePage }: { activePage: number }) => {
  return (() => {
    switch (activePage) {
      case 0:
        return <ProblemDomain />;
      case 1:
        return <Design />;
      case 2:
        return <Implementation />;
      case 3:
        return <div>future work</div>;
      default:
        return <div>default</div>;
    }
  })();
};

export default ActiveCaseStudyPage;
