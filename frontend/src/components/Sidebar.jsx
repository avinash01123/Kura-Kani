import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users, X } from "lucide-react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = ({ isOpen, onClose }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => user._id !== authUser?._id)
    .filter((user) => !showOnlineOnly || onlineUsers.includes(user._id));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className={`fixed top-16 left-0 z-40 w-80 h-[calc(100vh-4rem)] bg-base-100 transition-transform duration-300 transform 
      ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:top-0 lg:h-full lg:translate-x-0`}
    >
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-base-300">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img src={authUser?.profilePic || "/avatar.png"} alt="profile" />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{authUser?.fullName}</h3>
            <p className="text-xs text-base-content/70">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="btn btn-ghost btn-circle">
          <X />
        </button>
      </div>

      <div className="border-b border-base-300 p-4">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-primary" />
          <span className="font-semibold text-lg text-primary">Contacts</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
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
            {onlineUsers.filter((id) => id !== authUser?._id).length} online
          </span>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-4rem-8.5rem)]">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 p-4 hover:bg-base-200 transition-colors
              ${selectedUser?._id === user._id ? "bg-primary/10" : ""}`}
          >
            <div className="relative">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                  />
                </div>
              </div>
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-base-100" />
              )}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium">{user.fullName}</h3>
              <p className="text-sm text-base-content/70">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
