import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-16 sm:w-20 lg:w-72 border-r border-base-300 bg-base-100 shadow-inner flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="border-b border-base-300 px-2 sm:px-4 py-4 bg-base-200">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-primary" />
          <span className="font-semibold text-lg hidden lg:block text-primary">
            Contacts
          </span>
        </div>

        {/* Toggle (only visible on large screens) */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
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
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-1 sm:px-2 lg:px-3 py-2 space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center justify-center lg:justify-start gap-3 rounded-lg p-2 lg:p-3 transition-all 
                ${
                  selectedUser?._id === user._id
                    ? "bg-primary/10 ring-2 ring-primary"
                    : "hover:bg-base-200"
                }`}
            >
              <div className="relative group">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-10 rounded-full object-cover border border-zinc-300"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
                )}

                {/* Tooltip on hover (for mobile and desktop) */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-10">
                  {user.fullName}
                </div>
              </div>

              {/* Show text only on lg and up */}
              <div className="text-left hidden lg:block flex-1 min-w-0">
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
  );
};

export default Sidebar;
