"use client";

import { useEffect, useState } from "react";
import AuthService from "@/services/AuthService";
import { useAuth } from "@/context/AuthContext";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface CurrentUser {
  user: User;
  token: string;
}

interface ProfileComponentProps {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
}

const ProfileComponent: React.FC<ProfileComponentProps> = () => {
  const { currentUser, setCurrentUser } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 若重新整理頁面，從 localStorage 取回登入資訊
    const userData = AuthService.getCurrentUser();
    if (userData) {
      setCurrentUser(userData);
    }
    setLoading(false);
  }, [setCurrentUser]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">載入中...</div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        您必須先登入。
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">個人檔案</h2>

      <table className="w-full text-left border border-gray-200 rounded-lg">
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-4 font-semibold w-1/3">姓名：</td>
            <td className="py-3 px-4">{currentUser.user.username}</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-4 font-semibold">用戶 ID：</td>
            <td className="py-3 px-4">{currentUser.user._id}</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-4 font-semibold">電子信箱：</td>
            <td className="py-3 px-4">{currentUser.user.email}</td>
          </tr>
          <tr>
            <td className="py-3 px-4 font-semibold">身份：</td>
            <td className="py-3 px-4">{currentUser.user.role}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileComponent;
