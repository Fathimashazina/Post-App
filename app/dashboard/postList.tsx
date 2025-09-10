"use client";
import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Post from "./post";

export default function PostList() {
  const [posts, setPosts] = useLocalStorage<{ id: number; content: string }[]>(
    "posts",
    []
  );
  const [input, setInput] = useState("");

  const addPost = () => {
    if (!input.trim()) return;
    const newPost = { id: Date.now(), content: input, createdAt: new Date() };
    setPosts([...posts, newPost]);
    setInput("");
  };

  return (
    <div
      className="flex justify-center min-h-screen bg-sky-200
     pt-10"
    >
      <div className="w-1/2 ">
        <div className="w-full sticky top-0 bg-sky-200 rounded-2xl z-10 p-4 ">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border px-12 py-2 rounded-full w-full border-gray focus:outline-none "
            placeholder="Write a post..."
          />
          <button
            onClick={addPost}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-800 "
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>

        {/* Post list */}
        <div className="flex flex-col gap-4 p-4 items-center">
          {[...posts].reverse().map((post) => (
            <Post key={post.id} id={post.id} content={post.content} />
          ))}
        </div>
      </div>
    </div>
  );
}
