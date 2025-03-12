// src/components/Header.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import AuthService from "@/services/AuthService";
import Link from "next/link";

export default function Header() {
  const { currentUser, setCurrentUser } = useAuth();

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    alert("登出，導向首頁");
  };
  return (
    <header className="w-full flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link href="/">MyLogo</Link>
      </div>

      {/* 右邊資訊 */}
      <div className="flex items-center space-x-4">
        {!currentUser && (
          <Link href="/register" className="hover:underline">
            註冊
          </Link>
        )}
        {!currentUser && (
          <Link href="/login" className="hover:underline">
            登入
          </Link>
        )}
        {!!currentUser && (
          <Link href="/profile" className="hover:underline">
            個人頁面
          </Link>
        )}

        {!!currentUser && (
          <Link href="/course" className="hover:underline">
            課程列表
          </Link>
        )}
        {!!currentUser && currentUser.user.role === "instructor" && (
          <Link href="/postCurse" className="hover:underline">
            新增課程
          </Link>
        )}
        {!!currentUser && currentUser.user.role === "student" && (
          <Link href="/enroll" className="hover:underline">
            註冊課程
          </Link>
        )}

        {!!currentUser && (
          <Link
            onClick={handleLogout}
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            登出
          </Link>
        )}
      </div>
    </header>
  );
}
