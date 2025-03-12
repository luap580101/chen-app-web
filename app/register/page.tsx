"use client";

import React, { useState } from "react";
import AuthService from "@/services/AuthService";
import { useRouter } from "next/navigation";

const RegisterComponent: React.FC = () => {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleRegister = async () => {
    try {
      await AuthService.register(username, email, password, role);
      alert("註冊成功！您現在將被導向到登入頁面");
      router.push("/login");
    } catch (error: any) {
      setMessage(error.response?.data || "註冊失敗，請再試一次");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      {message && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {message}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">用戶名稱：</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="輸入您的用戶名稱"
          />
        </div>
        <div>
          <label className="block text-gray-700">電子信箱：</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="輸入您的電子信箱"
          />
        </div>
        <div>
          <label className="block text-gray-700">密碼：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="請輸入密碼 (至少 6 碼)"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">身份：</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              請選擇身份
            </option>
            <option value="student">學生 (student)</option>
            <option value="instructor">講師 (instructor)</option>
          </select>
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          註冊會員
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
