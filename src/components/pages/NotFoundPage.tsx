import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-center font-bold">404</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFoundPage;
