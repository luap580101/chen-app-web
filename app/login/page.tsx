"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/services/AuthService";
import { useAuth } from "@/context/AuthContext";

interface LoginComponentProps {
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = () => {
  const { setCurrentUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功，您現在將被重新導向至個人資料頁面。");
      setCurrentUser(AuthService.getCurrentUser());
      router.push("/profile");
    } catch (e: any) {
      setMessage(e.response?.data || "登入失敗，請再試一次！");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">登入系統</h2>

      {message && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
          {message}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">電子信箱：</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="請輸入電子信箱"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">密碼：</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="請輸入密碼"
          required
        />
      </div>

      <div
        onClick={handleLogin}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mb-3 flex flex-col justify-center items-center"
      >
        登入
      </div>
    </div>
  );
};

export default LoginComponent;
