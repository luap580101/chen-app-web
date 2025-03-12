"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CourseService from "@/services/CuresService";
import { useAuth } from "@/context/AuthContext";

const PostCourse: React.FC = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleTakeToLogin = () => {
    router.push("/login");
  };

  const postCourse = () => {
    CourseService.post(title, description, price)
      .then(() => {
        alert("新課程已創建成功");
        router.push("/course");
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.response?.data || "發生錯誤，請稍後再試");
      });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* 尚未登入 */}
      {!currentUser && (
        <div className="text-center">
          <p className="text-lg mb-4">在發布新課程之前，您必須先登入。</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleTakeToLogin}
          >
            帶我進入登入頁面
          </button>
        </div>
      )}

      {/* 不是講師 */}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div className="text-center text-red-500 font-semibold">
          <p>只有講師可以發布新課程。</p>
        </div>
      )}

      {/* 講師可以新增課程 */}
      {currentUser && currentUser.user.role === "instructor" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">新增新課程</h2>

          <div>
            <label className="block font-medium mb-1">課程標題：</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="輸入課程標題"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">內容：</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="輸入課程內容"
              rows={4}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">價格：</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="輸入課程價格"
            />
          </div>

          <button
            onClick={postCourse}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            交出表單
          </button>

          {message && (
            <div className="mt-4 text-red-500 font-semibold">{message}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourse;
