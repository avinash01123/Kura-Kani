import { Menu } from "lucide-react";

const SidebarToggle = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden absolute top-4 left-4 z-50 btn btn-ghost btn-circle"
    >
      <Menu />
    </button>
  );
};

export default SidebarToggle;