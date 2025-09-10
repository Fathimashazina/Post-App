"use client";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { FaHeart } from "react-icons/fa";

interface PostProps {
  id: number;
  content: string;
  createdAt?: Date;
}

export default function Post({ id, content, createdAt }: PostProps) {
  const [likes, setLikes] = useLocalStorage<number[]>("likes", []);

  const toggleLike = () => {
    setLikes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="w-full max-w-md rounded-lg shadow-2xl p-4 mb-4
    bg-gradient-to-br from-blue-400 via-blue-100 to-white
    bg-opacity-30 backdrop-blur-md border border-white/30
    transform transition-transform duration-300 ease-in-out
    hover:scale-105 hover:shadow-lg"
    >
      <div className="flex items-start  mb-4 gap-2">
        <i className="fa-solid fa-message "></i>
        <div className="text-sm flex flex-col">
          <div className="flex items-center gap-1">
            <p className="text-gray-800 font-semibold leading-none">Admin</p>
          </div>
          <p className="text-gray-600 text-xs">
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

      <p className="text-gray-800 text-sm mb-4 mx-5 text-justify">{content}</p>

      <button onClick={toggleLike} className="px-5">
        {likes.includes(id) ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaHeart className="text-gray-400" />
        )}
      </button>
    </div>
  );
}
