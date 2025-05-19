import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-base-100 text-base-content">
      <div className="max-w-3xl mx-auto py-10">
        <div className="bg-base-200 rounded-3xl shadow-xl p-10 space-y-10 border border-base-300">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Your Profile</h1>
            <p className="text-sm text-base-content/60 mt-2">
              Update your personal info and photo
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative group w-36 h-36 rounded-full overflow-hidden border-4 border-base-300 shadow-lg">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover group-hover:brightness-75 transition-all"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              >
                <Camera className="w-6 h-6 text-white" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <p className="text-center text-sm text-base-content/60">
            {isUpdatingProfile ? "Uploading..." : "Tap your picture to update"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-base-content/60 flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <div className="px-4 py-3 bg-base-100 border border-base-300 rounded-xl shadow-sm">
                {authUser?.fullName}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-base-content/60 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </label>
              <div className="px-4 py-3 bg-base-100 border border-base-300 rounded-xl shadow-sm">
                {authUser?.email}
              </div>
            </div>
          </div>

          <div className="bg-base-100 border border-base-300 rounded-xl p-6 shadow-inner space-y-4">
            <h2 className="text-xl font-semibold text-base-content">
              Account Details
            </h2>
            <div className="text-sm text-base-content/70 space-y-3">
              <div className="flex justify-between border-b border-base-300 pb-2">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Status</span>
                <span className="text-success font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
