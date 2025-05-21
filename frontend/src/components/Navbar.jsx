import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquareText, Settings, UserRound } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 w-full z-50 bg-base-100/80 backdrop-blur border-b border-base-300 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between font-sans">
        <div className="w-10 lg:hidden"></div>

        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <div className="hidden md:flex bg-primary text-primary-content size-10 rounded-xl items-center justify-center shadow-inner">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Kura Kani</h1>
        </Link>

        <div className="flex items-center gap-4">
          {authUser && (
            <p className="hidden lg:block text-sm text-base-content">
              Hello,{" "}
              <span className="font-medium text-base-content">
                {authUser.fullName?.split(" ")[0]}
              </span>
              !
            </p>
          )}

          {authUser && (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost p-0 hover:bg-transparent"
              >
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300 hover:ring-2 hover:ring-primary transition-all">
                    <img
                      src={authUser.profilePic || "/avatar.png"}
                      alt="Profile"
                    />
                  </div>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow-lg bg-base-200 rounded-xl w-52 space-y-1"
              >
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <UserRound className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-error hover:text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
