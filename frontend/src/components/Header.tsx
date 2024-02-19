import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-600 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">TravelNest</Link>
        </span>
        <span className="flex flex-space-2">
          <Link
            to="/sign-in"
            className="flex items-center text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
