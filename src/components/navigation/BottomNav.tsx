import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, PieChart, User, MessageSquare } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 md:hidden z-50">
      <div className="flex justify-around items-center">
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center ${
            isActive("/") ? "text-primary" : "text-gray-500"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Engage</span>
        </button>
        <button
          onClick={() => navigate("/lessons")}
          className={`flex flex-col items-center ${
            isActive("/lessons") ? "text-primary" : "text-gray-500"
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs">Lessons</span>
        </button>
        <button
          onClick={() => navigate("/ai-chat")}
          className={`flex flex-col items-center ${
            isActive("/ai-chat") ? "text-primary" : "text-gray-500"
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs">AI Chat</span>
        </button>
        <button
          onClick={() => navigate("/about")}
          className={`flex flex-col items-center ${
            isActive("/about") ? "text-primary" : "text-gray-500"
          }`}
        >
          <PieChart className="h-5 w-5" />
          <span className="text-xs">Overview</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center ${
            isActive("/profile") ? "text-primary" : "text-gray-500"
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;