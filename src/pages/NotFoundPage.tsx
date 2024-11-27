import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1>404</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFoundPage;
