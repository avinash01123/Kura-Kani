import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquareText, Settings, UserRound } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 w-full z-40 backdrop-blur-md bg-base-100/70 border-b border-base-300 font-montserrat">
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="size-8 rounded-md bg-primary/20 flex items-center justify-center">
            <MessageSquareText className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Kura Kani</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/settings"
            className="btn btn-ghost btn-sm flex items-center gap-2 text-sm px-3 hover:bg-primary/10"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="btn btn-ghost btn-sm flex items-center gap-2 text-sm px-3 hover:bg-primary/10"
              >
                <UserRound className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="btn btn-ghost btn-sm flex items-center gap-2 text-sm px-3 hover:bg-error/10 text-error"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
