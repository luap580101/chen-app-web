"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseService from "@/services/CuresService";
import { useAuth } from "@/context/AuthContext";

// 定義 Course 型別
interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  students: any[];
}

const CourseComponent: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [courseData, setCourseData] = useState<Course[] | null>(null);

  const handleTakeToLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (currentUser) {
      const _id = currentUser.user._id;

      if (currentUser.user.role === "instructor") {
        CourseService.get(_id)
          .then((res) => {
            console.log(res.data);
            setCourseData(res.data);
          })
          .catch((e) => console.error(e));
      } else if (currentUser.user.role === "student") {
        CourseService.getEnrolledCourses(_id)
          .then((res) => setCourseData(res.data))
          .catch((e) => console.error(e));
      }
    }
  }, [currentUser]);

  return (
    <div className="p-12">
      {!currentUser && (
        <div className="text-center">
          <p className="text-lg mb-4">您必須先登入才能看到課程。</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}

      {currentUser?.user.role === "instructor" && (
        <h1 className="text-2xl font-bold mb-6">歡迎來到講師的課程頁面。</h1>
      )}

      {currentUser?.user.role === "student" && (
        <h1 className="text-2xl font-bold mb-6">歡迎來到學生的課程頁面。</h1>
      )}

      {currentUser && courseData && courseData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.map((course) => (
            <div
              key={course._id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <h5 className="text-xl font-semibold mb-2">
                課程名稱: {course.title}
              </h5>
              <p className="text-gray-700 mb-2">{course.description}</p>
              <p className="text-gray-600 mb-1">
                學生人數: {course.students.length}
              </p>
              <p className="text-gray-600">課程價格: ${course.price}</p>
            </div>
          ))}
        </div>
      )}

      {currentUser && courseData && courseData.length === 0 && (
        <p className="text-center text-gray-500">尚無課程資料。</p>
      )}
    </div>
  );
};

export default CourseComponent;
