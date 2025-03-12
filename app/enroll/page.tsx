"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CourseService from "@/services/CuresService";
import { useAuth } from "@/context/AuthContext";

interface User {
  user: {
    role: string;
    _id: string;
  };
}

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  students: any[];
  instructor?: {
    username: string;
  };
}

interface Props {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const Enroll: React.FC<Props> = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Course[] | null>(null);
  const { currentUser } = useAuth();

  const handleTakeToLogin = () => {
    router.push("/login");
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleEnroll = (courseId: string) => {
    CourseService.enroll(courseId)
      .then(() => {
        window.alert("課程註冊成功!! 重新導向到課程頁面。");
        router.push("/course");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="p-12 space-y-6">
      {!currentUser && (
        <div className="text-center">
          <p className="text-lg mb-4">您必須先登入才能開始註冊課程。</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}

      {currentUser?.user.role === "instructor" && (
        <div className="text-center">
          <h1 className="text-xl font-bold">只有學生才能夠註冊課程</h1>
        </div>
      )}

      {currentUser?.user.role === "student" && (
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            placeholder="輸入課程名稱"
            value={searchInput}
            onChange={handleChangeInput}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            搜尋課程
          </button>
        </div>
      )}

      {currentUser && searchResult && (
        <div className="space-y-6">
          {searchResult.length === 0 && (
            <p className="text-center text-gray-500">沒有找到符合的課程。</p>
          )}

          {searchResult.map((course) => (
            <div
              key={course._id}
              className="border border-gray-300 rounded-lg shadow p-4 space-y-2"
            >
              <h5 className="text-lg font-semibold">
                課程名稱: {course.title}
              </h5>
              <p className="text-gray-700">{course.description}</p>
              <p>學生人數: {course.students.length}</p>
              <p>課程價格: ${course.price}</p>
              <p>講師: {course.instructor?.username || "未提供"}</p>
              <button
                onClick={() => handleEnroll(course._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-2"
              >
                註冊課程
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Enroll;
