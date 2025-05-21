import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Menu, X } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-2 left-2 z-100 bg-base-100 p-2 rounded-full shadow-md hover:bg-base-200"
      >
        <Menu size={24} />
      </button>

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-[3.5rem] left-0 h-[calc(100vh-3.5rem)] w-72 bg-base-100 border-r border-base-300 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:relative lg:top-0 lg:h-screen lg:translate-x-0`}
      >
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-base-300">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <span className="font-semibold text-lg text-primary">Contacts</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 hover:bg-base-200 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-4 py-4 border-b border-base-300 bg-base-200">
          <Users className="size-5 text-primary" />
          <span className="font-semibold text-lg text-primary">Contacts</span>
        </div>

        <div className="hidden lg:flex items-center justify-between px-4 py-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="toggle toggle-sm toggle-success"
            />
            <span>Show online</span>
          </label>
          <span className="text-xs text-zinc-500">
            {onlineUsers.length > 1 ? onlineUsers.length - 1 : 0} online
          </span>
        </div>

        <div className="overflow-y-auto h-[calc(100%-4rem)] px-2 py-2 space-y-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 rounded-lg p-2 transition ${
                  selectedUser?._id === user._id
                    ? "bg-primary/10 ring-2 ring-primary"
                    : "hover:bg-base-200"
                }`}
              >
                <div className="relative group">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="size-10 rounded-full object-cover border border-zinc-300"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-medium truncate">{user.fullName}</p>
                  <p className="text-xs text-zinc-500">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center text-zinc-400 text-sm mt-10">
              No users to show
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
