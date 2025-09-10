"use client";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { FaHeart, FaThumbsUp, FaLaugh, FaAngry } from "react-icons/fa";

interface PostProps {
  id: number;
  content: string;
  createdAt?: Date;
}
const reactions = [
  { type: "like", icon: <FaThumbsUp />, color: "text-blue-500" },
  { type: "love", icon: <FaHeart />, color: "text-red-500" },
  { type: "haha", icon: <FaLaugh />, color: "text-yellow-500" },
  { type: "angry", icon: <FaAngry />, color: "text-orange-600" },
];

export default function Post({ id, content, createdAt }: PostProps) {
  const [selectedReactions, setSelectedReactions] = useLocalStorage<
    Record<number, string>
  >("selectedReactions", {});

  const handleReactionClick = (reaction: string) => {
    setSelectedReactions((prev) => ({
      ...prev,
      [id]: prev[id] === reaction ? "" : reaction, 
    }));
  };

  return (
    <div
      className="w-full max-w-md rounded-xl shadow-xl p-4 mb-4
      bg-gradient-to-br from-pink-400 via-pink-100 to-white
      bg-opacity-30 backdrop-blur-md 
      transform transition-transform duration-300 ease-in-out
      hover:scale-105 hover:shadow-lg"
    >
      <div className="flex items-start mb-3 gap-2">
        <i className="fa-solid fa-message text-sm sm:text-base"></i>
        <div className="text-xs sm:text-sm flex flex-col">
          <p className="text-gray-800 font-semibold leading-none">Admin</p>
          <p className="text-gray-600 text-[10px] sm:text-xs">
            {(createdAt ? new Date(createdAt) : new Date()).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }
            )}
          </p>
        </div>
      </div>

      <p className="text-gray-800 text-sm sm:text-base mb-4 leading-relaxed text-justify break-words">
        {content}
      </p>

      <div className="flex gap-4">
        {reactions.map((reaction) => (
          <button
            key={reaction.type}
            onClick={() => handleReactionClick(reaction.type)}
            className="p-2 rounded-full hover:bg-pink-100 transition-colors"
          >
            <span
              className={`text-lg sm:text-xl ${
                selectedReactions[id] === reaction.type
                  ? reaction.color
                  : "text-gray-400"
              }`}
            >
              {reaction.icon}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
